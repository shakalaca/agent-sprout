# Release Runbook

Skill-first: run `{{SKILLS_ROOT}}/release-readiness-check.md` to identify gaps before full release flow.

## Suggested Order

1. Run targeted verification
2. Run build
3. Bump version
4. Verify version file consistency
5. Update changelog
6. Deploy with smallest safe scope
7. Record release evidence

## Verification Before Completion

- Do not mark release-ready without fresh verification from this run
- Record exact command(s), exit status, and pass/fail counts when available
- If any check fails, stop release expansion and document rollback or fix plan

## Record Fields

- Version
- Commit/release ID
- Deployment time
- Deployment scope
- Verification result
- Known risks and follow-up
- Verification evidence (commands + exit status + key output summary)
