# Vercel Admin Deployment - Quick Start Checklist

## ✅ Pre-Deployment Checklist

### 1. Vercel Account Setup
- [x] Login to Vercel (✅ Already done with `npx vercel login`)
- [ ] Deploy via CLI (easier than connecting GitHub repo)

### 2. GitHub OAuth Configuration
- [ ] Go to https://github.com/settings/developers
- [ ] Click "OAuth Apps"
- [ ] Select your production OAuth app (Ov23liMH6HZyGI4D0Az8)
- [ ] Add callback URL: `https://crm-admin.vercel.app/api/auth/github`
- [ ] (Later) Add custom domain: `https://admin.christrevolutionministries.org/api/auth/github`

### 3. Get Your GitHub Client Secret
- [ ] Copy `GITHUB_CLIENT_SECRET` from GitHub OAuth app settings
- [ ] Keep it ready for Vercel environment variables

## 🚀 Deployment Steps

### Step 1: Deploy to Vercel (CLI Method - Recommended)
```bash
# You've already logged in! Now deploy:
npx vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? crm-admin (or any name)
# - In which directory is your code located? ./ (press Enter)
# - Want to override the settings? No

# This creates a preview deployment first
# After successful preview, deploy to production:
npx vercel --prod
```

**Note:** Use `npx vercel` instead of just `vercel` since the global command isn't in your PATH.

### Step 2: Configure Environment Variables in Vercel

After deployment, go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add these variables for **Production**:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `GITHUB_CLIENT_ID` | `Ov23liMH6HZyGI4D0Az8` | Production |
| `GITHUB_CLIENT_SECRET` | `<your-secret>` | Production |
| `NODE_ENV` | `production` | Production |
| `NEXT_CONFIG` | `admin` | Production |
| `ADMIN_MODE` | `true` | Production |

### Step 3: Redeploy After Setting Environment Variables
```bash
npx vercel --prod
```

Or trigger redeploy from Vercel Dashboard → Deployments → Redeploy

### Step 4: Configure Custom Domain (Optional but Recommended)

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add domain: `admin.christrevolutionministries.org`
3. Vercel will show DNS configuration needed
4. Go to Hostinger → DNS Zone Editor
5. Add CNAME record:
   ```
   Type: CNAME
   Name: admin
   Target: cname.vercel-dns.com
   TTL: 3600
   ```
6. Wait for DNS propagation (5-60 minutes)
7. Update GitHub OAuth callback URL with custom domain

### Step 5: Test Admin Panel

1. Visit: `https://crm-admin.vercel.app` (or custom domain)
2. Click "Login with GitHub OAuth"
3. Should redirect to GitHub → authenticate → back to admin
4. Test creating/editing content

## 🔧 Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify all environment variables are set
- Ensure `NEXT_CONFIG=admin` is set

### OAuth 404 Error
- Verify callback URL in GitHub OAuth app matches Vercel domain
- Check `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are set in Vercel
- Look at browser console for exact error

### Custom Domain Not Working
- Wait 30-60 minutes for DNS propagation
- Check DNS records in Hostinger
- Use https://dnschecker.org to verify CNAME

### API Routes Return 404
- Verify build used `build:vercel-admin` script
- Check Vercel build logs show API routes (marked with `ƒ`)
- Make sure `output: 'export'` is NOT in next.config.js for admin

## 📝 After Successful Deployment

- [ ] Admin accessible at Vercel URL
- [ ] OAuth login works
- [ ] Content management functional
- [ ] Custom domain configured (optional)
- [ ] Update documentation with admin URL
- [ ] Share admin URL with team/clients

## 🎯 Expected Results

✅ Admin panel: `https://crm-admin.vercel.app` or `https://admin.christrevolutionministries.org`  
✅ Public staging: `https://dev.christrevolutionministries.org` (Hostinger)  
✅ Public production: `https://christrevolutionministries.org` (Hostinger)

All three deployed separately, admin on Vercel, public sites on Hostinger!
