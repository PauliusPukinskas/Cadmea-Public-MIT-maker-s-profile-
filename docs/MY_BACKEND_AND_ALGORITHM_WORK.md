# What I personally worked on: backend and algorithms

**My role:** CADMEA team lead / CEO, substantial backend contributor and decision algorithm developer.

CADMEA was built collaboratively during and after Make It Real in Vilnius (May 2026). I led product direction and worked hands-on in the backend and algorithm layer. Other teammates contributed backend code, the frontend, QA and communication. **This is a role and responsibility account, not a claim that I alone authored every file listed below.**

## The engineering work, not just the pitch

| Problem I worked on | What I contributed | Verifiable technical artifact in our archived team source |
| --- | --- | --- |
| Turning a geographic map into a decision model | Backend decision and ranking logic; policy inputs and screening behavior | `artifacts/api-server/src/lib/decision-model.ts` |
| Keeping incomplete data honest | Decision behavior for absent indicators, explicit provenance and review caveats | `decision-model.ts` inputs, `screeningScore`, `ignoranceRange`, `dataCoverage`, `requiresHumanReview` |
| Avoiding misleading resident demand signals | Backend reasoning and evaluation of district/sport relevance and duplicate signals | `artifacts/api-server/src/lib/resident-evidence.ts` |
| Making geographic information usable by services | Work on backend inputs, integration needs and data-to-decision workflows | API architecture and `artifacts/api-server/src/ingestion/`; specific line-level authorship is not asserted |
| Making uncertain recommendations inspectable | Reviewable weighting, missing-data and sensitivity behavior | `decision-model.ts`, original source unit tests, [engineering explanation](ENGINEERING.md) |
| Making the prototype useful to a real stakeholder | Product direction, technical prioritization, hackathon leadership and Vilnius pilot discussions | Team demonstrations, planning history and [contribution record](CONTRIBUTIONS_AND_EVIDENCE.md) |

These paths are **evidence references to the separately retained team project archive**, not public clickable links. Their presence confirms the architecture and functions in the archived code, not a verified person-by-person Git blame. I am reporting my own areas of work, not appropriating my teammates' implementation.

## Concrete example 1: why a high score can still mean poor evidence

The archived decision model includes a **conditional** screening score and a separate data-coverage measure. Suppose the only known input is demand pressure = 80 (of 100) and its weight is 30%.

- Conditional screening index over the available indicators: **80**
- Share of policy weight backed by provided values: **30%**
- Possible complete weighted index if missing values range from 0 to 100: **24 to 94**

The difference matters. Reporting "80 out of 100" alone would make an incomplete record look authoritative. This design instead exposes what is unknown; it is a deterministic screening bound, **not** a statistical confidence interval or forecast accuracy claim.

The original implementation tracks provenance (documented/community/proxy), freshness and human-review requirements. Public [engineering write-up](ENGINEERING.md) and [independently written runnable reproduction](../public-reproduction/README.md) demonstrate this math without disclosing the team code.

## Concrete example 2: community signals must relate to the proposed facility

The original `resident-evidence.ts` normalizes Lithuanian and English sports terminology, matches relevant district and sport, ignores rejected/planned requests for open-demand counts, and deduplicates resident fingerprints rather than treating every repeated interaction as an independent person.

This is **not** a scientifically representative public poll. The point is narrower: do not count an unrelated sport's requests in another district as evidence for this candidate project.

## Concrete example 3: testing policy sensitivity

A ranking can change if a city adjusts the relative importance of demand, access, or project cost. The model explores **13 deterministic scenarios**: baseline plus two perturbations for each of six policy weights. A rank shift is an engineering warning to a human reviewer, not a probability of which investment will succeed.

The archived source unit-test run previously documented **12 passing decision-model tests**. The new public reproduction has its own tests; **the two suites are not the same**.

## What my work is not

- I did not build the entire team UI, and I credit our frontend developer.
- I do not claim sole authorship of all archived source files or tests.
- I did not train a proprietary foundation model.
- I did not establish validated municipal forecasting accuracy or implement official Vilnius budget policy.
- I do not claim that the independent public mathematical reproduction is original team application source.

**The engineering substance I want a reviewer to notice:** turning incomplete geographic and community evidence into a service that is explicit about uncertainty and defensible enough to review, rather than just displaying attractive map pins.

[Main overview](../README.md) · [Technical case study](ENGINEERING.md) · [Team contributions](CONTRIBUTIONS_AND_EVIDENCE.md) · [Demo and media evidence](DEMO_AND_MEDIA_STATUS.md)
