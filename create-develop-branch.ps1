# Create Develop Branch Script
# Run this script to set up the develop branch for staging deployments

Write-Host "🌿 Setting up develop branch for staging deployments..." -ForegroundColor Green

# Check if we're in a git repository
if (!(Test-Path ".git")) {
    Write-Host "❌ Error: Not in a git repository" -ForegroundColor Red
    exit 1
}

# Check current branch
$currentBranch = git branch --show-current
Write-Host "📍 Current branch: $currentBranch" -ForegroundColor Blue

# Create and switch to develop branch
Write-Host "🔀 Creating develop branch..." -ForegroundColor Yellow
git checkout -b develop

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Develop branch created successfully!" -ForegroundColor Green
    
    # Push develop branch to remote
    Write-Host "📤 Pushing develop branch to remote..." -ForegroundColor Yellow
    git push -u origin develop
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Develop branch pushed to remote!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎯 Branch setup complete:" -ForegroundColor Cyan
        Write-Host "   • main branch → Production (christrevolutionministries.org)" -ForegroundColor Green
        Write-Host "   • develop branch → Staging (dev.christrevolutionministries.org)" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "🔄 Workflow:" -ForegroundColor Cyan
        Write-Host "1. Work on feature branches" -ForegroundColor White
        Write-Host "2. Merge to develop for staging testing" -ForegroundColor Yellow
        Write-Host "3. Merge develop to main for production" -ForegroundColor Green
        Write-Host ""
        Write-Host "💡 Next steps:" -ForegroundColor Blue
        Write-Host "• Configure subdomain dev.christrevolutionministries.org in Hostinger" -ForegroundColor White
        Write-Host "• Add GitHub repository secrets (FTP credentials)" -ForegroundColor White
        Write-Host "• Test deployment by pushing to develop branch" -ForegroundColor White
    } else {
        Write-Host "❌ Failed to push develop branch to remote" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Failed to create develop branch" -ForegroundColor Red
    exit 1
}
