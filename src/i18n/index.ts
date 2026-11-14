import { readFileSync } from 'node:fs';

const dict: Record<string, string> = JSON.parse(
  readFileSync(new URL('./en.json', import.meta.url), 'utf8'),
);

export function t(key: string, vars: Record<string, string | number> = {}): string {
  const s = dict[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_m, k: string) => String(vars[k] ?? `{${k}}`));
}