---
name: agent-sprout
description: Deploy or maintain a repo-local AGENTS execution system with the default full AGENTS plus skills plus playbook bundle, and optional audit tooling.
---

# Agent Sprout Deploy Driver

This file is the machine-facing skill entrypoint for agent discovery. Keep the filename as `SKILL.md`; its role is to drive deploy and scaffold behavior for Agent Sprout rather than serve as a human installation guide.

Deploy or maintain a repo-local operating system centered on root `AGENTS.md` + `skills/`, with the default full playbook bundle at `{{PLAYBOOK_ROOT}}` and optional audit tooling.

Default roots:

- skills: `{{SKILLS_ROOT}}` (recommended default: `skills/`)
- playbook: `{{PLAYBOOK_ROOT}}` (recommended default: `docs/playbook/`)

Default playbook bundle:

- `{{PLAYBOOK_ROOT}}/00-core-operating-principles.md`
- `{{PLAYBOOK_ROOT}}/README.md`
- `{{PLAYBOOK_ROOT}}/01-execution-flow.md`
- `{{PLAYBOOK_ROOT}}/02-task-planning-template.md`
- `{{PLAYBOOK_ROOT}}/03-versioning-policy.md`
- `{{PLAYBOOK_ROOT}}/04-changelog-standard.md`
- `{{PLAYBOOK_ROOT}}/05-release-runbook.md`
- `{{PLAYBOOK_ROOT}}/06-systematic-debugging.md`
- `{{PLAYBOOK_ROOT}}/07-progress-persistence-reanchor.md`
- `{{PLAYBOOK_ROOT}}/08-workflow-orchestration.md`
- `{{PLAYBOOK_ROOT}}/09-lessons-driven-improvement.md`

Install skills at `{{SKILLS_ROOT}}` as part of the default bundle:

- `{{SKILLS_ROOT}}/analyze-code.md`
- `{{SKILLS_ROOT}}/write-tests.md`
- `{{SKILLS_ROOT}}/refactor-guardrails.md`
- `{{SKILLS_ROOT}}/commit.md`
- `{{SKILLS_ROOT}}/security-quick-scan.md`

Install workflow skills at `{{SKILLS_ROOT}}` as part of the default bundle:

- `{{SKILLS_ROOT}}/decide-version-bump.md`
- `{{SKILLS_ROOT}}/draft-changelog-entry.md`
- `{{SKILLS_ROOT}}/release-readiness-check.md`
- `{{SKILLS_ROOT}}/debug-root-cause.md`
- `{{SKILLS_ROOT}}/reanchor.md`
- `{{SKILLS_ROOT}}/plan-closeout.md`
- `{{SKILLS_ROOT}}/capture-lessons.md`
- `{{SKILLS_ROOT}}/candidate-for-core.md`
- `{{SKILLS_ROOT}}/README.md`

Optional audit tooling templates:

- `assets/templates/audit/audit_skill_usage.template.js`
- `assets/templates/audit/audit_agents_health.template.js`
- `assets/templates/audit/baselines/agents_health_baseline.example.json`
- `assets/templates/audit/lib/agents_health.template.js`
- `assets/templates/audit/suites/agents_health_suite.template.js`
- `assets/templates/audit/wiring/run_tests.agents_health.template.js`
- `assets/templates/audit/README.template.md`

## Use this skill when

- the repo needs a repo-local AGENTS contract instead of a heavy global methodology layer
- the repo needs a simple, precise, reusable execution flow
- the repo needs cross-project reusable skills as first-class assets
- the user wants AGENTS flow to work even without playbook modules
- the user wants playbook to stay escalation-only even though the default install includes it
- the user wants to measure whether AGENTS or skill changes improved or degraded workflow health

## Workflow

### 1. Resolve target roots (`{{SKILLS_ROOT}}`, `{{PLAYBOOK_ROOT}}`)

- if a repo-local `skills/` directory already exists, reuse it as `{{SKILLS_ROOT}}`
- if a methodology or `docs/playbook/` directory already exists, reuse it as `{{PLAYBOOK_ROOT}}`
- otherwise choose roots that fit the repo doc layout
- if the user specified paths, use them as highest priority

### 2. Default to the full bundle before scaffolding

Use `references/playbook-modules.md` as a module map, but install the standard bundle by default:

