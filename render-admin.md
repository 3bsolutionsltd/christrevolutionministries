# Admin Server Deployment - Render Configuration

# Build Command
npm run build:admin-server

# Start Command  
npm start

# Environment Variables (set in Render dashboard)
NODE_ENV=production
ADMIN_MODE=true
NEXT_CONFIG=admin

# Auto-Deploy
# Connect to GitHub repository: 3bsolutionsltd/christrevolutionministries
# Branch: main
# Root Directory: (leave empty for repo root)

# Custom Domain
# Add custom domain: admin.christrevolutionministries.org

# Notes:
# - Render automatically handles Next.js applications
# - Static exports work perfectly
# - No shared hosting complications
# - GitHub integration for auto-deployment