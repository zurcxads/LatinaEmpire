import { Brain, DollarSign, Trophy, Landmark } from "lucide-react";

type PillarProps = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const PillarCard = ({ icon, title, description }: PillarProps) => {
  return (
    <div className="bg-white p-8 rounded-lg hover:shadow-xl transition-all duration-300 text-center">
      <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-serif font-bold text-xl mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const PillarsSection = () => {
  const pillars = [
    {
      icon: <Brain className="h-8 w-8 text-magenta" />,
      title: "Mindset",
      description: "Develop a growth mindset and break through limiting beliefs that hold you back."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-magenta" />,
      title: "Wealth",
      description: "Build financial freedom through proven strategies for generating abundance."
    },
    {
      icon: <Trophy className="h-8 w-8 text-magenta" />,
      title: "Leadership",
      description: "Cultivate the confidence and skills to lead with impact in any environment."
    },
    {
      icon: <Landmark className="h-8 w-8 text-magenta" />,
      title: "Legacy",
      description: "Create a lasting impact that extends beyond you to future generations."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
            THE FRAMEWORK
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6">
            Pillars for an Empowered Latina Life
          </h2>
          <p className="text-gray-600 text-lg">
            Our comprehensive approach addresses the fundamental areas that lead to lasting fulfillment and success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={index}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;