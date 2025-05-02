
import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/lib/eventsService";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Circle } from "lucide-react";
import { useState } from "react";
import JoinModal from "./JoinModal";

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
            src={nextEvent.bannerImage || nextEvent.image} 
            alt={nextEvent.name}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <h3 className="text-lg font-bold text-white mb-2">{nextEvent.name}</h3>
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              size="sm"
              className="w-fit bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black rounded-full"
            >
              Watch
              <Play className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <section className="bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-6">
            <Circle className="h-2 w-2 fill-magenta text-magenta animate-pulse relative after:absolute after:inset-0 after:rounded-full after:bg-magenta/30 after:animate-ping" />
            <span className="text-sm font-semibold tracking-widest uppercase">Next Event</span>
          </div>

          <div className="relative overflow-hidden rounded-lg mb-6">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img 
                src={nextEvent.bannerImage || nextEvent.image} 
                alt={nextEvent.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h2 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl mb-3">
                  {nextEvent.name}
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-4 max-w-2xl">
                  {nextEvent.shortDescription}
                </p>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  variant="outline" 
                  className="w-fit border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black rounded-full px-6 py-4 text-lg font-semibold"
                >
                  Get Tickets
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden md:flex">
                <button className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center border-2 border-white backdrop-blur-sm hover:bg-white/30 transition-all">
                  <Play className="h-6 w-6 text-white fill-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NextEventBanner;
