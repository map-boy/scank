import autocannon from 'autocannon';
import type { StepResult } from '../core/types.js';

export async function runStep(
  url: string,
  users: number,
  durationSec: number,
  timeoutSec = 10,
): Promise<StepResult> {
  const r = await autocannon({ url, connections: users, duration: durationSec, timeout: timeoutSec });
  const failed = r.errors + r.timeouts + r['4xx'] + r['5xx'];
  const attempted = r.requests.total + r.errors + r.timeouts;
  const errorRate = attempted === 0 ? 1 : failed / attempted;
  return {
    users,
    durationSec,
    requests: r.requests.total,
    failed,
    errorRate,
    p50Ms: r.latency.p50,
    p975Ms: r.latency.p97_5,
    rps: r.duration > 0 ? Math.round(r.requests.total / r.duration) : 0,
  };
}