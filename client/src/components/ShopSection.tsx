
import React from 'react';
import { Link } from 'wouter';
import { Circle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const ShopSection = () => {
  return (
    <section className="py-24 bg-[#000000] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 justify-center mb-4">
          <span className="uppercase tracking-widest text-sm">SHOP</span>
          <Circle className="w-2 h-2 fill-magenta text-magenta" />
        </div>
        
        <h2 className="text-5xl md:text-6xl text-center font-serif mb-6">
          Explore products &<br />programs
        </h2>
        
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          Turn any hour of the day into an opportunity for transformation with resources from
          the number one personal development program of all time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <img src="/empire-journal.jpg" alt="Empire Journal" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Empire Journal</h3>
              <p className="text-gray-400 mb-4">$24.99</p>
              <Button className="w-full bg-magenta hover:bg-magenta/90">Add to cart</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <img src="/heart-mind-tee.jpg" alt="Heart Mind Money Tee" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Heart Mind Money Tee</h3>
              <p className="text-gray-400 mb-4">$32.99</p>
              <Button className="w-full bg-magenta hover:bg-magenta/90">Add to cart</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <img src="/planner.jpg" alt="Latina Empowerment Planner" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Latina Empowerment Planner</h3>
              <p className="text-gray-400 mb-4">$29.99</p>
              <Button className="w-full bg-magenta hover:bg-magenta/90">Add to cart</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <img src="/water-bottle.jpg" alt="Empire Water Bottle" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Empire Water Bottle</h3>
              <p className="text-gray-400 mb-4">$18.99</p>
              <Button className="w-full bg-magenta hover:bg-magenta/90">Add to cart</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button variant="outline" className="border-white/20 hover:bg-white/5">
              Visit the Shop
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
