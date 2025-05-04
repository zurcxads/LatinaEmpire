import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const QuizSection = () => {
  const [isStarted, setIsStarted] = useState(false);
  
  return (
    <section className="py-16 md:py-24 text-white relative overflow-hidden">
      {/* Background image and overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
          alt="Motivational background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {!isStarted ? (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-black text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight tracking-tight">
              Master every<br />
              area of your life
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
              Close the gap between where you are and where you want 
              to be with Latina Empire's scientifically proven system.
            </p>
            
            <Button 
              onClick={() => setIsStarted(true)}
              className="primary-button py-3 px-8 text-lg"
            >
              Start now
            </Button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <h3 className="font-serif font-bold text-3xl mb-8 text-center">
              What area of your life would you like to transform?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuizOption
                title="Career & Business"
                description="Find purpose in your work and achieve financial freedom"
                link="/join?area=career"
              />
              <QuizOption
                title="Health & Vitality"
                description="Create lasting energy and physical wellbeing"
                link="/join?area=health"
              />
              <QuizOption
                title="Relationships"
                description="Build deeper connections with family and loved ones"
                link="/join?area=relationships"
              />
              <QuizOption
                title="Personal Growth"
                description="Discover your purpose and live with passion"
                link="/join?area=growth"
              />
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={() => setIsStarted(false)}
                variant="link"
                className="text-white/70 hover:text-white"
              >
                Go back
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const QuizOption = ({ title, description, link }: { title: string, description: string, link: string }) => {
  return (
    <Link href={link}>
      <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl cursor-pointer transition-all duration-300">
        <h4 className="font-serif font-bold text-xl mb-2">{title}</h4>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default QuizSection;