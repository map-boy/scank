import type { StepResult, StepOutcome, Thresholds, Verdict } from './types.js';

export const DEFAULT_THRESHOLDS: Thresholds = {
  passErrorRate: 0.01,
  passP975Ms: 2000,
  failErrorRate: 0.05,
  failP975Ms: 5000,
};

export function judgeStep(s: StepResult, t: Thresholds = DEFAULT_THRESHOLDS): Verdict {
  if (s.errorRate > t.failErrorRate || s.p975Ms > t.failP975Ms) return 'FAIL';
  if (s.errorRate < t.passErrorRate && s.p975Ms < t.passP975Ms) return 'PASS';
  return 'WARNING';
}

const RANK: Record<Verdict, number> = { PASS: 0, WARNING: 1, FAIL: 2 };

export function overall(steps: StepOutcome[]): Verdict {
  if (steps.length === 0) return 'FAIL';
  return steps.reduce<Verdict>((w, s) => (RANK[s.verdict] > RANK[w] ? s.verdict : w), 'PASS');
}

// Highest users among PASS steps, scanning in order and stopping at the first FAIL.
export function holdsAbout(steps: StepOutcome[]): number {
  let best = 0;
  for (const s of steps) {
    if (s.verdict === 'FAIL') break;
    if (s.verdict === 'PASS') best = Math.max(best, s.users);
  }
  return best;
}