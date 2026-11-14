# ADR 0003: Ownership guard before any load
Status: accepted
Context: Load testing a site you do not own can be illegal or harmful.
Decision: Local and private addresses run freely. Remote URLs require --confirm-owner. Users capped at 5000.
Consequence: Slightly more friction for remote tests; safer by default.