#!/bin/bash

# Christ Revolution Ministries - Quick Setup Script
# This script prepares the project for Hostinger deployment

echo "🚀 Setting up Christ Revolution Ministries for Hostinger deployment..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Test build
echo "🔨 Testing build process..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Static files generated in ./out/ directory"
    echo ""
    echo "🌐 Next steps for Hostinger deployment:"
    echo "1. Add GitHub secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)"
    echo "2. Push to GitHub main branch for auto-deployment"
    echo "3. Or manually upload ./out/ contents to /public_html/"
    echo ""
    echo "📋 Deployment checklist:"
    echo "   □ Configure GitHub secrets"
    echo "   □ Test FTP credentials"
    echo "   □ Backup current site"
    echo "   □ Push to main branch"
    echo "   □ Verify deployment"
    echo ""
    echo "🎯 Your website will be live at: christrevolutionministries.org"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
