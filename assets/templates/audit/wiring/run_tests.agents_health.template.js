'use strict';

const { runAgentsHealthSuite } = require('./suites/agents_health_suite');

function runExistingSuites() {
    return undefined;
}

function runAllSuites() {
    runExistingSuites();
    runAgentsHealthSuite();
}

module.exports = {
    runAllSuites,
    runExistingSuites
};