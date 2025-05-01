import { useState } from "react";
import { Button } from "@/components/ui/button";
import JoinModal from "./JoinModal";

const FinalCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-bold text-4xl md:text-6xl mb-8 leading-tight">
              Are You Ready to Join the Movement?
            </h2>
            <p className="font-sans text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Join thousands of Latinas who are transforming their lives, building wealth, and creating lasting impact.
            </p>
            
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white hover:bg-gray-800 rounded-full font-semibold text-xl py-7 px-12 shadow-xl"
            >
              Join the Community
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinalCTA;