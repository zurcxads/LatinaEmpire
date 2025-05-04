
import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Circle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi, useCarousel } from './ui/carousel';

const ShopSection = () => {
  const products = [
    {
      name: 'Empire Journal',
      price: 24.99,
      image: '/empire-journal.jpg'
    },
    {
      name: 'Heart Mind Money Tee',
      price: 32.99,
      image: '/heart-mind-tee.jpg'
    },
    {
      name: 'Latina Empowerment Planner',
      price: 29.99,
      image: '/planner.jpg'
    },
    {
      name: 'Empire Water Bottle',
      price: 18.99,
      image: '/water-bottle.jpg'
    }
  ];

  // State to track the current slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // Update current slide when carousel changes
  useEffect(() => {
    if (!carouselApi) return;

    const onChange = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() || 0);
    };

    carouselApi.on("select", onChange);
    return () => {
      carouselApi.off("select", onChange);
    };
  }, [carouselApi]);

  return (
    <section className="py-24 bg-[#000000] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center gap-2 justify-center mb-4">
            <Circle className="w-2 h-2 fill-magenta text-magenta" />
            <span className="uppercase tracking-widest text-sm">SHOP</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-serif mb-6">
            Explore products &<br />programs
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Turn any hour of the day into an opportunity for transformation with resources from
            the number one personal development program of all time.
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-6 mb-12 justify-between flex-wrap">
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <Button variant="link" className="text-white hover:text-gray-200 px-2 md:px-4 font-medium">All</Button>
            <Button variant="link" className="text-gray-400 hover:text-white px-2 md:px-4 font-medium">Books</Button>
            <Button variant="link" className="text-gray-400 hover:text-white px-2 md:px-4 font-medium">Digital</Button>
            <Button variant="link" className="text-gray-400 hover:text-white px-2 md:px-4 font-medium">Journals</Button>
            <Button variant="link" className="text-gray-400 hover:text-white px-2 md:px-4 font-medium">Supplements</Button>
          </div>
          
          <Link href="/shop" className="text-magenta hover:text-magenta/80 flex items-center gap-1 transition-colors duration-200 font-medium">
            Shop All
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
            setApi={setCarouselApi}
          >
            <CarouselContent className="-ml-4">
              {products.map((product, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 transition-transform hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="relative mb-4 rounded-lg overflow-hidden aspect-square">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.classList.add("hidden");
                            e.currentTarget.parentElement?.classList.add("placeholder-image");
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
                      <p className="text-gray-400 mb-4">${product.price}</p>
                      <Button className="w-full primary-button justify-center">Add to cart</Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Carousel Progress Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide % products.length 
                    ? "w-6 bg-magenta" 
                    : "w-3 bg-gray-600 hover:bg-gray-500"
                }`}
                onClick={() => carouselApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
