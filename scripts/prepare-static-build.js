const fs = require('fs');
const path = require('path');

/**
 * Prepare for Static Build
 * Temporarily move API routes to prevent static export conflicts
 * Keep admin APIs for staging, remove for production
 */

console.log('🔧 Preparing for static build...');

// Check environment
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'staging';
const isProduction = environment === 'production';

const apiDir = path.join(process.cwd(), 'app', 'api');
const adminDir = path.join(apiDir, 'admin');
const authDir = path.join(apiDir, 'auth');
const backupDir = path.join(process.cwd(), '.api-backup');

try {
  // Create backup directory
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Only remove admin APIs in production for security
  if (isProduction) {
    // Move admin API routes
    if (fs.existsSync(adminDir)) {
      const adminBackup = path.join(backupDir, 'admin');
      if (fs.existsSync(adminBackup)) {
        fs.rmSync(adminBackup, { recursive: true });
      }
      // Copy first, then remove original
      fs.cpSync(adminDir, adminBackup, { recursive: true });
      fs.rmSync(adminDir, { recursive: true });
      console.log('✅ Moved admin API routes to backup (production)');
    }

    // Move auth API routes
    if (fs.existsSync(authDir)) {
      const authBackup = path.join(backupDir, 'auth');
      if (fs.existsSync(authBackup)) {
        fs.rmSync(authBackup, { recursive: true });
      }
      // Copy first, then remove original
      fs.cpSync(authDir, authBackup, { recursive: true });
      fs.rmSync(authDir, { recursive: true });
      console.log('✅ Moved auth API routes to backup (production)');
    }
  } else {
    console.log('📝 Keeping admin APIs for staging environment');
  }  console.log('🎯 Ready for static build');
} catch (error) {
  console.error('❌ Error preparing for build:', error.message);
  // Don't exit on error - continue with build
  console.log('⚠️ Continuing with build anyway...');
}