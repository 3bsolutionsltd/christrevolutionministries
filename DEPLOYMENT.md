# Dual Environment Deployment Guide

## Overview
This project is configured for dual-environment deployment on Hostinger:
- **Staging**: `dev.christrevolutionministries.org`
- **Production**: `christrevolutionministries.org`

## Environment Setup

### Branch Strategy
- `develop` branch → Staging deployment
- `main` branch → Production deployment

### Server Directory Structure
```
/public_html/              # Production (christrevolutionministries.org)
├── index.html
├── _next/
├── images/
└── .htaccess

/public_html/dev/          # Staging (dev.christrevolutionministries.org)
├── index.html
├── _next/
├── images/
└── .htaccess
```

## GitHub Configuration

### Required Secrets
In your GitHub repository, go to Settings > Secrets and Variables > Actions and add:

```
FTP_SERVER=your-hostinger-ftp-server.com
FTP_USERNAME=your-ftp-username
FTP_PASSWORD=your-ftp-password
```

### Workflow Triggers
- **Automatic**: Push to `develop` or `main` branches
- **Manual**: Use "Run workflow" button in GitHub Actions

## Hostinger Configuration

### Subdomain Setup
1. Login to Hostinger control panel
2. Go to Domains > Subdomains
3. Create subdomain: `dev.christrevolutionministries.org`
4. Point to directory: `/public_html/dev/`

### DNS Configuration
Ensure both domains point to your Hostinger server:
- `christrevolutionministries.org` → `/public_html/`
- `dev.christrevolutionministries.org` → `/public_html/dev/`

## Local Development

### Build Commands
```bash
# Development server
npm run dev

# Build for staging
npm run build:staging

# Build for production
npm run build:production
```

### Environment Variables
- `.env.staging` - Staging environment config
- `.env.production` - Production environment config

## Deployment Process

### Staging Deployment
1. Create feature branch from `develop`
2. Make changes and commit
3. Push to `develop` branch
4. Automatic deployment to `dev.christrevolutionministries.org`

### Production Deployment
1. Merge `develop` into `main`
2. Push to `main` branch
3. Automatic deployment to `christrevolutionministries.org`

## Testing Strategy

### Staging Testing
- Test all new features on `dev.christrevolutionministries.org`
- Verify functionality across devices
- Check performance and loading times
- Validate SEO and metadata

### Production Testing
- Smoke tests after deployment
- Monitor for any issues
- Verify critical user journeys

## Rollback Strategy

### Quick Rollback
If issues are detected in production:
1. Revert the commit in `main` branch
2. Push to trigger automatic re-deployment
3. Fix issues in `develop` branch
4. Re-test in staging before re-deploying to production

### Manual Rollback
1. Access Hostinger File Manager
2. Restore previous backup from `/public_html/`
3. Update DNS if necessary

## Monitoring

### Health Checks
- Regular checks on both environments
- Monitor uptime and performance
- Check SSL certificates

### Logs
- GitHub Actions deployment logs
- Hostinger error logs
- Application performance metrics

## Security Considerations

### Environment Separation
- Different analytics IDs for staging/production
- Separate API endpoints if applicable
- Debug mode only enabled in staging

### Access Control
- Limit staging access if needed
- Monitor production access
- Regular security updates

## Troubleshooting

### Common Issues
1. **Build Failures**: Check GitHub Actions logs
2. **FTP Connection**: Verify credentials and server
3. **File Permissions**: Ensure proper permissions on Hostinger
4. **Cache Issues**: Clear CDN cache if applicable

### Support Contacts
- Hostinger Support: [Your support details]
- GitHub Actions: Check repository Actions tab
- Development Team: [Your team contacts]
