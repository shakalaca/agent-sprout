const assert = require('assert');
const {
    buildAgentsHealthReport,
    compareAgentsHealth,
    readBaselineReport
} = require('../lib/agents_health');

function runAgentsHealthSuite() {
    const report = buildAgentsHealthReport();
    const baseline = readBaselineReport();
    const comparison = compareAgentsHealth(report, baseline);

    assert.strictEqual(report.summary.requiredSectionsMissing, 0, 'AGENTS.md is missing required sections');
    assert.strictEqual(report.summary.routeExpectationsMissing, 0, 'AGENTS.md is missing required route expectations');
    assert.strictEqual(report.summary.directMissingReferenceCount, 0, 'AGENTS.md has missing direct references');
    assert.strictEqual(report.summary.routedMissingReferenceCount, 0, 'routed documents have missing references');
    assert.strictEqual(comparison.pass, true, `AGENTS.md health regressed: ${comparison.hardRegressions.join('; ')}`);
}

module.exports = { runAgentsHealthSuite };