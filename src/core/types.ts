export type Verdict = 'PASS' | 'WARNING' | 'FAIL';
export type Mode = 'quick' | 'target' | 'limit';

export interface StepResult {
  users: number;
  durationSec: number;
  requests: number;
  failed: number;
  errorRate: number;
  p50Ms: number;
  p975Ms: number;
  rps: number;
}

export interface StepOutcome extends StepResult {
  verdict: Verdict;
}

export interface Thresholds {
  passErrorRate: number;
  passP975Ms: number;
  failErrorRate: number;
  failP975Ms: number;
}

export interface RunResult {
  mode: Mode;
  url: string;
  startedAt: string;
  steps: StepOutcome[];
  verdict: Verdict;
  holdsUsers: number;
  stoppedEarly: boolean;
}