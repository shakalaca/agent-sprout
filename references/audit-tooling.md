# Audit Tooling

Use this file when deciding whether to scaffold workflow-audit tooling together with AGENTS, skills, and optional playbook modules.

## Why add audits

- AGENTS and skill systems tend to drift as repos grow.
- A workflow change that feels cleaner can still reduce routing clarity or break helper discovery.
- Audits provide before/after evidence so improvements are reviewed instead of assumed.

## Available audits

### Skill usage audit

Purpose:

- inspect local session logs
- identify which `skills/*.md` files were actually read
- show whether a new skill or index is being used in practice

What it proves:

- a session loaded the skill file

What it does not prove:

- the agent followed every instruction in that skill perfectly

### AGENTS health audit

Purpose:

- measure root `AGENTS.md` structure
- confirm required routing sections still exist
- verify direct and routed document references resolve
- compare the current state against an accepted baseline

What it proves:

- the AGENTS contract still matches the expected shape and route coverage

What it does not prove:

- the repo's actual code or docs are semantically correct

## Recommended target layout

Use this layout unless the target repo already has an established testing convention:

```text
tests/
├── audit_skill_usage.js
├── audit_agents_health.js
├── baselines/
│   └── agents_health_baseline.json
├── lib/
│   └── agents_health.js
└── suites/
	└── agents_health_suite.js
```

Notes:

- `tests/baselines/agents_health_baseline.json` is generated after review; do not ship a fake accepted baseline.
- `tests/suites/agents_health_suite.js` is optional if the repo does not have a suite runner, but recommended when the repo already uses a shared test harness.
- keep audit file names stable once adopted so local scripts, CI, and docs do not drift.

Scaffold asset helpers:

- `assets/templates/audit/baselines/agents_health_baseline.example.json`
- `assets/templates/audit/wiring/run_tests.agents_health.template.js`

## Scaffold levels

### Minimal audit scaffold

Install:

- `tests/audit_skill_usage.js`
- `tests/audit_agents_health.js`
- `tests/lib/agents_health.js`
- optional reference only: `assets/templates/audit/baselines/agents_health_baseline.example.json`

Use this when the repo wants local evidence but does not yet have a stable test runner or baseline policy.

### Full audit scaffold

Install:

- `tests/audit_skill_usage.js`
- `tests/audit_agents_health.js`
- `tests/lib/agents_health.js`
- `tests/suites/agents_health_suite.js`
- `tests/baselines/agents_health_baseline.json` after review
- optional starting point: `assets/templates/audit/wiring/run_tests.agents_health.template.js`

Use this when AGENTS evolution is expected and the repo wants repeatable regression protection.

## Baseline bootstrap workflow

1. Scaffold root `AGENTS.md`, `skills/`, and any selected playbook modules first.
2. Install the AGENTS health audit files.
3. Run the raw report before creating any baseline.
4. Review required sections, route coverage, direct references, and routed references.
5. Fix missing references or routing holes before accepting the report.
6. Write the first baseline only after the report reflects the intended steady state.

Suggested commands:

```bash
node tests/audit_agents_health.js --json
node tests/audit_agents_health.js --write-baseline --baseline tests/baselines/agents_health_baseline.json
```

Baseline rules:

- never commit a baseline that hides known missing references or missing required sections
- refresh the baseline only together with an intentional AGENTS improvement or audit-logic change
- if audit logic changes, review whether the current baseline should be regenerated in the same change
- the example baseline file is for structure reference only, not for direct promotion into a repo as accepted baseline

## Skill usage bootstrap workflow

1. Install `tests/audit_skill_usage.js`.
2. Confirm the environment actually has local session logs to inspect.
3. Run the audit once without filters to confirm repo matching works.
4. Use `--since` for focused before/after comparisons when testing new skills or routing changes.

Suggested commands:

```bash
node tests/audit_skill_usage.js
node tests/audit_skill_usage.js --since 2026-03-01
node tests/audit_skill_usage.js --json
```

## CI and local-guardrail guidance

- use `--fail-on-regression` for AGENTS health only when the repo has an accepted baseline
- keep skill usage audit as informational by default; it is not a reliable merge gate
- if the repo has a shared test runner, add `tests/suites/agents_health_suite.js` and wire it into the normal regression pass
- document any custom baseline path if it differs from the default `tests/baselines/agents_health_baseline.json`

Suggested Node wiring pattern:

```js
const { runAgentsHealthSuite } = require('./suites/agents_health_suite');

function runAllSuites() {
	runExistingSuites();
	runAgentsHealthSuite();
}
```

## Cross-platform notes

- prefer path normalization inside audits because local session logs may record Windows or POSIX paths
- do not make the skill usage audit depend on one shell command shape only; direct file-read tooling and shell-based reads may both appear
- if the team cannot access local session logs in CI, keep the skill usage audit local-only and document that limitation

## When to install

- the repo will keep evolving its AGENTS contract
- the team wants evidence before refreshing workflow guidance
- skill count is growing and discovery quality matters
- the repo wants a baseline guard against broken AGENTS references

## When to skip

- the repo is tiny and AGENTS rarely changes
- the team does not have access to local session logs, making the usage audit low value
- a one-off bootstrap does not justify maintaining a baseline

## Recommended workflow

1. Scaffold AGENTS and skills first.
2. Add audits only if the repo expects workflow iteration or wants regression guardrails.
3. Review the first AGENTS health report before writing the baseline.
4. Refresh the baseline only after an intentional improvement is accepted.
5. Treat skill usage counts as supporting evidence, not as a compliance score.

## Template assets

- `assets/templates/audit/audit_skill_usage.template.js`
- `assets/templates/audit/audit_agents_health.template.js`
- `assets/templates/audit/baselines/agents_health_baseline.example.json`
- `assets/templates/audit/lib/agents_health.template.js`
- `assets/templates/audit/suites/agents_health_suite.template.js`
- `assets/templates/audit/wiring/run_tests.agents_health.template.js`
- `assets/templates/audit/README.template.md`

## Quality bar

- audit scope is explicit
- measured signals are explainable
- baseline updates are reviewed, not automatic
- audit output distinguishes evidence from inference