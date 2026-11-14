import { describe, it, expect } from 'vitest';
import { rampSteps, limitSteps } from '../src/core/plan.js';

describe('rampSteps', () => {
  it('ramps 1, 10%, 25%, 50%, 100%', () => {
    expect(rampSteps(1000)).toEqual([1, 100, 250, 500, 1000]);
  });
  it('dedupes small targets', () => {
    expect(rampSteps(1)).toEqual([1]);
    expect(rampSteps(2)).toEqual([1, 2]);
  });
});

describe('limitSteps', () => {
  it('doubles and ends at max', () => {
    expect(limitSteps(100)).toEqual([10, 20, 40, 80, 100]);
    expect(limitSteps(5)).toEqual([5]);
  });
});