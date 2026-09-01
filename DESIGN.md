---
name: Incident Command AI
description: An evidence-bound incident command board for accountable AI-assisted operations.
colors:
  command-paper: "#f9f8f5"
  sector-paper: "#eee8db"
  command-ink: "#090808"
  muted-ink: "#55534d"
  rule-kraft: "#c9bfa8"
  evidence-kraft: "#ded2b6"
  guard-red: "#c52203"
  incident-orange: "#f04a13"
  command-amber: "#f3b512"
  evidence-green: "#1e6b45"
  focus-blue: "#1268bd"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(1.85rem, 2vw, 2.25rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 900
    lineHeight: 1
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.42
  label:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.07em"
rounded:
  square: "0"
  evidence: "6px"
  clock: "50%"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
components:
  button-approve:
    backgroundColor: "{colors.command-amber}"
    textColor: "{colors.command-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.55rem 0.75rem"
  button-reject:
    backgroundColor: "#ffffff"
    textColor: "#791500"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.55rem 0.75rem"
  evidence-card:
    backgroundColor: "#ffffff"
    textColor: "{colors.command-ink}"
    rounded: "{rounded.evidence}"
    padding: "0"
  status-chip:
    backgroundColor: "{colors.evidence-kraft}"
    textColor: "{colors.command-ink}"
    rounded: "{rounded.square}"
    padding: "0.12rem 0.3rem"
---

# Design System: Incident Command AI

## Overview

**Creative North Star: "The Fireground Command Board"**

Incident Command AI should feel like a physical command sheet enlarged into a live operational surface: warm paper, dark rules, a numbered clock, evidence moving through named sectors, and one unmistakable guarded action boundary. It is an Operate interface, optimized for rapid status recognition, contradiction handling, and accountable decisions rather than decoration.

The system refuses the generic analytics dashboard and the autonomous-chatbot silhouette. Observations, inferences, proposed actions, approvals, and writes must remain visually distinct. Density is welcome when hierarchy stays legible and every mark helps an operator answer what happened, what is affected, what is proposed, and who authorized it.

**Key Characteristics:**

- Command-sheet materiality with near-black rules and warm paper surfaces.
- Condensed incident typography paired with calm, readable operational text.
- A large 24-hour command clock as the primary temporal anchor.
- Signals, Impact, and Recovery as an explicit left-to-right evidence progression.
- Red reserved for severity, contradictions, and the protected execution boundary.
- Synthetic provenance, evidence IDs, actors, and trace states remain visible.

## Colors

The palette combines warm paper neutrals with emergency-service signal colors; accent color is semantic and scarce.

### Primary

- **Guard Red:** protects the execution boundary and marks severity or contradictory evidence.
- **Command Amber:** identifies the synthetic banner, approved decision control, timestamps, and clock progress.

### Secondary

- **Incident Orange:** carries live elapsed time and the pulse-line identity mark.
- **Evidence Green:** marks verified observations, healthy evidence locks, and authorized trace states.

### Neutral

- **Command Paper:** the primary reading and working surface.
- **Sector Paper:** distinguishes command sectors and the surrounding ground.
- **Command Ink:** headings, rules, navigation, and immutable audit surfaces.
- **Muted Ink and Rule Kraft:** supporting metadata, dividers, and evidence structure.

**The Signal Discipline Rule.** Red, amber, orange, and green communicate operational state; never use them as arbitrary decoration.

**The Paper-and-Ink Rule.** New surfaces begin with paper, ink, and rules. Add a signal color only when the operator gains meaning from it.

## Typography

**Display Font:** Barlow Condensed (with sans-serif fallback)
**Body Font:** IBM Plex Sans (with sans-serif fallback)

**Character:** Barlow Condensed provides the compressed authority of incident placards and command boards. IBM Plex Sans keeps evidence, metadata, and explanations calm at high density.

### Hierarchy

- **Display** (900, responsive condensed scale, 0.9 line-height): sector names, incident identity, and primary time values.
- **Title** (900, 1.45rem, 1 line-height): action-gate and panel titles.
- **Body** (400, 1rem, 1.42 line-height): explanatory content and operator guidance.
- **Label** (800, 0.68rem, 0.07em tracking, uppercase where structural): state, provenance, and navigation labels.

**The Compressed Authority Rule.** Condensed display type names operational objects; it does not carry paragraphs or nuanced evidence.

**The Tabular Time Rule.** Every timer and timestamp uses tabular numerals so the interface does not shift as time advances.

## Layout

Desktop uses a command tower at the left, three ruled evidence sectors in the center, and a full-height guarded action gate at the right. The approved reference viewport is 1672 by 941 pixels, within a 1920-pixel maximum canvas. Signals, Impact, and Recovery share one evidence grammar while allowing their content depth to differ.

Below 820 pixels, the command tower becomes a compact sticky identity band and every sector becomes a vertical section. Evidence records remain horizontally inspectable rather than shrinking into illegibility. The approval controls stack before the action gate, followed by assigned units and the immutable audit trace. Interactive targets remain at least 44 pixels high.

**The Protected Edge Rule.** The action gate owns the terminal edge of the decision flow; no unrelated module may compete with or sit beyond it on desktop.

## Elevation & Depth

The system is flat by default. Structure comes from paper tone, hard rules, dotted provenance dividers, and bordered zones. Low ambient shadows appear only beneath the overall command board, the physical clock, evidence cards, and the sticky mobile command tower.

### Shadow Vocabulary

- **Board shadow** (`0 16px 48px rgb(9 8 8 / 0.14)`): separates the complete operational surface from its dark ground.
- **Evidence rest** (`0 4px 10px rgb(9 8 8 / 0.07)`): gives evidence records a paper-slip quality.
- **Evidence active** (`0 8px 16px rgb(9 8 8 / 0.12)`): accompanies hover and selected states, never static decoration.

**The Flat-Until-Active Rule.** Depth is structural or state-driven; avoid floating ornamental panels.

## Shapes

The dominant form language is square and ruled. Buttons, fields, strips, and command regions use zero radius. Evidence cards alone use a restrained 6-pixel radius to read as discrete captured records. The clock is the only full circle and the guard boundary is a red dashed rectangle. Dotted and dashed treatments identify provenance and inference rather than decoration.

## Components

### Buttons

- **Shape:** square and decisive (0 radius), with a minimum 44-pixel target.
- **Primary:** command amber with command ink; reserved for approving the exact bounded action.
- **Secondary:** white with deep red text for rejection.
- **Focus:** a 3-pixel focus-blue outline offset by 3 pixels.
- **Disabled:** remains visible at reduced opacity and states why execution is unavailable.

### Chips

- **Style:** compact uppercase labels on kraft or ink surfaces.
- **State:** `SYNTHETIC`, observation, inference, caution, and alert labels must preserve their semantic wording.

### Cards / Containers

- **Corner Style:** evidence records use 6-pixel corners; operational containers remain square.
- **Background:** white evidence slips over command paper.
- **Shadow Strategy:** low at rest and stronger only on hover or selection.
- **Border:** green for observation, dashed neutral for inference, red for alert, and amber for caution.

### Inputs / Fields

- **Style:** white fill, 1-pixel ink border, square corners, and at least 44 pixels high.
- **Focus:** the system focus-blue outline; color alone never communicates focus.
- **Disabled:** opacity supports the explicit blocked-state copy rather than replacing it.

### Navigation

The near-black command header carries identity, live incident time, evidence status, approval status, severity, and incident ID. It prioritizes recognition over destination lists. Mobile retains identity, time, and severity before the synthetic-data banner.

### Command Clock

The 24-hour analog face and digital elapsed timer are a single temporal instrument. The amber arc indicates elapsed incident progress; black and orange hands, numbered markers, local time, and command-opened time must remain mutually legible.

### Action Gate

The action gate is the signature protected surface. A full red dashed boundary contains the proposed write, target, risk, rollback window, recovery check, authorization state, and disabled public-demo control. Synthetic authorization may produce an audit trace, but the public companion never enables a ServiceNow write.

## Do's and Don'ts

### Do:

- **Do** preserve the Signals → Impact → Recovery → Action Gate progression.
- **Do** label every demonstration record as synthetic and retain its evidence ID and kind.
- **Do** keep observations, inferences, approvals, and execution states visually distinct.
- **Do** expose actor, timestamp, evidence ID, and trace state in immutable audit rows.
- **Do** preserve keyboard focus, minimum target size, contrast, and reduced-motion behavior.

### Don't:

- **Don't** imitate ServiceNow's proprietary interface or use its logo.
- **Don't** turn the product into a generic rounded-card dashboard or chat transcript.
- **Don't** use red, amber, orange, or green without operational meaning.
- **Don't** imply that a recommendation executed; the public demonstration records authorization but keeps the write disabled.
- **Don't** hide contradiction, abstention, provenance, or incomplete evidence to make the board look cleaner.
