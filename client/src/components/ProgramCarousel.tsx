import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import JoinModal from "./JoinModal";

interface Program {
  id: string;
  name: string;
  description: string;
  image: string;
}

const programs: Program[] = [
  {
    id: "1",
    name: "Latina Empire ELITE",
    description: "Our flagship 12-week transformational coaching program for Latina professionals",
    image: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: "2",
    name: "Financial Freedom Bootcamp",
    description: "Master your finances and build generational wealth with our intensive 6-week program",
    image: "https://images.unsplash.com/photo-1589666564459-88c808771d5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: "3",
    name: "Business Accelerator",
    description: "Launch and scale your business with our comprehensive entrepreneurship program",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];

const ProgramCard = ({ program, onClick }: { program: Program; onClick: () => void }) => {
  return (
    <div 
      className="relative h-[500px] w-full overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={program.image} 
        alt={program.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h3 className="text-white font-serif font-bold text-2xl md:text-3xl mb-2">{program.name}</h3>
          <p className="text-white/80 mb-6">{program.description}</p>
          <Button className="bg-white text-black hover:bg-gray-100 rounded-full font-semibold px-6 py-2">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProgramCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
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
  
  const handleProgramClick = () => {
    setIsModalOpen(true);
  };
  
  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <section className="bg-black py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-magenta uppercase tracking-wider font-sans font-semibold text-sm mb-3 block">OUR PROGRAMS</span>
            <h2 className="text-white font-serif font-bold text-4xl md:text-5xl mb-6">Transform Your Life</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Choose from our signature programs designed to help you reach your highest potential in business and life.
            </p>
          </div>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {programs.map((program) => (
                <div key={program.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] lg:flex-[0_0_33.333%] px-4">
                  <ProgramCard program={program} onClick={handleProgramClick} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {programs.map((_, index) => (
              <button
                key={index}
                className={`h-3 rounded-full transition-all ${
                  selectedIndex === index ? 'w-10 bg-magenta' : 'w-3 bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProgramCarousel;