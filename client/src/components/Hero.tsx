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

      <section className="min-h-[80vh] flex items-center relative overflow-hidden bg-black text-white">
        {/* Full-width hero container with soft padding for floating effect */}
        <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24 relative z-10 my-10 md:my-16">
          {/* Floating Container with enhanced rounded edges and shadow */}
          <div className="rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden relative">
            {/* Placeholder image background */}
            <img 
              src={getPlaceholderImage()} 
              alt="Background design" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Enhanced gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-black/30 backdrop-blur-sm"></div>
            
            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
            
            {/* Content Container with improved layout */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-12 md:p-16 lg:p-20 min-h-[70vh]">
              {/* Main Hero Content - More centered with improved spacing */}
              <div className="lg:col-span-8 flex flex-col justify-center items-center lg:items-start animate-fade-in">
                <h1 className="hero-heading text-white mb-6 md:mb-8 lg:mb-10 tracking-tight text-center lg:text-left leading-tight max-w-2xl mx-auto lg:mx-0">
                  Elevate Your Leadership, Expand Your Legacy
                </h1>

                <p className="font-sans text-base md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 lg:mb-12 max-w-xl text-center lg:text-left mx-auto lg:mx-0 leading-relaxed">
                  Join the global movement empowering ambitious Latina professionals.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center lg:justify-start">
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white hover:bg-white/90 text-rose-600 font-medium rounded-full text-lg py-6 px-10 shadow-lg"
                  >
                    Join Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <Button 
                    onClick={handleExploreClick}
                    variant="outline" 
                    className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-medium rounded-full text-lg py-6 px-10 shadow-lg"
                  >
                    Explore Programs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Next Event Preview - Positioned like Tony's site */}
              <div className="lg:col-span-4 flex items-end justify-center lg:justify-end">
                <div className="relative w-full lg:max-w-[350px] bg-black/50 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="absolute top-0 left-0 py-1 px-3 bg-black/60 text-white text-xs uppercase tracking-wider font-semibold">
                    Next Event
                  </div>
                  <NextEventBanner compact={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background with placeholder image and enhanced gradient */}
        <div className="absolute inset-0 z-0 bg-black">
          <img 
            src={getPlaceholderImage()} 
            alt="Background design" 
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black"></div>
        </div>
      </section>
    </>
  );
};

export default Hero;