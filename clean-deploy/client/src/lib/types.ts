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

// Ambassador interface for consistent typing
export interface Ambassador {
  id: string;
  slug: string;
  name: string;
  title: string;
  location: string;
  country: string;
  quote: string;
  shortBio: string;
  fullBio: string;
  image: string;
  bannerImage?: string;
  socialMedia: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  yearsInProgram: number;
  eventsHosted: number;
  membersSince: string;
  languages: string[];
  expertise: string[];
}

// API response types
export interface EventsResponse {
  events: Event[];
}

export interface AmbassadorsResponse {
  ambassadors: Ambassador[];
}