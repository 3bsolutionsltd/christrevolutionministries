# Admin Server Setup Guide

## Overview

Your website now has a **separate admin server** that allows you to manage content independently without contacting developers.

## Architecture

- **Main Website:** `christrevolutionministries.org` (Fast, secure, static)
- **Admin Portal:** `admin.christrevolutionministries.org` (Content management)
- **Staging Site:** `dev.christrevolutionministries.org` (Testing)

## How It Works

### 1. **Content Management**
- Access: `https://admin.christrevolutionministries.org`
- Login with your admin credentials
- Edit ministries, events, sermons, slideshow, etc.
- Upload images and manage YouTube links

### 2. **Publishing Workflow**

#### Option A: Test First (Recommended)
1. **Make changes** in the admin panel
2. **Sync to Repository** (saves changes)
3. **Publish to Staging** → Test at `dev.christrevolutionministries.org`
4. **Publish to Production** → Goes live at `christrevolutionministries.org`

#### Option B: Direct Publishing
1. **Make changes** in the admin panel
2. **Publish to Production** (skip staging)

### 3. **Content Types You Can Manage**

- ✅ **Homepage Slideshow** - Hero images and text
- ✅ **About Section** - Church information and pastor details  
- ✅ **Ministries** - Add/edit ministry programs with images
- ✅ **Events** - Upcoming church events and activities
- ✅ **Sermons** - Weekly sermons with YouTube links
- ✅ **Site Settings** - Contact info, social media, etc.
- ✅ **Image Upload** - Upload and manage church photos

## Benefits for You

### **Independence** 
- Update content anytime without developer help
- No waiting for technical support
- Direct control over your website

### **Safety**
- Staging environment to test changes first
- Main website stays fast and secure
- Automatic backups through GitHub

### **Simplicity**
- User-friendly admin interface
- Step-by-step publishing process
- Clear workflow guidance

## Getting Started

1. **Access Admin Panel**
   - Go to: `https://admin.christrevolutionministries.org`
   - Login with your credentials

2. **Make Your First Update**
   - Edit a ministry or event
   - Click "Publish" → "Sync to Repository" 
   - Then "Publish to Staging"
   - Test at `dev.christrevolutionministries.org`

3. **Go Live**
   - If staging looks good, "Publish to Production"
   - Changes appear on `christrevolutionministries.org`

## Support

### **What You Can Do Yourself**
- Content updates (text, images, events)
- Adding new ministries, sermons, events
- Changing contact information
- Managing slideshow images

### **When to Contact Developer**
- Technical errors in admin panel
- New feature requests
- Design or layout changes
- Server or hosting issues

## Security Notes

- **Main website** is completely static (ultra-fast, secure)
- **Admin server** is separate and secured
- Your changes are version-controlled in GitHub
- Always test on staging before going live

---

**Questions?** Contact your developer for technical support or training on the admin system.