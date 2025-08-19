# 🚀 Hostinger Business Hosting Deployment Guide

**Christ Revolution Ministries Website Deployment**  
**Domain:** christrevolutionministries.org  
**Platform:** Hostinger Business Hosting  

---

## 📋 Deployment Architecture Overview

### **Current Setup:**
- **Domain:** christrevolutionministries.org (already hosted on Hostinger)
- **Technology:** Next.js 13+ with TypeScript
- **Build Output:** Static export compatible with shared hosting

### **Deployment Strategy:**
1. **Static Export** - Convert Next.js to static files
2. **GitHub Actions** - Automated deployment pipeline
3. **FTP/File Manager** - Deploy to Hostinger hosting
4. **Domain Configuration** - Seamless transition

---

## 🛠️ Step 1: Configure Next.js for Static Export

Since Hostinger Business hosting is shared hosting (not Node.js), we need to export the Next.js app as static files.

### Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig
```

### Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next build && next export",
    "deploy": "npm run export",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 🔧 Step 2: GitHub Actions Deployment Pipeline

Create `.github/workflows/deploy.yml` for automated deployment:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Hostinger via FTP
      uses: SamKirkland/FTP-Deploy-Action@4.3.3
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./out/
        server-dir: /public_html/
        exclude: |
          **/.git*
          **/.git*/**
          **/node_modules/**
```

---

## 🌐 Step 3: Hostinger Configuration

### **A. Get FTP Credentials:**
1. Login to Hostinger Control Panel
2. Go to **File Manager** or **FTP Accounts**
3. Note down:
   - **FTP Server:** (usually ftp.yourdomain.com)
   - **Username:** (your hosting username)
   - **Password:** (your hosting password)

### **B. Directory Structure:**
```
/public_html/
├── index.html (your exported Next.js app)
├── _next/
├── assets/
├── images/
└── other static files
```

### **C. Backup Current Site:**
```bash
# Download current site files
# Use File Manager or FTP client to backup existing files
```

---

## 🔐 Step 4: GitHub Secrets Configuration

Add these secrets to your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `FTP_SERVER`: Your Hostinger FTP server
   - `FTP_USERNAME`: Your FTP username
   - `FTP_PASSWORD`: Your FTP password

---

## 🚀 Step 5: Manual Deployment Process

### **Option A: Automated (Recommended)**
1. Push changes to GitHub main branch
2. GitHub Actions automatically builds and deploys
3. Changes appear on christrevolutionministries.org

### **Option B: Manual FTP Upload**
1. Build the project locally:
   ```bash
   npm run build
   ```
2. Upload `/out/` folder contents to `/public_html/`
3. Use FileZilla, WinSCP, or Hostinger File Manager

---

## ⚙️ Step 6: Domain and SSL Configuration

### **A. Domain Settings:**
- Ensure domain points to your Hostinger hosting
- Verify DNS settings in Hostinger control panel

### **B. SSL Certificate:**
- Enable SSL in Hostinger control panel
- Force HTTPS redirects

### **C. Performance Optimization:**
```apache
# Add to .htaccess file
<IfModule mod_expires.c>
ExpiresActive on
ExpiresByType text/css "access plus 1 year"
ExpiresByType application/javascript "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

---

## 🔄 Step 7: Deployment Workflow

### **Development Workflow:**
1. **Develop locally:** `npm run dev`
2. **Test build:** `npm run build`
3. **Commit changes:** `git add . && git commit -m "Update website"`
4. **Push to GitHub:** `git push origin main`
5. **Auto-deploy:** GitHub Actions handles deployment
6. **Verify:** Check christrevolutionministries.org

### **Emergency Manual Deploy:**
1. `npm run build`
2. Upload `/out/` contents via File Manager
3. Clear any caches

---

## 📊 Step 8: Monitoring and Maintenance

### **A. Performance Monitoring:**
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Check mobile responsiveness

### **B. Regular Maintenance:**
```bash
# Weekly checks
npm audit                    # Security vulnerabilities
npm outdated                # Package updates
npm run build               # Build verification
```

### **C. Backup Strategy:**
- Daily: Hostinger automatic backups
- Weekly: Manual GitHub backup
- Before major updates: Full site backup

---

## 🚨 Troubleshooting Guide

### **Common Issues:**

1. **Build Fails:**
   ```bash
   # Check for errors
   npm run build -- --debug
   
   # Clear cache
   rm -rf .next out node_modules
   npm install
   npm run build
   ```

2. **Images Not Loading:**
   - Ensure `images.unoptimized: true` in next.config.js
   - Check image paths are relative

3. **Routing Issues:**
   - Verify `trailingSlash: true` in config
   - Check .htaccess for redirect rules

4. **FTP Upload Fails:**
   - Verify FTP credentials
   - Check file permissions
   - Ensure server-dir path is correct

---

## 📈 Step 9: Performance Optimization

### **A. Image Optimization:**
```javascript
// Optimize images before build
const imageOptimization = {
  formats: ['webp', 'jpg'],
  quality: 80,
  sizes: [640, 768, 1024, 1280, 1536]
}
```

### **B. Code Splitting:**
```javascript
// Already handled by Next.js
// Ensure dynamic imports for large components
const DynamicComponent = dynamic(() => import('./Component'))
```

### **C. Caching Strategy:**
```apache
# .htaccess caching rules
<IfModule mod_headers.c>
<FilesMatch "\\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$">
Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
</IfModule>
```

---

## ✅ Deployment Checklist

### **Pre-Deployment:**
- [ ] Test build locally (`npm run build`)
- [ ] Verify all pages load correctly
- [ ] Check mobile responsiveness
- [ ] Test contact forms and interactive features
- [ ] Backup current live site

### **Deployment:**
- [ ] Push to GitHub main branch
- [ ] Monitor GitHub Actions deployment
- [ ] Verify site loads on christrevolutionministries.org
- [ ] Test all navigation links
- [ ] Check SSL certificate

### **Post-Deployment:**
- [ ] Test site performance
- [ ] Verify Google Analytics (if configured)
- [ ] Check SEO meta tags
- [ ] Test donation/giving functionality
- [ ] Monitor for any errors

---

## 🎯 Next Steps

1. **Immediate:** Configure Next.js for static export
2. **Setup:** GitHub Actions deployment pipeline
3. **Deploy:** Push to production
4. **Monitor:** Verify site performance
5. **Optimize:** Fine-tune based on metrics

---

**Ready to deploy your modern Next.js website to Hostinger! 🚀**
