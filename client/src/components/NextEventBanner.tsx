
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
    <div className="w-full overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-magenta/20 to-black/80 shadow-lg border border-white/10">
      <div className="relative">
        {/* Event image with dark overlay */}
        <img 
          src={getImageSrc(nextEvent.bannerImage || nextEvent.image, true)} 
          alt={nextEvent.name}
          className="w-full aspect-[16/10] sm:aspect-video object-cover opacity-80"
          onError={createImageErrorHandler()}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        
        {/* Event info overlay */}
        <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between">
          {/* Event Title - different for desktop vs mobile */}
          <div>
            {/* Desktop event info */}
            <div className="hidden md:block">
              <h3 className="text-white text-sm sm:text-base lg:text-lg font-bold leading-tight mb-1 sm:mb-2">{nextEvent.name.replace("Latina Empire", "")}</h3>
              
              {/* Event Date and Location */}
              <div className="text-white/90 text-xs flex items-center mb-1">
                <span className="truncate">{new Date(nextEvent.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric'
                })}</span>
                {nextEvent.startTime && 
                  <span className="ml-2 truncate">{nextEvent.startTime}</span>
                }
              </div>
              
              <div className="text-white/90 text-xs">
                <span className="truncate">{nextEvent.location}</span>
              </div>
            </div>
            
            {/* Mobile event info (simpler) */}
            <div className="block md:hidden">
              <h3 className="text-white text-xs sm:text-sm font-bold leading-tight mb-1">{nextEvent.name.replace("Latina Empire", "")}</h3>
              
              <div className="text-white/90 text-[10px] sm:text-xs mb-1">
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
              className="bg-white hover:bg-white/90 text-black rounded-full px-3 sm:px-4 py-1 text-[10px] sm:text-xs shadow h-6 sm:h-7"
            >
              <Link href={`/events/${nextEvent.slug}`}>
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextEventBanner;
