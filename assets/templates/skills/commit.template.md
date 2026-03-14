---
name: commit
description: Create concise, impact-focused commits consistent with project history.
version: 1.0.0
tags:
  - git
  - commit
  - workflow
parameters:
  scope:
    type: text
    description: Commit scope (staged changes or selected files).
    required: false
    default: staged
---
# Commit

Create a Git commit that is easy to review, trace, and revert when needed.

## Inputs

- Commit scope: staged changes or explicitly selected files.
- Project history sample: latest commits from `git log --oneline -5`.

## Procedure

1. Run `git status` and `git diff` to see changes
2. Review recent commits (`git log --oneline -5`) to match the style
3. Draft a concise commit message:
  - Start with type prefix: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
  - **Focus on IMPACT and WHY, not implementation details**
  - The title should describe the user-visible outcome or bug fixed
  - Use bullet points (dash prefix) only if there are multiple distinct changes
  - Keep each line under 72 characters
  - No emojis
4. Stage relevant files with `git add`
5. Create the commit with your message
6. Run `git status` to confirm

## Output Format

### Commit Summary
- Commit title.
- Optional bullet body when multiple distinct changes exist.

### Verification
- Status check result after commit (`git status`).

## Rules

- Do NOT add attribution lines unless policy requires it
- Do NOT add marketing taglines or links
- Be direct and factual
- Keep it brief and avoid irrelevant details

## Commit Message Guidelines

- Lead with the problem solved or capability added, not the technique used
- BAD: "feat: add pre-edit tagging for AI providers"
- GOOD: "fix: diff persistence survives app restarts"
- BAD: "refactor: extract helper function for validation"
- GOOD: "fix: prevent crash when user input is empty"
- The body can explain HOW if it's non-obvious, but title = IMPACT

## Issue Linking (Optional)

- If your tracker supports auto-close, include an issue reference on its own line
- Examples: `Fixes #123`, `Closes #123`, `Fixes PROJ-123`
