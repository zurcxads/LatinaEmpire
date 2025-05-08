import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import JoinModal from "./JoinModal";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      <section className="hero-navbar-spacing min-h-[calc(100vh-5rem)] flex flex-col justify-end relative overflow-hidden bg-black text-white">
        <div className="container mx-auto px-4 relative z-10 flex flex-col h-full">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-12">
            <h1 className="hero-heading text-white mb-6 md:mb-8">
              Transform Your Life & Legacy
            </h1>

            <p className="font-sans text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 max-w-xl">
              Join thousands of Latina leaders creating generational wealth and impact.
            </p>

            <Button 
              onClick={() => setIsModalOpen(true)}
              className="cta-button-large bg-white text-black hover:bg-gray-100"
            >
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="hero-gradient-overlay z-10" />
          <img 
            src={getImageSrc("https://images.unsplash.com/photo-1531058020387-3be344556be6", true)}
            alt="Conference stage with audience" 
            className="card-image"
            onError={createImageErrorHandler()}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;