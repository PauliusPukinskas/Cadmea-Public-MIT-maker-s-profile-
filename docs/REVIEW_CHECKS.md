# Public evidence checks

Checked on **November 7, 2026**, using **Node v24.22.1**.

## Executed public tests

```bash
cd public-reproduction
npm test
```

**6 tests passed, 0 failed.** These are tests of the independently written public mathematical reproduction:

| Check | Observed behavior |
| :--- | :--- |
| Partial evidence | A conditional index of 80 with 30% coverage has complete score bounds of 24 to 94 |
| Zero and missing values | An observed zero remains different from an absent indicator |
| Complete measurements | All six supplied measurements cover the full policy weight |
| Invalid inputs | Invalid values and weights are rejected |
| Weight scenarios | One baseline plus twelve perturbations produces 13 scenarios |
| Rank sensitivity | Synthetic candidate rank changes remain deterministic |

The earlier **12 passing tests** described in [engineering notes](ENGINEERING.md#verification-performed-for-this-portfolio) came from the archived original decision model on November 2. That separate suite was not rerun in this refresh. The public reproduction is explanatory code, not original team application source.

## Live product checks

Opened the anonymous application, selected English and inspected the overview, facilities, demand radar, planned projects and OSM layer. On the captured OSM data copy, selecting Clothing narrowed 2,036 records to 141. The visible map count also depends on its bounds.

The [six direct captures](PRODUCT_WALKTHROUGH.md) retain the observed states. Their [capture record](../assets/live-screenshots/2026-11-07/CAPTURE_INFO.json) includes exact times, URLs and unchanged image hashes. The screenshots document the current collaborative product; they do not establish municipal adoption or validate proxy planning indices.

[Overview](../README.md) · [Public reproduction](../public-reproduction/README.md) · [Team credits](CONTRIBUTIONS_AND_EVIDENCE.md)
