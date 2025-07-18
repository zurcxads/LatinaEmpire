import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const FounderSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="flex flex-col">

            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 tracking-tight">
              The Force Behind Latina Empire
            </h2>
            
            <div className="mb-6 sm:mb-8">
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                Perla Tamez Casasnovas turned her passion into a movement that's transformed thousands of Latina lives. Her revolutionary Heart-Mind-Money method breaks generational barriers. She's rewriting the rules for Latina wealth, power, and impact across the globe.
              </p>
            </div>
            
            <div>
              <Button 
                asChild
                className="secondary-button px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
              >
                <Link href="/about-founder">
                  Meet Perla
                  <ArrowRight className="ml-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative mt-6 md:mt-0">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={getImageSrc("https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", true)}
                alt="Perla Tamez Casasnovas, Founder of Latina Empire" 
                className="w-full h-full object-cover aspect-[4/5] sm:aspect-auto"
                onError={createImageErrorHandler()}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;