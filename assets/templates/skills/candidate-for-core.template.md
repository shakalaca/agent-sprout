---
name: candidate-for-core
description: Evaluate whether a repeated lesson should be promoted into a core workflow rule.
version: 1.0.0
tags:
  - governance
  - lessons
  - workflow
parameters:
  lesson:
    type: text
    description: Lesson entry or summary under evaluation.
    required: true
  repeats:
    type: number
    description: Observed repeat count for this mistake class.
    required: false
    default: 1
---

# Candidate For Core

Decide if a lesson should remain local or be promoted into core workflow governance.

## Inputs

- Lesson: `{{lesson}}`
- Repeat count: `{{repeats}}`

## Procedure

1. Verify pattern recurrence and impact scope.
2. Check whether prevention rule is generic across tasks and repos.
3. Evaluate maintenance cost and false-positive risk.
4. Recommend keep, promote, or archive.

## Output Format

### Decision
- `keep` | `promote-to-core` | `archive`

### Evidence
- Recurrence summary.
- Scope of applicability.
- Risk/cost tradeoff.

### Promotion Plan
- If promoted: target module(s), insertion point, and acceptance checks.
- If not promoted: conditions that would justify promotion later.

## Rules

- Promotion should require repeated evidence, not a single anecdote.
- Candidate core rules must stay generic and portable.
- If `{{PLAYBOOK_ROOT}}/08-workflow-orchestration.md` or `{{PLAYBOOK_ROOT}}/09-lessons-driven-improvement.md` is installed, align with those modules.
