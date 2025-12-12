# 🚨 Staging 403 Forbidden Fix Guide

The 403 error on `https://dev.christrevolutionministries.org` is likely due to one of these issues:

## 🔧 Quick Fixes to Try

### 1. **Check Subdomain Configuration in Hostinger**
- Login to Hostinger control panel
- Go to **Domains** → **Manage** → **Subdomains**
- Verify `dev.christrevolutionministries.org` points to `/public_html/dev/`
- If not configured, add it:
  - Subdomain: `dev`
  - Document Root: `/public_html/dev/`

### 2. **Check File Permissions (via File Manager)**
- Go to Hostinger **File Manager**
- Navigate to `/public_html/dev/`
- Select all files → Right-click → **Change Permissions**
- Set:
  - **Files**: `644` (rw-r--r--)
  - **Directories**: `755` (rwxr-xr-x)
  - **.htaccess**: `644` (rw-r--r--)

### 3. **Verify DirectoryIndex**
Check if `/public_html/dev/index.html` exists and is readable.

### 4. **Manual Test URLs**
Try these URLs to diagnose:
- `https://dev.christrevolutionministries.org/index.html` (direct file)
- `https://dev.christrevolutionministries.org/admin-oauth-login.html` (OAuth page)

## 🚀 Quick Redeploy

If the above doesn't work, trigger a fresh deployment:

```bash
# Force rebuild and deploy
git commit --allow-empty -m "🔄 Force staging deployment refresh"
git push origin main
git checkout develop
git merge main 
git push origin develop
```

## 🔍 Common Hostinger Issues

1. **Subdomain not configured**: Most common cause
2. **File permissions**: Files uploaded via FTP sometimes have wrong permissions
3. **Cache issues**: Hostinger CDN cache might be serving old content
4. **.htaccess conflicts**: Server configuration might conflict

## 📞 If Still Broken

Contact Hostinger support with:
- "403 Forbidden error on subdomain dev.christrevolutionministries.org"
- "Files are uploaded to /public_html/dev/ but getting access denied"
- "Need to verify subdomain configuration and file permissions"