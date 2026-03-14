---
name: plan-closeout
description: Close a completed task plan by extracting durable knowledge into long-lived docs and leaving the plan as a cold record.
version: 1.0.0
tags:
  - plans
  - docs
  - closeout
parameters:
  plan:
    type: text
    description: Path to the completed or nearly completed plan file.
    required: true
  outcome:
    type: text
    description: Short summary of what shipped or what was decided.
    required: true
---

# Plan Closeout

Use this skill after implementation or plan-doc work is effectively complete and the plan should stop being a working document.

## Inputs

- Plan: `{{plan}}`
- Outcome: `{{outcome}}`

## Procedure

1. Read the target plan and identify content that is still uniquely valuable.
2. Classify each durable item into an existing long-lived destination such as `docs/project/`, `docs/specs/`, `docs/notes/`, or another stable reference doc.
3. Update the long-lived destination docs first.
4. Mark the plan `Completed` if it is not already.
5. Add or refresh a short closeout note covering the shipped outcome, residual risk, validation result, and extracted destinations.

## Output Format

### Closeout Summary

- Plan path.
- Durable docs updated.
- Residual risk, if any.

### Extraction Decision

- `extracted` | `no-durable-content`
- One-line rationale.

### Lessons Decision

- `added` | `not-needed`
- One-line rationale.

## Rules

- Completed plans are cold records, not default reading material.
- If a future task still depends on unique plan content, extraction is incomplete.
- Prefer updating existing docs over creating new ones unless the scope clearly requires a new file.