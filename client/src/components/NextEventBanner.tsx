
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
              className="outline-button w-fit px-4 py-1"
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
      <section className="bg-gray-900 section-spacing">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Circle className="h-2 w-2 fill-magenta text-magenta animate-pulse" />
                <span className="text-sm font-semibold tracking-widest uppercase text-white">Next Event</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">{nextEvent.name}</h2>
              <p className="text-white/80 mb-6">
                {nextEvent.shortDescription}
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-black/30 p-2 rounded-full">
                    <Circle className="h-4 w-4 text-magenta" />
                  </div>
                  <span className="text-white">
                    {new Date(nextEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {nextEvent.startTime && (
                  <div className="flex items-center gap-2">
                    <div className="bg-black/30 p-2 rounded-full">
                      <Circle className="h-4 w-4 text-magenta" />
                    </div>
                    <span className="text-white">{nextEvent.startTime}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="bg-black/30 p-2 rounded-full">
                    <Circle className="h-4 w-4 text-magenta" />
                  </div>
                  <span className="text-white">{nextEvent.location}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  variant="default"
                  className="bg-magenta hover:bg-magenta/90 text-white rounded-full px-6"
                >
                  <Link href={`/events/${nextEvent.slug}`}>
                    Event Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 rounded-full px-6"
                  onClick={() => setIsModalOpen(true)}
                >
                  Register Now
                </Button>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden h-full min-h-[300px]">
              <img 
                src={getImageSrc(nextEvent.bannerImage || nextEvent.image)} 
                alt={nextEvent.name}
                className="w-full h-full object-cover"
                onError={createImageErrorHandler()}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NextEventBanner;
