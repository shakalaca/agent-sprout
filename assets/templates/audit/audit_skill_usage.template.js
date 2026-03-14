#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

function parseArgs(argv) {
    const options = {
        repoPath: process.cwd(),
        sessionsRoot: path.join(os.homedir(), '.codex', 'sessions'),
        since: null,
        json: false,
        includeReadme: true
    };

    for (let index = 0; index < argv.length; index += 1) {
        const value = argv[index];
        if (value === '--repo-path') {
            options.repoPath = argv[index + 1];
            index += 1;
            continue;
        }
        if (value === '--sessions-root') {
            options.sessionsRoot = argv[index + 1];
            index += 1;
            continue;
        }
        if (value === '--since') {
            options.since = argv[index + 1];
            index += 1;
            continue;
        }
        if (value === '--json') {
            options.json = true;
            continue;
        }
        if (value === '--exclude-readme') {
            options.includeReadme = false;
        }
    }

    return options;
}

function normalizePath(input) {
    return String(input || '')
        .replace(/\\/g, '/')
        .replace(/^\/\/?\?\//, '')
        .toLowerCase();
}

function safeReadLines(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    } catch (error) {
        return [];
    }
}

function safeParseJson(line) {
    try {
        return JSON.parse(line);
    } catch (error) {
        return null;
    }
}

function walkJsonlFiles(rootPath) {
    const pending = [rootPath];
    const files = [];

    while (pending.length > 0) {
        const currentPath = pending.pop();
        let entries = [];
        try {
            entries = fs.readdirSync(currentPath, { withFileTypes: true });
        } catch (error) {
            continue;
        }

        for (const entry of entries) {
            const nextPath = path.join(currentPath, entry.name);
            if (entry.isDirectory()) {
                pending.push(nextPath);
                continue;
            }
            if (entry.isFile() && nextPath.endsWith('.jsonl')) {
                files.push(nextPath);
            }
        }
    }

    return files.sort();
}

function extractRepoSignals(record, rawLine) {
    const payload = record && record.payload ? record.payload : {};
    const signals = [];

    if (payload.cwd) {
        signals.push(payload.cwd);
    }
    if (payload.user_instructions) {
        signals.push(payload.user_instructions);
    }
    if (payload.summary) {
        signals.push(payload.summary);
    }
    if (payload.text) {
        signals.push(payload.text);
    }
    if (payload.content && Array.isArray(payload.content)) {
        for (const item of payload.content) {
            if (item && item.text) {
                signals.push(item.text);
            }
        }
    }

    signals.push(rawLine);
    return signals;
}

function parseArguments(argumentsText) {
    try {
        return JSON.parse(argumentsText || '{}');
    } catch (error) {
        return {};
    }
}

function extractSkillFromPath(filePath) {
    const normalized = normalizePath(filePath);
    const match = normalized.match(/(?:^|\/)skills\/(?<skill>[a-z0-9._-]+\.md)$/i);
    if (!match || !match.groups || !match.groups.skill) {
        return null;
    }
    return match.groups.skill;
}

function extractSkillRead(record) {
    if (!record || record.type !== 'response_item' || !record.payload) {
        return null;
    }

    if (record.payload.type !== 'function_call') {
        return null;
    }

    const toolName = String(record.payload.name || '');
    const args = parseArguments(record.payload.arguments);

    if (toolName === 'read_file' || toolName.endsWith('.read_file')) {
        const skill = extractSkillFromPath(args.filePath || args.path);
        if (!skill) {
            return null;
        }
        return {
            skill,
            source: 'read_file',
            detail: args.filePath || args.path || ''
        };
    }

    if (toolName !== 'shell_command' && toolName !== 'run_in_terminal') {
        return null;
    }

    const command = String(args.command || '');
    const looksLikeRead = /\b(Get-Content|cat|sed|head|tail|bat|awk)\b/i.test(command);
    if (!looksLikeRead) {
        return null;
    }

    const skill = extractSkillFromPath(command);
    if (!skill) {
        return null;
    }

    return {
        skill,
        source: toolName,
        detail: command
    };
}

function matchesSince(timestamp, since) {
    if (!since) {
        return true;
    }
    return String(timestamp || '') >= String(since);
}

