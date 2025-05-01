import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, Search, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { ambassadorsService } from "@/lib/ambassadorsService";
import { Ambassador } from "@/lib/types";

const AmbassadorCard = ({ ambassador }: { ambassador: typeof ambassadors[0] }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md group">
      <div className="relative h-80 overflow-hidden">
        <img 
          src={ambassador.image} 
          alt={ambassador.name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
          <MapPin className="h-3 w-3 mr-1 text-magenta" />
          <span className="text-xs font-medium">{ambassador.location}, {ambassador.country}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl mb-1 group-hover:text-magenta transition-colors">{ambassador.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{ambassador.title}</p>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center mr-2">
            <Star className="h-4 w-4 text-magenta" />
          </div>
          <p className="text-sm text-gray-700 italic">"{ambassador.quote}"</p>
        </div>
        <p className="font-sans text-gray-600 mb-4 line-clamp-3">
          {ambassador.shortBio}
        </p>
        <Link href={`/ambassadors/${ambassador.slug}`}>
          <Button className="w-full bg-white text-magenta border-2 border-magenta hover:bg-magenta hover:text-white transition-all flex items-center justify-center">
            View Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Ambassadors = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAmbassadors = ambassadors.filter(ambassador => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      ambassador.name.toLowerCase().includes(searchTerm) ||
      ambassador.location.toLowerCase().includes(searchTerm) ||
      ambassador.country.toLowerCase().includes(searchTerm) ||
      ambassador.title.toLowerCase().includes(searchTerm) ||
      ambassador.expertise.some(e => e.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6">Meet Our Ambassadors</h1>
            <p className="font-sans text-lg text-gray-700 mb-8">
              Powerful Latinas leading the Empire movement across the globe.
            </p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search ambassadors by name, location, or expertise..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Ambassadors Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {filteredAmbassadors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAmbassadors.map((ambassador) => (
                <AmbassadorCard key={ambassador.id} ambassador={ambassador} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="font-serif font-semibold text-xl mb-2">No ambassadors found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria to find our amazing ambassadors.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Join as Ambassador CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl mb-4">Become an Ambassador</h2>
            <p className="font-sans text-gray-700 mb-8 max-w-2xl mx-auto">
              Are you passionate about empowering Latinas in your community? Join our global network of ambassadors and lead the movement in your region.
            </p>
            <Button className="bg-magenta text-white px-8 py-6 h-auto rounded text-lg hover:bg-opacity-90 shadow-md">
              Apply Now
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Ambassadors;