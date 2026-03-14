---
name: draft-changelog-entry
description: Draft changelog entries from change evidence using the project changelog format.
version: 1.0.0
tags:
  - changelog
  - release-notes
  - documentation
parameters:
  scope:
    type: text
    description: Source scope (diff, commit, PR, or module).
    required: false
    default: current-diff
  version:
    type: text
    description: Target version (for example 1.2.3).
    required: false
    default: pending
---

# Draft Changelog Entry

Generate entries that can be pasted into `CHANGELOG.md`, focused on user-visible impact.

## Inputs

- Scope: `{{scope}}`
- Version: `{{version}}`

## Procedure

1. Extract user-visible additions, changes, fixes, removals, and security impact.
2. Avoid pure internal refactor notes unless they affect external behavior.
3. Compress entries into concise, verifiable statements.
4. Mark uncertain entries with a verification-needed note.

## Output Format

### Version Header
- `## [X.Y.Z] - YYYY-MM-DD`

### Draft Entries
- `Added` (if needed)
- `Changed` (if needed)
- `Fixed` (if needed)
- `Removed` (if needed)
- `Security` (if needed)

### Follow-ups
- Up to 3 items that still need evidence or clearer wording.

## Rules

- If `{{PLAYBOOK_ROOT}}/04-changelog-standard.md` is installed, follow that module.
- Prefer user-visible impact over technical implementation detail.
- Each line should map to at least one verifiable behavior.
