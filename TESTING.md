# Testing the Content Update System

This guide walks through testing the fixes made to the content management backend.

## Overview

The system has been updated to:
1. Fix a production bug where YouTube links loaded from admin APIs instead of static JSON
2. Ensure the `Publish` action reliably triggers deployment
3. Show clear admin mode status and deployment feedback in the UI

## Local Environment Test

### 1. Verify admin access
```bash
npm install
npm run dev:admin
```

Open the admin interface and confirm the header badge shows **"Admin Host"**.
- Green badge = allowed admin environment
- Red badge = unsupported host

### 2. Update content (pick one)
Navigate to:
- `/admin/ministries` (add/edit a ministry)
- `/admin/events` (add/edit an event)
- `/admin/sermons` (add/edit a sermon)
- `/admin/homepage-settings` (edit homepage text)
- `/admin/site-settings` (edit site settings)

Make a small edit and save.

### 3. Verify sync
Open `/admin/publish` and click **Sync to Repository**.
- Confirm the status shows success
- This verifies content was committed to GitHub

### 4. Publish to staging
Click **Publish to Staging**.
- Watch the status display
- Confirm it shows:
  - Success message
  - Deployment details (GitHub Actions dispatch or webhook confirmation)

### 5. Verify staging
Once publish completes, check:
```
https://dev.christrevolutionministries.org
```
Confirm the updated content appears on the live staging site.

### 6. Publish to production
Once staging is confirmed correct, click **Publish to Production**.
- Confirm success in the UI

### 7. Verify production
Check:
```
https://christrevolutionministries.org
```
Confirm the updated content appears on the live production site.

---

## Build Verification (without publishing)

To verify the static build process locally:

### Staging build
```bash
npm run build:staging
```
- Confirms the build completes
- Generates static export in `out/` directory
- Runs `generate-static-data.js` to copy `data/*.json` to `public/api/*.json`

### Production build
```bash
npm run build:production
```
- Same as staging build but with production environment

---

## What to check if something fails

### Publish fails with deployment error
- Confirm `GITHUB_TOKEN` is set in the admin server environment
- Check GitHub Actions workflow logs at: `https://github.com/3bsolutionsltd/christrevolutionministries/actions`
- Verify the workflow triggered for the correct branch and environment

### Content updates don't appear on staging/production
- Verify the build completed successfully in GitHub Actions
- Check that static JSON files were generated in `public/api/`
- Confirm the deployment step uploaded files to the correct host

### Admin mode badge shows "Unsupported Host"
- Verify you are accessing admin from:
  - `localhost` or `127.0.0.1` (local development)
  - A Vercel domain (admin deployment)
  - `admin.christrevolutionministries.org` (admin subdomain)
  - `dev.christrevolutionministries.org` (staging)

---

## Key Changes Made

1. **Fixed production data fetchers** (`app/lib/data-fetchers.ts`)
   - `getYouTubeLinks()` now loads from `/api/youtube-links.json` instead of admin API

2. **Publish now triggers deployment** (`app/api/admin/publish/route.ts`)
   - Dispatches GitHub Actions workflow via `GITHUB_TOKEN`
   - Falls back to `DEPLOYMENT_WEBHOOK_URL` if needed
   - Returns clear success/error feedback

3. **Better publish feedback** (`app/admin/publish/page.tsx`)
   - Shows deployment status and details
   - Displays errors with full context

4. **Admin mode visibility** (`app/admin/components/AdminLayout.tsx`)
   - Header badge shows whether running on an allowed admin host
   - Helps prevent confusion on non-admin hosts

---

## Expected Flow

1. Admin makes changes and saves
2. Content is committed to GitHub via admin APIs
3. Admin clicks "Sync" to verify commit
4. Admin clicks "Publish to Staging" or "Publish to Production"
5. System dispatches GitHub Actions workflow
6. Workflow runs:
   - Installs dependencies
   - Generates static data from `data/*.json` to `public/api/*.json`
   - Builds static export
   - Deploys to Hostinger or configured host
7. Public site loads new content from static JSON files
8. Changes appear live

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Admin UI not accessible | Verify you are on an allowed host (localhost, Vercel, staging) |
| Publish shows "ADMIN_MODE is not true" | Admin server not configured in production mode |
| Deployment fails silently | Verify `GITHUB_TOKEN` or `DEPLOYMENT_WEBHOOK_URL` is set |
| Content updates don't appear | Check GitHub Actions workflow logs for build/deploy errors |
| YouTube links still show old content | Clear browser cache or wait for new static build to complete |

---

## Support

For detailed logs, check:
- Admin server logs: `/api/admin/publish` response in browser network tab
- GitHub Actions: https://github.com/3bsolutionsltd/christrevolutionministries/actions/workflows/deploy.yml
- Build output: Check `out/` directory after local build