function auditSessions(options) {
    const repoPath = normalizePath(path.resolve(options.repoPath));
    const repoName = path.basename(repoPath).toLowerCase();
    const files = walkJsonlFiles(options.sessionsRoot);
    const summary = {
        repoPath,
        repoName,
        sessionsRoot: path.resolve(options.sessionsRoot),
        scannedFiles: files.length,
        matchedSessions: 0,
        matchedSessionsWithSkillReads: 0,
        skillCounts: {},
        sessionDetails: []
    };

    for (const filePath of files) {
        const lines = safeReadLines(filePath);
        let repoMatched = false;
        let firstTimestamp = '';
        const skillReads = [];

        for (const line of lines) {
            const record = safeParseJson(line);
            if (!record) {
                continue;
            }

            if (!firstTimestamp && record.timestamp) {
                firstTimestamp = record.timestamp;
            }

            if (!matchesSince(record.timestamp, options.since)) {
                continue;
            }

            if (!repoMatched) {
                const signals = extractRepoSignals(record, line).map(normalizePath);
                repoMatched = signals.some(signal => signal.includes(repoPath) || signal.includes(repoName));
            }

            const skillRead = extractSkillRead(record);
            if (skillRead) {
                skillReads.push({
                    timestamp: record.timestamp || '',
                    skill: skillRead.skill,
                    source: skillRead.source,
                    detail: skillRead.detail
                });
            }
        }

        if (!repoMatched) {
            continue;
        }

        summary.matchedSessions += 1;

        const filteredSkillReads = skillReads.filter(item => (
            options.includeReadme || item.skill.toLowerCase() !== 'readme.md'
        ));

        if (filteredSkillReads.length === 0) {
            continue;
        }

        summary.matchedSessionsWithSkillReads += 1;

        for (const item of filteredSkillReads) {
            if (!summary.skillCounts[item.skill]) {
                summary.skillCounts[item.skill] = 0;
            }
            summary.skillCounts[item.skill] += 1;
        }

        summary.sessionDetails.push({
            filePath,
            firstTimestamp,
            skills: Array.from(new Set(filteredSkillReads.map(item => item.skill))).sort(),
            reads: filteredSkillReads
        });
    }

    summary.skillCounts = Object.fromEntries(
        Object.entries(summary.skillCounts).sort((left, right) => (
            right[1] - left[1] || left[0].localeCompare(right[0])
        ))
    );

    summary.sessionDetails.sort((left, right) => left.filePath.localeCompare(right.filePath));
    return summary;
}

function formatTextReport(summary) {
    const lines = [];
    lines.push(`Repo: ${summary.repoPath}`);
    lines.push(`Sessions root: ${summary.sessionsRoot}`);
    lines.push(`Scanned JSONL files: ${summary.scannedFiles}`);
    lines.push(`Matched repo sessions: ${summary.matchedSessions}`);
    lines.push(`Matched sessions with skill reads: ${summary.matchedSessionsWithSkillReads}`);
    lines.push('');
    lines.push('Skill read counts:');

    const skillEntries = Object.entries(summary.skillCounts);
    if (skillEntries.length === 0) {
        lines.push('- none');
    } else {
        for (const [skill, count] of skillEntries) {
            lines.push(`- ${skill}: ${count}`);
        }
    }

    lines.push('');
    lines.push('Session details:');

    if (summary.sessionDetails.length === 0) {
        lines.push('- none');
        return lines.join('\n');
    }

    for (const detail of summary.sessionDetails) {
        lines.push(`- ${detail.filePath}`);
        lines.push(`  firstTimestamp: ${detail.firstTimestamp || 'unknown'}`);
        lines.push(`  skills: ${detail.skills.join(', ')}`);
        for (const read of detail.reads) {
            lines.push(`  read: ${read.timestamp || 'unknown'} :: ${read.skill} (${read.source})`);
        }
    }

    return lines.join('\n');
}

function main() {
    const options = parseArgs(process.argv.slice(2));
    const summary = auditSessions(options);
    const output = options.json
        ? JSON.stringify(summary, null, 2)
        : formatTextReport(summary);
    process.stdout.write(output + '\n');
}

main();