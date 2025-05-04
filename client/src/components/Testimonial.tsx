import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

type TestimonialType = {
  quote: string;
  name: string;
  title: string;
  image: string;
  backgroundImage?: string;
};

const testimonials: TestimonialType[] = [
  {
    quote: "I feel on top of the world. I feel incredible, I feel motivated, I feel empowered. I am the master of my own destiny.",
    name: "Maria Menounos",
    title: "Actress & TV Host",
    image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    quote: "I feel on top of the world. I feel incredible, I feel motivated, I feel empowered. I am the master of my own destiny.",
    name: "Klay Thompson",
    title: "Professional Basketball Player",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    quote: "I feel on top of the world. I feel incredible, I feel motivated, I feel empowered. I am the master of my own destiny.",
    name: "Mark Benioff",
    title: "Founder, CEO of Salesforce",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    quote: "I feel on top of the world. I feel incredible, I feel motivated, I feel empowered. I am the master of my own destiny.",
    name: "Serena Williams",
    title: "Professional Tennis Player",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000); // Change testimonial every 6 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleProfileClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #9b4f96 0%, #f2709c 100%)" // Purple to pinkish gradient as seen in the image
      }}
    >
      {/* Background image - person's face */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40" />
        <div className="absolute inset-0">
          <img 
            src={activeTestimonial.backgroundImage || activeTestimonial.image} 
            alt=""
            className="w-full h-full object-cover object-center opacity-40"
          />
        </div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 flex flex-col items-center justify-center">
        {/* Quote */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            "{activeTestimonial.quote}"
          </p>
        </div>

        {/* Profile selector */}
        <div className={cn(
          "flex gap-4 md:gap-12 justify-center items-center mt-auto",
          isMobile ? "flex-row" : "flex-row"
        )}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                onClick={() => handleProfileClick(index)}
                className={cn(
                  "group transition-all duration-300 relative",
                  index === activeIndex ? "scale-110" : "opacity-70 hover:opacity-100"
                )}
              >
                <div className={cn(
                  "w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2",
                  index === activeIndex ? "border-white" : "border-transparent group-hover:border-white/50"
                )}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
              
              {/* Name and title - only visible for active testimonial */}
              <div className={cn(
                "text-center mt-2 transition-opacity duration-300",
                index === activeIndex ? "opacity-100" : "opacity-0 md:opacity-70"
              )}>
                <p className="text-white font-medium text-sm md:text-base">{testimonial.name}</p>
                <p className="text-white/80 text-xs md:text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
