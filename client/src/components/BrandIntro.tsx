import { useState } from "react";
import { Users, Crown, Calendar, Star, Target, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import JoinModal from "./JoinModal";
import { getImageSrc } from "@/lib/image-utils";

interface ValueProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const ValueItem = ({ icon, title, description }: ValueProps) => {
  return (
    <div className="group card-base card-hover flex flex-col h-full p-7">
      <div className="mb-5">
        <div className="h-14 w-14 bg-magenta/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-magenta/20 transition-all">
          {icon}
        </div>
        <h3 className="font-serif font-semibold text-xl mb-3">{title}</h3>
      </div>
      <p className="font-sans text-gray-600 leading-relaxed flex-grow">
        {description}
      </p>
    </div>
  );
};

const BrandIntro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const values = [
    {
      icon: <Target className="text-magenta text-2xl" />,
      title: "Purpose",
      description: "Uncover your unique gifts and create a life of meaning aligned with your true calling and Latin heritage."
    },
    {
      icon: <Users className="text-magenta text-2xl" />,
      title: "Community",
      description: "Join a powerful network of like-minded Latinas who lift each other up and provide ongoing support."
    },
    {
      icon: <Crown className="text-magenta text-2xl" />,
      title: "Leadership",
      description: "Develop the confidence and skills to lead in your career, business, and community with authentic power."
    },
    {
      icon: <Calendar className="text-magenta text-2xl" />,
      title: "Growth",
      description: "Access premium coaching and resources designed specifically for the unique challenges Latinas face."
    },
    {
      icon: <Star className="text-magenta text-2xl" />,
      title: "Wealth",
      description: "Build financial independence through proven strategies for creating abundance and generational wealth."
    },
    {
      icon: <HeartHandshake className="text-magenta text-2xl" />,
      title: "Impact",
      description: "Create positive change in your family, community and beyond while honoring your cultural roots."
    }
  ];

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      <section className="section-spacing-large bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">THE ELITE PROGRAM</span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6 tracking-tight">Transform Every Area of Your Life</h2>
            <p className="font-sans text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Latina Empire's Elite Program is a comprehensive coaching system designed to help you achieve extraordinary results in all six dimensions of your life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-16">
            {values.map((value, index) => (
              <ValueItem 
                key={index}
                icon={value.icon} 
                title={value.title} 
                description={value.description}
              />
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="accent-button text-lg px-8 py-3 font-semibold shadow-md"
              size="lg"
            >
              Begin Your Transformation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tony Robbins style image and text split section */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[400px] lg:h-auto" style={{ 
            backgroundImage: `url(${getImageSrc('https://images.unsplash.com/photo-1573164713988-8665321e3075', true)})`, 
            backgroundPosition: 'center', 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat' 
          }}></div>

          <div className="flex items-center justify-center p-10 lg:p-16 xl:p-20">
            <div className="max-w-xl">
              <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-4 block">OUR APPROACH</span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 leading-tight">Latina-Centered Coaching That Gets Results</h2>
              <p className="font-sans text-lg text-gray-700 leading-relaxed mb-8">
                Our methodology combines proven success principles with cultural understanding to address the unique challenges and opportunities Latina professionals face in today's world.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-magenta/10 flex items-center justify-center mt-1 mr-3">
                    <div className="h-2 w-2 rounded-full bg-magenta"></div>
                  </div>
                  <span className="font-sans text-gray-700">Personalized coaching tailored to your specific goals and cultural context</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-magenta/10 flex items-center justify-center mt-1 mr-3">
                    <div className="h-2 w-2 rounded-full bg-magenta"></div>
                  </div>
                  <span className="font-sans text-gray-700">Practical tools and strategies you can implement immediately</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-magenta/10 flex items-center justify-center mt-1 mr-3">
                    <div className="h-2 w-2 rounded-full bg-magenta"></div>
                  </div>
                  <span className="font-sans text-gray-700">Community support from successful Latinas who understand your journey</span>
                </li>
              </ul>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="cta-button"
              >
                Learn More About Our Approach
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandIntro;