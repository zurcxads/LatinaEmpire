import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  }
];

const Testimonial = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 text-center">
            <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">RESULTS</span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6 tracking-tight">
              Success Stories from Our Community
            </h2>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 md:pl-8 lg:pl-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                      <div className="relative">
                        <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-magenta flex items-center justify-center">
                          <Quote className="h-6 w-6 text-white" />
                        </div>
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <blockquote className="font-serif text-2xl md:text-3xl leading-relaxed italic mb-8 text-white/90">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex flex-col">
                          <p className="font-sans font-bold text-lg mb-1">{testimonial.name}</p>
                          <p className="font-sans text-white/70">
                            {testimonial.title}
                            {testimonial.location && (
                              <span> • {testimonial.location}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-10 gap-3">
              <Button
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex gap-1.5 items-center">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      selectedIndex === index 
                        ? 'w-8 bg-magenta' 
                        : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
