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

// Program card component matching Tony Robbins style from the reference image
const ProgramCard = ({ program }: { program: Program }) => (
  <Link href={`/programs#${program.slug}`}>
    <div className="relative overflow-hidden rounded-md group cursor-pointer h-full aspect-[0.8]">
      {/* Dark gradient overlay matching the reference */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      
      {/* Background image */}
      <img 
        src={getImageSrc(program.image, true)} 
        alt={program.title}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        onError={createImageErrorHandler()}
      />
      
      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex flex-col items-start justify-end">
        {/* Program category/brand - smaller text on top */}
        <div className="text-white text-xs font-medium tracking-wider mb-1 uppercase">
          LATINA EMPIRE
        </div>
        
        {/* Program title in large uppercase text exactly like reference */}
        <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-1 uppercase leading-tight">
          {program.title}
        </h3>
        
        {/* Short description exactly like reference */}
        <p className="text-white/90 text-sm mt-2">
          {program.description}
        </p>
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
    <section className="bg-black py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header with "discover" link exactly like the reference */}
        <div className="flex justify-between items-end mb-8">
          <div className="flex items-end gap-4">
            <h2 className="text-white font-serif font-bold text-3xl md:text-4xl">
              Empowerment Through Programs
            </h2>
            <Link href="/programs" className="text-white/80 hover:text-white text-sm mb-1">
              Discover programs
              <ChevronRight className="inline-block ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {/* Navigation buttons like reference */}
          <div className="flex items-center gap-2">
            <button 
              onClick={scrollPrev}
              className="w-8 h-8 rounded-full bg-black border border-white/20 hover:bg-white/10 flex items-center justify-center text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-8 h-8 rounded-full bg-black border border-white/20 hover:bg-white/10 flex items-center justify-center text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Programs carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {programs.map((program) => (
              <div 
                key={program.id} 
                className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_25%]"
              >
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination dots like in reference */}
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