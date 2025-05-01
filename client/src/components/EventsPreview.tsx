import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/lib/eventsService";
import { Event } from "@/lib/types";

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:shadow-magenta transition-all group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium">{event.location}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3 text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.date}</span>
        </div>
        <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-magenta transition-colors">{event.name}</h3>
        <p className="font-sans text-gray-600 mb-4 line-clamp-3">
          {event.shortDescription}
        </p>
        <Link href={`/events/${event.slug}`}>
          <button className="font-sans font-semibold text-magenta hover:underline inline-flex items-center">
            Learn More
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </Link>
      </div>
    </div>
  );
};

// Loading skeleton for event cards
const EventCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse">
    <div className="h-64 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
      <div className="h-6 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const EventsPreview = () => {
  // Fetch upcoming events with React Query
  const { data: upcomingEvents, isLoading, isError } = useQuery({
    queryKey: ['/api/events/preview'],
    queryFn: async () => {
      const events = await eventsService.getUpcomingEvents();
      // Limit to 2 events for the preview section
      return events.slice(0, 2);
    },
  });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Upcoming Events</h2>
          <p className="font-sans text-lg text-gray-700 max-w-3xl mx-auto">
            Experience the power of in-person connection at our transformational events across the globe.
          </p>
        </div>
        
        {isLoading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        ) : isError ? (
          // Error state
          <div className="bg-red-50 rounded-lg p-8 text-center">
            <h3 className="font-serif font-semibold text-xl mb-2 text-red-600">Unable to Load Events</h3>
            <p className="font-sans text-gray-700 mb-4">
              We're having trouble loading our events. Please refresh the page or check back later.
            </p>
          </div>
        ) : upcomingEvents && upcomingEvents.length > 0 ? (
          // Display events
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          // No events available
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="font-serif font-semibold text-xl mb-2">No Upcoming Events</h3>
            <p className="font-sans text-gray-600 mb-4">
              Check back soon for new event announcements, or join our mailing list to be the first to know.
            </p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/events">
            <Button 
              variant="outline" 
              className="inline-flex items-center font-sans font-semibold border-2 border-magenta text-magenta px-6 py-3 rounded hover:bg-magenta hover:text-white transition-magenta"
            >
              View All Events
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
