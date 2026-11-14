# PRD: scank

## Problem
Many developers in Rwanda never test whether their site can handle many users. They find out when it breaks.

## Users
Student and freelance developers, small teams, TVET and school projects.

## Modes
- quick: about 1 minute, 1 / 10 / 25 / 50 users
- target: ramp to N users (1, 10%, 25%, 50%, 100%)
- limit: double users from 10 until FAIL or max

## Verdict (per step)
- PASS: errors < 1% and p97.5 < 2000 ms
- FAIL: errors > 5% or p97.5 > 5000 ms
- WARNING: anything between
- Stop early on FAIL. Overall = worst step.

## Rules
- Only test sites you own or have written permission to test (remote URLs need --confirm-owner).
- One computer is not real traffic: a pass means "likely holds", not a guarantee.

## Non-goals (v0.1)
Cloud runners, login flows, bandwidth throttling, scoring code quality.

## Success metrics
1. A developer gets a verdict in under 2 minutes.
2. 10+ developers run it on a real project.
3. At least 3 report that it found a real problem.