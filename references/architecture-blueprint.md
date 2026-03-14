# Architecture Blueprint

Target model: **Machine-facing Deploy Driver + Repo-local Contract + Full Skills + Full Playbook Baseline + Optional Audits**.

The source repository keeps a root `SKILL.md` as the machine-facing deploy/scaffold driver for agent discovery. Target repositories receive the repo-local execution contract as root `AGENTS.md`, plus `skills/`, the playbook baseline, and optional audit assets.

## Why This Model

As tasks accumulate, forcing all rules into one layer creates bloat and drift.
Forcing users to choose among installation profiles up front also creates avoidable deployment variance.
This architecture keeps the default operating contract close to the repo, ships a stable full bundle by default, and still lets skills, escalation modules, and audits evolve independently.

## Target Layers

1. Source-repo `SKILL.md` driver: machine-facing deploy/scaffold entry point for agent discovery and repo setup
2. Repo-local `AGENTS.md` contract in the target repo: source-of-truth order, task modes, routing, validation, and closeout
3. Skills: focused helpers, shipped as part of the default bundle and invoked by need
4. Playbook modules: shipped as a full baseline by default, but used as escalation or deeper governance for release, debugging, continuity, orchestration, and lessons
5. Audits (optional): measurable evidence for skill usage and AGENTS health

## Module Set

Core + lifecycle modules:

- `00-core-operating-principles.md`
- `01-execution-flow.md`
- `02-task-planning-template.md`
- `03-versioning-policy.md`
- `04-changelog-standard.md`
- `05-release-runbook.md`
- `06-systematic-debugging.md`
- `07-progress-persistence-reanchor.md`

Workflow core for non-trivial tasks:

- Default target bundle: root `AGENTS.md` + repo-local docs + full `skills/` + full `00` through `09` playbook set
- Playbook modules are installed as part of the default bundle, but remain escalation-oriented in runtime use
- Continuity module `07` is useful when long-session re-anchor needs durable handoff rules beyond `skills/reanchor.md`

Orchestration and self-improvement extensions:

- `08-workflow-orchestration.md`
- `09-lessons-driven-improvement.md`

## Default Bundle

- root `AGENTS.md`
- full general and workflow skill set under `skills/`
- full playbook module set `00` through `09`
- audits only when the repo needs evidence or regression checks

## Narrower Exceptions

- allow `AGENTS.md` + `skills/` without playbook only when the user explicitly asks for that scope
- allow a subset of playbook modules only when the target repo has a clear constraint or a deliberate phased rollout plan
- when trimming the bundle, document omitted modules explicitly so AGENTS routing and references stay honest

## Skill Pack (Default Bundle)

- `skills/analyze-code.md`
- `skills/write-tests.md`
- `skills/refactor-guardrails.md`
- `skills/commit.md`
- `skills/security-quick-scan.md`
- `skills/decide-version-bump.md`
- `skills/draft-changelog-entry.md`
- `skills/release-readiness-check.md`
- `skills/debug-root-cause.md`
- `skills/reanchor.md`
- `skills/plan-closeout.md`
- `skills/capture-lessons.md`
- `skills/candidate-for-core.md`
- `skills/README.md` (index source of truth)

## Audit Layer (Optional)

- skill usage audit: evidence that local session logs actually loaded `skills/*.md`
- AGENTS health audit: score and compare root `AGENTS.md` structure, routing coverage, reference integrity, and concision
- baseline comparisons guard against accidental workflow regressions during AGENTS refactors

## Migration Sequence

1. Keep the source-repo `SKILL.md` as the machine-facing deploy/scaffold driver.
2. Move default routing into repo-local `AGENTS.md`.
3. Decouple `skills/` from the playbook root.
4. Install the default full skills and playbook baseline unless the repo explicitly asks for a narrower scope.
5. Add audits when workflow tuning needs evidence.
6. Keep existing module names stable to avoid breaking current consumers.
7. If the bundle is intentionally trimmed, document the omitted modules and align AGENTS references accordingly.

## Governance Rules

- New core rule requires repeated evidence and broad reusability.
- New module must define trigger, inputs, outputs, and completion gate.
- Skills remain agent-agnostic and follow `references/skills-template-contract.md`.
- New audit must measure a stable, explainable signal and avoid pretending to prove behavior it cannot directly observe.
