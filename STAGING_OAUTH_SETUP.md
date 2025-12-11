# 🎯 Dual Environment OAuth Setup Guide

## Step 1: Create Staging OAuth App

**Go to**: https://github.com/settings/applications/new

**Settings for Staging**:
```
Application name: Christ Revolution Ministries Admin (Staging)
Homepage URL: https://dev.christrevolutionministries.org
Authorization callback URL: https://dev.christrevolutionministries.org/admin-oauth-login.html
Application description: Staging admin panel for Christ Revolution Ministries
```

## Step 2: Update Staging Client ID

After creating the staging OAuth app, copy the **Client ID** and update:

### In `public/admin-oauth-login.html` (line ~73):
```javascript
// Replace this line:
const STAGING_CLIENT_ID = 'your_staging_oauth_client_id_here';

// With your actual staging Client ID:
const STAGING_CLIENT_ID = 'Ov23xxxxxxxxxxxxxx';
```

## Step 3: Repository Collaborators

Add the same collaborators to both OAuth apps:
- Go to your repository settings
- Add GitHub usernames who need access
- Give them **Write** permissions

## Step 4: Deploy & Test

### Build Staging:
```bash
npm run build:staging
```

### Build Production:
```bash  
npm run build:production
```

### Test Flow:
1. **Staging**: `https://dev.christrevolutionministries.org/admin-oauth-login.html`
2. **Production**: `https://christrevolutionministries.org/admin-oauth-login.html`

## 🔐 Security Benefits

✅ **Environment Isolation**: Separate OAuth apps prevent staging/prod confusion
✅ **Auto-Detection**: Code automatically uses the right OAuth app
✅ **Same Codebase**: One codebase works for both environments
✅ **Repository Control**: Same collaborator permissions for both

## 📋 Quick Checklist

- [ ] Create staging OAuth app with `dev.christrevolutionministries.org` callback
- [ ] Copy staging Client ID to code
- [ ] Add repository collaborators  
- [ ] Build staging version
- [ ] Test staging OAuth flow
- [ ] Build production version
- [ ] Deploy both environments

**Ready to create your staging OAuth app?** 🚀