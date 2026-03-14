# Progress Persistence And Re-anchor

## Purpose

Preserve execution context across interruptions and prevent drift in long sessions.

## Persistence Triggers

Record progress immediately when:

- Non-trivial task starts
- Each milestone/subtask completes
- A key decision changes
- A blocker is found
- Session pauses or ends

## Minimum Persistence Payload

- Current objective
- Last completed item
- Verification status
- Current blocker (or `none`)
- Next first step

## Long-Session Re-anchor

- Skill-first: optionally run `{{SKILLS_ROOT}}/reanchor.md` to generate the alignment snapshot.
- Trigger when session exceeds 20 turns, exceeds 50 tool calls, user requests re-alignment, or context compact/compression is requested.
- Use `{{PLAYBOOK_ROOT}}/01-execution-flow.md` long-session re-anchor steps as the single source of procedure.
- After re-anchor, return to governance gates in `{{PLAYBOOK_ROOT}}/00-core-operating-principles.md`, `{{PLAYBOOK_ROOT}}/01-execution-flow.md`, and `{{PLAYBOOK_ROOT}}/08-workflow-orchestration.md` before continuing.

## Context Compact/Compression Protocol

Before context compact/compression, generate one continuity artifact with this minimum shape:

- Current objective
- Constraints and out-of-scope boundaries
- Completed milestones
- Latest verification status and evidence pointer
- Open blockers (or `none`)
- Next first step

After resume:

1. Restore this artifact as the active working context
2. Re-check workflow gates in `00/01/08`
3. Continue implementation only after alignment is confirmed
