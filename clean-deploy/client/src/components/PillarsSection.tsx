import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";
import { Link } from "wouter";

// Define the three pillars of Latina Empire Methodology
const LATINA_EMPIRE_PILLARS = [
  {
    id: 'heart',
    name: 'Heart',
    description: 'Cultivate your emotional intelligence and cultural connection',
    image: 'https://images.unsplash.com/photo-1518310952931-b1de897abd40?q=80&w=2070',
    link: '/blog?pillar=heart'
  },
  {
    id: 'mind',
    name: 'Mind',
    description: 'Develop a powerful mindset and strategic thinking',
    image: 'https://images.unsplash.com/photo-1535957998253-26ae1ef29506?q=80&w=2036',
    link: '/blog?pillar=mind'
  },
  {
    id: 'money',
    name: 'Money',
    description: 'Create wealth and financial independence',
    image: 'https://images.unsplash.com/photo-1621953719256-0d391b3599bc?q=80&w=2080',
    link: '/blog?pillar=money'
  }
];

// Default background image - gradient similar to the reference
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1557682250-f8ba6a8f9696?q=80&w=2129';

// Pillar word component
interface PillarWordProps {
  pillar: {
    id: string;
    name: string;
    link: string;
  };
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const PillarWord = ({ pillar, isHovered, onMouseEnter, onMouseLeave }: PillarWordProps) => (
  <div 
    className="flex items-center group relative" 
    onMouseEnter={onMouseEnter} 
    onMouseLeave={onMouseLeave}
  >
    <h3 
      className={cn(
        "font-sans font-bold text-5xl md:text-6xl lg:text-7xl transition-all duration-300 cursor-pointer",
        isHovered ? "text-gray-900" : "text-gray-800"
      )}
      style={{ lineHeight: '1.1' }}
    >
      {pillar.name}
    </h3>
    
    {/* Explore button that appears on hover */}
    <div 
      className={cn(
        "ml-6 transition-all duration-300 overflow-hidden",
        isHovered ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
      )}
    >
      <Link href={pillar.link}>
        <button className="rounded-full border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition flex items-center">
          Explore <ArrowRight className="ml-2 h-3 w-3" />
        </button>
      </Link>
    </div>
  </div>
);

const PillarsSection = () => {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  // Get the current image based on hovered pillar
  const currentImage = hoveredPillar 
    ? LATINA_EMPIRE_PILLARS.find(p => p.id === hoveredPillar)?.image || DEFAULT_IMAGE
    : DEFAULT_IMAGE;

  return (
    <section className="bg-white py-24 border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left column: Pillar Titles */}
          <div className="order-2 md:order-1 flex flex-col justify-center">
            {/* Section label with pulsing magenta dot */}
            <div className="flex items-center gap-2 mb-12">
              <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse mr-1"></div>
              <span className="font-sans uppercase tracking-wider text-gray-600 font-semibold text-xs">
                LATINA EMPIRE METHODOLOGY
              </span>
            </div>
            
            {/* Pillar words stacked with larger spacing */}
            <div className="mb-8 flex flex-col gap-2 md:gap-3">
              {LATINA_EMPIRE_PILLARS.map(pillar => (
                <PillarWord 
                  key={pillar.id}
                  pillar={pillar}
                  isHovered={hoveredPillar === pillar.id}
                  onMouseEnter={() => setHoveredPillar(pillar.id)}
                  onMouseLeave={() => setHoveredPillar(null)}
                />
              ))}
            </div>
          </div>
          
          {/* Right column: Image Panel - with transitions when hovering */}
          <div className="order-1 md:order-2">
            <div className="rounded-xl overflow-hidden shadow-md h-72 md:h-96 lg:h-[450px]">
              <div className="relative w-full h-full">
                {/* Default gradient background visible at all times */}
                {/* Images that fade in/out based on hover - placed first so they're under the gradient */}
                {LATINA_EMPIRE_PILLARS.map(pillar => (
                  <img
                    key={pillar.id}
                    src={getImageSrc(pillar.image, true)} 
                    alt={`${pillar.name} pillar visualization`}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out",
                      hoveredPillar === pillar.id ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                    onError={createImageErrorHandler()}
                  />
                ))}
                
                {/* Gradient overlay on top of images */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400/60 via-fuchsia-500/50 to-blue-400/50 z-20 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;