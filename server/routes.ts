import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { sanityService } from "../lib/sanity/service";

// Helper function to read data from JSON files (fallback)
function getJsonData(filename: string) {
  try {
    const dataPath = path.join(process.cwd(), `data/${filename}.json`);
    console.log(`Looking for ${filename} data at:`, dataPath);
    
    if (fs.existsSync(dataPath)) {
      const fileContents = fs.readFileSync(dataPath, "utf8");
      return JSON.parse(fileContents);
    } else {
      console.log(`${filename} data file not found at:`, dataPath);
      return { [filename]: [] };
    }
  } catch (error) {
    console.error(`Error reading ${filename} data:`, error);
    return { [filename]: [] };
  }
}

// Check if Sanity is configured
function isSanityConfigured() {
  return !!(process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET);
}

// Get events data
function getEventsData() {
  return getJsonData("events");
}

// Get ambassadors data
function getAmbassadorsData() {
  return getJsonData("ambassadors");
}

// Get blog data
function getBlogData() {
  return getJsonData("blog");
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Events API routes
  app.get("/api/events", async (req: Request, res: Response) => {
    try {
      if (isSanityConfigured()) {
        const events = await sanityService.getEvents();
        res.json({ events });
      } else {
        const data = getEventsData();
        if (!data || !data.events) {
          return res.status(404).json({ error: "Events data not found" });
        }
        res.json(data);
      }
    } catch (error) {
      console.error("Error serving events:", error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      if (isSanityConfigured()) {
        const event = await sanityService.getEventBySlug(slug);
        if (!event) {
          return res.status(404).json({ error: "Event not found" });
        }
        res.json(event);
      } else {
        const data = getEventsData();
        const event = data.events.find((e: any) => e.slug === slug);
        
        if (!event) {
          return res.status(404).json({ error: "Event not found" });
        }
        
        res.json(event);
      }
    } catch (error) {
      console.error("Error serving event:", error);
      res.status(500).json({ error: "Failed to fetch event details" });
    }
  });

  // Ambassadors API routes
  // Original ambassador routes - kept for backward compatibility
  app.get("/api/ambassadors", async (req: Request, res: Response) => {
    try {
      if (isSanityConfigured()) {
        const ambassadors = await sanityService.getAmbassadors();
        res.json({ ambassadors });
      } else {
        const data = getAmbassadorsData();
        res.json(data);
      }
    } catch (error) {
      console.error("Error serving ambassadors:", error);
      res.status(500).json({ error: "Failed to fetch ambassadors" });
    }
  });

  app.get("/api/ambassadors/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      if (isSanityConfigured()) {
        const ambassador = await sanityService.getAmbassadorBySlug(slug);
        if (!ambassador) {
          return res.status(404).json({ error: "Ambassador not found" });
        }
        res.json(ambassador);
      } else {
        const data = getAmbassadorsData();
        const ambassador = data.ambassadors.find((a: any) => a.slug === slug);
        
        if (!ambassador) {
          return res.status(404).json({ error: "Ambassador not found" });
        }
        
        res.json(ambassador);
      }
    } catch (error) {
      console.error("Error serving ambassador:", error);
      res.status(500).json({ error: "Failed to fetch ambassador details" });
    }
  });
  
  // New leader routes (using same data source but with updated naming)
  app.get("/api/leaders", async (req: Request, res: Response) => {
    try {
      if (isSanityConfigured()) {
        const ambassadors = await sanityService.getAmbassadors();
        res.json({ ambassadors });
      } else {
        const data = getAmbassadorsData();
        res.json(data);
      }
    } catch (error) {
      console.error("Error serving leaders:", error);
      res.status(500).json({ error: "Failed to fetch leaders" });
    }
  });

  app.get("/api/leaders/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      if (isSanityConfigured()) {
        const leader = await sanityService.getAmbassadorBySlug(slug);
        if (!leader) {
          return res.status(404).json({ error: "Leader not found" });
        }
        res.json(leader);
      } else {
        const data = getAmbassadorsData();
        const leader = data.ambassadors.find((a: any) => a.slug === slug);
        
        if (!leader) {
          return res.status(404).json({ error: "Leader not found" });
        }
        
        res.json(leader);
      }
    } catch (error) {
      console.error("Error serving leader:", error);
      res.status(500).json({ error: "Failed to fetch leader details" });
    }
  });

  // Blog API routes
  app.get("/api/blog", async (req: Request, res: Response) => {
    try {
      if (isSanityConfigured()) {
        const { category, tag, featured } = req.query;
        
        let blogPosts;
        if (category) {
          blogPosts = await sanityService.getBlogPostsByCategory(category as string);
        } else if (featured === 'true') {
          blogPosts = await sanityService.getFeaturedBlogPosts();
        } else {
          blogPosts = await sanityService.getBlogPosts();
        }
        
        // Filter by tag if specified
        if (tag) {
          blogPosts = blogPosts.filter((post: any) => 
            post.tags.some((t: string) => t.toLowerCase() === (tag as string).toLowerCase())
          );
        }
        
        // Extract categories and tags from the posts
        const categories = [...new Set(blogPosts.map((post: any) => post.category))];
        const allTags = blogPosts.flatMap((post: any) => post.tags);
        const popularTags = [...new Set(allTags)];
        
        res.json({
          blog: blogPosts,
          categories,
          popularTags
        });
      } else {
        const data = getBlogData();
        if (!data || !data.blog) {
          return res.status(404).json({ error: "Blog data not found" });
        }
        
        // Support filtering by category
        const { category, tag, featured } = req.query;
        let filteredBlog = [...data.blog];
        
        if (category) {
          filteredBlog = filteredBlog.filter((post: any) => 
            post.category.toLowerCase() === (category as string).toLowerCase()
          );
        }
        
        if (tag) {
          filteredBlog = filteredBlog.filter((post: any) => 
            post.tags.some((t: string) => t.toLowerCase() === (tag as string).toLowerCase())
          );
        }
        
        if (featured === 'true') {
          filteredBlog = filteredBlog.filter((post: any) => post.featured);
        }
        
        res.json({
          blog: filteredBlog,
          categories: data.categories,
          popularTags: data.popularTags
        });
      }
    } catch (error) {
      console.error("Error serving blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      if (isSanityConfigured()) {
        const post = await sanityService.getBlogPostBySlug(slug);
        if (!post) {
          return res.status(404).json({ error: "Blog post not found" });
        }
        res.json(post);
      } else {
        const data = getBlogData();
        const post = data.blog.find((p: any) => p.slug === slug);
        
        if (!post) {
          return res.status(404).json({ error: "Blog post not found" });
        }
        
        res.json(post);
      }
    } catch (error) {
      console.error("Error serving blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post details" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
