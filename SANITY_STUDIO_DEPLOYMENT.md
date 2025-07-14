# Sanity Studio Deployment Guide

## The Issue
You're getting CSP and permission errors when trying to access the Studio. This is common with Sanity Studio deployments. Here's how to fix it:

## Solution 1: Use Sanity's Studio Deployment Service

### Step 1: Deploy Schema to Your Project
Your project already has the schemas configured. We need to deploy them to Sanity:

1. **Go to your Sanity project**: [sanity.io/manage/personal/project/3yaebsnk](https://sanity.io/manage/personal/project/3yaebsnk)
2. **Click "API"** in the left sidebar
3. **Click "GraphQL"** tab
4. **Click "Deploy GraphQL API"** - this will deploy your schemas

### Step 2: Access the Studio
After deploying schemas, you can access the Studio at:
```
https://3yaebsnk.api.sanity.io/v2021-06-07/data/query/production
```

Or use the built-in Studio:
1. Go to [sanity.io/manage/personal/project/3yaebsnk](https://sanity.io/manage/personal/project/3yaebsnk)
2. Look for "Studio" or "Content" in the sidebar
3. Click it to open the content management interface

## Solution 2: Deploy Custom Studio (Recommended)

### Method A: Using Sanity CLI
If you have access to authenticate:
```bash
cd /path/to/your/project
npx sanity deploy --source-maps
```

When prompted for hostname, use: `latina-empire-cms`
This creates: `https://latina-empire-cms.sanity.studio`

### Method B: Using Sanity's Deploy Button
1. Go to [sanity.io/manage/personal/project/3yaebsnk](https://sanity.io/manage/personal/project/3yaebsnk)
2. Click "Settings" → "API" → "Deploy Studio"
3. Upload your studio configuration
4. Set hostname to: `latina-empire-cms`

## Solution 3: Manual Schema Deployment

### Upload Schema via API
Using your existing auth token, we can deploy the schema:

```javascript
// This is what we'll execute to deploy your schemas
const schemas = [
  // Event schema
  {
    name: 'event',
    type: 'document',
    title: 'Event',
    fields: [/* your event fields */]
  },
  // Ambassador schema
  {
    name: 'ambassador', 
    type: 'document',
    title: 'Ambassador',
    fields: [/* your ambassador fields */]
  },
  // Blog post schema
  {
    name: 'blogPost',
    type: 'document', 
    title: 'Blog Post',
    fields: [/* your blog fields */]
  }
];
```

## Solution 4: Use Sanity's Web Studio

### Direct Access URLs:
- **Project Dashboard**: https://sanity.io/manage/personal/project/3yaebsnk
- **Content Browser**: https://sanity.io/manage/personal/project/3yaebsnk/content
- **Schema Editor**: https://sanity.io/manage/personal/project/3yaebsnk/schema

## What to Add in Studio URL Field

Based on your setup, add one of these URLs:

### Option 1: Custom Studio URL
```
https://latina-empire-cms.sanity.studio
```

### Option 2: Replit-hosted Studio
```
https://your-replit-project.replit.dev/studio
```

### Option 3: Direct Sanity Studio
```
https://3yaebsnk.api.sanity.io/v1/studio
```

## Current Status
- ✅ **Sanity Project**: Connected (3yaebsnk)
- ✅ **API Integration**: Working
- ✅ **Schemas**: Defined and ready
- ✅ **Authentication**: Token configured
- ❌ **Studio Access**: Needs deployment

## Next Steps
1. Try Solution 1 (deploy schemas via GraphQL)
2. If that doesn't work, try Solution 2 (deploy custom studio)
3. If authentication fails, we'll set up alternative content management

The key is getting your schemas deployed to Sanity so the Studio recognizes your content types.