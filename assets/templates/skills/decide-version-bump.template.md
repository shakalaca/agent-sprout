---
name: decide-version-bump
description: Evaluate semantic version bump level from observable behavior and contract impact.
version: 1.0.0
tags:
  - versioning
  - semver
  - release
parameters:
  scope:
    type: text
    description: Scope to evaluate (files, module, PR, or diff).
    required: false
    default: current-diff
  contracts:
    type: select
    description: Whether external contracts or API behavior changed.
    required: false
    default: unknown
    options:
      - unknown
      - none
      - backward-compatible
      - breaking
---

# Decide Version Bump

Determine whether this change should use `PATCH`, `MINOR`, or `MAJOR` and provide auditable rationale.

## Inputs

- Scope: `{{scope}}`
- Contract impact: `{{contracts}}`

## Procedure

1. Check whether behavior is a fix without external contract change.
2. Check whether behavior adds backward-compatible capability.
3. Check whether contract behavior is breaking.
4. If evidence is insufficient, choose higher-risk level and list missing evidence.

## Output Format

### Recommended Level
- `PATCH` | `MINOR` | `MAJOR`

### Rationale
- Contract impact: one-line conclusion.
- Behavior impact: one-line conclusion.
- Risk level: `low` | `medium` | `high`.

### Missing Evidence
- Up to 3 critical checks or docs still needed.

### Next Updates
- Items to sync next (for example `CHANGELOG.md`, version files, release checklist).

## Rules

- Prioritize observable behavior and contracts over implementation details.
- If uncertain, choose the higher impact level and record why.
- If `{{PLAYBOOK_ROOT}}/03-versioning-policy.md` is installed, keep the conclusion aligned with that module.
