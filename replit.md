# Latina Empire Website

## Overview

The Latina Empire website is a modern, responsive React application built with TypeScript that serves as the central hub for a professional development platform targeting Latina professionals. The site features a comprehensive event management system, leader profiles, blog content, and various engagement tools designed to empower and connect ambitious Latinas globally.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (July 2025)

✓ Cleaned up project for production deployment to Vercel
✓ Removed duplicate/unnecessary folders: studio-local/, studio-new/, scripts/
✓ Removed duplicate TypeScript data files in data/ and client/src/data/
✓ Created vercel.json configuration for deployment
✓ Created simplified Express server (server/index.js) for production
✓ Updated deployment documentation in replit.md

## Project Architecture

### Production Deployment Setup
- **Target Platform**: Vercel
- **Build Command**: `npm run build` (builds client to /dist)
- **Server**: Simplified Express.js server in `server/index.js` using ES modules
- **Data Source**: JSON files in `/data` directory (ambassadors.json, events.json, blog.json)
- **API Routes**: RESTful endpoints for events, leaders, ambassadors, and blog content

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library based on Radix UI
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Production Server**: Simplified ES modules server for Vercel deployment
- **Development Server**: Full TypeScript server with Drizzle ORM and Sanity integration
- **API Design**: RESTful API with JSON responses
- **Data Storage**: JSON files for production simplicity

### File Structure
- `client/` - React frontend application
- `server/` - Contains both development (index.ts) and production (index.js) servers
- `data/` - JSON data files for content management (ambassadors.json, events.json, blog.json)
- `studio/` - Sanity CMS studio (maintained for development)
- `vercel.json` - Vercel deployment configuration

## Key Features

### Design System
- **Color Scheme**: Magenta (#D81B60) as primary brand color with neutral grays
- **Typography**: Serif headings (Playfair Display) with sans-serif body text
- **Component Style**: Rounded, pill-shaped buttons with hover effects
- **Layout**: Floating containers with subtle shadows and rounded corners
- **Responsive Design**: Mobile-first approach with specific breakpoints

### Core Features
- **Event Management**: Complete event listing, detail pages, and calendar view
- **Leader Profiles**: Ambassador/leader directory with detailed biographies
- **Blog System**: Content management with categories and detailed articles
- **Join System**: Modal-based registration with form validation
- **Shop Integration**: Product catalog with carousel displays
- **Manahood Program**: Local chapter management and leader recruitment

### API Endpoints
- `/api/events` - List all events
- `/api/events/:slug` - Get specific event by slug
- `/api/leaders` - List all leaders/ambassadors
- `/api/leaders/:slug` - Get specific leader by slug
- `/api/ambassadors` - Backward compatibility endpoint for leaders
- `/api/ambassadors/:slug` - Get specific ambassador by slug
- `/api/blog` - Get blog posts with filtering support (category, tag, featured)
- `/api/blog/:slug` - Get specific blog post by slug

## Data Sources

### Content Management
- **Production**: JSON files in `/data` directory provide all content
- **Development**: Hybrid system with Sanity CMS integration and JSON fallback
- **Image Handling**: External URLs (Unsplash) for images in JSON data
- **Content Types**: Events, Leaders/Ambassadors, Blog Posts with rich metadata

### Data Format
All JSON files follow consistent structure with fields like:
- **Events**: id, slug, name, location, date, description, host, images, pricing
- **Leaders**: id, slug, name, title, bio, social media, expertise, languages
- **Blog**: id, slug, title, content, author, category, tags, featured status

## Deployment Configuration

### Vercel Setup
- **Build Output**: `/dist` directory containing static React build
- **API Routes**: Serverless functions for `/api/*` endpoints
- **Static Routing**: Catch-all route for client-side routing compatibility
- **Environment**: Production-ready without database dependencies

### Production Architecture
The application uses a simplified architecture for production deployment that maintains full functionality while removing complex dependencies like PostgreSQL and Sanity CMS for easier deployment and maintenance.