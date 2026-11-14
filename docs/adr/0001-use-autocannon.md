# ADR 0001: Use autocannon as the load engine
Status: accepted
Context: We need a reliable HTTP load generator that runs on Windows with Node and has a programmatic API.
Decision: Use autocannon and wrap it. k6 and Locust stay options for later.
Consequence: No bandwidth throttling, so the 3G angle is an estimate from page size.