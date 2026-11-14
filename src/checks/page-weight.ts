export type WeightResult =
  | { ok: true; bytes: number; encoding: string; https: boolean; cache: string; s3g: number; s4g: number }
  | { ok: false; msg: string };

const round1 = (n: number) => Math.round(n * 10) / 10;

// HTML document only (not images, scripts or API calls). Download time is an estimate.
export async function checkPageWeight(url: string): Promise<WeightResult> {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'accept-encoding': 'gzip, br' },
      signal: AbortSignal.timeout(15000),
    });
    const body = await res.arrayBuffer();
    const cl = Number(res.headers.get('content-length'));
    const bytes = Number.isFinite(cl) && cl > 0 ? cl : body.byteLength;
    return {
      ok: true,
      bytes,
      encoding: res.headers.get('content-encoding') ?? 'none',
      https: new URL(url).protocol === 'https:',
      cache: res.headers.get('cache-control') ?? 'none',
      s3g: round1((bytes * 8) / 1_600_000),
      s4g: round1((bytes * 8) / 10_000_000),
    };
  } catch (e) {
    return { ok: false, msg: e instanceof Error ? e.message : String(e) };
  }
}