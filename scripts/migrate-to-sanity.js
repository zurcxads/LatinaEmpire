import 'dotenv/config';
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2023-05-03',
});

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Helper function to transform JSON event to Sanity format
const transformEvent = (event) => {
  return {
    _type: 'event',
    title: event.name,
    slug: {
      _type: 'slug',
      current: event.slug,
    },
    description: event.description,
    shortDescription: event.shortDescription,
    location: event.location,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    isPast: event.isPast,
    ticketPrice: event.ticketPrice,
    ticketLink: event.ticketLink,
    locationAddress: event.locationAddress,
    locationMapUrl: event.locationMapUrl,
    // Note: Images will need to be uploaded separately
    // image: event.image,
    // bannerImage: event.bannerImage,
    // host: event.host,
  };
};

// Helper function to transform JSON ambassador to Sanity format
const transformAmbassador = (ambassador) => {
  return {
    _type: 'ambassador',
    name: ambassador.name,
    slug: {
      _type: 'slug',
      current: ambassador.slug,
    },
    title: ambassador.title,
    location: ambassador.location,
    country: ambassador.country,
    quote: ambassador.quote,
    shortBio: ambassador.shortBio,
    fullBio: ambassador.fullBio,
    socialMedia: ambassador.socialMedia,
    yearsInProgram: ambassador.yearsInProgram,
    eventsHosted: ambassador.eventsHosted,
    membersSince: ambassador.membersSince,
    languages: ambassador.languages,
    expertise: ambassador.expertise,
    // Note: Images will need to be uploaded separately
    // image: ambassador.image,
    // bannerImage: ambassador.bannerImage,
  };
};

// Helper function to transform JSON blog post to Sanity format
const transformBlogPost = (post) => {
  return {
    _type: 'blogPost',
    title: post.title,
    slug: {
      _type: 'slug',
      current: post.slug,
    },
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    authorTitle: post.authorTitle,
    date: post.date,
    readTime: post.readTime,
    category: post.category,
    tags: post.tags,
    featured: post.featured,
    // Note: Images will need to be uploaded separately
    // image: post.image,
  };
};

async function migrateData() {
  console.log('Starting data migration to Sanity...');
  
  try {
    // Read JSON files
    const eventsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/events.json'), 'utf8'));
    const ambassadorsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/ambassadors.json'), 'utf8'));
    const blogData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/blog.json'), 'utf8'));

    // Transform and create events
    console.log('Migrating events...');
    for (const event of eventsData.events) {
      const sanityEvent = transformEvent(event);
      try {
        const result = await client.create(sanityEvent);
        console.log(`Created event: ${result.title}`);
      } catch (error) {
        console.error(`Error creating event ${event.name}:`, error.message);
      }
    }

    // Transform and create ambassadors
    console.log('Migrating ambassadors...');
    for (const ambassador of ambassadorsData.ambassadors) {
      const sanityAmbassador = transformAmbassador(ambassador);
      try {
        const result = await client.create(sanityAmbassador);
        console.log(`Created ambassador: ${result.name}`);
      } catch (error) {
        console.error(`Error creating ambassador ${ambassador.name}:`, error.message);
      }
    }

    // Transform and create blog posts
    console.log('Migrating blog posts...');
    for (const post of blogData.blog) {
      const sanityPost = transformBlogPost(post);
      try {
        const result = await client.create(sanityPost);
        console.log(`Created blog post: ${result.title}`);
      } catch (error) {
        console.error(`Error creating blog post ${post.title}:`, error.message);
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateData();