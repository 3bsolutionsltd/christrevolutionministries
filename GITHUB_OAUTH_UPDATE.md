# GitHub OAuth Redirect URI Update Guide

## Quick Steps

### Production OAuth App (Ov23liMH6HZyGI4D0Az8)

1. Go to: https://github.com/settings/developers
2. Click "OAuth Apps"
3. Click on your production app
4. Find "Authorization callback URL"
5. **Add these URLs** (keep existing ones):
   - `https://admin.christrevolutionministries.org/api/auth/github`
   - `https://crm-admin.vercel.app/api/auth/github` (temporary Vercel URL)
   - Keep: `http://localhost:3000/api/auth/github` (for local dev)

### Staging OAuth App (Ov23liARElhba3VAJmy6)

1. Same steps as above
2. **Add these URLs**:
   - `https://admin-staging.vercel.app/api/auth/github` (if deploying staging to Vercel)
   - Keep: `http://localhost:3000/api/auth/github` (for local dev)

## Important Notes

- GitHub OAuth allows **multiple redirect URIs** - add all needed URLs
- The OAuth app will accept callbacks from any of the registered URLs
- Don't remove existing URLs unless you're sure they're not being used
- Vercel preview deployments will use the Vercel domain until custom domain is configured

## After Deployment

Once you deploy to Vercel, you'll get a URL like:
- `https://crm-admin.vercel.app` (auto-generated)
- `https://crm-admin-xyz123.vercel.app` (preview deployments)

Add the production URL to your OAuth app immediately after first deployment.
