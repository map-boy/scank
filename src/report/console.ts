import { t } from '../i18n/index.js';
import type { RunResult } from '../core/types.js';
import type { WeightResult } from '../checks/page-weight.js';

export function renderConsole(r: RunResult, weight: WeightResult): string {
  const lines: string[] = [];
  lines.push('');
  lines.push(`URL: ${r.url}   Mode: ${r.mode}`);
  lines.push('');
  lines.push('users | p50 ms | p97.5 ms | errors | req/s | verdict');
  for (const s of r.steps) {
    lines.push(
      `${String(s.users).padStart(5)} | ${String(Math.round(s.p50Ms)).padStart(6)} | ${String(Math.round(s.p975Ms)).padStart(8)} | ${(s.errorRate * 100).toFixed(1).padStart(5)}% | ${String(s.rps).padStart(5)} | ${s.verdict}`,
    );
  }
  lines.push('');
  lines.push(t('graph.title'));
  const max = Math.max(1, ...r.steps.map((s) => s.p975Ms));
  for (const s of r.steps) {
    const bar = '#'.repeat(Math.max(1, Math.round((s.p975Ms / max) * 40)));
    lines.push(`${String(s.users).padStart(5)} users ${bar} ${Math.round(s.p975Ms)}`);
  }
  lines.push('');
  if (r.mode === 'limit') {
    lines.push(r.holdsUsers > 0 ? t('limit.holds', { users: r.holdsUsers }) : t('limit.none'));
  }
  lines.push(t(`verdict.${r.verdict}`));
  lines.push('');
  lines.push(t('weight.title'));
  if (weight.ok) {
    lines.push(
      t('weight.line', {
        kb: (weight.bytes / 1024).toFixed(1),
        enc: weight.encoding,
        https: weight.https ? 'yes' : 'no',
        cache: weight.cache,
      }),
    );
    lines.push(t('weight.est', { s3g: weight.s3g, s4g: weight.s4g }));
  } else {
    lines.push(t('weight.fail', { msg: weight.msg }));
  }
  lines.push('');
  lines.push(t('disclaimer'));
  return lines.join('\n');
}