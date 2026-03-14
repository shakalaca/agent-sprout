# Playbook Modules

Optional governance modules used only when root `AGENTS.md` needs stronger evidence or deeper coordination.

## Common escalation subset

- `05-release-runbook.md`
- `06-systematic-debugging.md`
- `07-progress-persistence-reanchor.md`
- `09-lessons-driven-improvement.md`

## Module Map

- Core principles: `00-core-operating-principles.md`
- Execution flow: `01-execution-flow.md`
- Planning scaffold for non-trivial tasks: `02-task-planning-template.md`
- Versioning: `03-versioning-policy.md`
- Changelog: `04-changelog-standard.md`
- Release: `05-release-runbook.md`
- Debugging: `06-systematic-debugging.md`
- Continuity and context compact: `07-progress-persistence-reanchor.md`
- Workflow orchestration and core-promotion governance: `08-workflow-orchestration.md`
- Lessons loop: `09-lessons-driven-improvement.md`

## Skill-first Routing

| Intent | First Skill | Fallback Module |
| --- | --- | --- |
| Version decision | `skills/decide-version-bump.md` | `03-versioning-policy.md` |
| Changelog drafting | `skills/draft-changelog-entry.md` | `04-changelog-standard.md` |
| Release readiness | `skills/release-readiness-check.md` | `05-release-runbook.md` |
| Root-cause debugging | `skills/debug-root-cause.md` | `06-systematic-debugging.md` |
| Long-session re-anchor or context compact/compression | `skills/reanchor.md` | `01-execution-flow.md`, `07-progress-persistence-reanchor.md` |
| Plan closeout | `skills/plan-closeout.md` | no module; extract into long-lived docs directly |
| Lessons capture | `skills/capture-lessons.md` | `09-lessons-driven-improvement.md` |
| Promote lesson to core | `skills/candidate-for-core.md` | `09-lessons-driven-improvement.md`, `08-workflow-orchestration.md` |

## Conflict Resolution

- If long-session threshold is reached or context compact/compression is requested, run `skills/reanchor.md` first.
- If multiple intents match in one request, use this order:
  - `skills/debug-root-cause.md`
  - `skills/release-readiness-check.md`
  - `skills/decide-version-bump.md`
  - `skills/draft-changelog-entry.md`
  - `skills/capture-lessons.md`
  - `skills/candidate-for-core.md`
- Composite intent (`version + changelog`) always runs version first, then changelog.

## Usage Rules

- Default execution contract lives in root `AGENTS.md`.
- Playbook files are escalation references unless the repo intentionally installs a fuller governance mode.
- `02-task-planning-template.md` is a planning scaffold for non-trivial work, not a default escalation route like `05`, `06`, `07`, or `09`.
- Skill output is draft or analysis, not completion evidence.
- Re-anchor can be handled by `skills/reanchor.md` even if `07` is not installed.
- If a skill is unavailable, run the mapped module directly.
- Keep project-specific details in `docs/project/`, `docs/specs/`, and `docs/plans/`.

## Skills Index

- Use `skills/README.md` as the single source of truth for skill list entries.
