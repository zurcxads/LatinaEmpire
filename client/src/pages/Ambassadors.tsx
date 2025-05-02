import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, Search, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { ambassadorsService } from "@/lib/ambassadorsService";
import { Ambassador } from "@/lib/types";

const AmbassadorCard = ({ ambassador }: { ambassador: Ambassador }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md group">
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

// Loading skeleton for ambassador cards
const AmbassadorCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse">
    <div className="h-80 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-3 w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-300 mr-2"></div>
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
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch ambassadors data with React Query
  const { data: ambassadors, isLoading, isError } = useQuery({
    queryKey: ['/api/ambassadors'],
    queryFn: ambassadorsService.getAllAmbassadors,
  });

  // Filter ambassadors based on search query
  const filteredAmbassadors = ambassadors && searchQuery 
    ? ambassadors.filter((ambassador: Ambassador) => {
        const searchTerm = searchQuery.toLowerCase();
        return (
          ambassador.name.toLowerCase().includes(searchTerm) ||
          ambassador.location.toLowerCase().includes(searchTerm) ||
          ambassador.country.toLowerCase().includes(searchTerm) ||
          ambassador.title.toLowerCase().includes(searchTerm) ||
          ambassador.expertise.some((e: string) => e.toLowerCase().includes(searchTerm))
        );
      })
    : ambassadors;

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
          {isLoading ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <AmbassadorCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            // Error state
            <div className="text-center py-12 bg-red-50 rounded-lg p-8">
              <h3 className="font-serif font-semibold text-xl mb-2 text-red-600">Unable to Load Ambassadors</h3>
              <p className="text-gray-700 mb-4">
                We're having trouble loading our ambassadors. Please refresh the page or check back later.
              </p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-white text-magenta border-2 border-magenta hover:bg-magenta/10"
              >
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
          ) : searchQuery ? (
            // No search results
            <div className="text-center py-12 bg-gray-50 rounded-lg p-8">
              <h3 className="font-serif font-semibold text-xl mb-2">No Ambassadors Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any ambassadors matching your search criteria. Try different keywords.
              </p>
              <Button 
                onClick={() => setSearchQuery("")}
                className="bg-white text-magenta border-2 border-magenta hover:bg-magenta/10"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            // No ambassadors available
            <div className="text-center py-12 bg-gray-50 rounded-lg p-8">
              <h3 className="font-serif font-semibold text-xl mb-2">No Ambassadors Yet</h3>
              <p className="text-gray-600 mb-4">
                We're in the process of adding our ambassadors. Check back soon!
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