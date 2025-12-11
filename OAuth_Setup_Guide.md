# 🔐 GitHub OAuth Setup for Production

## Quick Setup Steps

### 1. Create GitHub OAuth App
**URL**: https://github.com/settings/applications/new

**Settings**:
- **App name**: `Christ Revolution Ministries Admin`
- **Homepage**: `https://christrevolutionministries.org`  
- **Callback URL**: `https://christrevolutionministries.org/admin-oauth-login.html`
- **Description**: `Admin authentication for CRM website`

### 2. Get Your Credentials
After creating the app:
- **Client ID**: `Ov23xxxxxxxxxxxxxxxx` ← Copy this
- **Generate new client secret** ← Copy this (for server-side, optional for static)

### 3. Update Your Code
Replace the placeholder in `public/admin-oauth-login.html`:
```javascript
// Line 67 - Replace this:
const GITHUB_CLIENT_ID = 'your_github_client_id_here';

// With your actual Client ID:
const GITHUB_CLIENT_ID = 'Ov23xxxxxxxxxxxxxxxx';
```

### 4. Add Repository Collaborators
**Repository**: https://github.com/3bsolutionsltd/christrevolutionministries
- Go to **Settings** → **Manage access** 
- Click **Invite a collaborator**
- Add GitHub usernames who need admin access
- Give **Write** permissions (minimum required)

### 5. Test & Deploy
1. **Local test**: Update Client ID → `npm run dev` → test login
2. **Deploy**: Upload to Hostinger with new Client ID
3. **Production test**: Visit live admin login page

## 🛡️ Security Benefits
- ✅ **No server secrets** needed for static hosting
- ✅ **Repository permissions** control access
- ✅ **24-hour sessions** with auto-expiry
- ✅ **Real-time validation** via GitHub API

**Ready to update your Client ID?** Just paste your new GitHub OAuth Client ID and I'll update the code!