- root `AGENTS.md`
- the full general and workflow skill set
- the full `00` through `09` playbook module set
- audits only when the user asks for evidence tooling or the repo clearly benefits from it

Only trim the bundle when the user explicitly asks for a narrower installation.

### 3. Scaffold the default bundle

Before writing any skill file, detect skill-header profile from existing skills in the target repo and align generation style using `references/skills-template-contract.md`.

Base template:

- `assets/templates/playbook/README.template.md`

Module templates:

- `assets/templates/playbook/00-core-operating-principles.template.md`
- `assets/templates/playbook/01-execution-flow.template.md`
- `assets/templates/playbook/02-task-planning-template.template.md`
- `assets/templates/playbook/03-versioning-policy.template.md`
- `assets/templates/playbook/04-changelog-standard.template.md`
- `assets/templates/playbook/05-release-runbook.template.md`
- `assets/templates/playbook/06-systematic-debugging.template.md`
- `assets/templates/playbook/07-progress-persistence-reanchor.template.md`
- `assets/templates/playbook/08-workflow-orchestration.template.md`
- `assets/templates/playbook/09-lessons-driven-improvement.template.md`

Skill templates:

- `assets/templates/skills/analyze-code.template.md`
- `assets/templates/skills/write-tests.template.md`
- `assets/templates/skills/refactor-guardrails.template.md`
- `assets/templates/skills/commit.template.md`
- `assets/templates/skills/security-quick-scan.template.md`
- `assets/templates/skills/decide-version-bump.template.md`
- `assets/templates/skills/draft-changelog-entry.template.md`
- `assets/templates/skills/release-readiness-check.template.md`
- `assets/templates/skills/debug-root-cause.template.md`
- `assets/templates/skills/reanchor.template.md`
- `assets/templates/skills/plan-closeout.template.md`
- `assets/templates/skills/capture-lessons.template.md`
- `assets/templates/skills/candidate-for-core.template.md`
- `assets/templates/skills/README.template.md`

Audit templates:

- `assets/templates/audit/audit_skill_usage.template.js`
- `assets/templates/audit/audit_agents_health.template.js`
- `assets/templates/audit/lib/agents_health.template.js`
- `assets/templates/audit/README.template.md`

Skill template contract:

- `references/skills-template-contract.md`
- `references/audit-tooling.md`
- `references/repo-local-migration.md`
- `references/architecture-blueprint.md`

All generated skills should follow this contract for cross-agent portability.

Scaffolding rules for the default installation:

- always generate AGENTS from `assets/templates/AGENTS.template.md` (repo-local baseline)
- always generate the full skill set and `skills/README.md`
- always generate the full playbook module set unless the user explicitly requests a narrower scope
- only generate audit assets when the user asks for them or when evidence tooling is clearly part of the task
- if playbook is intentionally omitted, AGENTS must remain fully operable using only AGENTS + skills

### 4. Keep methodology generic

- avoid framework-locked instructions unless unavoidable
- avoid business-domain specifics
- keep acceptance and checklist items observable
- keep audit heuristics configurable by baseline, not by repo-specific wording alone

### 5. Keep AGENTS as the single baseline template

- Use `assets/templates/AGENTS.template.md` as the single baseline template.
- Keep playbook references inside that template as escalation-only guidance, not as the primary execution path.
- If playbook is disabled or removed, AGENTS must not keep stale playbook links and must still route by phase flow and skill hooks.

### 6. Install audits only when they add value

- add skill-usage audit when the team wants evidence that skills are actually being read in sessions
- add AGENTS-health audit when the team expects AGENTS refactors or wants before/after comparisons with a baseline
- add the optional suite template when the target repo already has a shared test runner and wants AGENTS regressions in the normal test pass
- treat audit output as evidence, not as proof that every instruction was followed perfectly

### 7. Use the migration guide for retrofits

- when updating a repo that already uses the older playbook-root model, use `references/repo-local-migration.md`
- migrate AGENTS and skills first, then add audits after the new structure stabilizes

## Quality bar

- `{{SKILLS_ROOT}}` is clear
- `{{PLAYBOOK_ROOT}}` is clear
- default bundle scope is clear
- active general skills are clear
- active workflow skills are clear
- AGENTS routing works without keyword-only dependency
- AGENTS remains valid when playbook is absent by explicit choice
- generated skill headers align with target repo style contract
- AGENTS routing is consistent with the installed bundle
- audit templates are present only when requested and their assumptions are documented
