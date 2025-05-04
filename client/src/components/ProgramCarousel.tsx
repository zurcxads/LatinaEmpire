import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/lib/eventsService";

// Mock Tony Robbins event cards to match the screenshot example
const TONY_ROBBINS_EVENTS = [
  {
    id: "tr1",
    slug: "business-mastery",
    name: "BUSINESS MASTERY",
    description: "Grow your business exponentially",
    image: "https://images.unsplash.com/photo-1513267893858-ed3d6f686518?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    instructor: "TONY ROBBINS"
  },
  {
    id: "tr2",
    slug: "leadership-academy",
    name: "LEADERSHIP ACADEMY",
    description: "Become a great leader",
    image: "https://images.unsplash.com/photo-1454923634634-bd1614719a7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    instructor: "TONY ROBBINS"
  },
  {
    id: "tr3",
    slug: "date-with-destiny",
    name: "DATE WITH DESTINY",
    description: "Create life according to your terms",
    image: "https://images.unsplash.com/photo-1682685797498-3ebbe9b6c5a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    instructor: "TONY ROBBINS"
  },
  {
    id: "tr4",
    slug: "unleash-the-power-within",
    name: "UNLEASH THE POWER WITHIN",
    description: "Experience explosive growth",
    image: "https://images.unsplash.com/photo-1496262967815-132206202600?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    instructor: "TONY ROBBINS"
  },
  {
    id: "tr5",
    slug: "life-mastery",
    name: "LIFE MASTERY",
    description: "Master mind and body",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    instructor: "TONY ROBBINS"
  }
];

const EventCard = ({ event }: { event: any }) => (
  <Link href={`/events/${event.slug}`}>
    <div className="relative aspect-[0.8] overflow-hidden rounded-md group cursor-pointer">
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      
      {/* Background image */}
      <img 
        src={event.image} 
        alt={event.name}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      
      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex flex-col items-start justify-end">
        {/* Instructor name in uppercase */}
        <div className="text-white text-xs font-medium tracking-wider mb-1 uppercase">
          {event.instructor}
        </div>
        
        {/* Event title in large capitals */}
        <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-1 uppercase">
          {event.name}
        </h3>
        
        {/* Short description */}
        <p className="text-white/90 text-sm">
          {event.description}
        </p>
      </div>
    </div>
  </Link>
);

const ProgramCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // We'll use the mock data directly to match the screenshot
  const events = TONY_ROBBINS_EVENTS;

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-white font-serif font-bold text-3xl md:text-4xl">
              Events that liberate
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/events" className="text-white/80 hover:text-white text-sm mr-4">
              Discover events
              <ChevronRight className="inline-block ml-1 h-4 w-4" />
            </Link>
            
            {/* Navigation buttons */}
            <button 
              onClick={scrollPrev}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {events.map((event) => (
              <div key={event.id} className="flex-[0_0_230px] min-w-0">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-6 gap-1">
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index} 
              className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramCarousel;