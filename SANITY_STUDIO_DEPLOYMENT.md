# Sanity Studio Deployment Guide

## Current Deployment Status
- **Your Replit Domain**: `https://latina-empire-jose283.replit.app/`
- **Studio Route**: `/sanity` (redirects to Sanity's hosted studio)
- **Sanity Project ID**: `3yaebsnk`

## Studio URL for Your Sanity Project Settings

### Add This URL to Your Sanity Project:
```
https://latina-empire-cms.sanity.studio
```

### Steps to Add Studio URL:
1. **Go to your Sanity project**: [sanity.io/manage/personal/project/3yaebsnk](https://sanity.io/manage/personal/project/3yaebsnk)
2. **Click "Studios"** in the left sidebar
3. **Click "Add studio"** or "Configure"
4. **Add the studio URL**: `https://latina-empire-cms.sanity.studio`
5. **Save the configuration**

## How It Works

### Studio Access:
- **Direct Studio**: `https://latina-empire-cms.sanity.studio`
- **Via Your Site**: `https://latina-empire-jose283.replit.app/sanity` (redirects to studio)

### Content Management:
- **Events**: Create, edit, and manage events
- **Ambassadors**: Manage leader profiles
- **Blog Posts**: Create and manage blog content

### API Integration:
- **Events API**: `https://latina-empire-jose283.replit.app/api/events`
- **Ambassadors API**: `https://latina-empire-jose283.replit.app/api/ambassadors`
- **Blog API**: `https://latina-empire-jose283.replit.app/api/blog`

## Testing Your Setup

### 1. Test API (Already Working):
```bash
curl https://latina-empire-jose283.replit.app/api/events
```

### 2. Test Studio Access:
- Go to `https://latina-empire-cms.sanity.studio`
- You should see the Sanity Studio interface
- Log in with your Sanity credentials

### 3. Test Content Creation:
- Create a test event in the Studio
- Check if it appears in your API
- Verify it shows on your website

## Current Integration Status:
- ✅ **Sanity API**: Working with authentication
- ✅ **Test Content**: Event created successfully
- ✅ **Server Routes**: API endpoints configured
- ✅ **Studio Redirect**: `/sanity` route configured
- ⏳ **Studio Deployment**: Deploying to `latina-empire-cms.sanity.studio`

## Next Steps:
1. **Add studio URL** to your Sanity project settings
2. **Access studio** at `https://latina-empire-cms.sanity.studio`
3. **Create content** and see it appear instantly on your site
4. **Test the integration** by creating events, ambassadors, and blog posts

Your Sanity integration is fully functional - you just need to add the studio URL to complete the setup!