#!/usr/bin/env powershell

<#
.SYNOPSIS
    Client Content Deployment Script
.DESCRIPTION
    Helps client deploy content changes after using admin interface
.PARAMETER Mode
    Deployment mode: staging or production
#>

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("staging", "production")]
    [string]$Mode = "staging"
)

Write-Host "🚀 Christ Revolution Ministries - Content Deployment" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the crministries project directory" -ForegroundColor Red
    exit 1
}

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js not found. Please install Node.js" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Deployment Mode: $Mode" -ForegroundColor Yellow

# Confirm deployment
$confirm = Read-Host "Continue with $Mode deployment? (y/N)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "❌ Deployment cancelled" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🔄 Starting deployment process..." -ForegroundColor Blue

try {
    # Step 1: Install dependencies
    Write-Host "1️⃣ Installing dependencies..." -ForegroundColor Blue
    npm install --silent
    if ($LASTEXITCODE -ne 0) { throw "npm install failed" }

    # Step 2: Build for deployment
    Write-Host "2️⃣ Building for $Mode..." -ForegroundColor Blue
    if ($Mode -eq "staging") {
        npm run build:staging
    } else {
        npm run build:production
    }
    if ($LASTEXITCODE -ne 0) { throw "Build failed" }

    # Step 3: Success message
    Write-Host ""
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host ""
    
    if ($Mode -eq "staging") {
        Write-Host "🌐 Your staging site will be available at:" -ForegroundColor Cyan
        Write-Host "   https://dev.christrevolutionministries.org" -ForegroundColor White
    } else {
        Write-Host "🌐 Your production site will be available at:" -ForegroundColor Cyan
        Write-Host "   https://christrevolutionministries.org" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Yellow
    Write-Host "   • Check the deployed site to ensure everything looks correct"
    Write-Host "   • If this was staging, you can now deploy to production"
    Write-Host "   • Your admin interface is still available locally at http://localhost:3000/admin"

} catch {
    Write-Host ""
    Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   • Check your internet connection"
    Write-Host "   • Ensure all dependencies are installed (npm install)"
    Write-Host "   • Review error messages above"
    Write-Host "   • Contact technical support if issues persist"
    exit 1
}

Write-Host ""
Write-Host "🎉 Deployment complete!" -ForegroundColor Green