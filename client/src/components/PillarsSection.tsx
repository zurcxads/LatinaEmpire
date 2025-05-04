import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface PillarCategoryProps {
  label: string;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const PillarCategory = ({ label, isActive, isHovered, onClick, onMouseEnter, onMouseLeave }: PillarCategoryProps) => (
  <button
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={cn(
      "group text-left font-serif text-4xl md:text-5xl lg:text-6xl transition-all duration-300 block mb-3 hover:opacity-90 relative",
      isActive || isHovered ? "text-black font-bold" : "text-gray-500 font-normal"
    )}
  >
    <span className="relative">
      {label}
      {isActive || isHovered ? (
        <span className="inline-block ml-2">
          <ChevronRight className="w-5 h-5 inline align-middle" />
        </span>
      ) : null}
    </span>
  </button>
);

const images = {
  mindset: "https://images.unsplash.com/photo-1507237998044-b8be61cd5886?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
  wealth: "https://plus.unsplash.com/premium_photo-1677094310896-ff906d6abf43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  health: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80",
  relationships: "https://images.unsplash.com/photo-1535637603896-07c179d71f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  business: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80",
  leadership: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  happiness: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
};

const PillarsSection = () => {
  const [openPillar, setOpenPillar] = useState<string | null>(null);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) setOpenPillar(null);
  };

  const handlePillarClick = (pillar: string) => {
    setOpenPillar(pillar);
  };

  const handlePillarHover = (pillar: string) => {
    setHoveredPillar(pillar);
  };

  const currentImage = hoveredPillar 
    ? images[hoveredPillar as keyof typeof images] 
    : "https://images.unsplash.com/photo-1575408264798-b50b252663e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80";

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left column: Text */}
          <div className="flex-1 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <span className="font-sans uppercase tracking-wider text-gray-600 font-semibold text-sm">
                PILLARS FOR AN EXTRAORDINARY LIFE
              </span>
            </div>

            <div className="mb-8 text-left">
              <PillarCategory 
                label="Mindset" 
                isActive={openPillar === 'mindset'} 
                isHovered={hoveredPillar === 'mindset'}
                onClick={() => handlePillarClick('mindset')}
                onMouseEnter={() => handlePillarHover('mindset')}
                onMouseLeave={() => setHoveredPillar(null)}
              />
              <PillarCategory 
                label="Wealth" 
                isActive={openPillar === 'wealth'} 
                isHovered={hoveredPillar === 'wealth'}
                onClick={() => handlePillarClick('wealth')}
                onMouseEnter={() => handlePillarHover('wealth')}
                onMouseLeave={() => setHoveredPillar(null)}
              />
              <PillarCategory 
                label="Health" 
                isActive={openPillar === 'health'} 
                isHovered={hoveredPillar === 'health'}
                onClick={() => handlePillarClick('health')}
                onMouseEnter={() => handlePillarHover('health')}
                onMouseLeave={() => setHoveredPillar(null)}
              />
              <PillarCategory 
                label="Relationships" 
                isActive={openPillar === 'relationships'} 
                isHovered={hoveredPillar === 'relationships'}
                onClick={() => handlePillarClick('relationships')}
                onMouseEnter={() => handlePillarHover('relationships')}
                onMouseLeave={() => setHoveredPillar(null)}
              />
              <PillarCategory 
                label="Business" 
                isActive={openPillar === 'business'} 
                isHovered={hoveredPillar === 'business'}
                onClick={() => handlePillarClick('business')}
                onMouseEnter={() => handlePillarHover('business')}
                onMouseLeave={() => setHoveredPillar(null)}
              />
              <PillarCategory 
                label="Leadership" 
                isActive={openPillar === 'leadership'} 
                isHovered={hoveredPillar === 'leadership'}
                onClick={() => handlePillarClick('leadership')}
                onMouseEnter={() => handlePillarHover('leadership')}
                onMouseLeave={() => setHoveredPillar(null)}
              />
              <PillarCategory 
                label="Happiness" 
                isActive={openPillar === 'happiness'} 
                isHovered={hoveredPillar === 'happiness'}
                onClick={() => handlePillarClick('happiness')}
                onMouseEnter={() => handlePillarHover('happiness')}
                onMouseLeave={() => setHoveredPillar(null)}
              />
            </div>

            {/* Explore button */}
            <button className="primary-button mt-4">
              Explore <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>

          {/* Right column: Image */}
          <div className="flex-1">
            <div className="relative h-[450px] rounded-lg overflow-hidden">
              <img 
                src={currentImage}
                alt="Lifestyle image" 
                className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Drawers for each pillar */}
      {Object.keys(images).map(pillar => (
        <Drawer key={pillar} open={openPillar === pillar} onOpenChange={handleOpenChange}>
          <DrawerContent className="bg-black/95 text-white">
            <DrawerHeader>
              <div className="flex justify-between items-center">
                <DrawerTitle className="font-serif text-3xl capitalize">{pillar}</DrawerTitle>
                <DrawerClose className="rounded-full h-8 w-8 flex items-center justify-center bg-white/10">
                  <X className="h-4 w-4" />
                </DrawerClose>
              </div>
              <DrawerDescription className="text-white/70 text-lg max-w-2xl mx-auto mt-4 text-center">
                Explore all content related to {pillar} — coming soon.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      ))}
    </section>
  );
};

export default PillarsSection;