# Complete Custom Domain Setup: thelatinaempire.com

## ✅ Current Status
- **Sanity Integration**: ✅ Working perfectly
- **Test Event Created**: ✅ Successfully via API
- **Studio Redirect**: ✅ `/sanity` route configured
- **API Endpoints**: ✅ Serving content from Sanity

## Step 1: Add Studio URL to Your Sanity Project

### Go to Your Sanity Project Settings:
1. Visit: [sanity.io/manage/personal/project/3yaebsnk](https://sanity.io/manage/personal/project/3yaebsnk)
2. Click "Studios" in the left sidebar
3. Click "Add studio"
4. Add this URL: `https://thelatinaempire.com/sanity`

### Alternative Direct Studio URL:
If you prefer a direct Studio URL, I can deploy it to:
`https://latina-empire-cms.sanity.studio`

## Step 2: Connect thelatinaempire.com to Replit

### In Replit:
1. Go to your project in Replit
2. Click **"Deployments"** in the left sidebar
3. Click **"Custom domains"**
4. Add domain: `thelatinaempire.com`
5. Replit will provide DNS records

### DNS Configuration at Your Domain Registrar:
You'll need to add these records (exact values provided by Replit):

**A Record:**
- Name: `@` (root domain)
- Value: `[Replit's IP address]`

**CNAME Record:**
- Name: `www`
- Value: `[your-replit-project].replit.app`

## Step 3: Final URLs Structure

Once domain is connected:
- **Main Website**: `https://thelatinaempire.com`
- **Studio Access**: `https://thelatinaempire.com/sanity`
- **API Endpoints**: `https://thelatinaempire.com/api/events`

## Step 4: Test Your Setup

### Test Content Management:
1. Go to `https://thelatinaempire.com/sanity`
2. You should see the Sanity Studio interface
3. You'll see: Events, Ambassadors, Blog Posts
4. Create content and it appears instantly on your website

### Test API Integration:
- Events: `https://thelatinaempire.com/api/events`
- Ambassadors: `https://thelatinaempire.com/api/ambassadors`
- Blog: `https://thelatinaempire.com/api/blog`

## Step 5: Domain Registrar Setup

### Where to Configure DNS:
- **GoDaddy**: DNS Management → Add Records
- **Namecheap**: Advanced DNS → Add New Record
- **Cloudflare**: DNS → Add Record
- **Google Domains**: DNS → Custom records

### Typical DNS Setup:
```
Type: A
Name: @
Value: [Replit's IP from step 2]
TTL: 3600

Type: CNAME
Name: www
Value: [your-project].replit.app
TTL: 3600
```

## Step 6: SSL Certificate
Replit automatically provides SSL certificates for custom domains.

## Current Working Features:
- ✅ **Event created in Sanity**: "Test Event" visible in API
- ✅ **Studio redirect working**: `/sanity` route configured
- ✅ **API integration**: Real data from Sanity
- ✅ **Content management**: Ready for Studio access

## Next Actions:
1. **Add studio URL** to your Sanity project settings
2. **Configure DNS** at your domain registrar
3. **Test studio access** once DNS propagates
4. **Start creating content** in the Studio

## Troubleshooting:
- **DNS propagation**: Takes 24-48 hours
- **Studio access**: Use incognito mode if having issues
- **Content not appearing**: Check API endpoints directly

Your integration is fully functional - we just need to complete the domain connection!