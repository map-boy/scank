# scank: A Command-Line Tool for Checking Whether a Website Can Hold N Users

Mugisha Alain Paisible

## Abstract
Many developers do not test how many users their site can serve. scank is a command-line tool that ramps simulated users against a URL and returns PASS, WARNING, or FAIL. No evaluation results exist yet.

## Introduction
Sites often fail when traffic grows because load was never tested. scank offers a simple, free check with a plain-language verdict.

## Method
The tool wraps the autocannon load generator (Collina, n.d.). Steps ramp from one user to the target, and each step is judged on error rate and 97.5th percentile latency.

## Results
Not yet evaluated.

## Discussion and Limitations
One computer cannot reproduce real traffic, so a pass means the site likely holds, not that it will. Bandwidth is not throttled; slow-network time is estimated from page size.

## References
Collina, M. (n.d.). *autocannon* [Computer software]. GitHub. https://github.com/mcollina/autocannon