# Vercel Admin Deployment Configuration

## Environment Variables Required

Add these in Vercel Dashboard → Project Settings → Environment Variables:

### GitHub OAuth (Production)
```
GITHUB_CLIENT_ID=Ov23liMH6HZyGI4D0Az8
GITHUB_CLIENT_SECRET=<your-production-secret>
```

### GitHub OAuth (Staging - if deploying staging admin)
```
GITHUB_STAGING_CLIENT_ID=Ov23liARElhba3VAJmy6
GITHUB_STAGING_CLIENT_SECRET=<your-staging-secret>
NEXT_PUBLIC_ENVIRONMENT=staging
```

### Build Configuration
```
NODE_ENV=production
NEXT_CONFIG=admin
ADMIN_MODE=true
```

## GitHub OAuth Redirect URIs

Update your GitHub OAuth apps with these redirect URIs:

### Production OAuth App (Ov23liMH6HZyGI4D0Az8)
- Add: `https://admin.christrevolutionministries.org/api/auth/github`
- Add: `https://crm-admin.vercel.app/api/auth/github` (temporary Vercel domain)

### Staging OAuth App (Ov23liARElhba3VAJmy6)
- Add: `https://admin-staging.christrevolutionministries.org/api/auth/github` (if needed)

## Deployment Steps

### 1. Initial Setup
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login
```

### 2. Deploy to Vercel
```bash
# Deploy to production
vercel --prod

# Or deploy for preview/testing first
vercel
```

### 3. Configure Custom Domain
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add custom domain: `admin.christrevolutionministries.org`
3. Vercel will provide DNS records (CNAME or A record)
4. Add the DNS records in Hostinger control panel

### 4. Update DNS in Hostinger
Add CNAME record:
```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
TTL: 3600
```

## Build Configuration

The admin deployment uses:
- **Build Command**: `npm run build:admin-server` (no static export, keeps API routes)
- **Output Directory**: `.next` (standard Next.js build)
- **Node Version**: 18.x

## Testing

After deployment:
1. Visit: `https://admin.christrevolutionministries.org`
2. Click "Login with GitHub OAuth"
3. Should redirect to GitHub → back to admin panel
4. Test content management features

## Troubleshooting

### OAuth 404 Error
- Check environment variables are set in Vercel
- Verify GitHub OAuth redirect URIs include the Vercel domain

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify NODE_ENV and NEXT_CONFIG are set

### API Route 404
- Admin should NOT use static export
- Verify vercel.json has correct build settings
- Check middleware.ts allows API routes for admin mode
