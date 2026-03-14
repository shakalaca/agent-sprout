const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const DEFAULT_AGENTS_PATH = path.join(ROOT, 'AGENTS.md');
const DEFAULT_BASELINE_PATH = path.join(ROOT, 'tests', 'baselines', 'agents_health_baseline.json');

const REQUIRED_SECTIONS = [
    '## Source-of-truth priority',
    '## Operating mode',
    '## Task modes',
    '## Core reads',
    '## Task routing (by change type)',
    '## Small-task fast path',
    '## Definition of done'
];

const DETAILED_SECTION_HEADINGS = [
    '## Planning and plan docs',
    '## Execution contract (phase-first)',
    '## Skills (helpers, not primary flow)'
];

const REPO_ROOT_FILE_REFERENCES = new Set([
    'AGENTS.md',
    'README.md',
    'CHANGELOG.md'
]);

const REPO_ROOT_PREFIXES = [
    'docs/',
    'skills/',
    'tests/',
    'src/',
    'package/',
    'app/',
    'reference/'
];

const ROUTE_EXPECTATIONS = [
    {
        id: 'core-read-project',
        description: 'Core reads should include the project index.',
        test: content => content.includes('- Project index: `docs/project/README.md`')
    },
    {
        id: 'core-read-specs',
        description: 'Core reads should include the specs index.',
        test: content => content.includes('- Specs index: `docs/specs/README.md`')
    },
    {
        id: 'core-read-plans',
        description: 'Core reads should include the planning index.',
        test: content => content.includes('- Planning index: `docs/plans/README.md`')
    },
    {
        id: 'core-read-notes',
        description: 'Core reads should include notes or caveats.',
        test: content => content.includes('- Notes and caveats: `docs/notes/`')
    },
    {
        id: 'route-project',
        description: 'Project behavior should route to project docs.',
        test: content => content.includes('- Product behavior, architecture, ownership, or integration semantics: `docs/project/`')
    },
    {
        id: 'route-specs',
        description: 'Acceptance changes should route to specs docs.',
        test: content => content.includes('- Acceptance, scope, and user-visible requirements: `docs/specs/`')
    },
    {
        id: 'route-notes',
        description: 'Caveats should route to notes docs.',
        test: content => content.includes('- Known caveats, rollout state, and manual QA: `docs/notes/`')
    },
    {
        id: 'skills-index',
        description: 'AGENTS should point to the skill index.',
        test: content => content.includes('Use `skills/README.md` as the single source of truth for installed skill index entries.')
    },
    {
        id: 'skill-refactor-guardrails',
        description: 'AGENTS should route refactors to refactor guardrails.',
        test: content => content.includes('`skills/refactor-guardrails.md` for refactors, modular extraction, entrypoint slimming, or test-suite restructuring')
    },
    {
        id: 'skill-plan-closeout',
        description: 'AGENTS should route plan closeout to the plan-closeout skill.',
        test: content => content.includes('`skills/plan-closeout.md` for extracting durable knowledge from completed plans')
    },
    {
        id: 'playbook-escalation',
        description: 'AGENTS should define playbook escalation behavior.',
        test: content => content.includes('## Escalation to playbook (only when needed)')
    }
];

function normalizePath(relativePath) {
    return String(relativePath).replace(/\\/g, '/');
}

