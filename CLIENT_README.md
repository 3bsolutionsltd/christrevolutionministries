# Quick Start Guide for Content Management

## 🎯 What You Need to Know
You can now manage all your website content (ministries, sermons, events) through a user-friendly admin interface and deploy changes yourself!

## 🚀 Quick Start (3 Steps)

### Step 1: Start Content Management
```bash
npm run dev:admin
```
Then open: http://localhost:3000/admin/login

### Step 2: Edit Your Content
- **Ministries**: Add/edit ministry information
- **Sermons**: Add new sermons with YouTube links  
- **Events**: Create and manage church events

### Step 3: Deploy to Your Website
```bash
# Test on staging first
npm run deploy:content

# Deploy to live site
npm run deploy:content:production
```

## 📱 Admin Features
- ✅ Add/edit ministries with images
- ✅ Manage sermon archive with YouTube integration
- ✅ Create and organize events
- ✅ Automatic image optimization
- ✅ Secure admin access
- ✅ One-click deployment

## 🔧 Troubleshooting
- **Can't access admin?** Make sure you ran `npm run dev:admin`
- **Changes not showing?** Run the deploy command after editing
- **Need help?** Check `ADMIN_GUIDE.md` for detailed instructions

## 📞 Support
For questions or issues, contact your development team with:
- What you were trying to do
- Any error messages you see
- Screenshots if helpful

---

**Your website empowers you to manage your own content! 🙌**