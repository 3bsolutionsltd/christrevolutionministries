# Christ Revolution Ministries - Quick Setup Script (PowerShell)
# This script prepares the project for Hostinger deployment

Write-Host "🚀 Setting up Christ Revolution Ministries for Hostinger deployment..." -ForegroundColor Green

# Step 1: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

# Step 2: Test build
Write-Host "🔨 Testing build process..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "📁 Static files generated in ./out/ directory" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🌐 Next steps for Hostinger deployment:" -ForegroundColor Cyan
    Write-Host "1. Add GitHub secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)" -ForegroundColor White
    Write-Host "2. Push to GitHub main branch for auto-deployment" -ForegroundColor White
    Write-Host "3. Or manually upload ./out/ contents to /public_html/" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Deployment checklist:" -ForegroundColor Cyan
    Write-Host "   □ Configure GitHub secrets" -ForegroundColor White
    Write-Host "   □ Test FTP credentials" -ForegroundColor White
    Write-Host "   □ Backup current site" -ForegroundColor White
    Write-Host "   □ Push to main branch" -ForegroundColor White
    Write-Host "   □ Verify deployment" -ForegroundColor White
    Write-Host ""
    Write-Host "🎯 Your website will be live at: christrevolutionministries.org" -ForegroundColor Green
    Write-Host ""
    Write-Host "💡 To deploy manually:" -ForegroundColor Yellow
    Write-Host "   1. npm run build" -ForegroundColor White
    Write-Host "   2. Upload ./out/ folder contents to Hostinger /public_html/" -ForegroundColor White
    Write-Host "   3. Copy .htaccess from ./public/ to /public_html/" -ForegroundColor White
} else {
    Write-Host "❌ Build failed! Please check the errors above." -ForegroundColor Red
    exit 1
}
