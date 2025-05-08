
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
        
        {/* Simple Learn More button in the center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button 
            asChild
            size="sm"
            className="bg-white hover:bg-white/90 text-black rounded-full px-6 py-2 text-sm shadow-lg"
          >
            <Link href={`/events/${nextEvent.slug}`}>
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NextEventBanner;
