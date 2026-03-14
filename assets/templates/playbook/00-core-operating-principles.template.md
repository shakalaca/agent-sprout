# Core Operating Principles

Non-negotiable execution rules for consistent quality across agents and environments.

## Non-Negotiables

1. Simplicity First: Choose the smallest change that solves the full problem.
2. Root Cause First: Fix causes, not symptoms or temporary side effects.
3. Minimal Impact: Touch only required files and behavior boundaries.
4. Senior Quality Bar: Ship only work that would pass strict peer review.

## Completion Standard

- Do not claim done without fresh verification evidence.
- Include command(s), exit status, and key outcome.
- If verification fails, report real status and corrective next step.

## Re-plan Trigger

Stop implementation and return to planning when any of these occur:

- scope expands beyond original acceptance criteria
- assumptions are invalidated by evidence
- repeated failed attempts indicate architecture mismatch
- verification output contradicts expected behavior

## Design Checkpoint (Balanced Elegance)

For non-trivial changes, run one checkpoint before finalizing:

1. Is there a simpler design that preserves correctness?
2. Does this reduce future maintenance burden?
3. Would the same design still be chosen with current knowledge?

If all answers are no, keep the simpler implementation.
