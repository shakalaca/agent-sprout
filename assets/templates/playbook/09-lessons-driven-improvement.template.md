# Lessons-Driven Improvement

Convert user corrections and execution misses into reusable prevention rules.

Skill-first: run `{{SKILLS_ROOT}}/capture-lessons.md` to draft entries.

## Mandatory Trigger

After any user correction or post-verification miss:

1. Add or update an item in `tasks/lessons.md`.
2. Capture the anti-pattern and prevention rule.
3. Link the rule to a concrete execution checkpoint.

## Lessons Entry Format

Use one line per lesson:

- date
- mistake pattern
- prevention rule
- trigger checkpoint
- confidence (low/medium/high)

## Session Start Review

At the beginning of each session:

1. Read relevant lessons for the target area.
2. Select active lessons to apply.
3. Keep only lessons that are still useful.

## Promotion And Cleanup Rules

Promote a lesson into core workflow when it repeats in multiple tasks.

- repeated pattern count >= 2: keep as active lesson
- repeated pattern count >= 3: promote to workflow rule candidate
- stale or irrelevant lessons: archive or remove

## Quality Goal

Reduce repeated mistake classes over time while keeping workflow lightweight.
