---
name: debug-root-cause
description: Run a root-cause-first debugging loop with minimal experiments and focused fix direction.
version: 1.0.0
tags:
  - debugging
  - root-cause
  - reliability
parameters:
  symptom:
    type: text
    description: Error, failing test, or abnormal behavior summary.
    required: true
  scope:
    type: text
    description: Suspected impact scope (files, module, workflow).
    required: false
    default: unknown
---

# Debug Root Cause

Build one high-confidence root-cause hypothesis for a single problem, without stacking speculative patches.

## Inputs

- Symptom: `{{symptom}}`
- Scope: `{{scope}}`

## Procedure

1. Reproduce and record stable reproduction conditions.
2. List 2-3 testable root-cause hypotheses.
3. Test one variable at a time with minimal experiments.
4. Converge to one high-confidence root cause from evidence.
5. Propose one single-purpose fix and targeted verification commands.

## Output Format

### Problem Definition
- One line for reproducible symptom and trigger condition.

### Hypothesis Matrix
- Hypothesis A/B/C with supporting evidence, counter-evidence, and confidence.

### Minimal Experiment
- Steps.
- Expected result.
- Actual result.

### Fix Proposal
- Smallest safe change.
- Impact boundary.

### Verification
- 1-3 targeted commands and pass criteria.

## Rules

- Do not apply multiple speculative fixes in one cycle.
- After three consecutive failures, escalate to architecture/assumption reassessment.
- If `{{PLAYBOOK_ROOT}}/06-systematic-debugging.md` is installed, keep conclusions aligned with that module.
