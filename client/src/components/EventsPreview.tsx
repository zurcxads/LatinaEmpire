import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin, Clock, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/lib/eventsService";
import { Event } from "@/lib/types";
import JoinModal from "./JoinModal";
import useEmblaCarousel from "embla-carousel-react";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const EventCard = ({ event, onOpen }: { event: Event; onOpen?: () => void }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group h-full flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={getImageSrc(event.image, true)} 
          alt={event.name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onError={createImageErrorHandler()}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <MapPin className="h-3 w-3 text-magenta" />
          <span className="text-sm font-medium">{event.location}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-3 text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-magenta" />
          <span className="text-sm">{event.date}</span>
          {event.startTime && (
            <>
              <span className="mx-2">•</span>
              <Clock className="h-4 w-4 mr-1 text-magenta" />
              <span className="text-sm">{event.startTime}</span>
            </>
          )}
        </div>
        <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-magenta transition-colors">{event.name}</h3>
        <p className="font-sans text-gray-600 mb-6 line-clamp-3 flex-grow">
          {event.shortDescription}
        </p>
        <div className="mt-auto flex gap-3 flex-wrap">
          <Link href={`/events/${event.slug}`}>
            <Button className="primary-button">
              Learn More
            </Button>
          </Link>
          {onOpen && (
            <Button 
              onClick={onOpen}
              className="accent-button"
            >
              Register Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Loading skeleton for event cards
const EventCardSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-lg animate-pulse h-full">
    <div className="h-64 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
      <div className="h-6 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

const EventsPreview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps"
  });
  
  // Fetch upcoming events with React Query
  const { data: upcomingEvents, isLoading, isError } = useQuery({
    queryKey: ['/api/events/preview'],
    queryFn: async () => {
      const events = await eventsService.getUpcomingEvents();
      // Get up to 4 events for the preview slider
      return events.slice(0, 4);
    },
  });

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
              <div className="max-w-2xl mb-6 md:mb-0">
                <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">TRANSFORMATIONAL EXPERIENCES</span>
                <h2 className="font-serif font-bold text-3xl md:text-5xl mb-4 tracking-tight">Live Events & Experiences</h2>
                <p className="font-sans text-gray-700">
                  Join us at our exclusive events where powerful content meets community connection for breakthrough results.
                </p>
              </div>
              <Link href="/events">
                <Button className="secondary-button">
                  View All Events
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            {isLoading ? (
              // Loading state
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <EventCardSkeleton />
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
              // Display events carousel
              <div className="overflow-hidden -mx-4" ref={emblaRef}>
                <div className="flex">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex-[0_0_90%] min-w-0 sm:flex-[0_0_45%] md:flex-[0_0_30%] pl-4 pr-4">
                      <EventCard 
                        event={event} 
                        onOpen={() => setIsModalOpen(true)} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // No events available
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <h3 className="font-serif font-semibold text-xl mb-2">No Upcoming Events</h3>
                <p className="font-sans text-gray-600 mb-4">
                  Check back soon for new event announcements, or join our mailing list to be the first to know.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventsPreview;
