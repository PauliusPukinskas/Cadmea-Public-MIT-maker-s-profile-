// Capture only CADMEA's existing anonymous public pages, never login or private routes.
// Screenshots are independent captures of the live public site, NOT original build-history media.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const base = "https://cadmeamap.com";
const out = path.resolve("assets/live-screenshots");
await mkdir(out, { recursive: true });
const pages = [
  { route: "/", filename: "01-overview.png", label: "Public infrastructure overview" },
  { route: "/paklausa", filename: "02-demand.png", label: "Public demand radar" },
  { route: "/projektai", filename: "03-projects.png", label: "Public project progress" },
  { route: "/mini-infrastruktura", filename: "04-mini-infrastructure.png", label: "Public OpenStreetMap mini infrastructure" }
];
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const target of pages) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    try {
      const url = base + target.route;
      const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      if (!resp?.ok()) throw new Error("HTTP " + (resp?.status() ?? "unknown") + " at " + url);
      await page.locator("body").waitFor({ state: "visible", timeout: 25000 });
      await page.waitForTimeout(6000);
      const body = (await page.locator("body").innerText()).slice(0, 4000);
      if (!/(cadmea|vilni|infrastr|paklaus|projekt)/i.test(body) || body.trim().length < 100) {
        throw new Error("Could not verify rendered public CADMEA page: " + target.route);
      }
      if (/(sign in to continue|prisijunkite, kad)/i.test(body.slice(0, 350))) {
        throw new Error("Detected login gate instead of public page: " + target.route);
      }
      await page.screenshot({ path: path.join(out, target.filename), animations: "disabled", fullPage: false });
      results.push({ ...target, url, capturedAt: new Date().toISOString(), type: "screenshot of publicly accessible page", viewport: "1440x900", status: "rendered" });
      console.log("Captured:", target.filename, url);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(path.join(out, "CAPTURE_INFO.json"), JSON.stringify({ attribution: "CADMEA collaborative software project", caution: "Current live public pages; not historical source/build screenshots. App UI is team-built, frontend credited to the team frontend developer. Planning data may be illustrative/proxy and is not official municipal decisions.", pages: results }, null, 2) + "\n");
if (results.length !== pages.length) throw new Error("Incomplete public screenshot set");
