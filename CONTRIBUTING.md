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
(`.github/workflows/draft-pr.yml`), titled from the branch and filled in from
`.github/pull_request_template.md` — the idea link, and its phase checklist
copied out of the idea file. Nothing to do by hand — just push, then tick the
phases off in the PR as their commits land.

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

## What enforces this

`main` is covered by a repository ruleset kept in the repo as
`.github/rulesets/main.json`, so the gate is reviewable and restorable rather
than invisible settings-UI state. It requires a pull request and a green
`Quality` check (the `ci.yml` job) before anything lands, and forbids deleting
or force-pushing the branch.

Zero approvals are required: this is a solo-owner repo, and GitHub will not let
you approve your own PR, so a review requirement would deadlock. The gate is
the PR, CI, and the showcase walkthrough. For the same reason the JSON pins
`require_extra_approval_for_unattributed_changes` to `false` — GitHub defaults
it to `true`, which would demand an approval nobody can give on any PR holding
a commit it cannot attribute to an account.

Repo admins can bypass, which is what keeps the trivial-chore exception below
workable, and is also the escape hatch if a rule ever does wedge a merge.

The live ruleset is `24774325`. Edit the JSON and re-apply it to change the
rules:

```bash
gh api --method PUT repos/adooone/func-ui/rulesets/24774325 --input .github/rulesets/main.json
```

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
