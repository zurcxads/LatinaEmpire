import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const FounderSection = () => {
  return (
    <section className="py-12 px-4 md:py-24 md:px-6 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="flex flex-col">
            <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
              VISIONARY
            </span>
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
                className="bg-magenta hover:bg-magenta/90 text-white rounded-full px-6 py-3 h-auto font-medium"
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
                src="https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Perla Tamez Casasnovas, Founder of Latina Empire" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.classList.add("hidden");
                  e.currentTarget.parentElement?.classList.add("placeholder-image");
                }}
              />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-magenta/10 rounded-full hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;