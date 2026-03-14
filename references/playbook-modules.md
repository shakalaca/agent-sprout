# Playbook Modules

Use this file as the module map for the default full bundle deployed under `{{PLAYBOOK_ROOT}}`. It should explain what ships by default, what remains escalation-oriented in runtime use, and what can be omitted only by explicit choice.

Default skill root: `{{SKILLS_ROOT}}` (recommended: `skills/`)

Architecture reference: `references/architecture-blueprint.md`

## Module catalog

- `00-core-operating-principles.md`: Non-negotiable quality bar, re-plan triggers, and completion standards.
- `01-execution-flow.md`: End-to-end delivery flow from scoping to release closeout.
- `02-task-planning-template.md`: Task-plan template with milestone, decision log, summary log, and persistence triggers.
- `03-versioning-policy.md`: SemVer decision rules and contract-change guidance.
- `04-changelog-standard.md`: Changelog structure and writing rules.
- `05-release-runbook.md`: Release checklist with verification-before-completion evidence requirements.
- `06-systematic-debugging.md`: Root-cause-first debugging protocol and escalation rules.
- `07-progress-persistence-reanchor.md`: Continuity protocol for persistence, long-session re-anchor, and context compact/compression handoff.
- `08-workflow-orchestration.md`: Plan-mode defaults, subagent usage, and autonomous execution protocol.
- `09-lessons-driven-improvement.md`: Correction capture loop and lessons lifecycle governance.

## Default operating model

- root `SKILL.md` in the source repo is the machine-facing deploy/scaffold driver
- root `AGENTS.md` owns the default execution contract
- `skills/` ship as first-line helpers in the default bundle
- playbook modules ship as a full baseline by default, but add escalation depth only when the repo needs them during execution
- audits are optional but recommended when workflow tuning needs before/after evidence

## Default bundle and exceptions

- default bundle: root `AGENTS.md` + full general and workflow skills + full playbook set `00`-`09`
- explicit exception: root `AGENTS.md` + full skills, without playbook modules
- explicit exception: root `AGENTS.md` + full skills + a documented subset of playbook modules for phased rollout or repo constraints
- audits stay optional in all cases

## General development skills (included in default bundle)

- `skills/analyze-code.md`: Code quality analysis with issue severity and improvement suggestions.
- `skills/write-tests.md`: Test-generation helper for happy path, edge case, and error coverage.
- `skills/refactor-guardrails.md`: Structural-refactor guardrails for contract preservation and regression coverage.
- `skills/commit.md`: Commit workflow and concise impact-focused message conventions.
- `skills/security-quick-scan.md`: Evidence-based security quick scan with structured risk output.

## Workflow and routing skills (included in default bundle)

- `skills/decide-version-bump.md`: SemVer bump recommendation with auditable rationale.
- `skills/draft-changelog-entry.md`: Changelog draft from verifiable change evidence.
- `skills/release-readiness-check.md`: Pre-release readiness check with blocker tracking.
- `skills/debug-root-cause.md`: Root-cause-first debugging hypothesis and experiment loop.
- `skills/reanchor.md`: Long-session alignment snapshot and drift correction.
- `skills/plan-closeout.md`: Extract durable knowledge from completed plans and prevent plan drift.
- `skills/capture-lessons.md`: Convert corrections/misses into reusable prevention rules.
- `skills/candidate-for-core.md`: Evaluate lesson promotion into core workflow governance.
- `skills/README.md`: Single source of truth for installed skill index.

## Audit tooling (optional)

- skill usage audit: inspect local session logs to see which skills were actually read
- AGENTS health audit: score and compare root `AGENTS.md` structure, route coverage, reference integrity, and concision
- baseline refresh is allowed only after reviewing an intentional improvement

Skill template contract: `references/skills-template-contract.md`
Audit reference: `references/audit-tooling.md`

## Suggested summary prompt

When explaining the setup, summarize in 3-6 bullets:

1. what ships in the default bundle
2. which parts are runtime-escalation layers versus install-optional layers
3. expected maintenance cost for modules, skills, and optional audits

Recommend the default bundle first.
Only present a narrower exception when the user explicitly asks for it or the repo has a clear constraint that makes the full bundle inappropriate.

## Generalization rule

Keep playbook modules lightweight and generic by default:

- avoid stack-specific commands unless unavoidable
- avoid product-domain details
- avoid naming specific teams or people
- keep checklists observable and tool-agnostic

Project-specific conventions should stay in `docs/project/`, `docs/specs/`, or `docs/plans/`.

## Path rule

- Do not assume a fixed path.
- Resolve `{{SKILLS_ROOT}}` and `{{PLAYBOOK_ROOT}}` independently from existing layout or explicit user input.
