---
id: IDEA-11
title: Hosted showcase
type: docs
status: done
created: 2026-10-08
updated: 2026-10-08
tags:
  - showcase
  - release
  - infra
order: 1
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

Vercel is the natural host: the radio admin already deploys there through
the GitHub integration (its `vercel.json` carries only SPA rewrites; the
project itself was created in the dashboard), the account exists, and a
static Vite build needs nothing beyond a build command and an output
directory. The site is public; nothing in the showcase is sensitive.

Creating the Vercel project is the one step no agent phase can do: it needs
the dashboard (the GitHub integration must also be granted access to the
`adooone` account, which it may not have yet since radio lives under
`croco-dendy`), the Vercel CLI login stored on this machine has expired,
and paper-camp runs phases with no MCP servers and no browser. So that step
is a `[manual]` item, and the agent phases around it only touch the repo.
The deployed URL is recorded in this idea's thread once the project exists,
and the last phase reads it from there.

### Out of scope

Rewriting the showcase into a multi-page docs site or Storybook; it stays
the single-file app it is. Custom domain beyond whatever Vercel assigns,
unless one is already free on adoo.one.

### Phases
- [x] Phase 1 — Deploy configuration in the repo
      Add a root `vercel.json` with `buildCommand: pnpm build:showcase`,
      `outputDirectory: dist/app`, `installCommand: pnpm install`, and the
      SPA rewrite the admin uses, so the dashboard import needs no manual
      settings. Confirm `pnpm build:showcase` produces `dist/app` with the
      fonts from `public/fonts` and that `index.html` still applies the
      dark class from localStorage before first paint in the built output.
      Add `pnpm build:showcase` to `ci.yml` so a component change that
      breaks the showcase fails the PR rather than the deploy.
      run: 1m15s · 30 in · 3k out · opus-5 · sess:0dad5947-3178-42b4-9d4c-7e269136b70c
- [x] Phase 2 — Make the deployed page self-describing
      Show the package version read from package.json at build time, link
      the GitHub repo and the npm page from the welcome section, and give
      the Docs section the same install and stylesheet-import snippet the
      README carries after [[IDEA-10]] phase 2.
      run: 2m33s · 36 in · 7.5k out · opus-5 · sess:0dad5947-3178-42b4-9d4c-7e269136b70c
- [x] [manual] Create the Vercel project from adooone/func-ui
      In the Vercel dashboard import `adooone/func-ui` (grant the GitHub
      integration access to the `adooone` account if it is not listed),
      accept the settings `vercel.json` provides, wait for the first
      production deploy, open it and check fonts and dark mode, then log
      the URL in this idea's thread as a decision note.
- [x] Phase 3 — Point the package at the deployed site
      Read the URL from the thread note left by the manual step; if it is
      absent, stop and log a question rather than guessing a `.vercel.app`
      name. Set `homepage` in package.json to it and link it from the
      README's first lines.
      run: 1m19s · 10 in · 1.5k out · opus-5 · sess:0dad5947-3178-42b4-9d4c-7e269136b70c
- [x] [manual] Archive IDEA-10 and update IDEA-11 showcase deploy plan

### Thread
- [x] 2026-10-08 [decision] [user] Vercel project `func-ui` created in the croco-dendy-projects team from adooone/func-ui, production branch main, settings from `vercel.json`. Showcase URL: https://func-ui.vercel.app (the `-croco-dendy-projects` aliases sit behind Vercel Authentication, same as paper-ui). First production deploy built from 9fed31f; HTML, assets, the localStorage dark-mode bootstrap and the KyivType and Tiny5 fonts all serve.
