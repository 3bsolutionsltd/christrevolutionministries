# Test Build Script
# Quick script to test Next.js build process locally

Write-Host "🔧 Testing Next.js build process..." -ForegroundColor Green

# Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item out -Recurse -Force -ErrorAction SilentlyContinue

# Set environment variables
$env:NODE_ENV = "production"
$env:NEXT_PUBLIC_ENVIRONMENT = "staging"

Write-Host "📋 Environment variables:" -ForegroundColor Blue
Write-Host "NODE_ENV: $env:NODE_ENV" -ForegroundColor Gray
Write-Host "NEXT_PUBLIC_ENVIRONMENT: $env:NEXT_PUBLIC_ENVIRONMENT" -ForegroundColor Gray

# Run build
Write-Host "🔨 Running npm run build..." -ForegroundColor Yellow
npm run build

# Check results
if (Test-Path "out") {
    Write-Host "✅ Build successful! Out directory created." -ForegroundColor Green
    Write-Host "📂 Contents of out directory:" -ForegroundColor Blue
    Get-ChildItem out -Name | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
} else {
    Write-Host "❌ Build failed or out directory not created." -ForegroundColor Red
    Write-Host "📋 Checking .next directory..." -ForegroundColor Yellow
    if (Test-Path ".next") {
        Write-Host "✅ .next directory exists (build partially completed)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ .next directory does not exist (build completely failed)" -ForegroundColor Red
    }
}

# Reset environment
Remove-Item Env:NODE_ENV -ErrorAction SilentlyContinue
Remove-Item Env:NEXT_PUBLIC_ENVIRONMENT -ErrorAction SilentlyContinue
