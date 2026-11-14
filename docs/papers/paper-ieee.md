# scank: A Command-Line Tool for Checking Whether a Website Can Hold N Users

Mugisha Alain Paisible, Kigali, Rwanda

## Abstract
Many developers do not test how many users their site can serve. scank is a command-line tool that ramps simulated users against a URL and returns PASS, WARNING, or FAIL. It also estimates page download time on slow networks. No evaluation results exist yet.

## I. Introduction
Sites often fail when traffic grows because load was never tested. The goal is a simple, free tool with a plain-language verdict.

## II. System Design
A modular CLI wraps the autocannon load generator [1]. Steps ramp from 1 user to the target. Each step is judged on error rate and 97.5th percentile latency. The run stops early on FAIL. A page-weight check estimates download time on 3G and 4G.

## III. Implementation
TypeScript on Node. Pure core logic with unit tests; ownership guard; reports in JSON and Markdown.

## IV. Results and Evaluation
Not yet evaluated. Planned: run on 10+ real projects and compare verdicts with later production behaviour.

## V. Conclusion and Future Work
Next: Kinyarwanda output, web page, cloud runners for large tests.

## References
[1] M. Collina, "autocannon," GitHub repository. [Online]. Available: https://github.com/mcollina/autocannon