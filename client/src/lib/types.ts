// Event interface for consistent typing
export interface Event {
  id: string;
  slug: string;
  name: string;
  location: string;
  date: string;
  startTime?: string;
  endTime?: string;
  description: string;
  shortDescription: string;
  host: string;
  hostTitle?: string;
  hostImage?: string;
  image: string;
  bannerImage?: string;
  isPast: boolean;
  ticketPrice?: string;
  ticketLink?: string;
  locationMapUrl?: string;
  locationAddress?: string;
}

// API response types
export interface EventsResponse {
  events: Event[];
}