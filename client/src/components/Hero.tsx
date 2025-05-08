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

      <section className="pt-24 md:pt-32 min-h-[calc(100vh-5rem)] flex flex-col justify-center relative overflow-hidden bg-black text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          {/* Floating Container with rounded edges */}
          <div className="rounded-2xl shadow-2xl overflow-hidden relative">
            {/* Placeholder image background */}
            <img 
              src={getPlaceholderImage()} 
              alt="Background design" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Semi-transparent overlay for readability */}
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Content Container */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-8 md:p-12 lg:p-16">
              {/* Main Hero Content - Left Side */}
              <div className="flex-1 flex flex-col justify-center lg:max-w-2xl animate-fade-in">
                <h1 className="hero-heading text-white mb-6 md:mb-8 tracking-tight">
                  Elevate Your Leadership, Expand Your Legacy
                </h1>

                <p className="font-sans text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 max-w-xl">
                  Join the global movement empowering ambitious Latina professionals.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white hover:bg-white/90 text-rose-600 font-medium rounded-full text-lg py-3 px-8"
                  >
                    Join Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <Button 
                    onClick={handleExploreClick}
                    variant="outline" 
                    className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-medium rounded-full text-lg py-3 px-8"
                  >
                    Explore Programs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Next Event Preview - Right Side */}
              <div className="lg:w-[400px]">
                <div className="relative bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
                  <NextEventBanner compact={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background with placeholder image */}
        <div className="absolute inset-0 z-0 bg-black">
          <img 
            src={getPlaceholderImage()} 
            alt="Background design" 
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
      </section>
    </>
  );
};

export default Hero;