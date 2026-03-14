# Audit Tooling

These templates add evidence-oriented workflow audits to a repo that uses root `AGENTS.md`, `skills/`, and optional playbook modules.

## Included templates

- `audit_skill_usage.js`: scans local Codex session logs and reports which `skills/*.md` files were read
- `audit_agents_health.js`: builds an AGENTS health report and compares it to an accepted baseline
- `baselines/agents_health_baseline.example.json`: review-only example of the baseline file shape
- `lib/agents_health.js`: shared report and comparison logic
- `suites/agents_health_suite.js`: optional test-harness wrapper for repos with a shared regression runner
- `wiring/run_tests.agents_health.template.js`: example of wiring the AGENTS health suite into an existing Node test runner

## Recommended target paths

- `tests/audit_skill_usage.js`
- `tests/audit_agents_health.js`
- `tests/lib/agents_health.js`
- `tests/suites/agents_health_suite.js`
- `tests/baselines/agents_health_baseline.json`

## Baseline example file

- use `baselines/agents_health_baseline.example.json` only as a shape reference
- do not copy it into `tests/baselines/agents_health_baseline.json` unchanged and treat it as accepted truth
- generate the real baseline from the target repo after review

## Baseline bootstrap

1. Run `node tests/audit_agents_health.js --json` and review the report.
2. Fix missing required sections, route gaps, or broken references first.
3. Write the first baseline only after the report reflects the intended steady state.

Suggested command:

```bash
node tests/audit_agents_health.js --write-baseline --baseline tests/baselines/agents_health_baseline.json
```

## Usage notes

- write the AGENTS health baseline only after reviewing the current report
- use skill usage counts as evidence of file reads, not proof of perfect instruction-following
- keep audit expectations aligned with the actual AGENTS structure after intentional workflow changes
- if the repo has a shared test runner, wire `tests/suites/agents_health_suite.js` into that runner instead of duplicating assertions elsewhere
- use `wiring/run_tests.agents_health.template.js` as a starting point when the repo has a Node-based `tests/run_tests.js` style entrypoint