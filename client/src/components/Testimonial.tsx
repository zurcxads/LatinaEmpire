import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type TestimonialType = {
  quote: string;
  name: string;
  title: string;
  image: string;
  location?: string;
};

const testimonials: TestimonialType[] = [
  {
    quote: "Joining Latina Empire transformed not just my career, but my entire perspective on what's possible. The coaching and community gave me the confidence to launch my own business.",
    name: "Maria Rodriguez",
    title: "CEO & Founder",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    quote: "The Elite Program helped me break through limiting beliefs that were holding me back for years. I've doubled my income and now lead a team of 20 people in my organization.",
    name: "Isabella Martinez",
    title: "Marketing Director",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    quote: "As a first-generation Latina professional, I often felt caught between two worlds. The program helped me embrace my cultural identity as a strength in my career and leadership journey.",
    name: "Sofia Perez",
    title: "Attorney",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    quote: "The network I've built through Latina Empire has been invaluable. I've connected with mentors who've helped me navigate corporate leadership as a Latina executive.",
    name: "Ana Gomez",
    title: "VP of Operations",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    quote: "The digital community has been my safe space to share challenges and celebrate wins with women who truly understand my journey.",
    name: "Carmen Diaz",
    title: "Tech Entrepreneur",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialType }) => {
  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden h-full border-0 hover:shadow-lg transition-all duration-300">
      <div className="p-6 flex flex-col h-full">
        <div className="relative mb-4">
          <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-magenta flex items-center justify-center">
            <Quote className="h-5 w-5 text-white" />
          </div>
          <div className="pt-2 pl-10">
            <p className="text-gray-700 italic leading-relaxed line-clamp-4">"{testimonial.quote}"</p>
          </div>
        </div>
        
        <div className="mt-auto flex items-center pt-4">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base">{testimonial.name}</h4>
            <div className="text-gray-600 text-sm">
              {testimonial.title}
              {testimonial.location && (
                <span> • {testimonial.location}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Testimonial = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!api) return;
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
            TESTIMONIALS
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-5xl mb-4 tracking-tight">
            What Our Members Say
          </h2>
          <p className="text-gray-600 text-lg">
            Real stories from women transforming their lives with Latina Empire.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem 
                  key={index} 
                  className={cn(
                    "pl-4 md:basis-1/2 lg:basis-1/3",
                    isMobile ? "basis-full" : ""
                  )}
                >
                  <div className="p-1 h-full">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex items-center justify-center mt-8 space-x-2">
              <CarouselPrevious className="static transform-none h-9 w-9 rounded-full border-gray-300 hover:bg-gray-200" />
              
              <div className="flex space-x-1">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all",
                      current === i ? "bg-magenta scale-125" : "bg-gray-300"
                    )}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              
              <CarouselNext className="static transform-none h-9 w-9 rounded-full border-gray-300 hover:bg-gray-200" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
