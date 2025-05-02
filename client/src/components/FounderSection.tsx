import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const FounderSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="flex flex-col">
            <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
              LEADERSHIP
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight">
              Meet Our Founder
            </h2>
            <h3 className="font-serif text-xl md:text-2xl mb-5 text-gray-700">
              Perla Tamez Casasnovas
            </h3>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-600 leading-relaxed">
                Born and raised in Hidalgo, TX, Perla Tamez Casasnovas transformed her passion for empowering Latina women into the thriving Latina Empire community. As a first-generation entrepreneur, she understands firsthand the unique challenges Latinas face in building wealth and creating impact.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through her innovative Heart-Mind-Money method, Perla has guided thousands of women to embrace their cultural identity as a strength while building businesses, advancing their careers, and creating generational wealth.
              </p>
            </div>
            
            <div>
              <Button 
                asChild
                className="bg-magenta hover:bg-magenta/90 text-white rounded-full px-6 py-6 h-auto font-medium text-base"
              >
                <Link href="/about-founder">
                  Learn More About Perla
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl h-full">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80"
                alt="Perla Tamez Casasnovas, Founder of Latina Empire" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Optional decorative element */}
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-magenta/10 rounded-full hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;