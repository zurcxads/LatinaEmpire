
import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Circle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi, useCarousel } from './ui/carousel';
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

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
    <section className="py-12 sm:py-16 md:py-20 bg-[#000000] text-white">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="flex items-center gap-2 justify-center mb-3 sm:mb-4">
            <Circle className="w-2 h-2 fill-magenta text-magenta" />
            <span className="uppercase tracking-widest text-sm">SHOP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6 leading-tight">
            Explore products &<br />programs
          </h2>

          <p className="text-gray-400 max-w-xs sm:max-w-md md:max-w-2xl mx-auto text-sm sm:text-base">
            Turn any hour of the day into an opportunity for transformation with resources from
            the number one personal development program of all time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12 sm:justify-between">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-wrap">
            <Button variant="link" className="text-white hover:text-gray-200 px-1 sm:px-2 md:px-4 font-medium text-sm sm:text-base">All</Button>
            <Button variant="link" className="text-gray-400 hover:text-white px-1 sm:px-2 md:px-4 font-medium text-sm sm:text-base">Books</Button>
            <Button variant="link" className="text-gray-400 hover:text-white px-1 sm:px-2 md:px-4 font-medium text-sm sm:text-base">Digital</Button>
            <Button variant="link" className="text-gray-400 hover:text-white px-1 sm:px-2 md:px-4 font-medium text-sm sm:text-base">Journals</Button>
            <Button variant="link" className="text-gray-400 hover:text-white px-1 sm:px-2 md:px-4 font-medium text-sm sm:text-base">Supplements</Button>
          </div>
          
          <Link href="/shop" className="text-magenta hover:text-magenta/80 flex items-center gap-1 transition-colors duration-200 font-medium ml-1 sm:ml-0">
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
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 transition-transform hover:-translate-y-1 h-full">
                    <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
                      <div className="relative mb-3 sm:mb-4 rounded-lg overflow-hidden aspect-square">
                        <img 
                          src={getImageSrc(product.image, true)} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          onError={createImageErrorHandler()}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 text-white h-12 sm:h-14 line-clamp-2">{product.name}</h3>
                        <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">${product.price}</p>
                      </div>
                      <Button className="w-full primary-button justify-center mt-auto text-sm sm:text-base py-2 sm:py-3">Add to cart</Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
{/* Carousel dots removed as requested */}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
