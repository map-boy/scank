import { describe, it, expect } from 'vitest';
import { judgeStep, overall, holdsAbout } from '../src/core/verdict.js';
import type { StepOutcome, StepResult } from '../src/core/types.js';

const step = (o: Partial<StepResult>): StepResult => ({
  users: 10, durationSec: 15, requests: 1000, failed: 0, errorRate: 0, p50Ms: 50, p975Ms: 200, rps: 100, ...o,
});
const out = (users: number, verdict: StepOutcome['verdict']): StepOutcome => ({ ...step({ users }), verdict });

describe('judgeStep', () => {
  it('PASS when errors < 1% and p97.5 < 2s', () => {
    expect(judgeStep(step({ errorRate: 0.005, p975Ms: 1500 }))).toBe('PASS');
  });
  it('WARNING between pass and fail limits', () => {
    expect(judgeStep(step({ errorRate: 0.02, p975Ms: 1500 }))).toBe('WARNING');
    expect(judgeStep(step({ errorRate: 0, p975Ms: 3000 }))).toBe('WARNING');
  });
  it('FAIL when errors > 5% or p97.5 > 5s', () => {
    expect(judgeStep(step({ errorRate: 0.06 }))).toBe('FAIL');
    expect(judgeStep(step({ p975Ms: 6000 }))).toBe('FAIL');
  });
});

describe('overall and holdsAbout', () => {
  it('overall is the worst step; empty is FAIL', () => {
    expect(overall([out(1, 'PASS'), out(10, 'WARNING')])).toBe('WARNING');
    expect(overall([out(1, 'PASS'), out(10, 'FAIL')])).toBe('FAIL');
    expect(overall([])).toBe('FAIL');
  });
  it('holdsAbout is the highest PASS before the first FAIL', () => {
    expect(holdsAbout([out(10, 'PASS'), out(20, 'PASS'), out(40, 'FAIL'), out(80, 'PASS')])).toBe(20);
    expect(holdsAbout([out(10, 'FAIL')])).toBe(0);
  });
});