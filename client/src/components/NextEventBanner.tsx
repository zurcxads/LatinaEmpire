
import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/lib/eventsService";
import { Button } from "@/components/ui/button";
import { ArrowRight, Circle } from "lucide-react";
import { useState } from "react";
import JoinModal from "./JoinModal";
import { Link } from "wouter";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const NextEventBanner = ({ compact = false }: { compact?: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Circle className="h-2 w-2 fill-magenta text-magenta animate-pulse" />
        <span className="text-sm font-semibold tracking-widest uppercase text-white">Next Event</span>
      </div>
      
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={getImageSrc(nextEvent.bannerImage || nextEvent.image, true)} 
          alt={nextEvent.name}
          className="card-image aspect-video"
          onError={createImageErrorHandler()}
        />
        <div className="card-text-overlay" />
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <div className="mb-1 text-xs font-medium text-white/80">
            {new Date(nextEvent.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short', 
              day: 'numeric'
            })}
            {nextEvent.startTime && ` • ${nextEvent.startTime}`}
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{nextEvent.name}</h3>
          <Button 
            asChild
            size="sm"
            className="border-2 border-white text-white bg-transparent hover:bg-white/10 rounded-full py-1 px-3 font-medium w-fit shadow-md"
          >
            <Link href={`/events/${nextEvent.slug}`}>
              Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NextEventBanner;
