
import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/lib/eventsService";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const NextEventBanner = ({ compact = false }: { compact?: boolean }) => {

  const { data: nextEvent, isLoading } = useQuery({
    queryKey: ['/api/events/next'],
    queryFn: async () => {
      const events = await eventsService.getUpcomingEvents();
      return events && events.length > 0 ? events[0] : null;
    },
  });

  if (isLoading || !nextEvent) {
    return null;
  }

  // Return the styled version for both desktop and mobile
  return (
    <div className="w-full overflow-hidden rounded-md bg-black/90">
      <div className="relative">
        {/* Event image with dark overlay */}
        <img 
          src={getImageSrc(nextEvent.bannerImage || nextEvent.image, true)} 
          alt={nextEvent.name}
          className="w-full aspect-video object-cover"
          onError={createImageErrorHandler()}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        
        {/* Desktop event info - shown only inside hero */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          {/* Event Title - different for desktop vs mobile */}
          <div>
            {/* Desktop event info */}
            <div className="hidden lg:block">
              <h3 className="text-white text-lg font-bold leading-tight mb-2">{nextEvent.name}</h3>
              
              {/* Event Date and Location - desktop only */}
              <div className="text-white/80 text-xs flex items-center mb-1">
                <span className="truncate">{new Date(nextEvent.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric'
                })}</span>
                {nextEvent.startTime && 
                  <span className="ml-2 truncate">{nextEvent.startTime}</span>
                }
              </div>
              
              <div className="text-white/80 text-xs">
                <span className="truncate">{nextEvent.location}</span>
              </div>
            </div>
            
            {/* Mobile event info (simpler) */}
            <div className="block lg:hidden">
              <h3 className="text-white text-base font-bold leading-tight mb-1">{nextEvent.name}</h3>
              
              <div className="text-white/80 text-xs mb-1">
                {new Date(nextEvent.date).toLocaleDateString('en-US', {
                  month: 'short', 
                  day: 'numeric'
                })}
                {nextEvent.startTime && ` • ${nextEvent.startTime}`}
              </div>
            </div>
          </div>
          
          {/* Bottom action area */}
          <div className="flex justify-between items-end w-full">
            {/* Learn More button */}
            <Button 
              asChild
              size="sm"
              className="bg-white hover:bg-white/90 text-black rounded-full px-4 py-1 text-xs shadow"
            >
              <Link href={`/events/${nextEvent.slug}`}>
                Learn More
              </Link>
            </Button>
            
            {/* RPM-like label in bottom right (mimicking Tony design) */}
            <div className="text-white text-sm font-bold hidden lg:block">
              {nextEvent.name.split(' ')[0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextEventBanner;
