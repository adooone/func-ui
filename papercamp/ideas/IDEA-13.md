---
id: IDEA-13
title: Rounded pill variants across the form and surface components
type: feat
status: in-progress
created: 2026-10-10
tags:
  - components
  - retro
  - radio
  - release
---

The radio admin migrated from mojo-ui ([[IDEA-12]]) and its retro design
language rounds nearly every control into pills, but outside the lamp family
func-ui is deliberately square (`$radius-md: 0px`, the film aesthetic).
LampButton already carries the escape hatch — `rounded?: 'full' | 'half'`,
where `full` is the stadium pill and `half` the softer half-way radius. This
idea extends that same prop, name and semantics intact, to the other
interactive and surface components the admin uses: Input, Textarea, Select,
Checkbox, Modal, Chip, Stamp, the Menu trigger, and SegmentedControl.

The one deliberate difference from LampButton: there the default is `full`
(the lit look was born rounded); here the prop stays **unset by default**, so
every existing consumer keeps today's hard edges. The radii land as shared
tokens in `_tokens.scss` next to `$radius-md`, with LampButton's hard-coded
half values re-pointed at them so the two families cannot drift.

The radio repo's IDEA-9 phase 3 depends on this shipping in a release
(release-please cuts it from the `feat:` commits once this merges).

### Phases
- [x] Phase 1 — Rounding tokens and the shared Rounded type
      `$radius-full / -full-surface / -half / -half-sm / -half-xs` in
      `_tokens.scss`, a `Rounded` type in `src/types/rounded.ts` exported
      from the barrel, and LampButton's inline union and hard-coded 8px/12px
      half radii re-pointed at the shared type and tokens — no visual change.
- [ ] Phase 2 — Form controls: Input, Textarea, Select, Checkbox
      `rounded` prop wired through each tsx and CSS module. Input/Select
      trigger go true pill on `full`; Textarea caps `full` at the surface
      radius; the Checkbox box goes circle on `full` and `$radius-half-xs`
      on `half`; Select's popup list rounds to the half radius in both
      variants.
- [ ] Phase 3 — Surfaces and pickers: Modal, Chip, Stamp, Menu, SegmentedControl
      Modal panel caps `full` at the surface radius and rounds its glass
      `::before` with it; Chip and Stamp go pill/half; Menu rounds the
      trigger (and its popup list to the half radius); SegmentedControl
      rounds the fieldset and clips its segments.
- [ ] Phase 4 — Showcase entries and README note
      A `rounded` control (square | half | full) on the Input cluster,
      Modal, Chip, Stamp, Menu and SegmentedControl entries, mapping
      `square` to unset; one README line documenting the opt-in.

### Thread
- [x] 2026-10-10 [decision] [agent] The prop is optional with no default: unset keeps today's hard edges so existing consumers don't shift. Only LampButton keeps its `full` default.
- [x] 2026-10-10 [decision] [agent] Multi-line and large surfaces (Textarea, Modal) cap `full` at `$radius-full-surface: 24px` (the lamp family's XL radius) — a true stadium collapses on a tall box.
- [x] 2026-10-10 [decision] [agent] Tabs is skipped: the tablist is an underline strip with no fill or border, so a radius has nothing to paint. Skipped rather than shipping a no-op prop.
- [x] 2026-10-10 [decision] [agent] Select and Menu round their popup lists to the half radius in both variants — a pill popup would swallow its options; SegmentedControl uses `overflow: hidden` so the active segment's fill follows the group's corners.
