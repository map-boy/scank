# PROGRESS - scank (scalability testing CLI)
Updated: 2026-11-14

## 1. Product
- [x] quick / target / limit modes (code written)
- [x] PASS / WARNING / FAIL verdict with thresholds
- [x] Ownership guard and user cap
- [x] Page weight and 3G/4G estimate
- [x] Console report with graph; JSON and Markdown files in reports/
- [x] Run against demo server and confirm FAIL appears under load
- [ ] Run against a real remote site (own)
- [ ] Kinyarwanda output (rw.json) after native review
- [ ] Web page wrapper
- [ ] Cloud runners for large tests

## 2. Quality
- [x] Unit tests written (verdict, plan, guard)
- [x] npm run typecheck passes
- [x] npm test passes (13 tests)
- [x] CI workflow file created
- [x] CI green on GitHub

## 3. Docs
- [x] README with unticked launch checklist
- [x] PRD, design, roadmap, 3 ADRs
- [x] IEEE and APA papers (no results yet)
- [ ] Fill evaluation results after tests on real projects
- [ ] Responsible-use / legal text

## 4. Repo
- [x] LICENSE, CHANGELOG, CONTRIBUTING, SECURITY, CITATION.cff, CODEOWNERS, dependabot
- [x] Create GitHub repo and push (map-boy/scank)
## 5. Landing page
- [x] Static landing page in site/ (no build step)
- [x] Vercel project linked to GitHub, production deploy live
- [ ] Custom domain
- [ ] Live in-browser test runner (needs ownership verification first: a public load tool is an abuse risk)