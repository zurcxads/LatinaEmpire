
import { useState } from "react";
import { Button } from "@/components/ui/button";
import JoinModal from "./JoinModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-10 z-10">
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Main image with rounded corners and shadow for floating effect */}
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-16 md:mb-20 relative
                transform transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
              <img 
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Conference stage with audience" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
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
