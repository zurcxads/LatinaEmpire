
import { useState } from "react";
import { Button } from "@/components/ui/button";
import JoinModal from "./JoinModal";
import { useScroll } from "@/hooks/use-scroll";

const FinalCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollToElement } = useScroll();
  
  const handleExplorePrograms = () => {
    scrollToElement("programs-section");
  };
  
  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="py-20 md:py-28 px-6 md:px-12 bg-gradient-to-br from-magenta/40 to-magenta/10 relative overflow-hidden rounded-t-3xl mt-16">
        {/* Single gradient overlay for background */}
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/30 to-magenta/5 z-0 backdrop-blur-sm"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-black leading-tight tracking-tight">
              Ready to Transform Your Life & Legacy?
            </h2>
            <p className="font-sans text-lg md:text-xl text-gray-800 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of ambitious Latinas taking the next step toward leadership, clarity, and generational impact.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-magenta hover:bg-magenta/90 text-white rounded-full py-3 px-8 text-lg font-medium"
              >
                Join the Empire
              </Button>
              
              <Button 
                onClick={handleExplorePrograms}
                variant="outline"
                className="border-magenta text-magenta hover:bg-magenta/10 rounded-full py-3 px-8 text-lg font-medium"
              >
                Explore Programs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinalCTA;
