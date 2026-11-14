export const MAX_LOCAL_USERS = 5000;

export function isLocalOrPrivate(host: string): boolean {
  const h = host.toLowerCase().replace(/^\[|\]$/g, '');
  if (h === 'localhost' || h === '::1' || h.endsWith('.local')) return true;
  const m = h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return false;
  const a = Number(m[1]);
  const b = Number(m[2]);
  return a === 127 || a === 10 || (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31);
}

export interface GuardResult {
  ok: boolean;
  reasonKey?: 'guard.invalid' | 'guard.notOwner';
}

export function checkOwnership(url: string, confirmed: boolean): GuardResult {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return { ok: false, reasonKey: 'guard.invalid' };
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    return { ok: false, reasonKey: 'guard.invalid' };
  }
  if (isLocalOrPrivate(u.hostname)) return { ok: true };
  return confirmed ? { ok: true } : { ok: false, reasonKey: 'guard.notOwner' };
}

export function capUsers(n: number, max: number = MAX_LOCAL_USERS): number {
  return Math.min(Math.max(1, Math.floor(n)), max);
}