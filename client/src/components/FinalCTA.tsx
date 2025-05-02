
import { useState } from "react";
import { Button } from "@/components/ui/button";
import JoinModal from "./JoinModal";

const FinalCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="py-24 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-black">
              Ready to Step Into Your Power?
            </h2>
            <p className="font-sans text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
              Join a global sisterhood of driven Latinas committed to building legacy, wealth, and purpose.
            </p>
            
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#D81B60] hover:bg-[#C2185B] text-white text-xl font-semibold py-8 px-12 rounded-xl shadow-xl transform transition-transform hover:scale-105"
            >
              Join the Movement
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinalCTA;
