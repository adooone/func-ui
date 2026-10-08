---
id: IDEA-10
title: Ship 0.2.0 and bring the package docs up to date
type: chore
status: review
created: 2026-10-08
updated: 2026-10-08
tags:
  - release
  - docs
  - papercamp
---

0.2.0 exists as a git tag and a GitHub release but npm still serves 0.1.1:
the Publish job authenticated with an `NPM_TOKEN` secret the repo never had,
so the release-triggered run died with `ENEEDAUTH`. The token route is gone
now — npmjs.com has a trusted publisher for `@dendelion/func-ui` bound to
`adooone/func-ui` and `publish.yml`, and the workflow was aligned with
paper-ui's working OIDC job (Node 22, no `registry-url`, npm upgraded after
the build, `--provenance`, plus `workflow_dispatch` so a release that already
fired can be published from main). What remains is proving that path end to
end and making the package presentable to its first external consumer, the
radio admin ([[IDEA-12]] depends on radio being able to install this).

The README still describes the four foundation components and promises
Button and Card "on the way", while `src/index.ts` exports about forty. It
also never mentions the stylesheet: the library build emits
`dist/index.css` and the JS bundle does not import it, so a consumer that
follows the README gets unstyled components — exactly the failure mojo-ui
hit in September.

Housekeeping rides along: the move of IDEA-7 to `ideas/archive/` and the
matching `config.json` / `run-order.md` edits are sitting uncommitted in the
working tree, and `ideas/index.md` still lists IDEA-7 as planned although
everything in it shipped in 0.2.0.

### Out of scope

New components or API changes; those belong to [[IDEA-12]]. Hosting the
showcase; that is [[IDEA-11]].

### Phases
- [x] Phase 1 — Publish 0.2.0 through the trusted publisher
      Dispatch `publish.yml` from main (package.json already says 0.2.0),
      confirm `npm view @dendelion/func-ui` shows 0.2.0 as latest with a
      provenance attestation, then on npmjs.com set the package's
      publishing access to require two-factor or a trusted publisher so a
      stray local `npm publish` cannot bypass the workflow.
- [x] Phase 2 — Rewrite the README for the real surface
      Component list grouped as in `src/index.ts` (ambient, actions, forms,
      overlays, progress and status, nav and data, text); install plus the
      two imports a consumer needs (`@dendelion/func-ui` and
      `@dendelion/func-ui/dist/index.css`); the Tailwind preset; the fonts
      shipped in `public/fonts` and how to serve them; a placeholder link
      for the showcase that [[IDEA-11]] fills in. Drop the "on the way"
      line.
      run: 2m45s · 40 in · 8.2k out · opus-5 · sess:c907b65d-b0c5-4868-a099-07a9eb9aee5a
- [x] Phase 3 — Commit the papercamp housekeeping
      Land the IDEA-7 archive move with its config and run-order edits,
      flip the IDEA-7 row in `ideas/index.md` to done, and add the rows
      for IDEA-10, IDEA-11 and IDEA-12.
      run: 1m22s · 22 in · 4.1k out · opus-5 · sess:c907b65d-b0c5-4868-a099-07a9eb9aee5a
