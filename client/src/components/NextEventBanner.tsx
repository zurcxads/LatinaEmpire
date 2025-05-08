
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

  // Return the compact version styled like Tony Robbins site
  return (
    <div className="p-4">
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={getImageSrc(nextEvent.bannerImage || nextEvent.image, true)} 
          alt={nextEvent.name}
          className="w-full aspect-video object-cover"
          onError={createImageErrorHandler()}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        
        {/* Content with improved styling */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          {/* Date badge */}
          <div className="mb-3 text-xs font-medium text-white/90 flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-500 mr-2"></div>
            {new Date(nextEvent.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short', 
              day: 'numeric'
            })}
            {nextEvent.startTime && ` • ${nextEvent.startTime}`}
          </div>
          
          {/* Title with improved typography */}
          <h3 className="text-xl font-bold text-white mb-4 leading-tight">{nextEvent.name}</h3>
          
          {/* Button styled like Tony's site */}
          <div className="flex">
            <Button 
              asChild
              size="sm"
              className="bg-white hover:bg-white/90 text-black rounded-full px-5 py-1 text-sm shadow-lg flex items-center gap-1.5"
            >
              <Link href={`/events/${nextEvent.slug}`}>
                <span>Learn More</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextEventBanner;
