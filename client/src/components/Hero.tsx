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
        <div className="mx-4 my-4 rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Content container with fixed height and absolute positioning for content */}
          <div className="relative w-full min-h-[600px] sm:min-h-[650px] md:min-h-[700px] h-[90vh] pt-16 sm:pt-20 overflow-hidden">
            {/* Main content area - absolutely positioned directly at bottom left with minimal margin */}
            <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-8 md:left-16 z-10 max-w-full sm:max-w-4xl px-2 sm:px-0">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 leading-[0.95] tracking-tighter mt-12 sm:mt-16 md:mt-20">
                <span className="sm:hidden block">
                  Your<br/>
                  Leadership,<br/>
                  Expand<br/>
                  Your<br/>
                  Legacy
                </span>
                <span className="hidden sm:block">
                  Your<br />
                  Leadership,<br />
                  Expand<br />
                  Your<br />
                  Legacy
                </span>
              </h1>
              
              <p className="text-white text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl">
                Join the global movement empowering ambitious Latina professionals.
              </p>
              
              {/* CTA buttons styled like Tony's site */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white hover:bg-white/90 text-black font-medium rounded-full text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-10 w-full sm:w-auto"
                >
                  Join Now
                </Button>
                
                <Button 
                  onClick={handleExploreClick}
                  variant="outline" 
                  className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-medium rounded-full text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-10 w-full sm:w-auto"
                >
                  Explore Programs
                </Button>
              </div>
            </div>
            
            {/* Next Event sidebar - visible only on desktop in the hero, aligned with buttons */}
            <div className="absolute right-10 bottom-12 w-[300px] hidden lg:block">
              <div className="relative">
                <div className="flex items-center absolute -top-8 left-0 z-10 py-1">
                  <div className="h-2 w-2 rounded-full bg-magenta mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium uppercase tracking-wider text-white">Next Event</span>
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
          <span className="text-sm font-medium uppercase tracking-wider text-white">Next Event</span>
        </div>
        <NextEventBanner compact={true} />
      </div>
    </>
  );
};

export default Hero;