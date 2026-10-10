---
id: IDEA-13
title: Menu asChild trigger support
type: feat
status: in-progress
created: 2026-10-10
updated: 2026-10-10
tags:
  - components
  - a11y
  - radio
  - release
order: 1
---

Menu always wraps its `trigger` ReactNode in its own `<button>`. That is
right for plain content (a label, an icon row), but a consumer who passes an
interactive element gets invalid nested `<button>` markup and a double tab
stop — the radio admin does exactly this, passing `LampButton` as the
trigger in three places, and currently papers over it with `tabIndex={-1}`
on the inner button (radio commit 6286a22).

Add an explicit `asChild` prop, Radix-style: when set, Menu clones the
single element trigger instead of wrapping it, attaching its ref (merged
with the element's own), the trigger `id`, `aria-haspopup` /
`aria-expanded` / `aria-controls` / `aria-label`, and the open/close
click and keyboard handlers (composed after the element's own handlers,
skipped when the element's handler calls `preventDefault`). The element
must render something focusable that accepts button-like props and
forwards its ref — `LampButton` already does both. The default wrapping
path is untouched, so every existing consumer keeps its markup.

The wrapper `<div>` stays in both paths — it anchors the popup's absolute
positioning and scopes the outside-pointerdown close. `styles.trigger` is
not applied to a cloned trigger; the element brings its own look.

After this ships, the radio admin drops the `tabIndex={-1}` workaround in
`album-list-header.tsx`, `compact-album-list-header.tsx` and
`widget-edit-sidebar.tsx` (tracked on the radio side).

### Phases
- [x] Phase 1 — asChild trigger support in Menu
      Add `asChild` to `MenuProps`; when set and the trigger is a single
      valid element, clone it with the merged ref, ARIA wiring and
      composed handlers instead of rendering the wrapper button. Broaden
      the trigger ref/keydown types from `HTMLButtonElement` to
      `HTMLElement` so non-button hosts focus correctly on close. Falls
      back to the wrapping path when the trigger is not a single element.
- [ ] Phase 2 — DOM test harness and Menu trigger coverage
      First test suite in the repo: jsdom environment plus
      @testing-library/react as devDependencies, `environment: 'jsdom'`
      and `globals: true` in vitest.config.ts. menu.test.tsx covers the
      default wrapping path, the nested-button case (an element trigger
      under `asChild` is cloned, not wrapped — exactly one button in the
      tree, carrying the ARIA wiring), handler composition, keyboard
      open, focus return via the attached ref, and a LampButton trigger
      mirroring the radio admin's usage.
- [ ] Phase 3 — Showcase demo and README row
      A second Menu beside the existing showcase entry using
      `asChild` with a LampButton trigger, and the README's Menu row
      mentions the asChild escape hatch.

### Thread
- [x] 2026-10-10 [decision] [agent] Explicit `asChild` prop rather than auto-detecting interactive trigger elements — detection would silently change markup for existing consumers whose trigger happens to be an element, and the explicit Radix-style opt-in is the convention consumers already know.
