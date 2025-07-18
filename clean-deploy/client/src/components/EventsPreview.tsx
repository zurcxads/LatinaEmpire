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
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img 
          src={getImageSrc(event.image, true)} 
          alt={event.name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onError={createImageErrorHandler()}
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
          <MapPin className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-magenta" />
          <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">{event.location}</span>
        </div>
      </div>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-2 sm:mb-3 text-gray-600 flex-wrap">
          <Calendar className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1.5 sm:mr-2 text-magenta flex-shrink-0" />
          <span className="text-xs sm:text-sm">{event.date}</span>
          {event.startTime && (
            <>
              <span className="mx-1.5 sm:mx-2">•</span>
              <Clock className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1 text-magenta flex-shrink-0" />
              <span className="text-xs sm:text-sm">{event.startTime}</span>
            </>
          )}
        </div>
        <h3 className="font-serif font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 group-hover:text-magenta transition-colors line-clamp-2">{event.name}</h3>
        <p className="font-sans text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm line-clamp-3 flex-grow">
          {event.shortDescription}
        </p>
        <div className="mt-auto flex gap-2 sm:gap-3 flex-wrap">
          <Link href={`/events/${event.slug}`}>
            <Button className="primary-button py-1.5 sm:py-2 h-auto text-xs sm:text-sm px-3 sm:px-4">
              Learn More
            </Button>
          </Link>
          {onOpen && (
            <Button 
              onClick={onOpen}
              className="accent-button py-1.5 sm:py-2 h-auto text-xs sm:text-sm px-3 sm:px-4"
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
    <div className="h-48 sm:h-56 md:h-64 bg-gray-200"></div>
    <div className="p-4 sm:p-5 md:p-6">
      <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-3 w-1/3"></div>
      <div className="h-5 sm:h-6 bg-gray-200 rounded mb-2 sm:mb-3"></div>
      <div className="h-3 sm:h-4 bg-gray-200 rounded mb-1.5 sm:mb-2"></div>
      <div className="h-3 sm:h-4 bg-gray-200 rounded mb-1.5 sm:mb-2"></div>
      <div className="h-3 sm:h-4 bg-gray-200 rounded mb-3 sm:mb-4 w-2/3"></div>
      <div className="h-7 sm:h-8 bg-gray-200 rounded w-1/3"></div>
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
    
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-10 md:mb-12">
              <div className="max-w-2xl mb-5 sm:mb-0">
                <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-xs sm:text-sm mb-2 sm:mb-3 block">TRANSFORMATIONAL EXPERIENCES</span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 tracking-tight">Live Events & Experiences</h2>
                <p className="font-sans text-sm sm:text-base text-gray-700">
                  Join us at our exclusive events where powerful content meets community connection for breakthrough results.
                </p>
              </div>
              <Link href="/events">
                <Button className="secondary-button py-1.5 sm:py-2 px-4 sm:px-5 h-auto text-xs sm:text-sm w-full sm:w-auto justify-center sm:justify-start">
                  View All Events
                  <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            {isLoading ? (
              // Loading state
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </div>
            ) : isError ? (
              // Error state
              <div className="bg-red-50 rounded-lg p-5 sm:p-6 md:p-8 text-center">
                <h3 className="font-serif font-semibold text-lg sm:text-xl mb-2 text-red-600">Unable to Load Events</h3>
                <p className="font-sans text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                  We're having trouble loading our events. Please refresh the page or check back later.
                </p>
              </div>
            ) : upcomingEvents && upcomingEvents.length > 0 ? (
              // Display events carousel
              <div className="overflow-hidden -mx-3 sm:-mx-4" ref={emblaRef}>
                <div className="flex">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_45%] md:flex-[0_0_30%] pl-3 pr-3 sm:pl-4 sm:pr-4">
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
              <div className="bg-gray-100 rounded-lg p-5 sm:p-6 md:p-8 text-center">
                <h3 className="font-serif font-semibold text-lg sm:text-xl mb-2">No Upcoming Events</h3>
                <p className="font-sans text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
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
