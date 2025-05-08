import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import JoinModal from "./JoinModal";
import NextEventBanner from "./NextEventBanner";
import { getImageSrc, createImageErrorHandler, getPlaceholderImage } from "@/lib/image-utils";
import { useScroll } from "@/hooks/use-scroll";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollToElement } = useScroll();

  const handleExploreClick = () => {
    scrollToElement("programs-section");
  };

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      <section className="relative w-full overflow-hidden">
        {/* Hero container - full width, rounded corners like Tony's site */}
        <div className="mx-4 my-4 rounded-3xl overflow-hidden">
          {/* Content container */}
          <div className="relative flex items-center w-full h-[85vh] px-10 md:px-16 py-16">
            {/* Main content area */}
            <div className="w-full max-w-4xl flex flex-col items-start justify-end h-full pb-20">
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-none">
                Elevate Your Leadership, Expand Your Legacy
              </h1>
              
              <p className="text-white text-xl md:text-2xl mb-12 max-w-3xl">
                Join the global movement empowering ambitious Latina professionals.
              </p>
              
              {/* CTA buttons styled like Tony's site */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white hover:bg-white/90 text-black font-medium rounded-full text-lg py-4 px-10"
                >
                  Join Now
                </Button>
                
                <Button 
                  onClick={handleExploreClick}
                  variant="outline" 
                  className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-medium rounded-full text-lg py-4 px-10"
                >
                  Explore Programs
                </Button>
              </div>
            </div>
            
            {/* Next Event sidebar - visible only on desktop in the hero */}
            <div className="absolute right-10 bottom-16 w-[300px] hidden lg:block">
              <div className="relative">
                <div className="absolute top-0 right-0 z-10 py-1 px-3 bg-black/40 text-white text-xs uppercase tracking-wider font-semibold">
                  NEXT EVENT
                </div>
                <NextEventBanner compact={true} />
              </div>
            </div>
            
            {/* Background image */}
            <div className="absolute inset-0 z-[-1]">
              <img 
                src={getPlaceholderImage()} 
                alt="Background design" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
            </div>
          </div>
        </div>

        {/* Background for page */}
        <div className="fixed inset-0 -z-10 bg-black"></div>
      </section>
      
      {/* Mobile-only Next Event Section (below Hero) */}
      <div className="lg:hidden bg-black px-4 pb-8">
        <div className="mb-2 py-2 flex items-center">
          <div className="h-2 w-2 rounded-full bg-magenta mr-2 animate-pulse"></div>
          <span className="text-sm font-semibold tracking-widest uppercase text-white">Next Event</span>
        </div>
        <NextEventBanner compact={true} />
      </div>
    </>
  );
};

export default Hero;