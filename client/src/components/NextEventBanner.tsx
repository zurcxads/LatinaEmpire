
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

  // Return the compact version styled exactly like Tony Robbins site
  return (
    <div className="w-full overflow-hidden rounded-md bg-black/90">
      <div className="relative">
        <img 
          src={getImageSrc(nextEvent.bannerImage || nextEvent.image, true)} 
          alt={nextEvent.name}
          className="w-full aspect-video object-cover"
          onError={createImageErrorHandler()}
        />
        
        {/* Play button overlay (similar to Tony's video thumbnail) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
          </div>
        </div>
        
        {/* "Watch" label (like Tony's site) */}
        <div className="absolute bottom-4 right-4 text-white text-sm font-medium">
          Watch
        </div>
      </div>
    </div>
  );
};

export default NextEventBanner;
