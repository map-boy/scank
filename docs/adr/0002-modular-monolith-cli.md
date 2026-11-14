# ADR 0002: Start as one CLI (modular monolith)
Status: accepted
Context: Solo developer, MVP, no need for services.
Decision: One TypeScript CLI with separated modules. Add a web page only after the CLI is proven.
Consequence: Simple to ship and test. Split later if usage needs it.