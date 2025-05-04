
import { useState } from "react";
import { Button } from "@/components/ui/button";
import JoinModal from "./JoinModal";

const FinalCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D81B60]/20 to-black/95 z-0"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#D81B60]/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#D81B60]/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-black text-5xl md:text-6xl lg:text-7xl mb-8 text-white leading-tight tracking-tight">
              Ready to Step Into<br />Your <span className="text-[#D81B60]">Power</span>?
            </h2>
            <p className="font-sans text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join a global sisterhood of driven Latinas committed to building legacy, wealth, and purpose.
            </p>
            
            <div className="flex justify-center">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="primary-button text-xl uppercase tracking-wide py-3 px-8"
              >
                Join the Movement Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinalCTA;
