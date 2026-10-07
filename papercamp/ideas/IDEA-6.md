---
id: IDEA-6
title: Adopt func-ui in the radio project
type: feat
status: idea
created: 2026-08-04
tags:
  - migration
  - radio
---

func-ui's target consumer is the radio monorepo (~/dev/radio): three apps (admin, player, wave) with 38 imports of the workspace package `@dendelion/mojo-ui`. mojo-ui already ships a `glassmorphism` style set — the frosted/grain/glow aesthetic is a natural upgrade, not a re-skin.

mojo-ui's surface to cover: Button, IconButton, Card, Input, Select, Textarea, Checkbox, Switch, Radio, Slider, CircularProgress, Skeleton/SkeletonText, Panel, PageLayout, StatsGrid, Modal, Popup/PopupItem, Tooltip, DataTable, plus navigation components and shared style constants. Most map onto IDEA-1..3; the radio-specific remainder is scoped in [[IDEA-7]].

Open decisions for migration time: whether func-ui ships PageLayout/StatsGrid equivalents or radio composes them from Backdrop/Glass/Card; whether mojo-ui's style-constant exports get func-ui counterparts or dissolve into Tailwind preset utilities.

IDEA-1..3 have shipped; blocked until [[IDEA-7]] ships.

### Phases
- [ ] Audit the 38 mojo-ui imports and map each to a func-ui export
      Produces the component-by-component mapping plus the list of props with no equivalent.
- [ ] Settle the open decisions on PageLayout/StatsGrid and style constants
- [ ] Wire func-ui into the radio monorepo side by side with mojo-ui
      Dependency, Tailwind preset and theme wiring, so both packages can render at once during the migration.
- [ ] Migrate the apps one at a time: admin, player, wave
- [ ] Drop @dendelion/mojo-ui once no imports remain
