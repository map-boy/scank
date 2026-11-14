declare module 'autocannon' {
  interface Options {
    url: string;
    connections?: number;
    duration?: number;
    timeout?: number;
    pipelining?: number;
  }
  interface Result {
    errors: number;
    timeouts: number;
    non2xx: number;
    '4xx': number;
    '5xx': number;
    duration: number;
    requests: { total: number; average: number };
    latency: { average: number; p50: number; p97_5: number; p99: number };
  }
  function autocannon(opts: Options): Promise<Result>;
  export default autocannon;
}