
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

  if (compact) {
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
            className="w-full aspect-video object-cover"
            onError={createImageErrorHandler()}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
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
              className="outline-button w-fit"
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
  }

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <div className="spacing-compact bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-lg bg-black shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-60 md:h-auto relative">
                <img 
                  src={getImageSrc(nextEvent.bannerImage || nextEvent.image, true)} 
                  alt={nextEvent.name} 
                  className="w-full h-full object-cover"
                  onError={createImageErrorHandler()}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:bg-gradient-to-l" />
              </div>
              
              <div className="p-6 md:p-8 relative md:pl-10">
                <div className="flex items-center gap-2 mb-4">
                  <Circle className="h-3 w-3 fill-magenta text-magenta animate-pulse" />
                  <span className="text-sm font-semibold tracking-widest uppercase text-white/90">Next Event</span>
                </div>
                
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-2">
                  {nextEvent.name}
                </h3>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-sm text-white/70">
                  <div>
                    {new Date(nextEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </div>
                  {nextEvent.startTime && (
                    <div>{nextEvent.startTime}</div>
                  )}
                  <div>{nextEvent.location}</div>
                </div>
                
                <p className="text-white/80 mb-6 line-clamp-2">
                  {nextEvent.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    asChild
                    className="primary-button"
                  >
                    <Link href={`/events/${nextEvent.slug}`}>
                      Event Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="outline-button"
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NextEventBanner;
