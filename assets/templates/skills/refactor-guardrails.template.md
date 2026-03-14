---
name: refactor-guardrails
description: Preserve shipped semantics during structural refactors, modular extraction, entrypoint slimming, or test-suite restructuring.
version: 1.0.0
tags:
  - refactor
  - regression
  - architecture
  - reliability
---

# Refactor Guardrails

Use this skill when the task changes structure without intending to change product semantics.

## Inputs

- Refactor scope: file, folder, or subsystem being reorganized.
- Expected preserved behavior: the runtime contract that must not change.

## Procedure

1. Identify the shipped behavior that must remain stable.
2. Identify the dependency shape or caller contract most likely to drift.
3. Define the smallest regression test that can lock current behavior.
4. Move one responsibility cluster at a time.
5. After each slice, run targeted checks before continuing.

## Output Format

### Refactor Risk

- Preserved behavior.
- Highest-risk contract boundary.

### Guard Strategy

- Characterization or regression test to add or strengthen.
- Validation steps to run during the refactor.

### Closeout

- Contract risk addressed.
- Residual risk, if any.

## Rules

- Preserve shipped semantics before improving structure.
- Do not assume collection-like or option-like shapes are interchangeable.
- Prefer real entrypoint smoke coverage over helper-only tests when wiring changes.
- If a regression appears, stop further decomposition until the root cause is understood and protected by a test.