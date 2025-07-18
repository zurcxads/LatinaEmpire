import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from dist folder
app.use(express.static(join(__dirname, '../dist')));

// Helper function to read JSON data files
function getJsonData(filename) {
  try {
    const dataPath = join(__dirname, `../data/${filename}.json`);
    
    if (fs.existsSync(dataPath)) {
      const fileContents = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(fileContents);
    } else {
      console.log(`${filename} data file not found`);
      return { [filename]: [] };
    }
  } catch (error) {
    console.error(`Error reading ${filename} data:`, error);
    return { [filename]: [] };
  }
}

// API Routes
app.get('/api/events', (req, res) => {
  try {
    const data = getJsonData('events');
    res.json(data);
  } catch (error) {
    console.error('Error serving events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.get('/api/events/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const data = getJsonData('events');
    const event = data.events.find(e => e.slug === slug);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error serving event:', error);
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
});

app.get('/api/leaders', (req, res) => {
  try {
    const data = getJsonData('ambassadors');
    res.json(data);
  } catch (error) {
    console.error('Error serving leaders:', error);
    res.status(500).json({ error: 'Failed to fetch leaders' });
  }
});

app.get('/api/leaders/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const data = getJsonData('ambassadors');
    const leader = data.ambassadors.find(a => a.slug === slug);
    
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    
    res.json(leader);
  } catch (error) {
    console.error('Error serving leader:', error);
    res.status(500).json({ error: 'Failed to fetch leader details' });
  }
});

app.get('/api/ambassadors', (req, res) => {
  try {
    const data = getJsonData('ambassadors');
    res.json(data);
  } catch (error) {
    console.error('Error serving ambassadors:', error);
    res.status(500).json({ error: 'Failed to fetch ambassadors' });
  }
});

app.get('/api/ambassadors/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const data = getJsonData('ambassadors');
    const ambassador = data.ambassadors.find(a => a.slug === slug);
    
    if (!ambassador) {
      return res.status(404).json({ error: 'Ambassador not found' });
    }
    
    res.json(ambassador);
  } catch (error) {
    console.error('Error serving ambassador:', error);
    res.status(500).json({ error: 'Failed to fetch ambassador details' });
  }
});

app.get('/api/blog', (req, res) => {
  try {
    const data = getJsonData('blog');
    const { category, tag, featured } = req.query;
    
    if (!data || !data.blog) {
      return res.status(404).json({ error: 'Blog data not found' });
    }
    
    let filteredBlog = [...data.blog];
    
    if (category) {
      filteredBlog = filteredBlog.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (tag) {
      filteredBlog = filteredBlog.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }
    
    if (featured === 'true') {
      filteredBlog = filteredBlog.filter(post => post.featured);
    }
    
    res.json({
      blog: filteredBlog,
      categories: data.categories || [],
      popularTags: data.popularTags || []
    });
  } catch (error) {
    console.error('Error serving blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.get('/api/blog/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const data = getJsonData('blog');
    const post = data.blog.find(p => p.slug === slug);
    
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error serving blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post details' });
  }
});

// Catch-all handler for client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;