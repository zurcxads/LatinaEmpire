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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Empty space for nav bar */}
        <div className="h-16 w-full absolute top-0 left-0 z-20"></div>
        
        {/* Container with padding for rounded corners */}
        <div className="absolute inset-x-8 top-24 bottom-8 rounded-3xl overflow-hidden z-0">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
          <img 
            src="https://images.pexels.com/photos/8850755/pexels-photo-8850755.jpeg"
            alt="Women supporting each other"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.pexels.com/photos/6592589/pexels-photo-6592589.jpeg";
            }}
          />
        </div>
        
        {/* Radial gradients for depth and visual interest */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f23889,_transparent)] opacity-20 z-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#140a1f,_transparent)] opacity-40 z-30 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-50 pt-20 md:pt-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-8">
              <Heart className="h-4 w-4 text-magenta fill-magenta" />
              <span className="text-sm uppercase tracking-wider font-medium text-white">Heart-Mind-Money Foundation</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
              Invest in Her Power
            </h1>
            
            <p className="font-sans text-lg md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Support the Heart-Mind-Money Foundation and fund scholarships for Latinas building wealth, peace, and purpose.
            </p>
            
            <Button className="bg-white text-black hover:bg-white/90 hover:text-magenta rounded-full px-10 py-6 h-auto text-lg transition-all shadow-xl hover:shadow-magenta/30">
              Donate Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Foundation Mission Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-magenta/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left image or illustration */}
              <div className="lg:w-1/2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-magenta/40 to-transparent z-10"></div>
                  <img 
                    src="https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg"
                    alt="Latina women collaborating"
                    className="w-full aspect-[4/3] object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/7713177/pexels-photo-7713177.jpeg";
                    }}
                  />
                  
                  {/* Heart icon overlay */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md rounded-full p-6 shadow-xl">
                    <Heart className="w-16 h-16 text-magenta fill-magenta/20" />
                  </div>
                </div>
              </div>
              
              {/* Right text content */}
              <div className="lg:w-1/2">
                <div className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
                  <span className="text-xs uppercase tracking-wider font-medium text-magenta">Foundation Mission</span>
                </div>
                
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 tracking-tight">Why It Matters</h2>
                
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  The Latina Empire Foundation funds access to life-changing leadership programs for women who are ready, but financially limited. Every contribution goes directly to scholarships.
                </p>
                
                <p className="text-lg text-gray-600 mb-8">
                  Every contribution creates ripples of change, transforming not just individual lives but entire communities through the power of educated, confident Latina leaders.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CircleCheck className="h-5 w-5 text-magenta mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Supports women-led community initiatives</p>
                  </div>
                  <div className="flex items-start">
                    <CircleCheck className="h-5 w-5 text-magenta mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Provides career advancement resources</p>
                  </div>
                  <div className="flex items-start">
                    <CircleCheck className="h-5 w-5 text-magenta mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Increases leadership representation</p>
                  </div>
                  <div className="flex items-start">
                    <CircleCheck className="h-5 w-5 text-magenta mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Creates intergenerational prosperity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Stats Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-magenta/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-magenta/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs uppercase tracking-wider font-medium text-magenta">Our Impact</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-5 tracking-tight">
              Creating Ripples of Change
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Since our founding, we've grown our impact exponentially, reaching across borders to transform lives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Impact Stat Cards */}
            <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-center hover:-translate-y-1 border border-gray-100">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-magenta to-magenta/70 rounded-full flex items-center justify-center shadow-md mb-6 group-hover:shadow-magenta/30 transition-all">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-2 group-hover:text-magenta transition-colors">1,000+</h3>
              <p className="text-gray-700 font-medium">Scholarships Awarded</p>
            </div>
            
            <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-center hover:-translate-y-1 border border-gray-100">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-magenta to-magenta/70 rounded-full flex items-center justify-center shadow-md mb-6 group-hover:shadow-magenta/30 transition-all">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-2 group-hover:text-magenta transition-colors">30+</h3>
              <p className="text-gray-700 font-medium">Cities Impacted</p>
            </div>
            
            <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-center hover:-translate-y-1 border border-gray-100">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-magenta to-magenta/70 rounded-full flex items-center justify-center shadow-md mb-6 group-hover:shadow-magenta/30 transition-all">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-2 group-hover:text-magenta transition-colors">100%</h3>
              <p className="text-gray-700 font-medium">Proceeds to Programs</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Testimonial Quote Block */}
      <section className="relative py-24 bg-black text-white overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f23889,_transparent)] opacity-15 z-20"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-30">
          <div className="max-w-4xl mx-auto flex flex-col items-center relative">
            {/* Large quote marks */}
            <div className="absolute top-0 left-0 text-magenta/20 font-serif text-[120px] leading-none -translate-x-1/2 -translate-y-1/3">
              "
            </div>
            <div className="absolute bottom-0 right-0 text-magenta/20 font-serif text-[120px] leading-none translate-x-1/2 translate-y-1/3 rotate-180">
              "
            </div>
            
            <p className="text-xl md:text-3xl font-serif text-center leading-relaxed mb-12 italic">
              "This program changed my life. I wouldn't have been able to join without a scholarship. Now I have the confidence to lead others and build generational wealth for my family."
            </p>
            
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-magenta mr-4">
                <img 
                  src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Heart-Mind-Money Graduate"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/placeholder-image.png";
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-white">Elena Fuentes</h4>
                <p className="text-magenta text-sm">Heart-Mind-Money Graduate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Success Stories Carousel */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-magenta/5 rounded-full -translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-magenta/5 rounded-full translate-y-1/2 translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
                <span className="text-xs uppercase tracking-wider font-medium text-magenta">Success Stories</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-5 tracking-tight">
                Lives Transformed
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Meet the women whose lives have been transformed through education and community support.
              </p>
            </div>
            
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
                      <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                        <div className="aspect-[4/3] relative">
                          <img 
                            src={story.image}
                            alt={story.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const idx = index % 3;
                              const fallbackImages = [
                                "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600",
                                "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
                                "https://images.pexels.com/photos/3782164/pexels-photo-3782164.jpeg?auto=compress&cs=tinysrgb&w=600"
                              ];
                              e.currentTarget.src = fallbackImages[idx];
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="font-bold text-xl">{story.name}</h3>
                            <p className="text-white/80 text-sm">{story.location}</p>
                          </div>
                        </div>
                        <div className="p-6 bg-white flex-grow flex flex-col">
                          <p className="italic text-gray-700 mb-6 flex-grow">"<span className="text-magenta">{story.quote}</span>"</p>
                          <Link href="/donate" className="text-magenta font-medium text-sm hover:underline flex items-center self-start mt-auto group">
                            Read full story <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="relative static translate-y-0 mr-2 border-magenta text-magenta hover:bg-magenta hover:text-white" />
                <CarouselNext className="relative static translate-y-0 ml-2 border-magenta text-magenta hover:bg-magenta hover:text-white" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black z-10"></div>
          
          {/* Radial gradient for visual interest */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#f23889,_transparent)] opacity-10 z-20 pointer-events-none"></div>
          
          {/* Background image */}
          <img 
            src="https://images.pexels.com/photos/7048045/pexels-photo-7048045.jpeg"
            alt="Latina Leaders Community"
            className="w-full h-full object-cover absolute inset-0"
            onError={(e) => {
              e.currentTarget.src = "https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg";
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8 text-white leading-tight tracking-tight">
              Plant the Seeds of Legacy and Leadership
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Your contribution today creates a ripple effect that will inspire and enable generations of powerful Latina leaders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-magenta hover:bg-white hover:text-magenta rounded-full px-10 py-6 h-auto text-lg font-medium transition-all shadow-xl text-white hover:shadow-white/30">
                Donate Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent text-white border-2 border-white/50 hover:border-white rounded-full px-10 py-6 h-auto text-lg transition-all">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <p className="mt-12 text-sm text-white/60">
              Latina Empire is a registered 501(c)(3) nonprofit organization. <br/>
              All donations are tax-deductible to the extent allowed by law.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Donate;