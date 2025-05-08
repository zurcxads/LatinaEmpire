import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import JoinModal from "./JoinModal";

const CoachingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
              EXECUTIVE COACHING
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6 leading-tight">
              Private Coaching for High-Achieving Latinas
            </h2>
            <p className="font-sans text-lg text-white/80 mb-10 max-w-3xl mx-auto">
              Work directly with our expert coaches to accelerate your growth and achieve breakthrough results in your career and personal life.
            </p>
            
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black hover:bg-gray-100 rounded-full font-semibold text-lg py-3 px-8 inline-flex items-center cta-button-large"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoachingSection;