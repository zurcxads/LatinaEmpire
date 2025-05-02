import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

// Helper function to read data from JSON files
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
  app.get("/api/events", (req: Request, res: Response) => {
    try {
      const data = getEventsData();
      if (!data || !data.events) {
        return res.status(404).json({ error: "Events data not found" });
      }
      res.json(data);
    } catch (error) {
      console.error("Error serving events:", error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:slug", (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const data = getEventsData();
      const event = data.events.find((e: any) => e.slug === slug);
      
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      console.error("Error serving event:", error);
      res.status(500).json({ error: "Failed to fetch event details" });
    }
  });

  // Ambassadors API routes
  app.get("/api/ambassadors", (req: Request, res: Response) => {
    try {
      const data = getAmbassadorsData();
      res.json(data);
    } catch (error) {
      console.error("Error serving ambassadors:", error);
      res.status(500).json({ error: "Failed to fetch ambassadors" });
    }
  });

  app.get("/api/ambassadors/:slug", (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const data = getAmbassadorsData();
      const ambassador = data.ambassadors.find((a: any) => a.slug === slug);
      
      if (!ambassador) {
        return res.status(404).json({ error: "Ambassador not found" });
      }
      
      res.json(ambassador);
    } catch (error) {
      console.error("Error serving ambassador:", error);
      res.status(500).json({ error: "Failed to fetch ambassador details" });
    }
  });

  // Blog API routes
  app.get("/api/blog", (req: Request, res: Response) => {
    try {
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
    } catch (error) {
      console.error("Error serving blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const data = getBlogData();
      const post = data.blog.find((p: any) => p.slug === slug);
      
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error serving blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post details" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
