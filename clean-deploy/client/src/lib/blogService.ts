import { apiRequest } from "@/lib/queryClient";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export interface BlogResponse {
  blog: BlogPost[];
  categories: string[];
  popularTags: string[];
}

/**
 * Service to fetch blog data from the API
 * This abstraction layer allows us to easily switch to a CMS or other data source in the future
 */
export const blogService = {
  /**
   * Get all blog posts
   */
  async getAllPosts(options?: { category?: string; tag?: string; featured?: boolean }): Promise<BlogResponse> {
    try {
      let url = '/api/blog';
      const params = new URLSearchParams();
      
      if (options?.category) {
        params.append('category', options.category);
      }
      
      if (options?.tag) {
        params.append('tag', options.tag);
      }
      
      if (options?.featured) {
        params.append('featured', 'true');
      }
      
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      
      const data: BlogResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { blog: [], categories: [], popularTags: [] };
    }
  },
  
  /**
   * Get a specific blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`/api/blog/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch blog post');
      }
      
      const data: BlogPost = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      return null;
    }
  },
  
  /**
   * Get featured blog posts
   */
  async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      const response = await this.getAllPosts({ featured: true });
      return response.blog;
    } catch (error) {
      console.error('Error fetching featured blog posts:', error);
      return [];
    }
  },
  
  /**
   * Get posts by category
   */
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const response = await this.getAllPosts({ category });
      return response.blog;
    } catch (error) {
      console.error(`Error fetching blog posts for category ${category}:`, error);
      return [];
    }
  },
  
  /**
   * Get posts by tag
   */
  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    try {
      const response = await this.getAllPosts({ tag });
      return response.blog;
    } catch (error) {
      console.error(`Error fetching blog posts for tag ${tag}:`, error);
      return [];
    }
  },
};