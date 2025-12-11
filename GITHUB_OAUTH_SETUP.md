# GitHub OAuth Setup for Secure Client Access

## Overview
Instead of sharing your Personal Access Token, we'll use GitHub OAuth so clients can authenticate with their own GitHub accounts.

## Setup Steps

### 1. Create GitHub OAuth App
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in details:
   - Application name: "Christ Revolution Ministries Admin"
   - Homepage URL: https://admin.christrevolutionministries.org
   - Authorization callback URL: https://admin.christrevolutionministries.org/callback
4. Save the Client ID and Client Secret

### 2. Add Client as Repository Collaborator
1. Go to your repository settings
2. Click "Manage access"
3. Click "Invite a collaborator"
4. Add client's GitHub username with "Write" permission

### 3. Environment Variables Needed
```
GITHUB_CLIENT_ID=your_oauth_app_client_id
GITHUB_CLIENT_SECRET=your_oauth_app_client_secret
GITHUB_REPO_OWNER=3bsolutionsltd
GITHUB_REPO_NAME=christrevolutionministries
```

### 4. OAuth Flow
1. Client visits admin panel
2. Redirected to GitHub for authentication
3. GitHub redirects back with authorization code
4. Exchange code for access token
5. Use token to make API calls on behalf of client

## Benefits
- ✅ Client uses their own GitHub account
- ✅ You control repository access via collaborator permissions
- ✅ Can revoke access anytime by removing collaborator
- ✅ No sharing of your personal credentials
- ✅ Audit trail of who made what changes

## Alternative: Headless CMS
If GitHub OAuth is too complex, consider:
- **Strapi** (self-hosted, free)
- **Sanity** (managed, free tier)
- **Contentful** (managed, free tier)

These provide user-friendly content management without GitHub complexity.