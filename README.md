# scank

Can my website hold N users? scank ramps simulated users against a URL and answers PASS, WARNING, or FAIL, with a graph, the step where it started to fail, and a low-data page weight check.

Status: MVP v0.1 (CLI). Done / not done: [progress.md](progress.md). Docs: [docs/README.md](docs/README.md).

## Responsible use
Only test sites you own or have written permission to test. Remote URLs need `--confirm-owner`.

## Install
```
npm install
```

## Use
```
npm run scank -- quick  http://localhost:8080
npm run scank -- target http://localhost:8080 --users 1000
npm run scank -- limit  http://localhost:8080 --max 2000
npm run scank -- quick  https://my-site.example --confirm-owner
```
Options: `-d, --duration <sec>` per step (default 15), `--no-report`.
Exit codes: 0 PASS, 1 WARNING, 2 FAIL, 3 could not run.

## Try it on your own computer
```
$env:BUSY_MS=20; npm run demo-server
npm run scank -- target http://localhost:8080 --users 200
```

## Verdict rules
PASS: errors < 1% and p97.5 < 2 s. FAIL: errors > 5% or p97.5 > 5 s. WARNING: between. Stops early on FAIL.

## Limits
One computer is not real traffic: PASS means "likely holds". Large tests need a cloud runner (planned). Page weight covers the HTML document only.

## Structure
```
src/      cli, core (plan, verdict), guard, runner, checks, report, i18n
tests/    unit tests
scripts/  demo-server
docs/     prd, design, roadmap, adr, legal, papers
site/     static landing page (Vercel)
reports/  generated (gitignored)
```

## MVP launch checklist
- [ ] Typecheck and tests pass
- [ ] Tested against a real remote site you own
- [ ] Tested on 3+ real projects from other developers
- [ ] Public GitHub repo with LICENSE and CI green
- [ ] Responsible-use text reviewed
- [ ] Kinyarwanda output reviewed by a native speaker
- [ ] Feedback form or contact email
- [ ] Success metrics reviewed after 7 days