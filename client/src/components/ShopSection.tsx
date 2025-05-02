
import React from 'react';
import { Link } from 'wouter';
import { Circle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

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

  return (
    <section className="py-24 bg-[#000000] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center gap-2 justify-center mb-4">
            <span className="uppercase tracking-widest text-sm">SHOP</span>
            <Circle className="w-2 h-2 fill-magenta text-magenta" />
          </div>

          <h2 className="text-5xl md:text-6xl font-serif mb-6">
            Explore products &<br />programs
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Turn any hour of the day into an opportunity for transformation with resources from
            the number one personal development program of all time.
          </p>
        </div>

        <div className="flex items-center gap-6 mb-12 justify-center">
          <Button variant="link" className="text-white hover:text-magenta">All</Button>
          <Button variant="link" className="text-gray-400 hover:text-white">Books</Button>
          <Button variant="link" className="text-gray-400 hover:text-white">Digital</Button>
          <Button variant="link" className="text-gray-400 hover:text-white">Journals</Button>
          <Button variant="link" className="text-gray-400 hover:text-white">Supplements</Button>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/5 border-white/10 transition-transform hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-400 mb-4">${product.price}</p>
                      <Button className="w-full bg-magenta hover:bg-magenta/90">Add to cart</Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 text-white border-white/20" />
            <CarouselNext className="absolute -right-12 text-white border-white/20" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button className="bg-magenta hover:bg-magenta/90 group">
              Shop All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
