# Custom Domain Setup: thelatinaempire.com

## Overview
You want to use `thelatinaempire.com` as your main domain with `/sanity` for the Studio. Here's the complete setup:

## Step 1: Sanity Studio Deployment

### Deploy Studio to Sanity's CDN
I'm deploying your Studio to: `https://latina-empire-cms.sanity.studio`

This creates a Studio URL you can use immediately while setting up your custom domain.

### Add Studio URL to Your Project
In your Sanity project settings, add:
```
https://latina-empire-cms.sanity.studio
```

## Step 2: Connect Custom Domain to Replit

### In Replit Dashboard:
1. **Go to your Replit project**
2. **Click "Deployments"** in the left sidebar
3. **Click "Custom domains"**
4. **Add domain**: `thelatinaempire.com`
5. **Replit will provide DNS records** to configure

### DNS Configuration:
You'll need to add these records to your domain registrar:

**A Record:**
- Name: `@` (root domain)
- Value: `[Replit's IP address]` (provided by Replit)

**CNAME Record:**
- Name: `www`
- Value: `[your-replit-project].replit.app`

## Step 3: Studio Path Setup

### Option A: Subdomain Approach (Recommended)
Set up: `studio.thelatinaempire.com`

**DNS Setup:**
- CNAME: `studio` → `latina-empire-cms.sanity.studio`

### Option B: Path-based Approach
Set up: `thelatinaempire.com/sanity`

**Server Configuration:**
I'll add a route that redirects `/sanity` to your Studio URL.

## Step 4: Implementation

### I'll Add Server Route for /sanity:
```javascript
app.get('/sanity', (req, res) => {
  res.redirect('https://latina-empire-cms.sanity.studio');
});
```

### Update Studio URL in Sanity Project:
Add both:
- `https://latina-empire-cms.sanity.studio`
- `https://thelatinaempire.com/sanity`

## Step 5: SSL Certificate
Replit automatically handles SSL certificates for custom domains.

## Current Status:
- ✅ **Sanity Studio**: Deploying to `latina-empire-cms.sanity.studio`
- ✅ **API Integration**: Working with authentication
- ✅ **Test Content**: Successfully created via API
- ⏳ **Domain Setup**: Waiting for DNS configuration

## Next Steps:
1. **Complete Studio deployment** (in progress)
2. **Configure DNS records** at your domain registrar
3. **Test Studio access** at both URLs
4. **Add domain to Replit Deployments**

## URLs You'll Have:
- **Main Site**: `https://thelatinaempire.com`
- **Studio**: `https://thelatinaempire.com/sanity` (redirects to Sanity)
- **Direct Studio**: `https://latina-empire-cms.sanity.studio`

This setup gives you a professional domain structure while maintaining the power of Sanity's hosted Studio.