---
id: IDEA-4
title: Showcase entries for all components
type: docs
status: review
created: 2026-08-04
updated: 2026-08-10
tags:
  - showcase
  - release
order: 1
---

Every component shipped in IDEA-1..3 needs an entry in the showcase's Components section (src/showcase.tsx), following the existing Entry + Control pattern (live component + variant/size/state toggles). The showcase is the library's documentation surface — nothing ships undocumented.

### Phases
- [x] Tier 1 entries: IconButton, Stamp, Tooltip, Toast (+ extend Button entry with danger/icons/isActive)
- [x] Tier 2 entries: form controls, Modal, feedback components
- [x] Tier 3 entries: gap-fillers + icon-set grid

### Thread
- [x] 2026-08-10 [chat] test
- [x] 2026-08-10 [chat] [agent] Noted — nothing to change here, just say the word if you've got a real question or edit for the showcase entries.
