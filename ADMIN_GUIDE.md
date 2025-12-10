# Client Content Management Guide

## Overview
This guide explains how to manage your website content (ministries, sermons, events) through the admin interface and deploy changes to your live website.

## Two Deployment Modes

### 1. Admin Mode (For Content Management)
- **Purpose**: Allows you to edit content through web interface
- **Where**: Run locally on your computer or admin server
- **Admin Access**: http://localhost:3000/admin/login

### 2. Static Mode (For Public Website)
- **Purpose**: Fast, secure public website
- **Where**: Deployed to your web hosting (Hostinger)
- **Public Access**: https://christrevolutionministries.org

## Content Management Workflow

### Step 1: Start Admin Mode Locally
```bash
# Navigate to your project folder
cd C:\wamp64\www\crministries

# Start the admin interface
npm run dev:admin
```

### Step 2: Access Admin Interface
1. Open browser to: http://localhost:3000/admin/login
2. Login with your credentials
3. Manage content:
   - **Ministries**: Add/edit ministry descriptions, images
   - **Sermons**: Add new sermons with YouTube links
   - **Events**: Create and manage church events

### Step 3: Deploy Changes to Live Website
After making content changes through admin:

```bash
# Generate updated content files
npm run build:staging

# Deploy to staging first (test)
npm run deploy:staging

# If everything looks good, deploy to production
npm run deploy:production
```

## Content Management Features

### Ministries Management
- Add new ministries with descriptions
- Upload ministry images
- Edit existing ministry information
- Reorder ministries display

### Sermons Management
- Add new sermons with YouTube video links
- Automatic thumbnail extraction from YouTube
- Organize sermons by date and series
- Edit sermon titles and descriptions

### Events Management
- Create upcoming church events
- Set event dates, times, and locations
- Add event descriptions and details
- Manage event categories and types

## File Locations
Your content is stored in:
- `public/api/ministries.json` - Ministry data
- `public/api/sermons.json` - Sermon data  
- `public/api/events.json` - Event data
- `public/images/cache/` - Uploaded images

## Backup and Security
- Content files are automatically backed up during deployment
- Admin interface is only accessible during development/management
- Production website runs in secure static mode
- All changes are version controlled in Git

## Troubleshooting

### Can't Access Admin Interface
- Ensure you're running `npm run dev:admin`
- Check that port 3000 isn't blocked
- Try http://localhost:3000/admin/login directly

### Changes Not Showing on Live Site
- Run `npm run build:production` after making admin changes
- Wait for deployment to complete
- Clear browser cache and refresh

### Images Not Loading
- Check that images are uploaded through admin interface
- Verify image files exist in `public/images/cache/`
- Ensure proper file extensions (jpg, png, webp)

## Support
For technical issues or additional features, contact your development team with:
- Description of the issue
- Screenshots if applicable
- Steps you tried to resolve it

---

**Remember**: Always test changes on staging before deploying to production!