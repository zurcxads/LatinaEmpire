# Simple Sanity Studio Setup - Step by Step

## The Easiest Way: Use Sanity's Web Studio

### Step 1: Go to Sanity Manage
1. **Open your browser** and go to: [sanity.io/manage](https://sanity.io/manage)
2. **Log in** with your Sanity account
3. **Select your project** "LE" (ID: 3yaebsnk)

### Step 2: Access the Built-in Studio
1. **Click "Studio"** in the left sidebar
2. **Click "Open Studio"** - this opens the web-based Studio
3. **You should see**: Events, Ambassadors, and Blog Posts content types

### Step 3: Create Your First Content
Once in the Studio:

**Create an Event:**
1. Click **"Events"** → **"Create new Event"**
2. Fill in:
   - **Title**: "Latina Leadership Workshop 2024"
   - **Slug**: Click "Generate" 
   - **Description**: Write about the workshop
   - **Location**: "Miami, FL"
   - **Date**: Select a future date
   - **Start Time**: "9:00 AM"
   - **End Time**: "5:00 PM"
   - **Ticket Price**: "$297"
3. **Click "Publish"**

### Step 4: Verify It Works
1. **Go back to your website**
2. **Check the events section** - your new event should appear
3. **Or test the API**: Visit your site's `/api/events` endpoint

## Alternative: If Web Studio Doesn't Show Content Types

If you don't see Events, Ambassadors, and Blog Posts in the Studio:

### Option A: Deploy Studio to Your Domain
Run this command in your project:
```bash
npx sanity deploy --source-maps
```

When prompted for hostname, use:
```
latina-empire-studio
```

This creates: `https://latina-empire-studio.sanity.studio`

### Option B: Update Your Project Schema
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to "Schema" tab
4. Upload the schema configuration (we can help with this)

## Troubleshooting

### If Studio is Empty:
- Check you're logged in to the right account
- Verify you're in project "LE" (3yaebsnk)
- Make sure you're in the "production" dataset

### If Content Doesn't Appear on Website:
- Ensure you clicked "Publish" (not just "Save")
- Check your website is loading (refresh the page)
- Verify the API token has read permissions

## Your Integration Status
✅ **Sanity Client**: Connected to project 3yaebsnk
✅ **API Endpoints**: Working and querying Sanity
✅ **Environment Variables**: Properly configured
✅ **Data Models**: Event, Ambassador, Blog Post schemas ready
✅ **Image Handling**: CDN optimization configured

**Everything is ready - you just need to access the Studio and start creating content!**

## Quick Test
Once you create content:
1. Visit your website's events page
2. Or check: `your-site-url/api/events`
3. You should see your new content immediately

The integration is fully functional - the Studio is the last piece to access your content management interface.