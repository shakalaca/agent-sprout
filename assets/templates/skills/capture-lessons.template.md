---
name: capture-lessons
description: Convert corrections, regressions, or repeated mistakes into executable prevention rules.
version: 1.0.0
tags:
  - lessons
  - quality
  - prevention
parameters:
  event:
    type: text
    description: Correction or failure event summary.
    required: true
  checkpoint:
    type: text
    description: Checkpoint where the rule should be applied.
    required: false
    default: verification-gate
---

# Capture Lessons

Turn one execution miss into a reusable rule and reduce repeated mistake classes.

## Inputs

- Event: `{{event}}`
- Checkpoint: `{{checkpoint}}`

## Procedure

1. Extract the anti-pattern.
2. Define one actionable prevention rule.
3. Attach the rule to a concrete checkpoint.
4. Assign confidence and evaluate whether promotion is needed.

## Output Format

### Lesson Entry (Single Line)
- `YYYY-MM-DD | mistake pattern | prevention rule | trigger checkpoint | confidence`

### Application Advice
- 1-2 checkpoints to apply early in next similar task.

### Promotion Decision
- `keep` | `candidate-for-core` | `archive`
- One-line rationale.

## Rules

- If `{{PLAYBOOK_ROOT}}/09-lessons-driven-improvement.md` is installed, keep the format aligned with that module.
- Rules must be concrete and executable, not generic reminders.
- If similar issue repeats 3 times or more, mark `candidate-for-core`.
