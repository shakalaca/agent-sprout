---
name: write-tests
description: Generate targeted tests that match project conventions and cover behavior-critical scenarios.
version: 1.0.0
tags:
  - testing
  - coverage
  - quality
parameters:
  scope:
    type: text
    description: Function, file, or module to cover with tests.
    required: false
    default: current-file-or-selection
---

# Write Tests

Create or extend tests for meaningful behavior coverage with minimal fragile assertions.

## Inputs

- Scope: `{{scope}}`
- If no scope is provided, use the current file or selected symbol.

## Procedure

1. Detect existing test framework and local test style in the repository.
2. Derive behavior-driven cases: happy path, boundary cases, and error handling.
3. Reuse existing fixtures/mocks before introducing new test utilities.
4. Add tests in the nearest appropriate test location.
5. List targeted commands to run and validate the new tests.

## Output Format

### Coverage Plan
- Components/functions covered.
- Cases added (happy path, edges, errors).

### Added Tests
- File paths updated.
- Brief rationale for each test block.

### Verification
- Exact test command(s) to run.
- Expected pass criteria.

## Rules

- Follow project naming and assertion patterns.
- Avoid over-mocking when integration-level behavior can be tested directly.
- Prefer deterministic tests with clear failure messages.
