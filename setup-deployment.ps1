# Christ Revolution Ministries - Dual Environment Deployment Setup (PowerShell)
# This script prepares the project for staging and production deployment on Hostinger

Write-Host "🚀 Setting up Christ Revolution Ministries for dual-environment deployment..." -ForegroundColor Green

# Step 1: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

# Install cross-env for environment management
Write-Host "🔧 Installing cross-env for environment management..." -ForegroundColor Blue
npm install cross-env --save-dev

# Step 2: Test staging build
Write-Host "🔨 Testing staging build process..." -ForegroundColor Blue
npm run build:staging

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Staging build successful!" -ForegroundColor Green
    
    # Step 3: Test production build
    Write-Host "🔨 Testing production build process..." -ForegroundColor Blue
    npm run build:production
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Production build successful!" -ForegroundColor Green
        Write-Host "📁 Static files generated in ./out/ directory" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "🌐 Deployment environments configured:" -ForegroundColor Cyan
        Write-Host "   📍 Staging: dev.christrevolutionministries.org" -ForegroundColor Yellow
        Write-Host "   📍 Production: christrevolutionministries.org" -ForegroundColor Green
        Write-Host ""
        Write-Host "🔄 Deployment workflow:" -ForegroundColor Cyan
        Write-Host "   • develop branch → Staging environment" -ForegroundColor Yellow
        Write-Host "   • main branch → Production environment" -ForegroundColor Green
        Write-Host ""
        Write-Host "📋 GitHub setup required:" -ForegroundColor Cyan
        Write-Host "1. Add repository secrets:" -ForegroundColor White
        Write-Host "   - FTP_SERVER (your Hostinger FTP server)" -ForegroundColor Gray
        Write-Host "   - FTP_USERNAME (your FTP username)" -ForegroundColor Gray
        Write-Host "   - FTP_PASSWORD (your FTP password)" -ForegroundColor Gray
        Write-Host "2. Create 'develop' branch for staging deployments" -ForegroundColor White
        Write-Host "3. Configure subdomain dev.christrevolutionministries.org in Hostinger" -ForegroundColor White
        Write-Host ""
        Write-Host "💡 Manual deployment commands:" -ForegroundColor Yellow
        Write-Host "   npm run build:staging    - Build for staging" -ForegroundColor White
        Write-Host "   npm run build:production - Build for production" -ForegroundColor White
        Write-Host ""
        Write-Host "📂 Server directory structure:" -ForegroundColor Yellow
        Write-Host "   /public_html/     → Production (christrevolutionministries.org)" -ForegroundColor Green
        Write-Host "   /public_html/dev/ → Staging (dev.christrevolutionministries.org)" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "🎯 Your websites will be live at:" -ForegroundColor Green
        Write-Host "   🌐 Staging: https://dev.christrevolutionministries.org" -ForegroundColor Yellow
        Write-Host "   🌐 Production: https://christrevolutionministries.org" -ForegroundColor Green
    } else {
        Write-Host "❌ Production build failed! Please check the errors above." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Staging build failed! Please check the errors above." -ForegroundColor Red
    exit 1
}
