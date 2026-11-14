import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { RunResult } from '../core/types.js';
import type { WeightResult } from '../checks/page-weight.js';
import { renderConsole } from './console.js';

export function writeReports(r: RunResult, weight: WeightResult, dir = 'reports'): string {
  mkdirSync(dir, { recursive: true });
  const stamp = r.startedAt.replace(/[:.]/g, '-');
  const base = join(dir, `${stamp}-${r.mode}`);
  writeFileSync(`${base}.json`, JSON.stringify({ ...r, weight }, null, 2), 'utf8');
  writeFileSync(`${base}.md`, '```\n' + renderConsole(r, weight) + '\n```\n', 'utf8');
  return `${base}.md`;
}