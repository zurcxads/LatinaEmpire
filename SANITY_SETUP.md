# Sanity.io CMS Integration Setup Guide

## Overview

Your Latina Empire website now includes Sanity.io CMS integration for managing content. The system supports both Sanity CMS and JSON file fallback, so your site works immediately even without Sanity configuration.

## Quick Start

### 1. Set Up Sanity Project

1. Visit [sanity.io](https://sanity.io) and create a free account
2. Create a new project:
   - Choose "Create new project"
   - Enter project name: "Latina Empire"
   - Select "Production" dataset
   - Copy your Project ID

### 2. Configure Environment Variables

Add these environment variables to your Replit project:

```env
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_TOKEN=your_api_token_here
```

To get your API token:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to "API" tab
4. Click "Add API token"
5. Give it a name and select "Editor" permissions
6. Copy the token

### 3. Install Sanity CLI (Optional)

For advanced content management:

```bash
npm install -g @sanity/cli
```

### 4. Deploy Sanity Studio

Create a separate Sanity Studio deployment for your content team:

```bash
sanity deploy
```

This will create a URL like `https://your-project-name.sanity.studio`

## Content Types

The integration includes three main content types:

### Events
- Title, description, location, date/time
- Host information and images
- Ticket pricing and links
- Event images and banners

### Ambassadors/Leaders
- Personal information and biography
- Social media links
- Expertise and language skills
- Profile and banner images

### Blog Posts
- Title, content, and excerpt
- Author information
- Categories and tags
- Featured images
- Publication date and read time

## How It Works

### Automatic Fallback System

- **With Sanity**: Content is fetched from Sanity CMS
- **Without Sanity**: Content is served from JSON files in the `data/` directory
- **Seamless Switching**: No code changes needed to switch between systems

### API Endpoints

All existing API endpoints continue to work:

- `GET /api/events` - List all events
- `GET /api/events/:slug` - Get event by slug
- `GET /api/ambassadors` - List all ambassadors
- `GET /api/ambassadors/:slug` - Get ambassador by slug
- `GET /api/leaders` - List all leaders (same as ambassadors)
- `GET /api/leaders/:slug` - Get leader by slug
- `GET /api/blog` - List all blog posts
- `GET /api/blog/:slug` - Get blog post by slug

### Query Parameters

Blog API supports filtering:
- `?category=leadership` - Filter by category
- `?tag=wellness` - Filter by tag
- `?featured=true` - Get only featured posts

## Image Handling

Sanity automatically handles image optimization:

- **CDN Delivery**: Images served from Sanity's global CDN
- **Automatic Resizing**: Images automatically resized for optimal loading
- **Format Optimization**: Modern formats (WebP) served when supported
- **Responsive Images**: Different sizes for different screen sizes

## Content Migration

### From JSON to Sanity

1. Set up Sanity project and configure environment variables
2. Use the Sanity Studio to manually create content
3. Or use the Sanity CLI to import existing JSON data

### Bulk Import Script

For migrating existing JSON data, you can use the Sanity CLI:

```bash
sanity dataset import data/events.json production
sanity dataset import data/ambassadors.json production
sanity dataset import data/blog.json production
```

## Development Workflow

### For Developers

1. **Local Development**: Use JSON files for quick testing
2. **Staging**: Connect to Sanity for realistic content testing
3. **Production**: Full Sanity integration with live content

### For Content Managers

1. **Access Studio**: Use the deployed Sanity Studio URL
2. **Create Content**: Use the intuitive interface to add/edit content
3. **Publish**: Content appears immediately on the website
4. **Media Management**: Upload and manage images directly in Studio

## Best Practices

### Content Structure

- **Consistent Slugs**: Use lowercase, hyphenated slugs
- **SEO Optimization**: Include meta descriptions and alt text
- **Image Quality**: Upload high-quality images (Sanity will optimize)
- **Content Hierarchy**: Use proper heading structure

### Performance

- **CDN**: Sanity's CDN provides global content delivery
- **Caching**: API responses are cached for better performance
- **Lazy Loading**: Images load only when needed

## Troubleshooting

### Common Issues

1. **"Configuration must contain projectId"**
   - Ensure `SANITY_PROJECT_ID` environment variable is set
   - Check that the project ID is correct

2. **"Unauthorized"**
   - Verify `SANITY_TOKEN` has correct permissions
   - Check that the token hasn't expired

3. **Content Not Appearing**
   - Ensure content is published in Sanity Studio
   - Check API endpoints are returning data
   - Verify environment variables are set correctly

### Debugging

Enable debug logging by adding:

```env
DEBUG=sanity:*
```

## Support

For technical issues:
- Check the Sanity documentation: [sanity.io/docs](https://sanity.io/docs)
- Use the Sanity Community: [slack.sanity.io](https://slack.sanity.io)

The integration maintains backward compatibility, so your existing workflows continue to work while you gradually migrate to Sanity CMS.