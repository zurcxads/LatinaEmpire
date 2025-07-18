import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, Search, Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

import { useQuery } from "@tanstack/react-query";
import { ambassadorsService } from "@/lib/ambassadorsService";
import { Ambassador } from "@/lib/types";

const AmbassadorCard = ({ ambassador }: { ambassador: Ambassador }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg group">
      <div className="relative h-80 overflow-hidden">
        <img 
          src={ambassador.image} 
          alt={ambassador.name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.classList.add("hidden");
            e.currentTarget.parentElement?.classList.add("placeholder-image");
          }}
        />
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
          <MapPin className="h-3 w-3 mr-1 text-magenta" />
          <span className="text-xs font-medium text-gray-800">{ambassador.location}, {ambassador.country}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl mb-1 text-gray-900 group-hover:text-magenta transition-colors">{ambassador.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{ambassador.title}</p>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-100 border border-magenta/30 flex items-center justify-center mr-2">
            <Star className="h-4 w-4 text-magenta" />
          </div>
          <p className="text-sm text-gray-700 italic">"{ambassador.quote}"</p>
        </div>
        <p className="font-sans text-gray-600 mb-4 line-clamp-3">
          {ambassador.shortBio}
        </p>
        <Link href={`/ambassadors/${ambassador.slug}`}>
          <Button className="w-full bg-white border border-magenta hover:bg-magenta hover:text-white text-magenta transition-all flex items-center justify-center">
            View Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Loading skeleton for ambassador cards
const AmbassadorCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md animate-pulse">
    <div className="h-80 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-3 w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-200 mr-2 border border-gray-300"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-4 w-4/5"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const Ambassadors = () => {
  // Fetch ambassadors data with React Query
  const { data: ambassadors, isLoading, isError } = useQuery({
    queryKey: ['/api/ambassadors'],
    queryFn: ambassadorsService.getAllAmbassadors,
  });

  // No filter needed as search is removed
  const filteredAmbassadors = ambassadors;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-center bg-cover bg-black" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/ambassadors-hero.jpg")' }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Global Network</span>
            </div>
            <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6 text-white">Meet Our Ambassadors</h1>
            <p className="font-sans text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Powerful Latinas leading the Empire movement across the globe, creating impact and transforming communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-magenta text-white hover:bg-magenta/90 rounded-full px-8 shadow-[0_0_15px_rgba(242,56,137,0.4)]">
                Join The Network
              </Button>
              <Button className="bg-transparent text-white border border-white hover:bg-white/10 rounded-full px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ambassadors Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-serif font-bold text-2xl text-black mb-4">Our Global Community</h2>
            <div className="w-20 h-1 bg-magenta mx-auto mb-4"></div>
            <p className="text-black/70">
              Discover our network of ambassadors leading the Latina Empire movement across the globe
            </p>
          </div>
          
          {isLoading ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <AmbassadorCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            // Error state
            <div className="text-center py-12 border border-red-200 rounded-lg p-8 bg-red-50 shadow-md">
              <h3 className="font-serif font-semibold text-xl mb-2 text-red-600">Unable to Load Ambassadors</h3>
              <p className="text-gray-700 mb-4">
                We're having trouble loading our ambassadors. Please refresh the page or check back later.
              </p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-white text-red-600 hover:bg-red-50 border border-red-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
            </div>
          ) : filteredAmbassadors && filteredAmbassadors.length > 0 ? (
            // Display ambassadors
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAmbassadors.map((ambassador: Ambassador) => (
                <AmbassadorCard key={ambassador.id} ambassador={ambassador} />
              ))}
            </div>
          ) : (
            // No ambassadors available
            <div className="text-center py-12 border border-gray-200 rounded-lg p-8 bg-gray-50 shadow-md">
              <h3 className="font-serif font-semibold text-xl mb-2 text-gray-800">No Ambassadors Yet</h3>
              <p className="text-gray-600 mb-4">
                We're in the process of adding our ambassadors. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Join as Ambassador CTA */}
      <section className="py-20 bg-center bg-cover bg-black" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/ambassador-cta-bg.jpg")' }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Join Our Movement</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 text-white">Become a Latina Empire Ambassador</h2>
            <p className="font-sans text-white/80 mb-8 max-w-2xl mx-auto">
              Are you passionate about empowering Latinas in your community? Join our global network of ambassadors and lead the movement in your region.
            </p>
            <Button className="bg-magenta hover:bg-magenta/90 text-white px-8 py-6 h-auto rounded-full text-lg shadow-[0_0_20px_rgba(242,56,137,0.4)]">
              Apply Now
            </Button>
          </div>
        </div>
      </section>
      

    </div>
  );
};

export default Ambassadors;