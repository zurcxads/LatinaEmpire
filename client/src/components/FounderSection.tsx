import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const FounderSection = () => {
  return (
    <section className="section-spacing bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="flex flex-col">

            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight">
              The Force Behind Latina Empire
            </h2>
            
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Perla Tamez Casasnovas turned her passion into a movement that's transformed thousands of Latina lives. Her revolutionary Heart-Mind-Money method breaks generational barriers. She's rewriting the rules for Latina wealth, power, and impact across the globe.
              </p>
            </div>
            
            <div>
              <Button 
                asChild
                className="cta-button bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <Link href="/about-founder">
                  Meet Perla
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={getImageSrc("https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", true)}
                alt="Perla Tamez Casasnovas, Founder of Latina Empire" 
                className="card-image"
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