
import { useState } from "react";
import { Button } from "@/components/ui/button";
import JoinModal from "./JoinModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Conference stage with audience" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-10 py-20 md:py-32 relative z-10 text-center">
          <h1 className="font-serif font-bold text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-white mb-8 leading-tight tracking-tight mx-auto max-w-5xl">
            Latina Empire Elite Program
          </h1>
          
          <p className="font-sans text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Now accepting new women into our global flagship experience.
          </p>
          
          <div className="mt-10">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="w-auto bg-white hover:bg-gray-100 text-black font-semibold text-lg py-7 px-12 rounded-full transition-all shadow-lg"
            >
              Join Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
