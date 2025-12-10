const fs = require('fs');
const path = require('path');

/**
 * Restore API Routes after Static Build
 * Restore API routes from backup directory
 */

console.log('🔄 Restoring API routes...');

const apiDir = path.join(process.cwd(), 'app', 'api');
const backupDir = path.join(process.cwd(), '.api-backup');

try {
  // Restore admin API routes
  const adminBackup = path.join(backupDir, 'admin');
  if (fs.existsSync(adminBackup)) {
    const adminDir = path.join(apiDir, 'admin');
    if (fs.existsSync(adminDir)) {
      fs.rmSync(adminDir, { recursive: true });
    }
    fs.cpSync(adminBackup, adminDir, { recursive: true });
    console.log('✅ Restored admin API routes');
  }

  // Restore auth API routes
  const authBackup = path.join(backupDir, 'auth');
  if (fs.existsSync(authBackup)) {
    const authDir = path.join(apiDir, 'auth');
    if (fs.existsSync(authDir)) {
      fs.rmSync(authDir, { recursive: true });
    }
    fs.cpSync(authBackup, authDir, { recursive: true });
    console.log('✅ Restored auth API routes');
  }

  // Clean up backup directory
  if (fs.existsSync(backupDir)) {
    fs.rmSync(backupDir, { recursive: true });
    console.log('✅ Cleaned up backup directory');
  }

  console.log('🎯 API routes restored');
} catch (error) {
  console.error('❌ Error restoring API routes:', error.message);
}