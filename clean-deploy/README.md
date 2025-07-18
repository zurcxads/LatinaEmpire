# Latina Empire Website - Clean Deploy

This is a production-ready version of the Latina Empire website optimized for Vercel deployment.

## Project Structure

```
clean-deploy/
├── client/          # React frontend application
├── data/           # JSON data files (ambassadors.json, events.json, blog.json)
├── server/         # Express.js production server (index.js)
├── studio/         # Sanity CMS studio
├── vercel.json     # Vercel deployment configuration
├── package.json    # Simplified dependencies
└── vite.config.ts  # Clean Vite configuration
```

## Deployment to Vercel

### Step 1: Install Dependencies
```bash
cd clean-deploy
npm install
```

### Step 2: Test Build Locally
```bash
npm run build
npm run start
```

### Step 3: Deploy to Vercel
1. Create a new GitHub repository
2. Push this clean-deploy folder contents to the repository
3. Connect the repository to Vercel
4. Vercel will automatically:
   - Detect the configuration from `vercel.json`
   - Run `npm run build` to build the React app
   - Deploy the Express server for API routes
   - Serve static files from the `/dist` directory

## API Endpoints

The production server provides these RESTful endpoints:

- `GET /api/events` - List all events
- `GET /api/events/:slug` - Get specific event by slug
- `GET /api/leaders` - List all leaders/ambassadors
- `GET /api/leaders/:slug` - Get specific leader by slug  
- `GET /api/ambassadors` - Backward compatibility endpoint
- `GET /api/ambassadors/:slug` - Get specific ambassador by slug
- `GET /api/blog` - Get blog posts (supports ?category, ?tag, ?featured filters)
- `GET /api/blog/:slug` - Get specific blog post by slug

## Data Sources

All content is served from JSON files in the `/data` directory:
- `ambassadors.json` - Leader and ambassador profiles
- `events.json` - Event listings and details
- `blog.json` - Blog posts with categories and tags

## Key Features

- **Simplified Dependencies**: Only essential packages for production
- **Serverless Ready**: Optimized for Vercel's serverless environment
- **Static Assets**: All images served via external URLs (Unsplash)
- **Client-side Routing**: Full React Router support with catch-all routing
- **Responsive Design**: Mobile-first Tailwind CSS implementation

## Environment Variables

No environment variables required for basic deployment. The application works entirely with static JSON data files.

## Build Configuration

- **Build Output**: `/dist` directory
- **Server**: Node.js Express server using ES modules
- **Client**: React SPA with Vite build system
- **Styling**: Tailwind CSS with PostCSS processing