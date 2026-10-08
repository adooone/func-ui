---
id: IDEA-11
title: Hosted showcase
type: docs
status: planned
created: 2026-10-08
tags:
  - showcase
  - release
  - infra
---

The showcase is the only visual documentation the library has, and it runs
nowhere but a local `pnpm dev` on port 3040. `src/showcase.tsx` already
covers every component ([[IDEA-4]]), and `vite.app.config.ts` builds it as a
standalone static site into `dist/app`, but the repo carries no deploy
config of any kind and no URL anywhere — `homepage` in package.json points
at the GitHub README.

A hosted showcase is what makes the next two pieces of work reviewable:
the lamp family in [[IDEA-12]] needs a place where the retro controls can
be compared against the stock ones, and the radio migration needs a
reference the admin screens can be checked against without cloning this
repo. It is also the link the npm page and README should carry.

Vercel is the natural host: the radio admin already deploys there, the
account exists, and a static Vite build needs no configuration beyond the
build command and the output directory. The site is public; nothing in the
showcase is sensitive.

### Out of scope

Rewriting the showcase into a multi-page docs site or Storybook; it stays
the single-file app it is. Custom domain beyond whatever Vercel assigns,
unless one is already free on adoo.one.

### Phases
- [ ] Phase 1 — Deploy the static showcase build
      Create the Vercel project from `adooone/func-ui` with build command
      `pnpm build:showcase`, output directory `dist/app`, and the pnpm
      version from `packageManager`. Confirm the fonts under `public/fonts`
      and the dark-mode class from localStorage work on the deployed URL,
      not just locally.
- [ ] Phase 2 — Make the deployed page self-describing
      Show the package version read from package.json at build time, link
      the GitHub repo and the npm page from the welcome section, and give
      the Docs section the same install and stylesheet-import snippet the
      README will carry after [[IDEA-10]] phase 2.
- [ ] Phase 3 — Point the package at it and guard the build
      Set `homepage` in package.json to the deployed URL, link it from the
      README, and add `pnpm build:showcase` to `ci.yml` so a component
      change that breaks the showcase fails the PR rather than the deploy.
