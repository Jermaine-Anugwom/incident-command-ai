# Incident Command AI — Surface Brief

## Approved direction

- Mode: Operate
- Visual world: Fireground Command Board
- Approved composition: Command Sectors
- Reference: `.impeccable/mocks/composition/command-sectors.webp`
- Concept seed: `840ba312`

The large command clock is the dominant recognition point. A compact command tower anchors three horizontal operational sectors—Signals, Impact, and Recovery—that move evidence toward one guarded action gate. The interface must feel like a laminated incident-command board under pressure: explicit ownership, visible uncertainty, physical accountability tags, and one protected place where approved execution occurs.

## Owner workflow

1. Read elapsed incident time, severity, service, and evidence lock state in seconds.
2. Inspect observations and distinguish them from inferences.
3. Trace evidence through Signals, Impact, and Recovery.
4. Open the proposed action, inspect exact ServiceNow changes, and verify rollback conditions.
5. Approve or reject the plan.
6. Follow the immutable execution trace and recovery outcome.

## Visual inventory

| Element | Approved treatment |
|---|---|
| Canvas | Warm command-sheet white `#F9F8F5` |
| Ink | Near-black `#090808` |
| Divider / paper edge | Kraft tan `#DED2B6` |
| Incident / danger | Signal red `#C52203` |
| Timing / caution | Command amber `#F3B512` |
| Secondary measurement | Steel blue `#5F7198` |
| Display type | Condensed, authoritative, uppercase only where the board itself labels a sector |
| Body type | Highly legible sans; sentence case for explanations and operator actions |
| Components | Ruled sectors, accountable tags, evidence stamps, one approval gate, analog clock, audit strip |
| Depth | Physical layering from clipped tags and soft board shadows; no decorative glass or generic card grid |
| Motion | The command clock advances; newly admitted evidence moves once into its sector; reduced motion replaces movement with an immediate state change |

## Responsive behavior

- Desktop preserves the full command tower and the left-to-right evidence path.
- Tablet keeps the clock visible while sectors become a two-column command sheet.
- Mobile makes the clock and incident identity sticky, stacks sectors in operational order, and keeps the guarded action gate after the evidence chain.
- Nothing consequential is hidden behind hover, color alone, or an unlabeled icon.

## Truth and safety

- Every record is labeled `SYNTHETIC DEMONSTRATION`.
- Observations and inferences remain visually and semantically distinct.
- No employer, customer, ServiceNow interface, or proprietary branding is imitated.
- No action is represented as executed without a valid approval and trace.
- Missing, stale, contradictory, or injection-tainted evidence forces abstention or manual review.
