const fs = require('fs');
const path = require('path');

// Configuration
const LOGS_DIR = path.join(process.cwd(), 'logs', 'csp');
const REPORT_FILE = path.join(process.cwd(), 'logs', 'security', 'csp-analysis.json');
const ERROR_LOG = path.join(process.cwd(), 'logs', 'security', 'errors.json');

// Error logging function
function logError(component, error, details) {
  const timestamp = new Date().toISOString();
  const errorObj = {
    timestamp,
    component,
    error,
    details
  };

  let errors = [];
  try {
    if (fs.existsSync(ERROR_LOG)) {
      errors = JSON.parse(fs.readFileSync(ERROR_LOG, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading error log:', e);
  }

  errors = [errorObj, ...errors].slice(0, 100); // Keep last 100 errors
  
  try {
    if (!fs.existsSync(path.dirname(ERROR_LOG))) {
      fs.mkdirSync(path.dirname(ERROR_LOG), { recursive: true });
    }
    fs.writeFileSync(ERROR_LOG, JSON.stringify(errors, null, 2));
  } catch (e) {
    console.error('Error writing to error log:', e);
  }
}

// Ensure directories exist
try {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }

  if (!fs.existsSync(path.dirname(REPORT_FILE))) {
    fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
  }
} catch (e) {
  console.error('Error creating log directories:', e);
  logError('CSPAnalysis', 'DirectoryCreation', e.message);
}

// Read all CSP log files
const logFiles = fs.readdirSync(LOGS_DIR)
  .filter(file => file.startsWith('csp-') && file.endsWith('.json'));

// Analyze reports
const analysis = {
  totalViolations: 0,
  violationsByType: {},
  violationsBySource: {},
  latestViolations: [],
  recommendations: []
};

logFiles.forEach(file => {
  const content = fs.readFileSync(path.join(LOGS_DIR, file), 'utf8');
  const logs = JSON.parse(content);

  logs.forEach(log => {
    analysis.totalViolations++;

    // Count by violation type
    const violationType = log['violated-directive'] || 'unknown';
    analysis.violationsByType[violationType] = (analysis.violationsByType[violationType] || 0) + 1;

    // Count by source
    const source = log['source-file'] || 'unknown';
    analysis.violationsBySource[source] = (analysis.violationsBySource[source] || 0) + 1;

    // Keep track of latest violations
    if (analysis.latestViolations.length < 10) {
      analysis.latestViolations.push({
        timestamp: log.timestamp,
        type: violationType,
        source: source
      });
    }
  });
});

// Generate recommendations
if (analysis.totalViolations > 0) {
  // Sort violations by frequency
  const sortedViolations = Object.entries(analysis.violationsByType)
    .sort(([, a], [, b]) => b - a);

  // Add recommendations based on most common violations
  sortedViolations.forEach(([directive, count]) => {
    const percentage = (count / analysis.totalViolations * 100).toFixed(1);
    analysis.recommendations.push(
      `${directive}: ${count} violations (${percentage}%) - Consider updating CSP policy`
    );
  });
}

// Write analysis to file
fs.writeFileSync(REPORT_FILE, JSON.stringify(analysis, null, 2));

// Print summary to console
console.log('\nCSP Violations Analysis');
console.log('=====================');
console.log(`Total Violations: ${analysis.totalViolations}`);
console.log('\nTop Violation Types:');
Object.entries(analysis.violationsByType)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 5)
  .forEach(([type, count]) => {
    console.log(`- ${type}: ${count}`);
  });

console.log('\nRecommendations:');
analysis.recommendations.forEach(rec => console.log(`- ${rec}`));