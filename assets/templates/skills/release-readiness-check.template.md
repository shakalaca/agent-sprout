---
name: release-readiness-check
description: Check whether verification, build, version, and changelog evidence are complete before release.
version: 1.0.0
tags:
  - release
  - deploy
  - verification
parameters:
  scope:
    type: select
    description: Release scope.
    required: false
    default: all
    options:
      - all
      - web
      - functions
      - targeted-module
  version:
    type: text
    description: Target version.
    required: false
    default: pending
---

# Release Readiness Check

Run an auditable readiness check before deployment to avoid shipping with hidden gaps.

## Inputs

- Release scope: `{{scope}}`
- Target version: `{{version}}`

## Procedure

1. Check for fresh targeted test and build evidence.
2. Check consistency across version fields/files.
3. Check that `CHANGELOG.md` is updated and verifiable.
4. Summarize deployment scope, risk, and rollback/fix plan.
5. Mark missing items as blockers.

## Output Format

### Readiness
- `ready` | `blocked` | `needs-review`
- One-line summary.

### Checklist
- Verification: `pass/fail/missing`
- Build: `pass/fail/missing`
- Version consistency: `pass/fail/missing`
- Changelog: `pass/fail/missing`
- Deployment scope defined: `pass/fail/missing`

### Blockers And Risks
- Up to 5 blockers.
- Known risks and impact boundaries.

### Suggested Actions
- Minimal next actions in priority order.

## Rules

- Never output `ready` without fresh verification evidence.
- If `{{PLAYBOOK_ROOT}}/05-release-runbook.md` is installed, keep conclusions aligned with that module.
- Mark uncertain items as `missing` instead of assuming pass.
