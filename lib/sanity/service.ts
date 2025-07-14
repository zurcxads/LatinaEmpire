import { sanityClient, buildImageUrl } from '../sanity'
import {
  eventsQuery,
  eventBySlugQuery,
  ambassadorsQuery,
  ambassadorBySlugQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  featuredBlogPostsQuery,
  blogPostsByCategoryQuery,
} from './queries'

// Transform Sanity image objects to URLs
const transformImageField = (imageObj: any) => {
  if (!imageObj) return null
  return buildImageUrl(imageObj, { quality: 80 })
}

// Transform events from Sanity format to app format
const transformEvent = (sanityEvent: any) => {
  if (!sanityEvent) return null

  return {
    id: sanityEvent._id,
    slug: sanityEvent.slug?.current || '',
    name: sanityEvent.title || '',
    location: sanityEvent.location || '',
    date: sanityEvent.date || '',
    startTime: sanityEvent.startTime || '',
    endTime: sanityEvent.endTime || '',
    description: sanityEvent.description || '',
    shortDescription: sanityEvent.shortDescription || '',
    host: sanityEvent.host?.name || '',
    hostTitle: sanityEvent.host?.title || '',
    hostImage: transformImageField(sanityEvent.host?.image),
    image: transformImageField(sanityEvent.image),
    bannerImage: transformImageField(sanityEvent.bannerImage),
    isPast: sanityEvent.isPast || false,
    ticketPrice: sanityEvent.ticketPrice || '',
    ticketLink: sanityEvent.ticketLink || '',
    locationMapUrl: sanityEvent.locationMapUrl || '',
    locationAddress: sanityEvent.locationAddress || '',
  }
}

// Transform ambassadors from Sanity format to app format
const transformAmbassador = (sanityAmbassador: any) => {
  if (!sanityAmbassador) return null

  return {
    id: sanityAmbassador._id,
    slug: sanityAmbassador.slug?.current || '',
    name: sanityAmbassador.name || '',
    title: sanityAmbassador.title || '',
    location: sanityAmbassador.location || '',
    country: sanityAmbassador.country || '',
    quote: sanityAmbassador.quote || '',
    shortBio: sanityAmbassador.shortBio || '',
    fullBio: sanityAmbassador.fullBio || '',
    image: transformImageField(sanityAmbassador.image),
    bannerImage: transformImageField(sanityAmbassador.bannerImage),
    socialMedia: sanityAmbassador.socialMedia || {},
    yearsInProgram: sanityAmbassador.yearsInProgram || 0,
    eventsHosted: sanityAmbassador.eventsHosted || 0,
    membersSince: sanityAmbassador.membersSince || '',
    languages: sanityAmbassador.languages || [],
    expertise: sanityAmbassador.expertise || [],
  }
}

// Transform blog posts from Sanity format to app format
const transformBlogPost = (sanityBlogPost: any) => {
  if (!sanityBlogPost) return null

  return {
    id: sanityBlogPost._id,
    slug: sanityBlogPost.slug?.current || '',
    title: sanityBlogPost.title || '',
    excerpt: sanityBlogPost.excerpt || '',
    content: sanityBlogPost.content || '',
    author: sanityBlogPost.author || '',
    authorTitle: sanityBlogPost.authorTitle || '',
    date: sanityBlogPost.date || '',
    readTime: sanityBlogPost.readTime || '',
    category: sanityBlogPost.category || '',
    tags: sanityBlogPost.tags || [],
    image: transformImageField(sanityBlogPost.image),
    featured: sanityBlogPost.featured || false,
  }
}

// Sanity service functions
export const sanityService = {
  // Events
  async getEvents() {
    try {
      if (!sanityClient) {
        console.warn('Sanity client not configured')
        return []
      }
      const events = await sanityClient.fetch(eventsQuery)
      return events.map(transformEvent).filter(Boolean)
    } catch (error) {
      console.error('Error fetching events from Sanity:', error)
      return []
    }
  },

  async getEventBySlug(slug: string) {
    try {
      if (!sanityClient) {
        console.warn('Sanity client not configured')
        return null
      }
      const event = await sanityClient.fetch(eventBySlugQuery, { slug })
      return transformEvent(event)
    } catch (error) {
      console.error('Error fetching event by slug from Sanity:', error)
      return null
    }
  },

  // Ambassadors
  async getAmbassadors() {
    try {
      if (!sanityClient) {
        console.warn('Sanity client not configured')
        return []
      }
      const ambassadors = await sanityClient.fetch(ambassadorsQuery)
      return ambassadors.map(transformAmbassador).filter(Boolean)
    } catch (error) {
      console.error('Error fetching ambassadors from Sanity:', error)
      return []
    }
  },

  async getAmbassadorBySlug(slug: string) {
    try {
      if (!sanityClient) {
        console.warn('Sanity client not configured')
        return null
      }
      const ambassador = await sanityClient.fetch(ambassadorBySlugQuery, { slug })
      return transformAmbassador(ambassador)
    } catch (error) {
      console.error('Error fetching ambassador by slug from Sanity:', error)
      return null
    }
  },

  // Blog posts
  async getBlogPosts() {
    try {
      if (!sanityClient) {
        console.warn('Sanity client not configured')
        return []
      }
      const blogPosts = await sanityClient.fetch(blogPostsQuery)
      return blogPosts.map(transformBlogPost).filter(Boolean)
    } catch (error) {
      console.error('Error fetching blog posts from Sanity:', error)
      return []
    }
  },

  async getBlogPostBySlug(slug: string) {
    try {
      if (!sanityClient) {
        console.warn('Sanity client not configured')
        return null
      }
      const blogPost = await sanityClient.fetch(blogPostBySlugQuery, { slug })
      return transformBlogPost(blogPost)
    } catch (error) {
      console.error('Error fetching blog post by slug from Sanity:', error)
      return null
    }
  },

  async getFeaturedBlogPosts() {
    try {
      if (!sanityClient) {
        console.warn('Sanity client not configured')
        return []
      }
      const blogPosts = await sanityClient.fetch(featuredBlogPostsQuery)
      return blogPosts.map(transformBlogPost).filter(Boolean)
    } catch (error) {
      console.error('Error fetching featured blog posts from Sanity:', error)
      return []
    }
  },

  async getBlogPostsByCategory(category: string) {
    try {
      if (!sanityClient) {
        console.warn('Sanity client not configured')
        return []
      }
      const blogPosts = await sanityClient.fetch(blogPostsByCategoryQuery, { category })
      return blogPosts.map(transformBlogPost).filter(Boolean)
    } catch (error) {
      console.error('Error fetching blog posts by category from Sanity:', error)
      return []
    }
  },

  // Utility functions
  async searchAmbassadors(query: string) {
    try {
      const ambassadors = await this.getAmbassadors()
      if (!query) return ambassadors

      const lowercaseQuery = query.toLowerCase()
      return ambassadors.filter(ambassador => 
        ambassador.name.toLowerCase().includes(lowercaseQuery) ||
        ambassador.location.toLowerCase().includes(lowercaseQuery) ||
        ambassador.country.toLowerCase().includes(lowercaseQuery) ||
        ambassador.expertise.some(exp => exp.toLowerCase().includes(lowercaseQuery))
      )
    } catch (error) {
      console.error('Error searching ambassadors:', error)
      return []
    }
  },
}