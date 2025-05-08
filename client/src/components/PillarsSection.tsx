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

// Default background image with gradient
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
  <div className="flex items-center group relative mb-4" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <h3 
      className={cn(
        "font-serif font-bold text-5xl md:text-6xl lg:text-7xl transition-all duration-300 cursor-pointer",
        isHovered ? "text-black" : "text-gray-800/90"
      )}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column: Pillar Titles */}
          <div className="order-2 md:order-1 flex flex-col justify-center">
            {/* Section label with dot */}
            <div className="flex items-center gap-2 mb-10">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <span className="font-sans uppercase tracking-wider text-gray-600 font-semibold text-sm">
                ● LATINA EMPIRE METHODOLOGY
              </span>
            </div>
            
            {/* Pillar words stacked */}
            <div className="mb-8">
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
          
          {/* Right column: Image Panel */}
          <div className="order-1 md:order-2">
            <div className="aspect-[4/3] md:h-full rounded-xl overflow-hidden shadow-lg">
              <div className="relative w-full h-full">
                {/* Default blurred gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-yellow-500/20 backdrop-blur-md transition-opacity duration-500 ease-in-out z-0"></div>
                
                {/* Images that fade in/out based on hover */}
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
                
                {/* Default image shown when nothing is hovered */}
                <img
                  src={getImageSrc(DEFAULT_IMAGE, true)}
                  alt="Latina Empire Methodology"
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out",
                    hoveredPillar === null ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                  onError={createImageErrorHandler()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;