import { Ambassador } from './types';

/**
 * Service to fetch ambassador data from the API
 * This abstraction layer allows us to easily switch to a CMS or other data source in the future
 */
export const ambassadorsService = {
  /**
   * Get all ambassadors
   */
  async getAllAmbassadors(): Promise<Ambassador[]> {
    try {
      const response = await fetch('/api/ambassadors');
      if (!response.ok) {
        throw new Error(`Error fetching ambassadors: ${response.statusText}`);
      }
      const data = await response.json();
      return data.ambassadors || [];
    } catch (error) {
      console.error('Failed to fetch ambassadors:', error);
      return [];
    }
  },

  /**
   * Get a specific ambassador by slug
   */
  async getAmbassadorBySlug(slug: string): Promise<Ambassador | null> {
    try {
      const response = await fetch(`/api/ambassadors/${slug}`);
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error(`Error fetching ambassador: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch ambassador with slug ${slug}:`, error);
      return null;
    }
  },

  /**
   * Search ambassadors by name/location
   */
  async searchAmbassadors(query: string): Promise<Ambassador[]> {
    const ambassadors = await this.getAllAmbassadors();
    if (!query) return ambassadors;

    const lowerQuery = query.toLowerCase();
    return ambassadors.filter(ambassador => 
      ambassador.name.toLowerCase().includes(lowerQuery) ||
      ambassador.location.toLowerCase().includes(lowerQuery) ||
      ambassador.country.toLowerCase().includes(lowerQuery) ||
      ambassador.title.toLowerCase().includes(lowerQuery)
    );
  }
};