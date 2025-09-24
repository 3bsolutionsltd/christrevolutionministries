// Simple test to check if Next.js build works
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Next.js build test...');

// Clean previous builds
try {
    if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
        console.log('Cleaned .next directory');
    }
    if (fs.existsSync('out')) {
        fs.rmSync('out', { recursive: true, force: true });
        console.log('Cleaned out directory');
    }
} catch (err) {
    console.log('Clean error:', err.message);
}

// Run build
console.log('Running npm run build...');
const child = exec('npm run build', (error, stdout, stderr) => {
    console.log('=== STDOUT ===');
    console.log(stdout);
    
    if (stderr) {
        console.log('=== STDERR ===');
        console.log(stderr);
    }
    
    if (error) {
        console.log('=== ERROR ===');
        console.log(error);
    }
    
    // Check if out directory was created
    const outExists = fs.existsSync('out');
    console.log('=== RESULT ===');
    console.log('Out directory exists:', outExists);
    
    if (outExists) {
        const files = fs.readdirSync('out');
        console.log('Files in out:', files);
    }
});

// Timeout after 2 minutes
setTimeout(() => {
    child.kill();
    console.log('Build timed out after 2 minutes');
    process.exit(1);
}, 120000);
