// Ramp for a target: 1 user (baseline), then 10%, 25%, 50%, 100% of target.
export function rampSteps(target: number): number[] {
  const t = Math.max(1, Math.floor(target));
  const raw = [1, Math.ceil(t * 0.1), Math.ceil(t * 0.25), Math.ceil(t * 0.5), t];
  return [...new Set(raw)].sort((a, b) => a - b);
}

// Find-my-limit: 10, 20, 40, ... doubling, ending exactly at max.
export function limitSteps(max: number): number[] {
  const m = Math.max(1, Math.floor(max));
  const out: number[] = [];
  let u = 10;
  while (u < m) {
    out.push(u);
    u *= 2;
  }
  out.push(m);
  return out;
}