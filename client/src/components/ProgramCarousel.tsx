import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/lib/eventsService";

const EventCard = ({ event }: { event: any }) => (
  <Link href={`/events/${event.slug}`}>
    <div className="relative aspect-[16/9] overflow-hidden rounded-lg group cursor-pointer">
      <img 
        src={event.image} 
        alt={event.name}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="font-serif text-xl font-bold text-white mb-2">{event.name}</h3>
        {event.shortDescription && (
          <p className="text-white/80 text-sm line-clamp-2">{event.shortDescription}</p>
        )}
      </div>
    </div>
  </Link>
);

const ProgramCarousel = () => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const { data: events, isLoading } = useQuery({
    queryKey: ['/api/events/upcoming'],
    queryFn: () => eventsService.getUpcomingEvents(),
  });

  if (isLoading || !events?.length) {
    return null;
  }

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-white font-serif font-bold text-4xl md:text-5xl mb-4">
            Events that Empower
          </h2>
          <Link href="/events" className="group inline-flex items-center text-white/80 hover:text-white">
            <span className="text-lg">Discover upcoming Latina Empire experiences</span>
            <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="overflow-hidden -mx-4" ref={emblaRef}>
          <div className="flex">
            {events.map((event) => (
              <div key={event.id} className="flex-[0_0_90%] min-w-0 sm:flex-[0_0_45%] md:flex-[0_0_30%] pl-4 pr-4">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramCarousel;