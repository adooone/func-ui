# Contributing

Work in this repo is organised around **ideas**. Every idea lives in
`papercamp/ideas/IDEA-N.md` — frontmatter (`id`, `title`, `type`, `status`,
`tags`), the prose rationale, and a `### Phases` checklist. The idea is the
unit of work; this guide describes how an idea travels from `planned` to
merged.

## One branch per idea

Branch off `main`, one branch per *idea* — not per phase:

```
<type>/idea-N-short-name
```

`<type>` is the idea's own type, and matches the conventional-commit prefixes
the release tooling understands: `feat/`, `fix/`, `refactor/`, `chore/`,
`docs/`. `short-name` is a few kebab-case words from the title.

```bash
git switch -c feat/idea-12-lamp-control-family
```

The idea's `status:` goes to `in-progress` when the branch starts.

## Phases are commits

Each phase in the `### Phases` list lands as its own commit, in order. When a
phase is done, flip its checkbox from `- [ ]` to `- [x]` in the same commit
that does the work — the checklist and the branch stay in step, and the diff
shows which phase a commit belongs to.

Commit messages follow conventional commits (`feat(components): …`), since
release-please reads them to cut the changelog and the version bump. Reasoning
goes in the commit message rather than in code comments.

Don't cascade into later phases because they look quick. One phase at a time
keeps the review readable and keeps the checklist honest.

## The draft PR

The first push to a `<type>/idea-N-…` branch auto-opens a draft PR into `main`
(`.github/workflows/draft-pr.yml`), titled from the branch and linking back to
the idea file. Nothing to do by hand — just push.

```bash
git push -u origin feat/idea-12-lamp-control-family
```

Promote the PR from draft to **Ready for review** when every phase in the list
is checked and the idea's `status:` is `review`. CI (types, lint, build,
showcase build, package check) runs on every push to the PR and has to be
green.

Merge happens after the owner's showcase walkthrough — someone looks at the
components live, in a browser, which is the one check CI cannot do. `status:`
goes to `done` only after that walkthrough; an agent finishing the last phase
sets `review` and stops there.

## The trivial-chore exception

Committing straight to `main` stays fine for trivial chores that carry no
review risk: a typo, a config nudge, a dependency pin, a dead link. Anything
that touches component behaviour, styling, or the public API goes through a
branch and a PR — if you are unsure which side a change falls on, open the
branch.

## Friction becomes an idea

When this flow gets in the way — a step that is wrong, a missing guard-rail, a
manual chore that wants automating — write it up as a new idea in
`papercamp/ideas/` instead of leaving it in a chat log. The corpus is how the
process reviews itself, the same way paper-camp dogfoods its own.
