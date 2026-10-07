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
- [x] Slider (controlled value, min/max/step, keyboard, vertical option for volume)
      run: 3m50s · 52 in · 13.2k out · opus-5 · sess:a8fcfb3e-0292-4e70-a302-8f34850859d0
- [x] CircularProgress (determinate + indeterminate)
      run: 1m57s · 20 in · 6.6k out · opus-5 · sess:a8fcfb3e-0292-4e70-a302-8f34850859d0
- [x] Radio + RadioGroup
      run: 1m38s · 20 in · 6.7k out · opus-5 · sess:a8fcfb3e-0292-4e70-a302-8f34850859d0
- [x] Tabs (ARIA tablist, controlled/uncontrolled)
      run: 2m14s · 22 in · 7.9k out · opus-5 · sess:a8fcfb3e-0292-4e70-a302-8f34850859d0
- [ ] Menu separators to complete the Popup/PopupItem patterns (trigger, items, align already shipped)
- [ ] DataTable (columns, cell renderers; scope after auditing radio admin usage)
- [ ] Audit radio apps' actual mojo-ui prop usage before finalizing each API
