---
id: IDEA-8
title: Adopt branch-per-idea working flow
type: chore
status: idea
created: 2026-08-04
tags:
  - workflow
---

Tier 1 ([[IDEA-1]]) was built directly on main — fine for the rapid early phase, but it bypasses the status model this corpus assumes (in-progress ⇢ branch, review ⇢ PR, done ⇢ merge) and leaves no review gate.

Proposal, starting with Tier 2 ([[IDEA-2]]): one branch per idea (`<type>/idea-N-short-name`, e.g. `feat/`, `docs/`), a draft PR into main auto-opened on the first push and promoted to ready when all phases are checked, merge after the owner's showcase walkthrough. One branch per *idea*, not per phase — phases are commits. Direct-to-main stays acceptable for trivial chores (typo, config nudge).

Also adopted with this idea: workflow friction gets captured as corpus ideas instead of living in chat — same way paper-camp dogfoods its own process.

### Phases
- [ ] Write the flow into the repo's contributor guide
      Branch naming, phases-as-commits, promoting the auto-opened draft PR to ready when all phases are checked, the trivial-chore exception, and logging workflow friction as new ideas.
- [ ] Add a PR template that links the idea and lists its phases
- [ ] Protect main so changes land through pull requests
      Require a PR plus the existing CI checks before merge, so the review gate is enforced and not just documented.
- [ ] Run the next idea through the flow end to end
      Branch, per-phase commits, PR, showcase walkthrough, merge — then fix whatever the dry run exposes.
