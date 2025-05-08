import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Heart, 
  GraduationCap, 
  Globe, 
  CheckCircle, 
  ChevronRight, 
  ArrowRight,
  CircleCheck 
} from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Testimonial card for scholarship recipients
const ScholarshipStory = ({ 
  name, 
  location, 
  image, 
  quote 
}: { 
  name: string; 
  location: string; 
  image: string; 
  quote: string; 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      <div className="aspect-[4/3] relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="font-bold text-xl">{name}</h3>
          <p className="text-white/80 text-sm">{location}</p>
        </div>
      </div>
      <div className="p-6 bg-white flex-grow flex flex-col">
        <p className="italic text-gray-700 mb-4 flex-grow">"{quote}"</p>
        <Link href="/donate" className="text-magenta font-medium text-sm hover:underline flex items-center self-start mt-auto">
          Read full story <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

// Impact stat component
const ImpactStat = ({ 
  icon, 
  value, 
  description
}: { 
  icon: React.ReactNode; 
  value: string; 
  description: string; 
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-magenta/10 rounded-full flex items-center justify-center text-magenta mb-4">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold mb-2">{value}</div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Donate = () => {
  // Sample scholarship recipient stories
  const scholarshipStories = [
    {
      name: "Isabella Morales",
      location: "Dallas, TX",
      image: "/assets/placeholder-image.png",
      quote: "The scholarship was my doorway to opportunity. Now I'm leading a team that amplifies Latina voices across media."
    },
    {
      name: "Camila Rodriguez",
      location: "Miami, FL",
      image: "/assets/placeholder-image.png",
      quote: "Through the program, I gained both the skills and confidence to launch my sustainable fashion business."
    },
    {
      name: "Sofia Garcia",
      location: "Los Angeles, CA",
      image: "/assets/placeholder-image.png",
      quote: "This scholarship didn't just fund my education; it connected me to a network of mentors who continue to guide my career."
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-magenta/40 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
              <Heart className="h-4 w-4 text-magenta fill-magenta" />
              <span className="text-sm font-medium">Heart-Mind-Money Foundation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif mb-6">
              Invest in Her Power
            </h1>
            
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Help provide scholarships that transform lives through the Heart-Mind-Money Programs.
            </p>
            
            <Button className="bg-magenta hover:bg-magenta/90 text-white rounded-full text-lg py-6 px-10">
              Donate Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-magenta/10 rounded-full flex items-center justify-center">
                  <Heart className="w-16 h-16 md:w-24 md:h-24 text-magenta" />
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Mission</h2>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  The Heart-Mind-Money Foundation funds access to education, healing, and leadership. Your donation directly supports women ready to step into their purpose.
                </p>
                <p className="text-lg text-gray-600">
                  Every contribution creates ripples of change, transforming not just individual lives but entire communities through the power of educated, confident Latina leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">Our Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <ImpactStat
                icon={<GraduationCap className="w-8 h-8 md:w-10 md:h-10" />}
                value="1,200+"
                description="Women Trained"
              />
              
              <ImpactStat
                icon={<Globe className="w-8 h-8 md:w-10 md:h-10" />}
                value="20+"
                description="Countries Reached"
              />
              
              <ImpactStat
                icon={<CheckCircle className="w-8 h-8 md:w-10 md:h-10" />}
                value="100%"
                description="of Proceeds to Scholarships"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Success Stories Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">
              Scholarship Success Stories
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Meet the women whose lives have been transformed through education and community support.
            </p>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {scholarshipStories.map((story, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <div className="h-full">
                      <ScholarshipStory {...story} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="relative static translate-y-0 mr-2" />
                <CarouselNext className="relative static translate-y-0 ml-2" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Every dollar plants a seed of generational wealth.
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Your contribution today creates a ripple effect that will inspire and enable generations of powerful Latina leaders.
            </p>
            <Button className="bg-magenta hover:bg-magenta/90 text-white rounded-full text-lg py-6 px-10">
              Donate Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="mt-8 text-sm text-gray-400">
              Latina Empire is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Donate;