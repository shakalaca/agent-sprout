# Systematic Debugging

Skill-first: run `{{SKILLS_ROOT}}/debug-root-cause.md` first; this module remains the governance baseline.

## Principle

No blind fixes. Identify root cause before implementation changes.

## Debugging Flow

1. Root-cause investigation: Read errors fully, reproduce, trace data flow
2. Pattern comparison: Find working examples and list meaningful differences
3. Hypothesis testing: Test one variable at a time with minimal changes
4. Fix and verify: Apply single-purpose fix and run targeted verification

## Guardrails

- Do not stack speculative fixes
- Do not continue after repeated failed attempts without reassessment
- Preserve a short evidence trail for each attempt

## Escalation Rule

If the same problem fails three times:

1. Stop iterative patching
2. Summarize attempts and findings
3. Reassess architecture/assumptions before next change
