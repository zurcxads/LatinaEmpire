import { useEffect, useState } from "react";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

interface CarouselImage {
  src: string;
  alt: string;
}

const ImpactCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const images: CarouselImage[] = [
    {
      src: "https://images.pexels.com/photos/7648046/pexels-photo-7648046.jpeg",
      alt: "Perla Tamez Casasnovas mentoring a group of Latina professionals"
    },
    {
      src: "https://images.pexels.com/photos/6325903/pexels-photo-6325903.jpeg",
      alt: "Perla organizing a charity drive for local communities"
    },
    {
      src: "https://images.pexels.com/photos/8191964/pexels-photo-8191964.jpeg",
      alt: "Perla speaking at a Latina empowerment conference"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex overflow-hidden relative rounded-xl h-[300px] md:h-[400px]">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img 
                src={getImageSrc(image.src, true)} 
                alt={image.alt} 
                className="w-full h-full object-cover rounded-xl"
                onError={createImageErrorHandler()}
              />
            </div>
          ))}
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactCarousel;