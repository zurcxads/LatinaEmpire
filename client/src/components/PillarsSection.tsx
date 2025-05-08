import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PillarData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

// Use the same event image for all pillars to match the Tony Robbins style
const eventImageUrl = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop";

const pillars: PillarData[] = [
  {
    id: "mindset",
    title: "Mindset",
    description: "Transform your thinking patterns and unlock your highest potential.",
    imageUrl: eventImageUrl
  },
  {
    id: "wealth",
    title: "Wealth",
    description: "Master financial strategies and create lasting abundance.",
    imageUrl: eventImageUrl
  },
  {
    id: "health",
    title: "Health",
    description: "Optimize your physical and mental wellbeing for peak performance.",
    imageUrl: eventImageUrl
  },
  {
    id: "relationships",
    title: "Relationships",
    description: "Build deeper connections and nurture meaningful partnerships.",
    imageUrl: eventImageUrl
  },
  {
    id: "business",
    title: "Business",
    description: "Grow your business with proven strategies for sustainable success.",
    imageUrl: eventImageUrl
  },
  {
    id: "leadership",
    title: "Leadership",
    description: "Develop your authentic leadership style and inspire those around you.",
    imageUrl: eventImageUrl
  },
  {
    id: "happiness",
    title: "Happiness",
    description: "Create a life of fulfillment, purpose, and joy on your terms.",
    imageUrl: eventImageUrl
  }
];

const PillarsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const activePillar = pillars[activeIndex];
  
  // For mobile scroll functionality
  useEffect(() => {
    if (!isMobile || !sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const handleScroll = () => {
            if (!sectionRef.current) return;
            
            const sectionRect = sectionRef.current.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;
            const windowHeight = window.innerHeight;
            
            // Calculate how far we've scrolled through the section (0 to 1)
            const scrollProgress = Math.min(
              Math.max(
                (windowHeight - sectionTop) / (sectionHeight + windowHeight) * 1.5, 
                0
              ), 
              1
            );
            
            // Map the scroll progress to an index in the pillars array
            const newIndex = Math.min(
              Math.floor(scrollProgress * pillars.length),
              pillars.length - 1
            );
            
            if (newIndex !== activeIndex) {
              setActiveIndex(newIndex);
            }
          };
          
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobile, activeIndex]);
  
  const handlePillarClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 bg-white border-b border-gray-100"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Top label - Exact text from the screenshot */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-magenta"></div>
            <span className="font-sans uppercase tracking-wider text-gray-600 font-semibold text-[10px]">
              PILLARS FOR AN EXTRAORDINARY LIFE
            </span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Left side - Pillar list */}
          <div className="space-y-3 md:space-y-5 order-2 md:order-1">
            {pillars.map((pillar, index) => (
              <div 
                key={pillar.id}
                onClick={() => handlePillarClick(index)}
                onMouseEnter={() => !isMobile && setActiveIndex(index)}
                className={cn(
                  "cursor-pointer transition-all duration-300 transform",
                  activeIndex === index 
                    ? "font-bold scale-105 origin-left" 
                    : "text-gray-700 hover:text-black"
                )}
              >
                <h3 className={cn(
                  "font-serif text-3xl md:text-4xl lg:text-5xl transition-all duration-300 leading-tight",
                  activeIndex === index && "text-black"
                )}>
                  {pillar.title}
                </h3>
              </div>
            ))}
          </div>
          
          {/* Right side - Image and CTA */}
          <div className="relative order-1 md:order-2">
            <div className="relative overflow-hidden rounded-lg aspect-square md:aspect-[4/3]">
              {pillars.map((pillar, index) => (
                <div 
                  key={pillar.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  )}
                >
                  <img 
                    src={pillar.imageUrl} 
                    alt={pillar.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <Button asChild className="cta-button-large w-full md:w-auto">
                      <Link href={`/programs/${pillar.id}`}>
                        Explore {pillar.title}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile instruction */}
        <div className="mt-10 text-center md:hidden text-sm text-gray-500">
          <p>Scroll to explore all pillars</p>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;