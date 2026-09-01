# Shipping Asset Manifest

## Scope

Approved reference: `.impeccable/mocks/composition/command-sectors.webp`

The approved composition is a design reference only. It must not be copied, cropped, embedded, or shipped by the companion application. The selected Command Sectors world is made entirely from precise, interactive interface geometry and therefore requires no production raster assets.

## Produce

None.

## Direct

None.

## Semantic

| id | implementation | notes | qa_status |
|---|---|---|---|
| `product-mark` | Original inline SVG shield and incident-pulse geometry beside a semantic product heading. | Keep flat, single-weight, and original; no ServiceNow mark, logo, or visual imitation. | accepted |
| `command-clock` | Semantic `<time>` plus an inline SVG face with countable tick marks and hands; CSS owns sizing and hand rotation, while a textual elapsed-time label remains available to assistive technology. | Preserve the clock as the dominant recognition point. Scale fluidly; on mobile it remains visible in the sticky incident header. | accepted |
| `status-header` | Semantic header, status text, and CSS-drawn flat hazard stripe using repeating geometric color bands. | Status must never depend on color alone. No rasterized labels, lock icons, severity text, or timer. | accepted |
| `incident-tower` | HTML definition lists, ordered objectives, and metric rows with CSS rules and compact inline SVG status symbols. | Preserve the narrow command-tower hierarchy and clear operator ownership. | accepted |
| `sector-board` | Three semantic `<section>` elements—Signals, Impact, Recovery—using responsive CSS Grid; evidence chains are ordered lists with authored SVG connectors. | Desktop reads left-to-right; tablet and mobile reflow without changing operational order. | accepted |
| `evidence-tags` | Interactive article/button components with CSS-owned borders, clipped-tag layering, badges, confidence state, and focus treatment. | Observations and inferences require text labels and distinct border grammar, not color alone. | accepted |
| `dependency-map` | Authored inline SVG with a finite set of service nodes and directed links, accompanied by an accessible relationship list. | SVG is required because the diagram must scale, remain crisp, and support highlighted evidence paths. | accepted |
| `action-gate` | Semantic `<aside>` containing exact proposed writes, approval state, rollback conditions, and real buttons; CSS owns the guarded red boundary and disabled treatment. | This is the single protected execution region. Controls and attestation text must remain semantic. | accepted |
| `units-and-audit` | Responsive assignment list and audit table with HTML timestamps, actors, evidence ids, and trace states. | Mobile uses labeled rows rather than a clipped desktop table. | accepted |
| `state-icons` | Small authored inline SVG primitives or an open-source icon library, always paired with visible labels or accessible names. | No icon is meaningful by shape or color alone. | accepted |
| `page-field` | Solid sampled command-sheet field, restrained borders, and CSS-owned spacing/shadow only. | Do not simulate paper grain, leather, metal, glass, or other material with gradients; the comp contains no image-native material that must ship. | accepted |

## Execution Order

1. Build the command clock and status header as the recognition system.
2. Build the command tower and three-sector evidence topology.
3. Add the dependency SVG and guarded action gate.
4. Add assignment and audit surfaces.
5. Verify desktop, tablet, mobile, keyboard, zoom, contrast, and reduced-motion behavior.

## Blockers

None. No raster production, transparency handling, crop extraction, or image prompt embedding is required.

## Assumptions

- The approved comp remains under `.impeccable/mocks/` as non-shipping design evidence.
- Screenshots created later for repository documentation are documentation captures, not interface assets, and must show synthetic data only.
- Any raster introduced by a later design change becomes a new production task and must carry prompt or source provenance before it may ship.
