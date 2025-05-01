
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import JoinModal from "./JoinModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="min-h-[100vh] flex flex-col justify-center relative overflow-hidden bg-black text-white">
        <div className="container mx-auto px-4 md:px-10 z-10">
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Main image with rounded corners and enhanced floating effect */}
            <div className="absolute inset-0 -mx-4 md:-mx-10 overflow-hidden md:rounded-2xl
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
            <div className="relative z-30 text-white max-w-4xl mx-auto px-4 md:px-0 py-10 text-center">
              <h1 className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl mb-6">
                Transform Your Life & Legacy
              </h1>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Join thousands of Latina leaders creating generational wealth and impact.
              </p>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black hover:bg-gray-100 px-6 py-4 h-auto rounded-full font-sans font-medium text-base shadow-lg inline-flex items-center"
              >
                Begin Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Content over the image */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
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
