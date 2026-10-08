---
id: IDEA-12
title: Lamp control family from mojo-ui
type: feat
status: done
created: 2026-10-08
updated: 2026-10-08
tags:
  - components
  - retro
  - radio
  - release
order: 1
---

The radio project is moving from `@dendelion/mojo-ui` to func-ui and will
delete mojo-ui afterwards, but it wants to keep one thing mojo-ui does that
func-ui does not: the retro lit look of its controls. In mojo-ui, Button,
IconButton, Switch and StatusIndicator share one mechanism — three stacked
layers (a metal bezel gradient, a dark socket inset by a size-dependent
amount, and a lit glass surface with a frosted inset shadow) plus a hover
halo in the variant colour. ProgressBar is a row of LED dots in a recessed
track driven by a `--lamp-count` custom property. CircularProgress is an
SVG ring with a drop-shadow glow. All of it lives in four SCSS partials
(`_mixins.scss`, `_variables.scss`, `_tokens.scss`, `_functions.scss`) with
a five-entry `$variants` map (green #47f57d, yellow #ffbd30, gray, red
#ff5050, disabled) and a three-entry `$sizes` map. None of it touches
framer-motion or mojo's Tailwind preset, so the port is self-contained.

The mismatch is the API, not the CSS. mojo's `variant` is a colour (green,
yellow, gray, red, dark) and the label travels in `title`; func-ui's
`variant` is a role (primary, secondary, ghost, danger) with children, and
its whole look is square edges with a hard offset shadow. The radio admin
uses the colour variants about fifty times, thirteen of them `dark`.
Overloading func-ui's Button with lamp variants would fork its API in two
directions at once, so the lamp controls become a **separate family** with
their own names, sharing one `_lamp.scss` partial and `--fui-lamp-*`
custom properties so they theme like everything else in func-ui:

- `LampButton` — `tone` (green | yellow | gray | red | dark), `size`
  (sm | md | lg), `rounded` (full | half), `icon`, children as label.
- `LampIconButton` — same `tone` and `size`, square with a round surface.
- `LampSwitch` — `tone`, `size`, `checked`, `onChange`, `disabled`; the
  O / I labels and the lit knob are part of the look.
- `LampStatus` — `status` (running | stopped | error | initializing) with
  the pulsing lamp and the coloured uppercase label.
- `LampMeter` — the LED bar: `value`, `max`, `tone`, `size`, `lampCount`,
  `label`.
- `CircularProgress` gains a `glow` boolean that adds mojo's drop-shadow
  halo; no new component.

`tone` rather than `variant` keeps the word `variant` meaning "role" across
the library. Admin's migration is then a rename plus moving `title` into
children.

Blocked on nothing in this repo; the radio side waits for this to ship as
0.3.0.

### Out of scope

mojo's Tabs, Badge, Slider, Checkbox and Radio glows — minor, hardcoded
per component, and func-ui already has those controls; the admin uses
func-ui's versions. mojo's Tailwind colour scales and the KyivType fonts;
where those live is a radio-side question, logged below.

### Phases
- [x] Phase 1 — Lamp foundation
      Port the bezel, socket, surface, frosted-inner and glow mixins into
      `src/styles/_lamp.scss`; lift the five tone gradients and glow
      colours out of mojo's `$variants` map into `--fui-lamp-*` custom
      properties in `globals.scss` (with a `.dark` block that keeps the
      lamps readable on the dark ground); carry the `$sizes` map as SCSS
      since sizes are compile-time everywhere else in func-ui.
      run: 4m12s · 46 in · 15.1k out · opus-5 · sess:7d8e6dbd-ec2d-4bc2-a054-9408b70b3ced
- [x] Phase 2 — LampButton and LampIconButton
      New `src/components/lamp-button` and `lamp-icon-button` following
      the existing directory shape (tsx, module.scss, index.ts), exported
      from `src/index.ts`. Keep mojo's text treatment (uppercase, 0.1em
      tracking, drop-shadow filter) and the `dark` tone that admin leans
      on.
      run: 4m59s · 30 in · 15.2k out · opus-5 · sess:7d8e6dbd-ec2d-4bc2-a054-9408b70b3ced
- [x] Phase 3 — LampSwitch and LampStatus
      Switch keeps the native checkbox for accessibility like func-ui's
      Switch does, with the lamp layers purely presentational. Status
      maps the four states to tones and pulses running and initializing
      via a keyframe that respects prefers-reduced-motion.
      run: 3m37s · 32 in · 12.3k out · opus-5 · sess:7d8e6dbd-ec2d-4bc2-a054-9408b70b3ced
- [x] Phase 4 — LampMeter and the CircularProgress glow
      LED bar with the `--lamp-count` width, partial-dot opacity for the
      fractional lamp, and a `fullWidth` prop replacing mojo's global
      `.w-full` hook. Add `glow` to CircularProgress.
      run: 3m6s · 22 in · 10.1k out · opus-5 · sess:7d8e6dbd-ec2d-4bc2-a054-9408b70b3ced
- [x] Phase 5 — Showcase, README and 0.3.0
      A "Lamp" block in the showcase's Components section placing each
      lamp control beside its stock counterpart; README rows for the new
      exports; a `feat:` commit so release-please cuts 0.3.0 and the
      trusted publisher ships it.
      run: 3m10s · 48 in · 10.9k out · opus-5 · sess:d6e3f9cf-2b50-4e88-aece-84f1550e9442
- [x] Phase 6 — Review findings (2026-10-08 showcase pass)
      Give the lamp family its own top-level showcase section: add `lamp`
      to the `sections` array between `components` and `tokens` so the
      side nav and the IntersectionObserver pick it up, move the Lamp
      heading, lead and the five entries into a `SectionBlock id="lamp"`
      after Components, and drop the inline stock counterparts (Button,
      IconButton, Switch, StatusDot, Progress) from the lamp entries —
      the default set reads first on its own, the lamp set follows. Keep
      the width scrub keyed to Components. Also wrap the showcase root in
      a small error boundary that renders the thrown message in place,
      so a demo control that crashes a render shows the error instead of
      a blank panel.
      run: 2m27s · 38 in · 8.2k out · opus-5 · sess:1e421bb7-3889-441f-be1b-1b59e6a8b314

### Thread
- [ ] 2026-10-08 [question] [agent] mojo's lamp text was designed for KyivType Sans, which func-ui does not ship (it uses Montserrat Alternates; only Tiny5 is shared). Do the lamp controls bundle KyivType in `public/fonts`, or do they inherit func-ui's sans and the radio app sets its own?
- [ ] 2026-10-08 [question] [agent] Admin uses mojo's moss/bark/coal/sun/ember Tailwind scales in 32 files via `mojoPreset`. Should `funcPreset` grow those scales so one preset serves the admin, or does the admin keep them in its own `theme.extend` after mojo-ui is removed?
- [x] 2026-10-08 [decision] [user] The showcase keeps default and lamp controls apart: a dedicated Lamp section after Components, not lamp entries interleaved with their stock counterparts.
