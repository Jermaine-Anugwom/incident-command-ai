# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js and TypeScript companion interface, Python 3.12 and FastAPI integration service, a scoped ServiceNow application in a Personal Developer Instance, Docker Compose, pytest, ServiceNow ATF, and Playwright. The public demonstration must run without ServiceNow or a model credential.

## Users

- Primary operator: an enterprise major-incident commander coordinating a high-severity outage while evidence is incomplete and time is expensive.
- Supporting operators: service owners, change managers, and technical responders who need a shared, auditable plan.
- Public audience: ServiceNow and broader Forward-Deployed AI recruiters evaluating Jermaine Anugwom's product judgment, engineering depth, security discipline, and customer-handoff thinking.

## Product Purpose

Incident Command AI turns fragmented ServiceNow incidents, recent changes, configuration relationships, and operator notes into an evidence-linked response plan. It separates observation from inference, exposes uncertainty, requires approval before privileged writes, records every attempted action, and measures whether the workflow improved synthetic incident response.

Success means a recruiter can understand the operating problem and inspect a working end-to-end solution within two minutes, while an engineer can clone the repository and reproduce its core behavior without credentials.

## Positioning

The product is an approval-controlled evidence system for major-incident command, not a chat interface. Every recommendation points back to exact source records, and every write crosses a visible authorization boundary with replay protection and a rollback path.

## Operating Context

The system operates around ServiceNow incident, change, CMDB, and task records; an incident bridge; a response plan; role-based approvals; remediation tasks; rollback; an execution trace; and post-incident operational metrics. A ServiceNow PDI proves the native integration, while the public companion runs on synthetic fixtures because PDIs hibernate and are not production hosting.

## Capabilities and Constraints

- Synthetic data only; every record that could be mistaken for a real enterprise record is labeled `SYNTHETIC`.
- Deterministic offline reasoning is the default. Ollama and a generic model endpoint are optional adapters.
- All external text is untrusted data. Model prompts never receive credentials or unredacted private records.
- Missing, stale, contradictory, unauthorized, or injection-bearing input causes abstention, quarantine, or manual review.
- Privileged actions require an exact approved plan, authorized role, matching fingerprint, and unused idempotency key.
- ServiceNow AI Agent Studio is optional and capability-detected; its absence cannot break the core workflow.
- The public GitHub Pages experience is read-only. The PDI is development and demonstration only.
- No ServiceNow logo, copied proprietary interface, implied endorsement, customer data, private resume facts, or unverifiable outcome claim may ship.

## Brand Commitments

- Product name: Incident Command AI.
- Repository name: `incident-command-ai`.
- Voice: precise, calm under pressure, evidence-forward, and candid about uncertainty.
- The interface must be its own operational visual world rather than an imitation of ServiceNow.

## Evidence on Hand

- The approved implementation plan in the originating task.
- Public ServiceNow documentation for PDIs, scoped-app source control, Scripted REST APIs, ATF, and AI-agent security.
- ServiceNow's current Applied AI Forward Deployed Engineering role description.
- Synthetic incident, change, service, and response fixtures authored for this repository.
- No real customer records, production performance data, testimonials, or ServiceNow endorsement exist; none may be fabricated.

## Product Principles

1. Evidence before confidence.
2. Recommend broadly; execute narrowly.
3. Make uncertainty and operator authority visible.
4. Survive missing systems and model outages.
5. Leave behind reusable patterns, tests, runbooks, and an operable handoff.

## Accessibility & Inclusion

Meet WCAG 2.2 AA for contrast and keyboard operation. Status may never depend on color alone. Support reduced motion, 200% zoom, mobile widths, and direct language suitable for responders under stress.
