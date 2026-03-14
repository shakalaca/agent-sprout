# Execution Flow

## Flow

1. Clarify scope and acceptance criteria
2. Freeze key decisions
3. Implement in small increments
4. Run targeted verification
5. Release and record outcomes

## Mandatory Gates

- Gate A (before implementation): Scope + acceptance criteria are explicit and observable
- Gate B (before verification): Task items and decision/summary logs are updated
- Gate C (before release): Targeted tests and build are freshly executed and read
- Gate D (before closeout): Version/changelog/release evidence are recorded

## Verification Before Completion

- Never claim "done", "fixed", or "passed" without fresh verification output.
- Record command, exit status, and key result.
- If verification fails, report actual status and next corrective step.

## Update Cadence

- Mark completed tasks immediately
- Keep decision log current
- Keep summary log current
- Log verification evidence when claiming milestone completion

## Long-Session Re-anchor

Run a re-anchor check in long sessions (for example: >20 turns or >50 tool calls):

1. Restate current goal
2. Restate constraints and out-of-scope items
3. Restate completed work and pending milestones
4. Correct drift before continuing

## Context Compact/Compression Handoff

When the platform requests context compact/compression, or the user asks to compress context:

1. Generate continuity snapshot using `{{PLAYBOOK_ROOT}}/07-progress-persistence-reanchor.md`
2. Keep only objective, constraints, completed milestones, verification status, blockers, and next first step
3. Record where this snapshot is stored in the active task plan
4. After resume, re-check `00/01/08` gates before implementation continues
