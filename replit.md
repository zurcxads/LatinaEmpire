# Latina Empire Website

## Overview

The Latina Empire website is a modern, responsive React application built with TypeScript that serves as the central hub for a professional development platform targeting Latina professionals. The site features a comprehensive event management system, leader profiles, blog content, and various engagement tools designed to empower and connect ambitious Latinas globally.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library based on Radix UI
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Font System**: Custom Google Fonts integration (Playfair Display, Montserrat, Inter, Poppins)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **API Design**: RESTful API with JSON responses

### Project Structure
- `client/` - React frontend application
- `server/` - Express.js backend server
- `shared/` - Common types and database schema
- `data/` - Static JSON data files for content management
- `migrations/` - Database migration files

## Key Components

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

### Navigation System
- **Sticky Navigation**: Responsive navbar with dropdown menus
- **Mobile Menu**: Hamburger menu with smooth transitions
- **Scroll Behavior**: Smooth scrolling with scroll-to-top functionality
- **Route Management**: Client-side routing with proper meta tag updates

## Data Flow

### Content Management
- **Hybrid System**: Sanity CMS integration with JSON fallback for backward compatibility
- **Dynamic Content**: Sanity.io headless CMS for events, ambassadors, and blog posts
- **Static Fallback**: JSON files in `/data` directory serve as fallback when Sanity is not configured
- **API Layer**: Express routes automatically choose between Sanity and JSON data sources
- **Image Handling**: Sanity CDN optimization with utility functions for URL generation
- **Form Processing**: Client-side validation with server-side form handling

### Content Types
- **Events**: Title, description, location, date/time, host information, ticketing
- **Ambassadors/Leaders**: Personal profiles, expertise, social media, biography
- **Blog Posts**: Articles with categories, tags, featured status, author information
- **Media Assets**: Images served through Sanity's global CDN with automatic optimization

### State Management
- **Query Client**: TanStack Query for server state caching and synchronization
- **Local State**: React hooks for component-level state management
- **Modal State**: Centralized modal management for join forms and interactions
- **Theme System**: Dark/light mode with system preference detection

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Icon library for consistent iconography
- **Embla Carousel**: Smooth carousel functionality
- **React Hook Form**: Form state management and validation

### Development Tools
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Static type checking
- **ESLint**: Code linting and formatting
- **Zod**: Runtime type validation for forms and API responses

### Database and Backend
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL hosting
- **Express.js**: Web server framework
- **Connect-pg-simple**: PostgreSQL session store

### Content Management System
- **Sanity.io**: Headless CMS for content management
- **Sanity Client**: JavaScript client for Sanity API
- **Sanity Studio**: Web-based content editing interface
- **GROQ**: Query language for Sanity content

## Deployment Strategy

### Build Process
- **Development**: Vite dev server with hot reloading
- **Production**: Static build with Express.js server
- **Database**: Drizzle Kit for schema management and migrations
- **Environment**: Environment-based configuration for database connections

### Hosting Considerations
- **Static Assets**: Optimized images and fonts
- **Server Deployment**: Node.js environment with PostgreSQL database
- **CDN Ready**: Proper asset paths for content delivery networks
- **Responsive Images**: Automatic image optimization with fallback handling

The application follows modern web development practices with a focus on performance, accessibility, and maintainability. The modular architecture allows for easy expansion of features while maintaining a consistent user experience across all device types.