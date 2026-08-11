---
id: IDEA-2
title: Tier 2 — form controls and overlays
type: feat
status: done
created: 2026-08-04
updated: 2026-08-08
tags:
  - components
  - release
---

The medium-usage band from the paper-camp inventory: Input (8 files), Modal (6), ListItem (6), Divider (5), Alert (5), Textarea (4), Spinner (4), Select (4), plus singletons the forms need anyway (Checkbox, Switch, Progress, Skeleton).

API conventions from observed usage: Input/Textarea keep DOM-event `onChange` (native-like); Select takes an `options` array and value-based `onChange` (matching how all 7 call sites use it). Modal ships compound parts — `Modal.Body`, `Modal.Footer`, `Modal.Error` — because the identical body/footer/error-line scaffolding is copy-pasted across all six paper-camp modals today.

### Phases
- [x] Input + Textarea (label, helperText, error, sm/md)
- [x] Select (options array, controlled value, keyboard nav, hidden native select for forms)
- [x] Checkbox + Switch
- [x] Modal (open/onClose/title/size, focus trap, scroll lock, Escape) with Body/Footer/Error compound parts
- [x] ListItem (active, icon, trailing action slot)
- [x] Alert (semantic variants, dismissible) + Divider (orientation, label)
- [x] Spinner + Progress + Skeleton
