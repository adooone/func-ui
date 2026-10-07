---
id: IDEA-7
title: Radio-parity components
type: feat
status: planned
created: 2026-08-04
tags:
  - components
  - release
  - radio
---

Components the radio apps use from mojo-ui that IDEA-1..3 don't cover. A player app leans on Slider (volume/seek) and CircularProgress (playback/loading); the admin app on DataTable. Menu already shipped in [[IDEA-3]] with trigger, items and align; it still needs separators to cover mojo-ui's Popup/PopupItem use cases.

### Phases
- [ ] Slider (controlled value, min/max/step, keyboard, vertical option for volume)
- [ ] CircularProgress (determinate + indeterminate)
- [ ] Radio + RadioGroup
- [ ] Tabs (ARIA tablist, controlled/uncontrolled)
- [ ] Menu separators to complete the Popup/PopupItem patterns (trigger, items, align already shipped)
- [ ] DataTable (columns, cell renderers; scope after auditing radio admin usage)
- [ ] Audit radio apps' actual mojo-ui prop usage before finalizing each API
