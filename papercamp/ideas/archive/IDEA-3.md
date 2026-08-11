---
id: IDEA-3
title: Tier 3 gap-filler components
type: feat
status: done
created: 2026-08-04
updated: 2026-08-08
tags:
  - components
  - release
---

The bespoke-UI census found ~28 hand-rolled chrome-less buttons across 10 files, ~20 loading/empty/error text states, 13 app-local icons plus text-glyph fallbacks with comments naming the missing icon, two inconsistent drawers, and duplicated diff/code/chip/dot patterns. These components make func-ui a genuine upgrade rather than a re-skin.

Skipped for the initial release (no demand from either target inventory): Accordion, Pagination, Avatar, PropTable, Swatch, Island, and the Layout/Page god-components (Backdrop+Glass composition replaces them). Radio/RadioGroup, Tabs, and the table story moved to the radio-parity tier ([[IDEA-7]]) now that the radio project is the target consumer.

### Phases
- [x] LinkButton (inherit/accent color, sizes — fixes the "fixed amber style" complaint)
- [x] EmptyState (loading / empty / error, centered per UX_PRINCIPLES layout-stability rules)
- [x] StatusDot + Chip (toggle/filter, aria-pressed) + SegmentedControl
- [x] Drawer (backdrop, focus trap, Escape, slide) — replaces two inconsistent hand-rolls
- [x] Kbd + InlineCode + CodeBlock (filename, copy, per-line diff add/remove styling)
- [x] CopyButton + Breadcrumb + Menu + FileButton
- [x] Icon set (~20: close, check, copy, plus, folder, lightbulb, chevrons, play, flag, sort arrows, refresh, more, wand, merge, push, pull, shuffle, commit, github, note)
- [x] (Table/Tabs/Radio moved to [[IDEA-7]] with the radio retarget)
- [x] Investigate red Tests/Docs status stamps on deliver card
      Determine why the deliver card marks Tests and Docs as red — check what conditions those stamps key off (test script/framework presence, docs coverage) and fix or clear the false-negative.

### Fixes
- [x] Fix failing tests
      Investigate and fix the currently failing test suite.

### Thread
- [x] 2026-08-07 [chat] Quick test from the embedded toolbar — just reply with a short hello.
- [x] 2026-08-07 [chat] [agent] Hello — Paper Scout here, reading you loud and clear.
- [x] 2026-08-07 [chat] just checking
- [x] 2026-08-07 [chat] [agent] Just checking, got it — nothing to change here.
- [x] 2026-08-07 [chat] fix tests
- [x] 2026-08-07 [chat] [agent] Added that as a fix here — a new phase to fix the tests. (reopened this idea to re-run)
- [x] 2026-08-07 [question] [agent] Run-all parked on fix 1 ("Fix failing tests") — the agent needs a decision: This repo has no test suite (no test script, framework, or files — and all runnable checks are green); do you want me to (a) close this fix as "no failing tests — repo is green," or (b) scaffold a new test framework + suite from scratch (which is new work beyond "fix failing tests" and needs a framework/scope decision)? → Resolved by owner: no suite scaffolding wanted — "there is no decision, just make it green." Wired vitest (`vitest run` + `passWithNoTests` config, `test` script) so the Tests check runs the real runner and passes; future `*.test.*` files are picked up with no further setup.
- [x] 2026-08-07 [chat] then check why the status stamp for Tests and Docs in the deliver card is red
- [x] 2026-08-07 [chat] [agent] Added that as a fix here — checking why the Tests and Docs status stamps show red on the deliver card.
- [x] 2026-08-07 [question] [agent] Run-all parked on fix 1 ("Fix failing tests") — the agent needs a decision: "Fix failing tests" has nothing to fix — func-ui (this plan's repo) has no test suite at all: no `test` script, no vitest/jest/testing-library dependency, no `*.test.*`/`*.spec.*` files, no test runner config, and no test step in CI (`ci.yml` runs only check-types + lint + build). `pnpm run check-types` is green and there is no failing test suite to repair. This is the same unresolved parked question from earlier: do you want me to (a) close this fix as "no failing tests — repo is green" (leave the checkbox and add nothing), or (b) scaffold a test framework + initial suite from scratch (Vitest + React Testing Library, config, and starter component tests) — which is substantial new work beyond "fix failing tests" and needs a framework/scope decision I can't make for you? → Duplicate of the question above; same resolution — vitest wired with `passWithNoTests`, Tests check green.
- [x] 2026-08-07 [log] [agent] Docs stamp was red from 4 title-style findings (the 0.16.0 title convention): retitled IDEA-3/4/6/7 to fit the 40-char no-subtitle rule (detail already lives in their bodies); consistency now reports 0 issues. Tests check re-run and passing.
