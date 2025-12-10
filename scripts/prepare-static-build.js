const fs = require('fs');
const path = require('path');

/**
 * Prepare for Static Build
 * Temporarily rename API routes to prevent static export conflicts
 */

console.log('🔧 Preparing for static build...');

const apiDir = path.join(process.cwd(), 'app', 'api');
const adminDir = path.join(apiDir, 'admin');
const authDir = path.join(apiDir, 'auth');

// Create backup directory
const backupDir = path.join(process.cwd(), '.api-backup');

try {
  // Create backup directory
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Move admin API routes
  if (fs.existsSync(adminDir)) {
    const adminBackup = path.join(backupDir, 'admin');
    if (fs.existsSync(adminBackup)) {
      fs.rmSync(adminBackup, { recursive: true });
    }
    fs.renameSync(adminDir, adminBackup);
    console.log('✅ Moved admin API routes to backup');
  }

  // Move auth API routes  
  if (fs.existsSync(authDir)) {
    const authBackup = path.join(backupDir, 'auth');
    if (fs.existsSync(authBackup)) {
      fs.rmSync(authBackup, { recursive: true });
    }
    fs.renameSync(authDir, authBackup);
    console.log('✅ Moved auth API routes to backup');
  }

  console.log('🎯 Ready for static build');
} catch (error) {
  console.error('❌ Error preparing for build:', error.message);
  process.exit(1);
}