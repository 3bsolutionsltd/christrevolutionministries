# Security Check Script
# This script checks security headers and SSL certificate with error handling and logging

# Configuration
$SITE_URL = "https://christrevolutionministries.org"
$MAX_RETRIES = 3
$RETRY_DELAY = 5 # seconds
$LOG_DIR = "logs/security"
$ERROR_LOG = "$LOG_DIR/errors.json"

# Create log directory if it doesn't exist
if (-not (Test-Path $LOG_DIR)) {
    New-Item -ItemType Directory -Force -Path $LOG_DIR | Out-Null
}

# Function to log errors
function Write-ErrorLog {
    param (
        [string]$component,
        [string]$error,
        [string]$details
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $errorObj = @{
        timestamp = $timestamp
        component = $component
        error = $error
        details = $details
    }
    
    # Read existing errors
    $errors = @()
    if (Test-Path $ERROR_LOG) {
        $errors = Get-Content $ERROR_LOG | ConvertFrom-Json
    }
    
    # Add new error and keep only last 100 errors
    $errors = @($errorObj) + $errors
    if ($errors.Count -gt 100) {
        $errors = $errors[0..99]
    }
    
    # Save errors
    $errors | ConvertTo-Json | Out-File $ERROR_LOG
}

# Function to make HTTP request with retries
function Invoke-RequestWithRetry {
    param (
        [string]$uri,
        [string]$method = "HEAD"
    )
    
    $attempt = 1
    $success = $false
    $lastError = $null
    
    while (-not $success -and $attempt -le $MAX_RETRIES) {
        try {
            Write-Host "Attempt $attempt of $MAX_RETRIES..."
            $response = Invoke-WebRequest -Uri $uri -Method $method
            $success = $true
            return $response
        }
        catch {
            $lastError = $_
            Write-Host "Attempt $attempt failed: $($_.Exception.Message)"
            if ($attempt -lt $MAX_RETRIES) {
                Write-Host "Waiting $RETRY_DELAY seconds before retry..."
                Start-Sleep -Seconds $RETRY_DELAY
            }
            $attempt++
        }
    }
    
    throw $lastError
}

# Main security check
Write-Host "`n[Daily Security Check] $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host "=================================="

# Check 1: Security Headers
Write-Host "`n1. Checking Security Headers..."
try {
    $response = Invoke-RequestWithRetry -uri $SITE_URL
    $headers = $response.Headers
    
    # Save headers
    $headersPath = "$LOG_DIR/headers.json"
    $headers | ConvertTo-Json | Out-File $headersPath
    Write-Host "✓ Headers saved to $headersPath"
    
    # Check critical headers
    $criticalHeaders = @(
        'Content-Security-Policy',
        'Strict-Transport-Security',
        'X-Content-Type-Options',
        'X-Frame-Options'
    )
    
    Write-Host "`nCritical Headers Status:"
    foreach ($header in $criticalHeaders) {
        if ($headers[$header]) {
            Write-Host "✓ $header : Present"
        } else {
            Write-Host "✗ $header : Missing"
            Write-ErrorLog -component "SecurityHeaders" -error "MissingHeader" -details "Header '$header' is missing"
        }
    }
}
catch {
    $errorMsg = $_.Exception.Message
    Write-Host "✗ Failed to check headers: $errorMsg"
    Write-ErrorLog -component "SecurityHeaders" -error "CheckFailed" -details $errorMsg
}

# Check 2: SSL Certificate
Write-Host "`n2. Checking SSL Certificate..."
try {
    $response = Invoke-RequestWithRetry -uri $SITE_URL -method "GET"
    $cert = $response.Certificate
    
    # Save certificate info
    $certPath = "$LOG_DIR/certificate.json"
    $certInfo = @{
        Subject = $cert.Subject
        Issuer = $cert.Issuer
        ValidFrom = $cert.NotBefore
        ValidTo = $cert.NotAfter
        Thumbprint = $cert.Thumbprint
        SerialNumber = $cert.SerialNumber
    }
    $certInfo | ConvertTo-Json | Out-File $certPath
    Write-Host "✓ Certificate info saved to $certPath"
    
    # Check expiration
    $daysUntilExpiry = ($cert.NotAfter - (Get-Date)).Days
    if ($daysUntilExpiry -lt 30) {
        Write-Host "! Warning: Certificate expires in $daysUntilExpiry days"
        Write-ErrorLog -component "SSLCertificate" -error "ExpirationWarning" -details "Certificate expires in $daysUntilExpiry days"
    } else {
        Write-Host "✓ Certificate valid for $daysUntilExpiry days"
    }
}
catch {
    $errorMsg = $_.Exception.Message
    Write-Host "✗ Failed to check SSL certificate: $errorMsg"
    Write-ErrorLog -component "SSLCertificate" -error "CheckFailed" -details $errorMsg
}

# Summary
Write-Host "`nCheck completed at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
if (Test-Path $ERROR_LOG) {
    $errorCount = (Get-Content $ERROR_LOG | ConvertFrom-Json).Count
    Write-Host "Found $errorCount error(s). Check $ERROR_LOG for details."
}