# Agent Sprout

[中文說明](README-zh.md)

<img src="assets/agent-sprout-icon.png" alt="Agent Sprout icon" width="160">

Agent Sprout is a repo-local execution seed: start with a small, portable core, then grow a project-specific operating system with AGENTS, reusable skills, a full playbook baseline, and optional audits.

Status: this repository is a curated template and reference library, not a CLI scaffolder or one-click installer.

Note: the root `SKILL.md` is the machine-facing entrypoint for AI-driven deploy/scaffold behavior. It remains named `SKILL.md` for skill discovery compatibility, even though this repository is not framed as a human-facing installable product.

1. A root `AGENTS.md` template for the repo-local execution contract
2. Portable, reusable `skills/` templates
3. A full playbook module set used as an escalation layer
4. Optional audit tooling templates used as an evidence layer

This repository is intended to be a source of consistent, transplantable content assets. It is not positioned as a generator, package, or automatic installer.

### Characteristics

- The root `AGENTS.md` contract template is the default operating baseline
- `skills/` and `{{PLAYBOOK_ROOT}}` remain decoupled
- Playbook remains escalation-oriented even when installed as part of the default bundle
- Audits remain optional and evidence-oriented
- `references/` captures architecture, migration, module, and contract guidance

### Boundaries

- Includes transplantable AGENTS, skills, playbook, and audit templates
- Includes architecture and migration documentation
- Does not include a standalone CLI
- Does not include package metadata or a publishable installer artifact
- Does not include a ready-made end-to-end scaffolding entrypoint

### Suggested Usage

1. Decide `{{SKILLS_ROOT}}` and `{{PLAYBOOK_ROOT}}` for the target repository
2. Copy the default bundle from `assets/templates/`: root `AGENTS`, the full `skills/` set, and the full playbook module set
3. Add audit templates only when the target repository needs evidence or regression checks
4. Use `references/skills-template-contract.md` to preserve skill header and formatting consistency
5. Use `references/repo-local-migration.md` when retrofitting an older structure

## Included Assets

### AGENTS Template

- `assets/templates/AGENTS.template.md`: the primary repo-local contract template; playbook references remain escalation-oriented instead of becoming the default operating path.

### Playbook Templates

The repository includes a complete `00` through `09` playbook module set:

- `00-core-operating-principles`
- `01-execution-flow`
- `02-task-planning-template`
- `03-versioning-policy`
- `04-changelog-standard`
- `05-release-runbook`
- `06-systematic-debugging`
- `07-progress-persistence-reanchor`
- `08-workflow-orchestration`
- `09-lessons-driven-improvement`

### Skills Templates

General skills:

- `analyze-code`
- `write-tests`
- `refactor-guardrails`
- `commit`
- `security-quick-scan`

Workflow skills:

- `decide-version-bump`
- `draft-changelog-entry`
- `release-readiness-check`
- `debug-root-cause`
- `reanchor`
- `plan-closeout`
- `capture-lessons`
- `candidate-for-core`

### Audit Templates

- `audit_skill_usage`: checks whether skill files are actually being read during sessions
- `audit_agents_health`: checks AGENTS structure, routing coverage, and reference completeness
- Baseline samples, library helpers, suite templates, and test wiring templates are included for transplant into target repositories

## References

- `references/architecture-blueprint.md`: architecture rationale and target shape
- `references/playbook-modules.md`: playbook modules and default bundle guidance
- `references/skills-template-contract.md`: skill template contract and header conventions
- `references/repo-local-migration.md`: retrofit path for older structures
- `references/audit-tooling.md`: audit template layout and wiring guidance

## Maintenance Notes

- Treat `assets/templates/AGENTS.template.md` as the single baseline AGENTS template.
- Keep `README.template.md` and the skills contract aligned when changing skill templates.
- Update `references/playbook-modules.md` whenever module inventory or default bundle guidance changes.
- Update `references/audit-tooling.md` and baseline examples whenever audit templates change.
- Update `SKILL.md` and `references/architecture-blueprint.md` whenever the overall architecture direction changes.
