---
id: IDEA-14
title: Theme tokens for radius and font, ghost Tabs, lit Button, ListItem tones
type: feat
status: review
created: 2026-11-04
updated: 2026-11-11
tags:
  - components
  - tokens
  - radio
  - release
---

Driven by the radio admin (its IDEA-17). Apps should set radius and font
with one line each, instead of overriding the library's hashed module
classes from their own CSS, which is what the admin does today.

- `--fui-radius` is read by every control: Button, IconButton, LinkButton,
  FileButton, CopyButton, Input, Textarea, the Select trigger and list,
  Chip, Stamp, SegmentedControl, ListItem and the Menu list.
  `--fui-radius-panel` is read by Modal, Card and Drawer (inner edges
  only). Both default to 0, so the film look is unchanged.
- `--fui-font` replaces the sans and mono families in every module,
  falling back to Montserrat Alternates. The stylesheet no longer styles
  `html` or `body`; the showcase carries those rules in `showcase.scss`.
- `Tabs` gains `variant="ghost"`: bare uppercase labels, the active one
  underlined in accent.
- `Button` gains `variant="lit"`, the amber-outlined armed action;
  `ListItem` gains `tone="warn" | "alert"`.
- The unlit `dark` lamp tone turns from milky grey glass into dark,
  translucent smoked glass (asked for from the radio player's settings
  page, 2026-11-11).

**Breaking:** apps that relied on the library to style `body` (margin,
background, colour, font, line height) now set those themselves.

This supersedes the `rounded` prop approach of the open
`feat/idea-13-rounded-pill-variants` PR (#12): the radio admin chose theme
tokens, set once, over a prop on every component. `LampButton` keeps the
`rounded` prop it already has.

### Phases
- [x] Phase 1 — Radius and panel-radius tokens read by every control module
      Every control's module reads `var(--fui-radius, 0)`, the panels
      `var(--fui-radius-panel, 0)`. A radius switch in the showcase's
      Components section, and the tokens in the README.
- [x] Phase 2 — `--fui-font`, and the document left unstyled
      `$font-family-sans` and `$font-family-mono` read `--fui-font`;
      `globals.scss` stops styling `html` and `body`, which move to the
      showcase's own `showcase.scss`. README notes the breaking change.
- [x] Phase 3 — Ghost `Tabs`, lit `Button`, `ListItem` tones
      The three variants, exported types, showcase controls for each and
      the README rows.
- [x] Phase 4 — The dark tone as smoked glass
      The unlit `dark` lamp tone was a warm grey under a milky white
      frost. It becomes a dark, translucent fill over a translucent socket,
      with only a thin rim of light, in every lamp control that uses it
      (LampButton, LampIconButton, the LampSwitch knob, LampStatus). The
      lit tones are opaque and unchanged; LampMeter's track stays solid.
