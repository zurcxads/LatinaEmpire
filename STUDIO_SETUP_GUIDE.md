# Sanity Studio Setup Guide

## Easy Setup Options

### Option 1: Use Sanity's Hosted Studio (Recommended)
This is the simplest approach:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project "LE" (3yaebsnk)
3. Click "Studio" in the sidebar
4. Click "Create Studio Host"
5. Choose a studio name (e.g., "latina-empire-studio")
6. This will create a URL like: `https://latina-empire-studio.sanity.studio`

### Option 2: Deploy Studio to Your Domain
If you want to host the studio on your own domain:

**Host URL to use**: `https://3f469d91-f226-4c6e-bcc1-ae0f182369df-00-ft8odatuymrt.picard.replit.dev`

### Option 3: Local Development Studio
For development purposes:

1. Install Sanity CLI globally: `npm install -g @sanity/cli`
2. Run: `sanity dev` (this will run on localhost:3333)
3. Use for local content creation and testing

## Recommended Approach

I recommend **Option 1** (Sanity's hosted Studio) because:
- No setup required
- Always available
- Automatic updates
- SSL/security handled by Sanity
- Easy to share with your team

## After Studio Setup

Once you have your Studio URL:

1. **Access Studio**: Go to your Studio URL
2. **Create Content**: You'll see three content types:
   - **Events**: Create event listings
   - **Ambassadors**: Add ambassador profiles  
   - **Blog Posts**: Write blog articles

3. **Test Integration**: After creating content, visit your website to see it appear automatically

## Studio Features

Your Studio includes:
- **Event Management**: Full event creation with images, dates, locations
- **Ambassador Profiles**: Complete profile management with social media links
- **Blog System**: Article creation with categories, tags, and featured posts
- **Media Library**: Image upload and management
- **GROQ Query Tool**: For advanced content queries

## Content Creation Tips

1. **Always fill in the slug field** - this creates the URL for your content
2. **Use high-quality images** - Sanity will automatically optimize them
3. **Fill in SEO fields** - helps with search engine visibility
4. **Use consistent categories** - keeps your content organized

## Your Integration is Ready

Your website is already configured to:
- ✅ Automatically fetch content from Sanity
- ✅ Display images from Sanity's CDN
- ✅ Fall back to JSON files if Sanity is empty
- ✅ Handle all API endpoints seamlessly

Start creating content in your Studio and watch it appear on your website instantly!