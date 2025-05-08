import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

// Latina Empire Programs data
const LATINA_PROGRAMS = [
  {
    id: '1',
    slug: 'wellness-wealth-retreat',
    title: 'Wellness & Wealth Retreat',
    description: 'Balance personal wellness with wealth creation strategies',
    category: 'IN-PERSON',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070',
    color: 'from-rose-500/80 to-purple-800/90'
  },
  {
    id: '2',
    slug: 'latina-leadership-academy',
    title: 'Latina Leadership Academy',
    description: 'Develop your leadership skills in a supportive community',
    category: 'HYBRID',
    image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069',
    color: 'from-blue-600/80 to-purple-800/90'
  },
  {
    id: '3',
    slug: 'wealth-building-masterclass',
    title: 'Wealth Building Masterclass',
    description: 'Create generational wealth through proven strategies',
    category: 'VIRTUAL',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070',
    color: 'from-amber-500/80 to-rose-800/90'
  },
  {
    id: '4',
    slug: 'success-summit',
    title: 'Success Summit',
    description: 'Connect with leaders and visionaries for breakthrough growth',
    category: 'IN-PERSON',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070',
    color: 'from-emerald-500/80 to-blue-800/90'
  }
];

// Define the Program interface
interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  color: string;
}

// Program card component with Tony Robbins-inspired styling
const ProgramCard = ({ program }: { program: Program }) => (
  <Link href={`/programs#${program.slug}`}>
    <div className="relative overflow-hidden rounded-xl group cursor-pointer shadow-lg border border-white/10 h-full">
      {/* Category pill */}
      <div className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-sm py-1 px-3 rounded-full">
        <span className="text-white text-xs font-semibold tracking-wider">{program.category}</span>
      </div>
      
      {/* Custom gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-90 z-10`} />
      
      {/* Background image */}
      <img 
        src={getImageSrc(program.image, true)} 
        alt={program.title}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 aspect-[0.8]"
        onError={createImageErrorHandler()}
      />
      
      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex flex-col items-start justify-end">
        {/* Program title */}
        <h3 className="font-bold text-2xl text-white mb-2">
          {program.title}
        </h3>
        
        {/* Short description */}
        <p className="text-white/90 text-sm mb-6">
          {program.description}
        </p>
        
        {/* Learn More button */}
        <Button 
          variant="outline" 
          className="bg-white text-black hover:bg-white/90 hover:text-black rounded-full px-4 py-1 text-sm h-auto"
        >
          Learn More
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  </Link>
);

const ProgramCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Use the Latina programs data
  const programs = LATINA_PROGRAMS;

  return (
    <section className="bg-gradient-to-b from-[#0f0f0f] to-black pt-20 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-white font-serif text-4xl md:text-5xl font-semibold mb-6">
            Empowerment Through Programs
          </h2>
          <p className="text-white/70 text-lg max-w-3xl">
            Experiences crafted to develop the Heart, Mind, and Money of Latina leaders.
          </p>
        </div>

        {/* Navigation controls */}
        <div className="flex justify-end items-center gap-3 mb-8">
          <button 
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={scrollNext}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Programs carousel */}
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex gap-6">
            {programs.map((program) => (
              <div 
                key={program.id} 
                className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
              >
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        </div>
        
        {/* View all programs link */}
        <div className="mt-10 flex justify-center">
          <Link href="/programs">
            <Button 
              variant="outline" 
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white rounded-full px-8 py-6 text-base h-auto"
            >
              View All Programs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramCarousel;