import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

// Helper function to read data from the events JSON file
function getEventsData() {
  try {
    const dataPath = path.join(process.cwd(), "data/events.json");
    console.log("Looking for events data at:", dataPath);
    
    if (fs.existsSync(dataPath)) {
      const fileContents = fs.readFileSync(dataPath, "utf8");
      return JSON.parse(fileContents);
    } else {
      console.log("Events data file not found at:", dataPath);
      return { events: [] };
    }
  } catch (error) {
    console.error("Error reading events data:", error);
    return { events: [] };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Events API routes
  app.get("/api/events", (req: Request, res: Response) => {
    try {
      const data = getEventsData();
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

  const httpServer = createServer(app);

  return httpServer;
}
