import { Command } from 'commander';
import { rampSteps, limitSteps } from './core/plan.js';
import { judgeStep, overall, holdsAbout } from './core/verdict.js';
import { checkOwnership, capUsers, MAX_LOCAL_USERS } from './guard/ownership.js';
import { runStep } from './runner/autocannon.js';
import { checkPageWeight } from './checks/page-weight.js';
import { renderConsole } from './report/console.js';
import { writeReports } from './report/files.js';
import { t } from './i18n/index.js';
import type { Mode, RunResult, StepOutcome } from './core/types.js';

interface Opts {
  confirmOwner?: boolean;
  duration: string;
  report: boolean;
}

async function execute(mode: Mode, url: string, rawSteps: number[], opts: Opts): Promise<number> {
  console.log(t('banner'));
  const own = checkOwnership(url, Boolean(opts.confirmOwner));
  if (!own.ok) {
    console.error(t(own.reasonKey ?? 'guard.invalid'));
    return 3;
  }
  const sec = Math.max(5, Number(opts.duration) || 15);
  const steps = [...new Set(rawSteps.map((u) => capUsers(u)))];
  if (rawSteps.some((u) => u > MAX_LOCAL_USERS)) console.log(t('capped', { max: MAX_LOCAL_USERS }));
  const top = steps[steps.length - 1] ?? 1;
  if (top > 1000) console.log(t('warn.localLimit', { users: top }));

  const outcomes: StepOutcome[] = [];
  let stoppedEarly = false;
  const startedAt = new Date().toISOString();

  for (let i = 0; i < steps.length; i++) {
    const users = steps[i] as number;
    console.log(t('step.line', { i: i + 1, n: steps.length, users, sec }));
    try {
      const r = await runStep(url, users, sec);
      const verdict = judgeStep(r);
      outcomes.push({ ...r, verdict });
      console.log(
        t('step.result', {
          p50: Math.round(r.p50Ms),
          p975: Math.round(r.p975Ms),
          err: (r.errorRate * 100).toFixed(1),
          rps: r.rps,
          verdict,
        }),
      );
      if (verdict === 'FAIL') {
        stoppedEarly = i < steps.length - 1;
        if (stoppedEarly) console.log(t('stop.fail', { users }));
        break;
      }
    } catch (e) {
      console.error(t('run.error', { msg: e instanceof Error ? e.message : String(e) }));
      return 3;
    }
  }

  const weight = await checkPageWeight(url);
  const result: RunResult = {
    mode,
    url,
    startedAt,
    steps: outcomes,
    verdict: overall(outcomes),
    holdsUsers: holdsAbout(outcomes),
    stoppedEarly,
  };
  console.log(renderConsole(result, weight));
  if (opts.report) console.log(t('report.saved', { path: writeReports(result, weight) }));
  return result.verdict === 'PASS' ? 0 : result.verdict === 'WARNING' ? 1 : 2;
}

const program = new Command();
program.name('scank').description('Can my website hold N users? PASS / WARNING / FAIL.');

const common = (c: Command) =>
  c
    .option('--confirm-owner', 'confirm you own the site or have written permission')
    .option('-d, --duration <sec>', 'seconds per step', '15')
    .option('--no-report', 'do not write files to reports/');

common(program.command('quick <url>').description('about 1 minute: 1, 10, 25, 50 users')).action(
  async (url: string, o: Opts) => {
    process.exitCode = await execute('quick', url, [1, 10, 25, 50], o);
  },
);

common(
  program
    .command('target <url>')
    .description('ramp to an exact number of users')
    .requiredOption('-u, --users <n>', 'target number of users'),
).action(async (url: string, o: Opts & { users: string }) => {
  process.exitCode = await execute('target', url, rampSteps(Number(o.users)), o);
});

common(
  program
    .command('limit <url>')
    .description('keep doubling users until the site breaks')
    .option('--max <n>', 'highest number of users to try', '2000'),
).action(async (url: string, o: Opts & { max: string }) => {
  process.exitCode = await execute('limit', url, limitSteps(Number(o.max)), o);
});

await program.parseAsync(process.argv);