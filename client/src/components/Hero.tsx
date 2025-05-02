import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import JoinModal from "./JoinModal";
import NextEventBanner from "./NextEventBanner";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      <section className="pt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-end relative overflow-hidden bg-black text-white">
        <div className="container mx-auto px-4 relative z-10 flex flex-col h-full">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 min-h-[calc(100vh-5rem)]">
            {/* Main Hero Content - Left Side */}
            <div className="flex-1 flex flex-col justify-center lg:max-w-2xl py-12">
              <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-white mb-6 md:mb-8 leading-tight tracking-tight">
                Transform Your Life & Legacy
              </h1>

              <p className="font-sans text-xl md:text-2xl text-white/90 mb-8 md:mb-10 max-w-xl">
                Join thousands of Latina leaders creating generational wealth and impact.
              </p>

              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-gray-100 text-black font-semibold text-lg py-6 px-10 rounded-full transition-all shadow-xl w-fit"
              >
                Join Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Next Event Preview - Right Side */}
            <div className="lg:w-[400px] mb-8">
              <div className="relative bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden">
                <NextEventBanner compact={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Conference stage with audience" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;