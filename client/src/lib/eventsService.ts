import { Event, EventsResponse } from './types';
import { apiRequest } from './queryClient';

/**
 * Service to fetch event data from the API
 * This abstraction layer allows us to easily switch to a CMS or other data source in the future
 */
export const eventsService = {
  /**
   * Get all events
   */
  async getAllEvents(): Promise<Event[]> {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
      }
      const data: EventsResponse = await response.json();
      return data.events || [];
    } catch (error) {
      console.error('Failed to fetch events:', error);
      return [];
    }
  },

  /**
   * Get a specific event by slug
   */
  async getEventBySlug(slug: string): Promise<Event | null> {
    try {
      const response = await fetch(`/api/events/${slug}`);
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error(`Error fetching event: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch event with slug ${slug}:`, error);
      return null;
    }
  },

  /**
   * Get upcoming events (not in the past)
   */
  async getUpcomingEvents(): Promise<Event[]> {
    const events = await this.getAllEvents();
    return events
      .filter(event => !event.isPast)
      .sort((a, b) => {
        // Sort by date (assuming date format can be parsed)
        const dateA = new Date(a.date.split('-')[0]);
        const dateB = new Date(b.date.split('-')[0]);
        return dateA.getTime() - dateB.getTime();
      });
  },

  /**
   * Get past events
   */
  async getPastEvents(): Promise<Event[]> {
    const events = await this.getAllEvents();
    return events
      .filter(event => event.isPast)
      .sort((a, b) => {
        // Sort by date in descending order (most recent first)
        const dateA = new Date(a.date.split('-')[0]);
        const dateB = new Date(b.date.split('-')[0]);
        return dateB.getTime() - dateA.getTime();
      });
  }
};