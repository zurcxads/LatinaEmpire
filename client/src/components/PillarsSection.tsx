import { useState } from "react";
import { Heart, Brain, DollarSign, ChevronRight, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface PillarData {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
}

const pillars: PillarData[] = [
  {
    id: "heart",
    icon: <Heart className="h-8 w-8 text-magenta" />,
    title: "Heart",
    description: "Emotional healing and self-worth development for powerful Latinas.",
    imageUrl: "https://images.unsplash.com/photo-1523251343397-9225e4cb6319?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "mind",
    icon: <Brain className="h-8 w-8 text-magenta" />,
    title: "Mind",
    description: "Leadership, mindset, and clarity to maximize your potential.",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "money",
    icon: <DollarSign className="h-8 w-8 text-magenta" />,
    title: "Money",
    description: "Wealth, entrepreneurship, and financial literacy for legacy building.",
    imageUrl: "https://images.unsplash.com/photo-1589666564459-93cdd3ab856a?q=80&w=1000&auto=format&fit=crop"
  }
];

const PillarCard = ({ pillar }: { pillar: PillarData }) => {
  return (
    <div className="card-base card-hover group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={pillar.imageUrl} 
          alt={`${pillar.title} Pillar`} 
          className="card-image"
        />
        <div className="card-text-overlay" />
        <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-full">
          {pillar.icon}
        </div>
      </div>
      <div className="card-content flex-1 flex flex-col bg-white">
        <h3 className="font-serif text-2xl font-bold mb-2">{pillar.title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{pillar.description}</p>
        <Button asChild className="cta-button mt-auto w-full justify-center">
          <Link href={`/programs/${pillar.id.toLowerCase()}`}>
            Explore {pillar.title}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const PillarsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className="section-spacing bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-magenta"></div>
            <span className="font-sans uppercase tracking-wider text-gray-600 font-semibold text-sm">
              OUR METHODOLOGY
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            The Three Pillars of Latina Empire
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our comprehensive approach to transformation focuses on these three core pillars that work together to create extraordinary results in your life.
          </p>
        </div>
        
        {/* Pillar cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {pillars.map(pillar => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
        
        {/* CTA row */}
        <div className="flex justify-center mt-8">
          <Button asChild className="cta-button">
            <Link href="/programs">
              Explore All Programs <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;