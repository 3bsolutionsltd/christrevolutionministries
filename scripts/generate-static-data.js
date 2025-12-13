const fs = require('fs');
const path = require('path');

/**
 * Generate Static Data for Production Deployment
 * This script converts admin-managed JSON files into static API endpoints
 * for deployment on shared hosting without Node.js runtime
 */

console.log('🔄 Generating static data for production deployment...');

// Ensure public/api directory exists
const publicApiDir = path.join(process.cwd(), 'public', 'api');
if (!fs.existsSync(publicApiDir)) {
  fs.mkdirSync(publicApiDir, { recursive: true });
  console.log('📁 Created public/api directory');
}

// Data file paths
const dataDir = path.join(process.cwd(), 'data');
const files = [
  { source: 'ministries.json', endpoint: 'ministries.json' },
  { source: 'events.json', endpoint: 'events.json' },
  { source: 'sermons.json', endpoint: 'sermons.json' },
  { source: 'youtube-links.json', endpoint: 'youtube-links.json' },
  { source: 'hero-slides.json', endpoint: 'hero-slides.json' },
  { source: 'homepage-settings.json', endpoint: 'homepage-settings.json' },
  { source: 'site-settings.json', endpoint: 'site-settings.json' }
];

let successCount = 0;
let totalFiles = files.length;

// Process each data file
files.forEach(({ source, endpoint }) => {
  try {
    const sourcePath = path.join(dataDir, source);
    const targetPath = path.join(publicApiDir, endpoint);
    
    if (fs.existsSync(sourcePath)) {
      // Read and validate JSON
      const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
      
      // Write to public API endpoint
      fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
      
      console.log(`✅ Generated ${endpoint} (${data.length || 'N/A'} items)`);
      successCount++;
    } else {
      // Create empty array if source doesn't exist
      fs.writeFileSync(path.join(publicApiDir, endpoint), JSON.stringify([], null, 2));
      console.log(`⚠️  ${source} not found, created empty ${endpoint}`);
      successCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${source}:`, error.message);
  }
});

// Generate metadata file
const metadata = {
  generated: new Date().toISOString(),
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'production',
  files: files.map(f => f.endpoint)
};

fs.writeFileSync(
  path.join(publicApiDir, '_metadata.json'), 
  JSON.stringify(metadata, null, 2)
);

console.log(`\n🎯 Static data generation complete!`);
console.log(`📊 Success: ${successCount}/${totalFiles} files processed`);
console.log(`📅 Generated: ${metadata.generated}`);
console.log(`🌍 Environment: ${metadata.environment}`);
console.log(`📂 Location: /public/api/`);

if (successCount === totalFiles) {
  console.log('\n✅ All data files processed successfully!');
  console.log('🚀 Ready for static deployment');
} else {
  console.log('\n⚠️  Some files had issues - check logs above');
  process.exit(1);
}