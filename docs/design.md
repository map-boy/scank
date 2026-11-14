# Design

Modular monolith, one CLI.

```
cli.ts -> guard (ownership) -> plan (steps) -> runner (autocannon) -> verdict -> report (console + files)
                                         \-> checks/page-weight
```

- core/ is pure and unit tested (no network, no files).
- runner/ is the only code that sends load.
- i18n/ holds all user-facing text so Kinyarwanda can be added as rw.json after native review.
- Reports go to reports/ (gitignored): JSON for machines, Markdown for people.

Scaling path: v0.1 one machine (cap 5000 users) -> v0.2 web page that wraps the CLI -> v0.3 cloud runners for large tests.