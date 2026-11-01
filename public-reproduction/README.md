# Inspect the documented CADMEA math

**This is a new, independently written, explanatory reproduction of the publicly documented scoring model. It is NOT the original CADMEA application's source, NOT a recovered module, and NOT proof that the production system uses this exact implementation.**

The original CADMEA application was built by a team. The underlying source and original media remain unpublished here because publication rights have not been confirmed. Instead of copying team-owned work, these standalone files allow a reader to inspect and execute the mathematical **ideas described in the engineering case study**.

The reproduction uses six configurable weights, keeps unknown indicators distinct from real zero readings, provides mathematical best/worst bounds over unobserved measurements, and enumerates 13 local policy-weight scenarios. All example observations are **synthetic**. No real municipal dataset, proprietary model, authentication or private record is included.

## Verify it yourself

With Node 18 or newer:

```bash
cd public-reproduction
npm test
```

No installation, credential or network connection is required. The test showing **80 conditional points, 30% weighted coverage, and a 24–94 possible complete-score range** is particularly revealing.

## What this does and does not establish

- It makes the public explanation and its sample arithmetic independently checkable.
- It is **not** the historical May/October CADMEA implementation or an MIT-submittable substitute for the team's source codebase.
- It does not independently verify municipal data, costs, impact, accessibility or the deployed web app.
- The original product and its team contributions are documented in the [main case study](../README.md), [engineering notes](../docs/ENGINEERING.md) and [contributions](../docs/CONTRIBUTIONS_AND_EVIDENCE.md).

The effective next step for an admissions reviewer is access to **the real project's permitted code and a genuine working video/demo**, not simply a reproduction. These remain separate evidence requirements.
