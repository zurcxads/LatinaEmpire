import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import JoinModal from "./JoinModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="elite-hero-bg min-h-screen flex items-center relative">
        <div className="container mx-auto px-4 md:px-6 py-20 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white drop-shadow-md">
              Step Into Your Power with the Latina Empire Elite Program
            </h1>
            
            <p className="font-sans text-xl md:text-2xl text-white opacity-90 mb-10 drop-shadow-md">
              A proven path to purpose, wealth, and impact for Latinas worldwide.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-magenta text-white px-8 py-7 rounded-md font-sans font-semibold text-lg hover:bg-opacity-90 shadow-xl h-auto transition-all"
                size="lg"
              >
                Join Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                className="bg-transparent border-2 border-white text-white px-8 py-7 rounded-md font-sans font-semibold text-lg hover:bg-white hover:text-black transition-all h-auto"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-0"></div>
      </section>
    </>
  );
};

export default Hero;
