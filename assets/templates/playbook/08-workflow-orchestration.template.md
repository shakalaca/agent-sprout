# Workflow Orchestration

Execution state machine for non-trivial tasks.

## State Machine

1. Plan
2. Explore (subagents)
3. Implement
4. Verify
5. Review
6. Learn

## When To Enter Plan Mode

- Three or more concrete steps
- Architectural or schema decisions
- Uncertain blast radius
- Verification requiring multiple commands or datasets

If implementation drifts, stop and re-plan immediately.

## Subagent Strategy

- One clear objective per subagent.
- Main context owns synthesis and decisions.
- Merge subagent outputs into one explicit decision before implementation.

## Task Management Protocol

- Use project task files (for example `docs/plans/*` or `tasks/*`) for auditability.
- Sequence: plan first, implement next, keep status current, add review summary at closeout.
- For long-session or context compact/compression events, apply `{{PLAYBOOK_ROOT}}/07-progress-persistence-reanchor.md` before resuming implementation.

## Continuity Checkpoint (07 Integration)

- If context compact/compression is requested, produce a continuity snapshot before compression.
- After resume, restore snapshot and re-check `00/01/08` gates.
- If snapshot is missing, do not continue implementation until continuity state is rebuilt.

## Verification Gate

No completion claim is valid without:

- proof command(s)
- exit status
- key output summary
