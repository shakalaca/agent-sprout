---
name: reanchor
description: Rebuild objective, boundaries, and immediate next step after long sessions or interruptions.
version: 1.0.0
tags:
  - session
  - alignment
  - workflow
parameters:
  trigger:
    type: select
    description: Trigger reason.
    required: false
    default: long-session
    options:
      - long-session
      - interruption
      - scope-drift
      - user-request
---

# Re-anchor Session

Create an actionable alignment snapshot so long or interrupted sessions return to a single goal axis.

## Inputs

- Trigger reason: `{{trigger}}`

## Procedure

1. Restate current objective and success criteria.
2. Restate constraints, out-of-scope, and do-not-break boundaries.
3. Summarize completed work, verification status, and blockers.
4. Define minimal next steps and stop condition.

## Output Format

### Objective And Boundaries
- Current objective.
- Out-of-scope items.

### Progress Snapshot
- Completed work.
- Verification status.
- Blockers (`none` if empty).

### Next Steps
- Immediate actions (1-3 items).
- When another re-anchor is required.

## Rules

- Trigger at least once in long sessions (for example: more than 20 turns or 50 tool calls).
- After output, return to the repo-local AGENTS flow.
- If `{{PLAYBOOK_ROOT}}/07-progress-persistence-reanchor.md` is installed, align the snapshot and next-step handoff with that module.
