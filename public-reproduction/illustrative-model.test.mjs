import test from "node:test";
import assert from "node:assert/strict";
import {
  CRITERIA, EXAMPLE_WEIGHTS,
  evaluateIllustrativeCandidate, makeIllustrativeWeightScenarios,
  inspectIllustrativeRankSensitivity
} from "./illustrative-model.mjs";

test("a score of 80 at 30% coverage cannot masquerade as a complete score", () => {
  const candidate = { demandPressure: 80 };
  const result = evaluateIllustrativeCandidate(candidate);
  assert.equal(result.conditionalIndex, 80);
  assert.equal(result.dataCoveragePercent, 30);
  assert.equal(result.possibleTotalLower, 24);
  assert.equal(result.possibleTotalUpper, 94);
  assert.equal(result.hasMissingInformation, true);
});

test("zero is an observed value, null is missing", () => {
  const zero = evaluateIllustrativeCandidate({ demandPressure: 0 });
  const missing = evaluateIllustrativeCandidate({});
  assert.equal(zero.conditionalIndex, 0);
  assert.equal(zero.dataCoveragePercent, 30);
  assert.equal(missing.conditionalIndex, null);
  assert.equal(missing.dataCoveragePercent, 0);
  assert.equal(missing.possibleTotalUpper, 100);
});

test("all six synthetic measurements cover the whole weighting policy", () => {
  const scores = Object.fromEntries(CRITERIA.map(k => [k, 50]));
  const result = evaluateIllustrativeCandidate(scores);
  assert.equal(result.dataCoveragePercent, 100);
  assert.equal(result.possibleTotalLower, 50);
  assert.equal(result.possibleTotalUpper, 50);
});

test("invalid inputs do not silently turn into credible indices", () => {
  assert.throws(() => evaluateIllustrativeCandidate({ demandPressure: -1 }), RangeError);
  assert.throws(() => evaluateIllustrativeCandidate({ demandPressure: NaN }), RangeError);
  assert.throws(() => evaluateIllustrativeCandidate({}, { ...EXAMPLE_WEIGHTS, demandPressure: -2 }), RangeError);
});

test("baseline and twelve local perturbations produce 13 weight scenarios", () => {
  const scenarios = makeIllustrativeWeightScenarios();
  assert.equal(scenarios.length, 13);
  for (const scenario of scenarios) {
    const sum = Object.values(scenario.weights).reduce((a,b) => a+b, 0);
    assert.ok(Math.abs(sum - 1) < 1e-10);
  }
});

test("rank sensitivity is explicit, deterministic and tied to synthetic data", () => {
  const fill = x => Object.fromEntries(CRITERIA.map(k => [k, x]));
  const result = inspectIllustrativeRankSensitivity([
    { id: "Alpha", indicators: { ...fill(50), demandPressure: 70, accessGap: 30 } },
    { id: "Beta", indicators: { ...fill(50), demandPressure: 30, accessGap: 70 } },
    { id: "Gamma", indicators: fill(20) }
  ]);
  assert.equal(result.scenarios, 13);
  assert.equal(result.candidates.length, 3);
  assert.ok(result.candidates.every(x => x.bestRank >= 1 && x.worstRank <= 3));
  assert.ok(result.candidates.every(x => x.topThreeCount === 13));
});
