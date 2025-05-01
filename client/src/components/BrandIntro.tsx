import { Users, Crown, Calendar } from "lucide-react";

interface PillarProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const Pillar = ({ icon, title, description }: PillarProps) => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="h-16 w-16 bg-magenta-light rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="font-serif font-semibold text-xl mb-4 text-center">{title}</h3>
      <p className="font-sans text-gray-600 leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
};

const BrandIntro = () => {
  const pillars = [
    {
      icon: <Users className="text-magenta text-2xl" />,
      title: "Free Community",
      description: "Connect with like-minded Latinas in our supportive online community, sharing resources and inspiration."
    },
    {
      icon: <Crown className="text-magenta text-2xl" />,
      title: "Elite Program",
      description: "Transform your life with our premium coaching and personalized development pathways."
    },
    {
      icon: <Calendar className="text-magenta text-2xl" />,
      title: "In-Person Events",
      description: "Experience transformational gatherings with powerful speakers and meaningful connections."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Our Vision</h2>
          <p className="font-sans text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
            Latina Empire is a global sisterhood empowering Latinas through a free community, premium coaching, and real-world events.
          </p>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <Pillar 
                key={index}
                icon={pillar.icon} 
                title={pillar.title} 
                description={pillar.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandIntro;
