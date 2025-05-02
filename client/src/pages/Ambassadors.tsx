import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, Search, Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { ambassadorsService } from "@/lib/ambassadorsService";
import { Ambassador } from "@/lib/types";

const AmbassadorCard = ({ ambassador }: { ambassador: Ambassador }) => {
  return (
    <div className="bg-black border border-white/10 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group backdrop-blur-sm">
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
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
          <MapPin className="h-3 w-3 mr-1 text-magenta" />
          <span className="text-xs font-medium text-white">{ambassador.location}, {ambassador.country}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl mb-1 text-white group-hover:text-magenta transition-colors">{ambassador.name}</h3>
        <p className="text-sm text-white/60 mb-3">{ambassador.title}</p>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-black border border-magenta/30 flex items-center justify-center mr-2">
            <Star className="h-4 w-4 text-magenta" />
          </div>
          <p className="text-sm text-white/80 italic">"{ambassador.quote}"</p>
        </div>
        <p className="font-sans text-white/60 mb-4 line-clamp-3">
          {ambassador.shortBio}
        </p>
        <Link href={`/ambassadors/${ambassador.slug}`}>
          <Button className="w-full bg-black border border-magenta/50 text-white hover:bg-magenta/20 hover:border-magenta transition-all flex items-center justify-center">
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
  <div className="bg-black border border-white/10 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)] animate-pulse">
    <div className="h-80 bg-white/5"></div>
    <div className="p-6">
      <div className="h-6 bg-white/5 rounded mb-3 w-2/3"></div>
      <div className="h-4 bg-white/5 rounded mb-3 w-1/3"></div>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-white/5 mr-2 border border-white/10"></div>
        <div className="h-4 bg-white/5 rounded w-4/5"></div>
      </div>
      <div className="h-4 bg-white/5 rounded mb-2"></div>
      <div className="h-4 bg-white/5 rounded mb-2"></div>
      <div className="h-4 bg-white/5 rounded mb-4 w-4/5"></div>
      <div className="h-10 bg-white/5 rounded border border-white/10"></div>
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
    <div className="min-h-screen flex flex-col bg-black">
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
      
      {/* Ambassadors Grid with Search */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
              <input
                type="text"
                placeholder="Search ambassadors by name, location, or expertise..."
                className="w-full pl-10 pr-4 py-3 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-magenta focus:border-transparent bg-black/50 text-white shadow-[0_0_10px_rgba(255,255,255,0.03)] backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
            <div className="text-center py-12 border border-red-800 rounded-lg p-8 bg-black shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              <h3 className="font-serif font-semibold text-xl mb-2 text-red-500">Unable to Load Ambassadors</h3>
              <p className="text-white/70 mb-4">
                We're having trouble loading our ambassadors. Please refresh the page or check back later.
              </p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-black text-white hover:bg-red-900/30 border border-red-800"
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
          ) : searchQuery ? (
            // No search results
            <div className="text-center py-12 border border-white/10 rounded-lg p-8 bg-black shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <h3 className="font-serif font-semibold text-xl mb-2 text-white">No Ambassadors Found</h3>
              <p className="text-white/60 mb-4">
                We couldn't find any ambassadors matching your search criteria. Try different keywords.
              </p>
              <Button 
                onClick={() => setSearchQuery("")}
                className="bg-black text-white hover:bg-magenta/20 border border-magenta/50"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            // No ambassadors available
            <div className="text-center py-12 border border-white/10 rounded-lg p-8 bg-black shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <h3 className="font-serif font-semibold text-xl mb-2 text-white">No Ambassadors Yet</h3>
              <p className="text-white/60 mb-4">
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
      
      <Footer />
    </div>
  );
};

export default Ambassadors;