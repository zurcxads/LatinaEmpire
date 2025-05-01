import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/lib/eventsService";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import JoinModal from "./JoinModal";

const NextEventBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fetch the next upcoming event
  const { data: nextEvent, isLoading, isError } = useQuery({
    queryKey: ['/api/events/next'],
    queryFn: async () => {
      const events = await eventsService.getUpcomingEvents();
      // Get the first upcoming event
      return events && events.length > 0 ? events[0] : null;
    },
  });
  
  // Loading state
  if (isLoading) {
    return (
      <section className="bg-black py-4">
        <div className="container mx-auto px-4 flex items-center justify-center py-10">
          <Loader2 className="h-6 w-6 text-white animate-spin" />
        </div>
      </section>
    );
  }
  
  // Error or no events state
  if (isError || !nextEvent) {
    return null; // Hide the section if there's no event data
  }
  
  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="bg-black text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Event thumbnail */}
            <div className="md:col-span-1 relative overflow-hidden h-full min-h-[140px] md:min-h-0">
              <img 
                src={nextEvent.image}
                alt={nextEvent.name}
                className="w-full h-full object-cover md:absolute inset-0"
              />
              {/* Video play button overlay - if this is a video promo */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 md:bg-black/40">
                <button className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white backdrop-blur-sm hover:bg-white/30 transition-all">
                  <Play className="h-5 w-5 text-white fill-white" />
                </button>
              </div>
            </div>
            
            {/* Event details */}
            <div className="md:col-span-4 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center">
              <div className="flex-grow">
                <div className="text-magenta font-sans text-sm font-semibold tracking-wider uppercase mb-1">NEXT EVENT</div>
                <h2 className="font-serif font-bold text-2xl md:text-3xl mb-2">{nextEvent.name}</h2>
                <p className="text-white/80 mb-4 md:mb-0">{nextEvent.shortDescription}</p>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-8">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 py-3 font-semibold"
                >
                  Get Tickets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NextEventBanner;