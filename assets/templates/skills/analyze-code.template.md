---
name: analyze-code
description: Evidence-based code quality review for a target file, folder, or diff scope.
version: 1.0.0
tags:
  - code-quality
  - review
  - maintainability
parameters:
  scope:
    type: text
    description: File path, folder path, or changed-file scope to inspect.
    required: false
    default: current-file-or-diff
---

# Analyze Code

Run a focused quality review with concrete findings and minimal, actionable fixes.

## Inputs

- Scope: `{{scope}}`
- If no scope is provided, inspect the current file or current diff.

## Procedure

1. Map core responsibilities and data flow in scope.
2. Identify high-confidence issues (bug risk, complexity, duplication, maintainability).
3. Compare against nearby project patterns to avoid style drift.
4. Propose the smallest safe improvement per issue.
5. Suggest targeted verification steps for each significant fix.

## Output Format

### Quality Status
- `Healthy` | `Needs Attention` | `High Risk`
- One-line summary of overall code health.

### Findings (max 5)
- `[Severity: High/Medium/Low]` Finding summary
  - Evidence: file/path and behavior
  - Impact: maintenance or runtime risk
  - Fix: smallest safe change

### Verification
- 1-2 targeted checks or tests for high/medium findings.

## Rules

- Prioritize evidence over style preference.
- Avoid speculative findings without concrete signals.
- Keep recommendations aligned with existing project conventions.