function readUtf8(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function countNonEmptyLines(content) {
    return content
        .split(/\r?\n/)
        .filter(line => line.trim().length > 0)
        .length;
}

function extractBacktickReferences(content) {
    const refs = [];
    const regex = /`([^`\n]+)`/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const value = match[1].trim();
        if (isPathLikeReference(value)) {
            refs.push(value);
        }
    }
    return Array.from(new Set(refs));
}

function isPathLikeReference(value) {
    if (!value) {
        return false;
    }

    if (REPO_ROOT_FILE_REFERENCES.has(value)) {
        return true;
    }

    return REPO_ROOT_PREFIXES.some(prefix => value.startsWith(prefix));
}

function resolveReference(reference) {
    if (reference.endsWith('/*')) {
        const resolvedPath = path.join(ROOT, reference.slice(0, -2));
        return {
            reference,
            type: 'directory',
            resolvedPath,
            exists: fs.existsSync(resolvedPath)
        };
    }

    if (reference.includes('<') && reference.includes('>')) {
        const placeholderIndex = reference.indexOf('<');
        const stablePrefix = reference.slice(0, placeholderIndex).replace(/[\\/][^\\/]*$/, '');
        const resolvedPath = path.join(ROOT, stablePrefix);
        return {
            reference,
            type: 'template',
            resolvedPath,
            exists: fs.existsSync(resolvedPath)
        };
    }

    if (reference.includes('...')) {
        const stablePrefix = reference.replace(/\/?\.\.\..*$/, '');
        const resolvedPath = path.join(ROOT, stablePrefix);
        return {
            reference,
            type: 'template',
            resolvedPath,
            exists: fs.existsSync(resolvedPath)
        };
    }

    const resolvedPath = path.join(ROOT, reference);
    return {
        reference,
        type: fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory() ? 'directory' : 'file',
        resolvedPath,
        exists: fs.existsSync(resolvedPath)
    };
}

function analyzeReferenceSet(references) {
    const results = references.map(resolveReference);
    return {
        references,
        results,
        missing: results
            .filter(result => !result.exists)
            .map(result => result.reference)
            .sort()
    };
}

function analyzeDocument(relativePath) {
    const resolvedPath = path.join(ROOT, relativePath);
    const content = readUtf8(resolvedPath);
    const references = extractBacktickReferences(content);
    const referenceSummary = analyzeReferenceSet(references);

    return {
        relativePath: normalizePath(relativePath),
        lineCount: content.split(/\r?\n/).length,
        nonEmptyLineCount: countNonEmptyLines(content),
        referenceCount: references.length,
        missingReferenceCount: referenceSummary.missing.length,
        missingReferences: referenceSummary.missing
    };
}

function collectRoutedDocuments(agentsContent) {
    return extractBacktickReferences(agentsContent)
        .filter(reference => reference.endsWith('.md'))
        .filter(reference => reference.startsWith('docs/') || reference.startsWith('skills/') || reference === 'CHANGELOG.md')
        .filter(reference => !reference.includes('*'))
        .sort();
}

function getRequiredSectionStatus(content) {
    const present = REQUIRED_SECTIONS.filter(section => content.includes(section));
    const missing = REQUIRED_SECTIONS.filter(section => !content.includes(section));
    return { present, missing };
}

function getDetailedSectionSignals(content) {
    const present = DETAILED_SECTION_HEADINGS.filter(section => content.includes(section));
    return {
        present,
        count: present.length
    };
}

function getRouteCoverage(content) {
    const matched = [];
    const missing = [];

    ROUTE_EXPECTATIONS.forEach(expectation => {
        if (expectation.test(content)) {
            matched.push(expectation.id);
            return;
        }
        missing.push(expectation.id);
    });

    return {
        matched,
        missing,
        total: ROUTE_EXPECTATIONS.length
    };
}

function calculateConcisionScore(totalLines, detailedSectionCount) {
    let lineBandScore = 2;
    if (totalLines <= 120) {
        lineBandScore = 10;
    } else if (totalLines <= 150) {
        lineBandScore = 8;
    } else if (totalLines <= 190) {
        lineBandScore = 6;
    } else if (totalLines <= 230) {
        lineBandScore = 4;
    }

    const disciplineScore = Math.max(0, 10 - (detailedSectionCount * 2));
    return lineBandScore + disciplineScore;
}

function calculateScore({
    requiredSectionStatus,
    routeCoverage,
    directReferenceSummary,
    routedReferenceSummaries,
    totalLines,
    detailedSectionCount
}) {
    const structureScore = Math.round((requiredSectionStatus.present.length / REQUIRED_SECTIONS.length) * 25);
    const routeScore = Math.round(((routeCoverage.total - routeCoverage.missing.length) / routeCoverage.total) * 20);
    const directReferenceScore = directReferenceSummary.references.length === 0
        ? 20
        : Math.round(((directReferenceSummary.references.length - directReferenceSummary.missing.length) / directReferenceSummary.references.length) * 20);

    const routedDocsTotalRefs = routedReferenceSummaries.reduce((sum, summary) => sum + summary.referenceCount, 0);
    const routedDocsMissingRefs = routedReferenceSummaries.reduce((sum, summary) => sum + summary.missingReferenceCount, 0);
    const routedDocumentScore = routedDocsTotalRefs === 0
        ? 15
        : Math.round(((routedDocsTotalRefs - routedDocsMissingRefs) / routedDocsTotalRefs) * 15);

    const concisionScore = calculateConcisionScore(totalLines, detailedSectionCount);

    return {
        value: structureScore + routeScore + directReferenceScore + routedDocumentScore + concisionScore,
        breakdown: {
            structureScore,
            routeScore,
            directReferenceScore,
            routedDocumentScore,
            concisionScore
        }
    };
}

function scoreToStatus(score) {
    if (score >= 90) {
        return 'Healthy';
    }
    if (score >= 75) {
        return 'Needs Attention';
    }
    return 'High Risk';
}

function buildAgentsHealthReport({ agentsPath = DEFAULT_AGENTS_PATH } = {}) {
    const content = readUtf8(agentsPath);
    const relativeAgentsPath = normalizePath(path.relative(ROOT, agentsPath));
    const totalLines = content.split(/\r?\n/).length;
    const requiredSectionStatus = getRequiredSectionStatus(content);
    const detailedSectionSignals = getDetailedSectionSignals(content);
    const routeCoverage = getRouteCoverage(content);
    const directReferences = extractBacktickReferences(content);
    const directReferenceSummary = analyzeReferenceSet(directReferences);
    const routedDocuments = collectRoutedDocuments(content);
    const routedReferenceSummaries = routedDocuments.map(analyzeDocument);
    const score = calculateScore({
        requiredSectionStatus,
        routeCoverage,
        directReferenceSummary,
        routedReferenceSummaries,
        totalLines,
        detailedSectionCount: detailedSectionSignals.count
    });

    return {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        repoRoot: normalizePath(ROOT),
        agentsPath: relativeAgentsPath,
        summary: {
            score: score.value,
            status: scoreToStatus(score.value),
            totalLines,
            nonEmptyLines: countNonEmptyLines(content),
            requiredSectionsPresent: requiredSectionStatus.present.length,
            requiredSectionsMissing: requiredSectionStatus.missing.length,
            routeExpectationsMatched: routeCoverage.matched.length,
            routeExpectationsMissing: routeCoverage.missing.length,
            directReferenceCount: directReferenceSummary.references.length,
            directMissingReferenceCount: directReferenceSummary.missing.length,
            routedDocumentCount: routedDocuments.length,
            routedMissingReferenceCount: routedReferenceSummaries.reduce((sum, summary) => sum + summary.missingReferenceCount, 0),
            detailedSectionCount: detailedSectionSignals.count
        },
        breakdown: score.breakdown,
        checks: {
            requiredSections: requiredSectionStatus,
            routeCoverage,
            directReferences: {
                references: directReferenceSummary.references,
                missing: directReferenceSummary.missing
            },
            detailedSections: detailedSectionSignals,
            routedDocuments: routedReferenceSummaries
        }
    };
}

function compareAgentsHealth(currentReport, baselineReport) {
    assert(currentReport && baselineReport, 'current and baseline reports are required');

    const hardRegressions = [];
    const advisoryRegressions = [];
    const improvements = [];

    const currentSummary = currentReport.summary;
    const baselineSummary = baselineReport.summary;

    if (currentSummary.requiredSectionsMissing > baselineSummary.requiredSectionsMissing) {
        hardRegressions.push(`missing required sections increased from ${baselineSummary.requiredSectionsMissing} to ${currentSummary.requiredSectionsMissing}`);
    } else if (currentSummary.requiredSectionsMissing < baselineSummary.requiredSectionsMissing) {
        improvements.push(`missing required sections decreased from ${baselineSummary.requiredSectionsMissing} to ${currentSummary.requiredSectionsMissing}`);
    }

    if (currentSummary.routeExpectationsMissing > baselineSummary.routeExpectationsMissing) {
        hardRegressions.push(`missing route expectations increased from ${baselineSummary.routeExpectationsMissing} to ${currentSummary.routeExpectationsMissing}`);
    } else if (currentSummary.routeExpectationsMissing < baselineSummary.routeExpectationsMissing) {
        improvements.push(`missing route expectations decreased from ${baselineSummary.routeExpectationsMissing} to ${currentSummary.routeExpectationsMissing}`);
    }

    if (currentSummary.directMissingReferenceCount > baselineSummary.directMissingReferenceCount) {
        hardRegressions.push(`direct missing references increased from ${baselineSummary.directMissingReferenceCount} to ${currentSummary.directMissingReferenceCount}`);
    } else if (currentSummary.directMissingReferenceCount < baselineSummary.directMissingReferenceCount) {
        improvements.push(`direct missing references decreased from ${baselineSummary.directMissingReferenceCount} to ${currentSummary.directMissingReferenceCount}`);
    }

    if (currentSummary.routedMissingReferenceCount > baselineSummary.routedMissingReferenceCount) {
        hardRegressions.push(`routed missing references increased from ${baselineSummary.routedMissingReferenceCount} to ${currentSummary.routedMissingReferenceCount}`);
    } else if (currentSummary.routedMissingReferenceCount < baselineSummary.routedMissingReferenceCount) {
        improvements.push(`routed missing references decreased from ${baselineSummary.routedMissingReferenceCount} to ${currentSummary.routedMissingReferenceCount}`);
    }

    if (currentSummary.score < baselineSummary.score) {
        advisoryRegressions.push(`health score decreased from ${baselineSummary.score} to ${currentSummary.score}`);
    } else if (currentSummary.score > baselineSummary.score) {
        improvements.push(`health score improved from ${baselineSummary.score} to ${currentSummary.score}`);
    }

    if (currentSummary.totalLines > baselineSummary.totalLines) {
        advisoryRegressions.push(`AGENTS.md line count increased from ${baselineSummary.totalLines} to ${currentSummary.totalLines}`);
    } else if (currentSummary.totalLines < baselineSummary.totalLines) {
        improvements.push(`AGENTS.md line count decreased from ${baselineSummary.totalLines} to ${currentSummary.totalLines}`);
    }

    if (currentSummary.detailedSectionCount > baselineSummary.detailedSectionCount) {
        advisoryRegressions.push(`detailed section count increased from ${baselineSummary.detailedSectionCount} to ${currentSummary.detailedSectionCount}`);
    } else if (currentSummary.detailedSectionCount < baselineSummary.detailedSectionCount) {
        improvements.push(`detailed section count decreased from ${baselineSummary.detailedSectionCount} to ${currentSummary.detailedSectionCount}`);
    }

    return {
        pass: hardRegressions.length === 0,
        hardRegressions,
        advisoryRegressions,
        improvements
    };
}

function readBaselineReport(baselinePath = DEFAULT_BASELINE_PATH) {
    return JSON.parse(readUtf8(baselinePath));
}

module.exports = {
    DEFAULT_AGENTS_PATH,
    DEFAULT_BASELINE_PATH,
    buildAgentsHealthReport,
    compareAgentsHealth,
    readBaselineReport
};