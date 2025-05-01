
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import JoinModal from "./JoinModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="pt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-end relative overflow-hidden bg-black text-white">
        <div className="container mx-auto px-4 md:px-10 z-10">
          <div className="relative w-full max-w-6xl mx-auto min-h-[calc(100vh-5rem)]">
            {/* Main image with rounded corners and enhanced floating effect */}
            <div className="absolute inset-4 md:inset-8 overflow-hidden rounded-3xl shadow-2xl
                before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/10 before:to-black/80 before:z-10
                after:content-[''] after:absolute after:inset-0 after:bg-magenta/20 after:mix-blend-overlay after:z-0">
              <img 
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Conference stage with audience" 
                className="w-full h-full object-cover relative z-[5] transform transition-transform duration-700 md:rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90 z-20"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-12 left-0 right-0 z-30 text-white px-4 md:px-0 text-center">
              <div className="max-w-3xl mx-auto">
                <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
                  Transform Your Life & Legacy
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-6 opacity-90 max-w-xl mx-auto">
                  Join thousands of Latina leaders creating generational wealth and impact.
                </p>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white/90 backdrop-blur-sm text-black hover:bg-white px-5 py-3 h-auto rounded-full font-sans font-medium text-sm md:text-base shadow-xl inline-flex items-center transition-all"
                >
                  Begin Your Journey
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            
            {/* Content over the image */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center text-center p-6 pb-12 md:pb-16">
              <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-white mb-6 md:mb-8 leading-tight tracking-tight mx-auto">
                Latina Empire Elite Program
              </h1>
              
              <p className="font-sans text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                Now accepting new women into our global flagship experience.
              </p>
              
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-gray-100 text-black font-semibold text-lg py-6 px-10 rounded-full transition-all shadow-xl"
              >
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
