# Christ Revolution Ministries - Admin System

## Overview
A comprehensive admin dashboard for managing the Christ Revolution Ministries website content. This system allows administrators to easily update ministries, events, sermons, YouTube links, and upload images without touching code.

## Features

### 🔐 Authentication System
- Secure login system for admin access
- Session-based authentication
- Protected admin routes

### 📋 Content Management
- **Ministries Management**: Add, edit, delete ministry programs
- **Events Management**: Manage upcoming events and conferences
- **Sermons Library**: Organize sermons with YouTube and audio links
- **YouTube Links**: Manage all YouTube channel and video links
- **Image Upload**: Upload and manage images with automatic resizing

### 🚀 Technical Features
- Real-time data updates
- Responsive design for mobile and desktop
- File-based data storage (easily upgradeable to database)
- Image validation and optimization
- RESTful API endpoints

## Access Information

### Admin Login
- **URL**: `/admin/login`
- **Default Username**: `admin`
- **Default Password**: `crm2024!`

> **⚠️ IMPORTANT**: Change the default credentials in production by updating the environment variables.

### Admin Dashboard
- **URL**: `/admin`
- Access to all management sections

## Directory Structure
```
app/
├── admin/                          # Admin frontend pages
│   ├── components/
│   │   └── AdminLayout.tsx        # Main admin layout
│   ├── events/page.tsx            # Events management
│   ├── login/page.tsx             # Admin login page
│   ├── ministries/page.tsx        # Ministries management
│   ├── sermons/page.tsx           # Sermons management
│   ├── youtube-links/page.tsx     # YouTube links management
│   └── page.tsx                   # Admin dashboard
├── api/
│   ├── admin/
│   │   ├── data-manager.ts        # Data operations utility
│   │   ├── events/route.ts        # Events API endpoints
│   │   ├── ministries/route.ts    # Ministries API endpoints
│   │   ├── sermons/route.ts       # Sermons API endpoints
│   │   ├── upload/route.ts        # Image upload endpoint
│   │   └── youtube-links/route.ts # YouTube links endpoints
│   └── auth/                      # Authentication endpoints
│       ├── check/route.ts         # Check auth status
│       ├── login/route.ts         # Login endpoint
│       ├── logout/route.ts        # Logout endpoint
│       └── middleware.ts          # Auth middleware
├── lib/
│   └── data-fetchers.ts           # Frontend data fetching utilities
data/                              # JSON data storage
├── events.json
├── ministries.json
├── sermons.json
└── youtube-links.json
public/uploads/                    # Uploaded images storage
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Admin credentials (CHANGE THESE!)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password

# Base URL for API calls
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Environment
NODE_ENV=production
```

## Usage Guide

### Managing Ministries
1. Go to `/admin/ministries`
2. Click "Add New Ministry" to create a ministry
3. Fill in title, description, icon (emoji), and upload image
4. Save changes

### Managing Events
1. Go to `/admin/events`
2. Click "Add New Event" 
3. Fill in event details including date, time, location
4. Select category and upload event image
5. Save changes

### Managing Sermons
1. Go to `/admin/sermons`
2. Click "Add New Sermon"
3. Enter sermon title, speaker, date, series
4. Add YouTube URL and/or audio URL
5. Save changes

### Managing YouTube Links
1. Go to `/admin/youtube-links`
2. Click "Add New Link"
3. Enter title, category, YouTube URL, and description
4. Save changes

### Image Upload
- Supported formats: JPEG, PNG, GIF, WebP
- Maximum file size: 5MB
- Images are automatically stored in `/public/uploads/`
- Filenames are automatically generated with timestamps

## API Endpoints

All admin API endpoints require authentication except for GET requests to fetch public data.

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout  
- `GET /api/auth/check` - Check authentication status

### Content Management
- `GET /api/admin/ministries` - Get all ministries
- `POST /api/admin/ministries` - Add/update/delete ministries
- `GET /api/admin/events` - Get all events
- `POST /api/admin/events` - Add/update/delete events
- `GET /api/admin/sermons` - Get all sermons
- `POST /api/admin/sermons` - Add/update/delete sermons
- `GET /api/admin/youtube-links` - Get all YouTube links
- `POST /api/admin/youtube-links` - Add/update/delete YouTube links
- `POST /api/admin/upload` - Upload images

## Data Storage

The system uses JSON files for data storage by default:
- `data/ministries.json` - Ministries data
- `data/events.json` - Events data  
- `data/sermons.json` - Sermons data
- `data/youtube-links.json` - YouTube links data

### Upgrading to Database
To upgrade to a database system (recommended for production):
1. Replace the data-manager.ts file operations
2. Update API endpoints to use database queries
3. Set up database connection and models

## Security Considerations

### Production Deployment
1. **Change default credentials** immediately
2. **Use HTTPS** for all admin access
3. **Set strong passwords** with special characters
4. **Regular backups** of data files
5. **Monitor access logs** for suspicious activity

### File Security
- Images are validated for type and size
- File uploads are restricted to image types only
- Uploaded files get unique timestamped names

## Troubleshooting

### Common Issues
1. **"Authentication required" error**: Clear cookies and log in again
2. **Image upload fails**: Check file size (max 5MB) and format
3. **Data not updating**: Check browser cache, refresh page
4. **API errors**: Check server logs and network connectivity

### Data Backup
Regularly backup the `data/` folder and `public/uploads/` folder to prevent data loss.

## Support
For technical support or questions about the admin system, contact your development team or refer to the main project documentation.

---

**Last Updated**: December 2025
**Version**: 1.0.0