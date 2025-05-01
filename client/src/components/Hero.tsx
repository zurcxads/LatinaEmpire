import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero-image h-screen flex items-center justify-center text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
          Elevate Your Potential<br />Embrace Your Power
        </h1>
        <p className="font-sans text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-10">
          Join the movement of ambitious Latinas transforming their lives through community, coaching, and real-world connections.
        </p>
        <Button 
          className="bg-magenta text-white px-8 py-6 rounded font-sans font-semibold text-base hover:bg-opacity-90 inline-flex items-center shadow-lg h-auto"
          size="lg"
        >
          Begin Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
