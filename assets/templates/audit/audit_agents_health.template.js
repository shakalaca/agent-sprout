#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const {
    DEFAULT_AGENTS_PATH,
    DEFAULT_BASELINE_PATH,
    buildAgentsHealthReport,
    compareAgentsHealth,
    readBaselineReport
} = require('./lib/agents_health');

function parseArgs(argv) {
    const options = {
        agentsPath: DEFAULT_AGENTS_PATH,
        baselinePath: DEFAULT_BASELINE_PATH,
        outputJson: false,
        failOnRegression: false,
        writeBaseline: false
    };

    for (let index = 0; index < argv.length; index += 1) {
        const value = argv[index];
        if (value === '--agents-path') {
            options.agentsPath = path.resolve(argv[index + 1]);
            index += 1;
            continue;
        }
        if (value === '--baseline') {
            options.baselinePath = path.resolve(argv[index + 1]);
            index += 1;
            continue;
        }
        if (value === '--json') {
            options.outputJson = true;
            continue;
        }
        if (value === '--fail-on-regression') {
            options.failOnRegression = true;
            continue;
        }
        if (value === '--write-baseline') {
            options.writeBaseline = true;
            continue;
        }
    }

    return options;
}

function formatReport(report, comparison) {
    const lines = [];
    lines.push(`AGENTS path: ${report.agentsPath}`);
    lines.push(`Health score: ${report.summary.score} (${report.summary.status})`);
    lines.push(`Lines: ${report.summary.totalLines} total / ${report.summary.nonEmptyLines} non-empty`);
    lines.push(`Required sections: ${report.summary.requiredSectionsPresent}/${report.summary.requiredSectionsPresent + report.summary.requiredSectionsMissing}`);
    lines.push(`Route coverage: ${report.summary.routeExpectationsMatched}/${report.summary.routeExpectationsMatched + report.summary.routeExpectationsMissing}`);
    lines.push(`Direct missing refs: ${report.summary.directMissingReferenceCount}`);
    lines.push(`Routed missing refs: ${report.summary.routedMissingReferenceCount}`);
    lines.push(`Detailed sections: ${report.summary.detailedSectionCount}`);

    if (!comparison) {
        return lines.join('\n');
    }

    lines.push('');
    lines.push(`Baseline: ${comparison.baselinePath}`);
    lines.push(`Comparison pass: ${comparison.pass ? 'yes' : 'no'}`);

    lines.push('');
    lines.push('Hard regressions:');
    if (comparison.hardRegressions.length === 0) {
        lines.push('- none');
    } else {
        comparison.hardRegressions.forEach(item => lines.push(`- ${item}`));
    }

    lines.push('');
    lines.push('Advisory regressions:');
    if (comparison.advisoryRegressions.length === 0) {
        lines.push('- none');
    } else {
        comparison.advisoryRegressions.forEach(item => lines.push(`- ${item}`));
    }

    lines.push('');
    lines.push('Improvements:');
    if (comparison.improvements.length === 0) {
        lines.push('- none');
    } else {
        comparison.improvements.forEach(item => lines.push(`- ${item}`));
    }

    return lines.join('\n');
}

function main() {
    const options = parseArgs(process.argv.slice(2));
    const report = buildAgentsHealthReport({ agentsPath: options.agentsPath });

    if (options.writeBaseline) {
        fs.mkdirSync(path.dirname(options.baselinePath), { recursive: true });
        fs.writeFileSync(options.baselinePath, JSON.stringify(report, null, 2) + '\n', 'utf8');
    }

    let comparison = null;
    if (fs.existsSync(options.baselinePath)) {
        const baselineReport = readBaselineReport(options.baselinePath);
        comparison = {
            baselinePath: options.baselinePath,
            ...compareAgentsHealth(report, baselineReport)
        };
    }

    if (options.outputJson) {
        process.stdout.write(JSON.stringify({ report, comparison }, null, 2) + '\n');
    } else {
        process.stdout.write(formatReport(report, comparison) + '\n');
    }

    if (options.failOnRegression && comparison && !comparison.pass) {
        process.exit(1);
    }
}

main();