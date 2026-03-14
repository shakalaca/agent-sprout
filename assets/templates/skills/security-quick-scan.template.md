---
name: security-quick-scan
description: Fast, practical security review for current file, changed files, or target path
version: 1.1.0
tags:
  - security
  - review
  - code-analysis
parameters:
  focus:
    type: select
    description: Primary security area to inspect
    required: false
    default: all
    options:
      - all
      - auth
      - data
      - inputs
      - secrets
      - dependencies
---

# Security Quick Scan

Perform a short, evidence-based security review. Prioritize real, exploitable risk over theoretical concerns.

## Inputs

- Focus: `{{focus}}`
- `all`: Run all checks below.
- `auth`: Authentication, authorization, session control.
- `data`: Sensitive data exposure, storage, transport, logging.
- `inputs`: Validation, injection, unsafe parsing/deserialization.
- `secrets`: Hardcoded keys, tokens, credentials, insecure config.
- `dependencies`: Known vulnerable packages, risky version drift.

## Procedure

1. Identify attack surface in the reviewed scope.
2. Find only high-confidence issues with concrete evidence.
3. Rank findings by severity and exploitability.
4. Provide direct fixes and minimal verification steps.

## Output Format

Use this exact structure:

### Security Status
- `Secure` | `Minor Issues` | `Major Concerns`
- One-line summary of overall risk.

### Top Findings (max 3)
- `[Severity: Critical/High/Medium]` Issue summary
  - Evidence: file/path and behavior
  - Impact: what could happen
  - Fix: smallest safe change

### Quick Wins (max 3)
- Short, low-risk improvements with high security value.

### Verification
- 1-2 concrete checks to confirm each critical/high issue is fixed.

## Rules

- Keep response concise and actionable.
- Do not report speculative issues without evidence.
- If no meaningful issue is found, state that clearly and suggest hardening actions.
