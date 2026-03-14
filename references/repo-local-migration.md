# Repo-local Migration Guide

Use this guide when migrating a repo from the older flow-first plus playbook-root model into the newer repo-local AGENTS contract model.

## Goal

Move from this shape:

- AGENTS depends heavily on the playbook root
- skills are conceptually or physically nested under the playbook root
- playbook modules act as the default execution path

To this shape:

- root `AGENTS.md` is the default operating contract
- `skills/` is a first-line helper layer with its own root
- `docs/playbook/` is optional and used for escalation-only or deeper governance
- audits provide measurable before/after evidence for workflow changes

## When to migrate

- AGENTS has grown dense because too much governance lives outside the repo's main docs
- the repo needs local routing that matches its real code and docs structure
- skills should remain usable even when playbook modules are absent
- the team wants to tune workflow quality without relying on intuition only

## Migration map

### Old model

- primary flow: shared playbook guidance
- helper layer: skills referenced through the playbook root
- long-session and release discipline: mostly module-driven

### New model

- primary flow: root `AGENTS.md`
- helper layer: repo-local `skills/`
- escalation layer: `docs/playbook/` only when extra governance is needed
- evidence layer: audit scripts and optional baseline comparison

## Step-by-step migration

### 1. Inventory the current system

Record:

- current root `AGENTS.md`
- installed skills and their current paths
- installed playbook modules
- any CI or local scripts that reference old paths
- whether there is already an audit or baseline concept in the repo

Do not start moving files before the current reference graph is understood.

### 2. Choose target roots

Recommended defaults:

- `skills/` for reusable workflow helpers
- `docs/playbook/` for optional escalation modules

If the repo already has a stable methodology location, reuse it for `{{PLAYBOOK_ROOT}}`, but do not force skills to stay inside that root unless the repo explicitly wants that layout.

### 3. Rewrite root AGENTS as the default contract

Target shape for root `AGENTS.md`:

- source-of-truth order
- task modes
- core reads
- routing by change type
- small-task fast path
- phase-first execution contract
- skills as helpers, not primary source-of-truth
- playbook escalation rules only where needed
- definition of done

Use [assets/templates/AGENTS.template.md](assets/templates/AGENTS.template.md) as the baseline.

### 4. Move or normalize skills

Checklist:

- install repo-local skills under `skills/`
- update `skills/README.md` as the single source of truth
- replace any `{{PLAYBOOK_ROOT}}/skills/...` assumptions with `{{SKILLS_ROOT}}/...`
- keep skill content generic; move repo-specific semantics into project docs instead of skills

Recommended additions during migration:

- `refactor-guardrails`
- `plan-closeout`

### 5. Reduce playbook to escalation-only where possible

Keep only the modules that add real value for that repo.

Common retained modules:

- `05-release-runbook.md`
- `06-systematic-debugging.md`
- `07-progress-persistence-reanchor.md`
- `09-lessons-driven-improvement.md`

Common migration rule:

- if a task can be routed and completed by root `AGENTS.md` plus repo-local docs and skills, it should not require a playbook read

### 6. Fix cross-references

Update these surfaces together:

- root `AGENTS.md`
- `skills/README.md`
- playbook module skill-first references
- any onboarding or maintenance docs that still mention the old path model

Do not leave stale references such as `{{PLAYBOOK_ROOT}}/skills/...` after migration unless the repo intentionally keeps skills inside the playbook root.

### 7. Add audits after the structure stabilizes

Recommended sequence:

1. finish the AGENTS and skills migration first
2. add AGENTS health audit files
3. run the report and fix structural issues
4. write the baseline only after review
5. add skill usage audit if session-log visibility exists and skill adoption matters

Use [references/audit-tooling.md](references/audit-tooling.md) for the scaffold details.

### 8. Validate the migrated system

Minimum acceptance checklist:

- root `AGENTS.md` works without playbook modules
- `skills/README.md` matches installed skills
- playbook references only point to installed modules
- no stale `{{PLAYBOOK_ROOT}}/skills/...` references remain
- audits, if installed, run successfully and describe their limits honestly

## Common pitfalls

- shortening `AGENTS.md` while accidentally deleting routing coverage
- keeping repo-specific business rules inside generic skill templates
- writing an AGENTS health baseline before fixing missing references
- treating skill usage counts as proof of instruction-following quality
- leaving completed plans as shadow source-of-truth instead of extracting durable knowledge

## Suggested migration output

When completing a migration, summarize:

- target roots chosen for skills and playbook
- skills added, removed, or normalized
- playbook modules retained as escalation-only
- audits installed and whether a baseline was initialized
- residual risks or follow-up cleanup still needed