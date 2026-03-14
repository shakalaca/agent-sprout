# AGENTS.md

Primary repo-local operating contract.

Use this file as the default flow. Treat `{{SKILLS_ROOT}}` as helpers and `{{PLAYBOOK_ROOT}}` as escalation-only unless this file routes there.

## Source-of-truth priority

When sources disagree, use this order:

1. `docs/project/` and `docs/specs/`: shipped semantics, architecture, ownership, and acceptance.
2. `docs/notes/`: caveats, rollout state, manual QA notes, and operational warnings.
3. Runtime code, tests, and build configuration: observed current behavior.
4. `docs/plans/`: intended future work only; plans do not override shipped behavior.

For review and investigation work:

- treat `docs/project/` and `docs/specs/` as intended behavior guidance
- treat code, tests, and validation output as observed behavior
- if intended and observed behavior differ, report both before recommending a fix

## Operating mode

- Default flow: follow this file and the routed project docs.
- Use `{{SKILLS_ROOT}}` as helpers, not as source-of-truth.
- Use `{{PLAYBOOK_ROOT}}` only for deeper governance, release evidence, repeated debugging failure, or lessons escalation.

## Task modes

- Implementation mode: ship code, tests, and required doc updates.
- Review and investigation mode: gather evidence first; edit files only when fixes are requested.
- Plan and docs mode: update the owning plan or doc, not runtime code.

## Core reads

- Project index: `docs/project/README.md`
- Specs index: `docs/specs/README.md`
- Planning index: `docs/plans/README.md`
- Notes and caveats: `docs/notes/`

## Task routing (by change type)

- Product behavior, architecture, ownership, or integration semantics: `docs/project/`
- Acceptance, scope, and user-visible requirements: `docs/specs/`
- Plan or doc work: read the target file first, then the routed companion doc, then update durable docs when the plan closes
- Known caveats, rollout state, and manual QA: `docs/notes/`

## Small-task fast path

Use fast path only if all are true:

- change is localized to 1-2 files
- no cross-module contract, schema, storage, or API change
- no release workflow or governance routing change
- no user-visible semantic change

Fast path steps:

1. Confirm scope and risk in 1-2 lines.
2. Implement the minimal change in the owning module or doc.
3. Run relevant checks.
4. Summarize what changed and residual risk.

If any fast-path condition fails, return to the full phase flow.

## Planning and plan docs

- Always state a minimal plan before substantial work.
- Treat `docs/plans/` as execution records, not long-term source-of-truth docs.
- After a plan reaches `Completed`, extract durable behavior, architecture, caveats, or lessons into `docs/project/`, `docs/specs/`, `docs/notes/`, or another long-lived doc.
- Use `{{SKILLS_ROOT}}/plan-closeout.md` when a plan is complete or nearly complete and should stop being an active working document.

## Execution contract (phase-first)

Use a phase-first flow for every task:

1. Scope the change, read the routed docs, and state a minimal plan.
2. Execute in the owning module or doc for the active task mode.
3. Validate with relevant checks for the touched behavior.
4. Close with a concise summary, residual risk, doc/test alignment notes, and plan-closeout extraction when a task plan was used.

## Skills (helpers, not primary flow)

Skill routing:

- If the user explicitly names a skill, use it.
- If multiple skills could apply, use the first matching item below.

1. `{{SKILLS_ROOT}}/analyze-code.md` for review or code-quality requests
2. `{{SKILLS_ROOT}}/security-quick-scan.md` for security-first review or hardening
3. `{{SKILLS_ROOT}}/write-tests.md` for test design or regression additions
4. `{{SKILLS_ROOT}}/refactor-guardrails.md` for refactors, modular extraction, entrypoint slimming, or test-suite restructuring
5. `{{SKILLS_ROOT}}/debug-root-cause.md` for debugging or root-cause work
6. `{{SKILLS_ROOT}}/reanchor.md` for user-requested continuity or handoff snapshots
7. `{{SKILLS_ROOT}}/release-readiness-check.md` for release readiness
8. `{{SKILLS_ROOT}}/commit.md` for commit preparation
9. `{{SKILLS_ROOT}}/decide-version-bump.md` for versioning
10. `{{SKILLS_ROOT}}/draft-changelog-entry.md` for changelog drafting
11. `{{SKILLS_ROOT}}/plan-closeout.md` for extracting durable knowledge from completed plans
12. `{{SKILLS_ROOT}}/capture-lessons.md` for lessons capture
13. `{{SKILLS_ROOT}}/candidate-for-core.md` for promoting repeated lessons into core guidance

Release-closeout rule:

- treat version-update or release-style closeout work as a bundled workflow
- use `{{SKILLS_ROOT}}/decide-version-bump.md`, then `{{SKILLS_ROOT}}/draft-changelog-entry.md`, then `{{SKILLS_ROOT}}/commit.md`
- do not skip changelog coverage when the request already implies release-closeout work

Use `{{SKILLS_ROOT}}/README.md` as the single source of truth for installed skill index entries.

## Escalation to playbook (only when needed)

Use `{{PLAYBOOK_ROOT}}` only for deeper governance support:

- `{{PLAYBOOK_ROOT}}/05-release-runbook.md` for release execution evidence
- `{{PLAYBOOK_ROOT}}/06-systematic-debugging.md` for repeated debugging failure
- `{{PLAYBOOK_ROOT}}/07-progress-persistence-reanchor.md` for formal long-session continuity when the repo installs the continuity module
- `{{PLAYBOOK_ROOT}}/08-workflow-orchestration.md` for stricter plan-mode or autonomous-execution governance
- `{{PLAYBOOK_ROOT}}/09-lessons-driven-improvement.md` for lessons lifecycle governance

Do not escalate to playbook docs when the task can be completed by following the routed project docs or `{{SKILLS_ROOT}}` guidance directly.

## Definition of done

- Implementation mode: complete the owning code/docs changes and run the relevant validation before closing.
- Review and investigation mode: findings are evidence-based, scoped, and include residual risk or a recommended next step.
- Plan and docs mode: the updated document stays internally consistent, and completed plans leave behind extracted durable knowledge instead of acting as source-of-truth.
