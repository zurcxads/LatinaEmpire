import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, Globe, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

import { useQuery } from "@tanstack/react-query";
import { ambassadorsService } from "@/lib/ambassadorsService";
import { Ambassador } from "@/lib/types";

// Leader Card Component
const LeaderCard = ({ leader }: { leader: Ambassador }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl group transition-all duration-300">
      <div className="relative h-72 overflow-hidden">
        <img 
          src={getImageSrc(leader.image, false)} 
          alt={leader.name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onError={createImageErrorHandler()}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
          <MapPin className="h-3 w-3 mr-1 text-magenta" />
          <span className="text-xs font-medium text-gray-800">{leader.location}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl mb-1 text-gray-900 group-hover:text-magenta transition-colors">{leader.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{leader.title}</p>
        <p className="font-sans text-gray-700 mb-6 line-clamp-3">
          {leader.shortBio}
        </p>
        <Link href={`/leaders/${leader.slug}`}>
          <Button className="w-full bg-white border border-magenta hover:bg-magenta hover:text-white text-magenta transition-all flex items-center justify-center">
            View Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Featured Leader Card Component
const FeaturedLeaderCard = ({ leader }: { leader: Ambassador }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-full min-h-[300px] overflow-hidden">
          <img 
            src={getImageSrc(leader.image, false)} 
            alt={leader.name} 
            className="w-full h-full object-cover"
            onError={createImageErrorHandler()}
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
            <Star className="h-3 w-3 mr-1 text-magenta fill-current" />
            <span className="text-xs font-medium text-gray-800">Featured Leader</span>
          </div>
        </div>
        <div className="p-8 flex flex-col">
          <div className="flex-1">
            <div className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full mb-4">
              <span className="text-xs uppercase tracking-wider font-medium text-magenta">Monthly Spotlight</span>
            </div>
            <h3 className="font-serif font-bold text-2xl mb-2 text-gray-900">{leader.name}</h3>
            <p className="text-gray-600 mb-2">{leader.title}</p>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <MapPin className="h-3 w-3 mr-1 text-magenta" />
              <span>{leader.location}, {leader.country}</span>
            </div>
            <p className="text-gray-700 mb-6 italic">"{leader.quote}"</p>
            <p className="text-gray-700 mb-6">
              {leader.shortBio}
            </p>
          </div>
          <Link href={`/leaders/${leader.slug}`}>
            <Button className="w-full bg-white border border-magenta hover:bg-magenta hover:text-white text-magenta transition-all flex items-center justify-center">
              View Full Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton for leader cards
const LeaderCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md animate-pulse">
    <div className="h-72 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-3 w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-4 w-4/5"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

// Featured Leader Skeleton
const FeaturedLeaderSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="min-h-[300px] bg-gray-200"></div>
      <div className="p-8">
        <div className="h-5 bg-gray-200 rounded mb-4 w-1/3"></div>
        <div className="h-8 bg-gray-200 rounded mb-3 w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
        <div className="h-10 bg-gray-200 rounded w-full mt-auto"></div>
      </div>
    </div>
  </div>
);

// Leaders Page Component
const Leaders = () => {
  // Fetch leaders data with React Query
  const { data: leaders, isLoading, isError } = useQuery({
    queryKey: ['/api/leaders'],
    queryFn: ambassadorsService.getAllAmbassadors,
  });

  // Select featured leader (first leader in the array or Elena Rodriguez if available)
  const getFeaturedLeader = () => {
    if (!leaders || leaders.length === 0) return null;
    const elena = leaders.find(leader => leader.slug === "elena-rodriguez");
    return elena || leaders[0];
  };

  const featuredLeader = getFeaturedLeader();
  const otherLeaders = leaders?.filter(leader => leader.id !== featuredLeader?.id);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f23889,_transparent)] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#140a1f,_transparent)] opacity-40"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Global Impact</span>
            </div>
            <h1 className="font-serif font-bold text-4xl md:text-6xl mb-6 tracking-tight">
              The Global Leaders Network
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Meet the women leading the Latina Empire movement in cities around the world.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Button className="bg-magenta hover:bg-magenta/90 text-white px-8 py-6 h-auto rounded-lg text-lg shadow-lg transition-all">
                Join The Network
              </Button>
              <Button className="bg-transparent text-white border border-white/30 hover:bg-white/10 px-8 py-6 h-auto rounded-lg text-lg transition-all">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Placeholder */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto relative overflow-hidden rounded-xl bg-gray-100 h-[300px] flex items-center justify-center border border-gray-200">
            <Globe className="h-12 w-12 text-gray-300 absolute opacity-10" />
            <div className="text-center z-10 px-4">
              <h3 className="font-serif font-bold text-xl mb-3 text-gray-800">Global Leaders Map</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Map coming soon — explore our growing network of leaders by scrolling below
              </p>
              <Button 
                variant="outline" 
                className="bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                View All Locations
              </Button>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f8f8f8,_#f5f5f5)] opacity-60"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_#f0f0f0,_transparent)] opacity-70"></div>
          </div>
        </div>
      </section>
      
      {/* Featured Leader Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">
                Featured Leader
              </h2>
              <p className="text-gray-700 text-lg">
                Each month we highlight a leader making exceptional impact in their community
              </p>
            </div>
            
            {isLoading ? (
              <FeaturedLeaderSkeleton />
            ) : isError ? (
              <div className="text-center py-12 border border-gray-200 rounded-xl p-8 bg-gray-50">
                <h3 className="font-serif font-semibold text-xl mb-2 text-gray-800">Unable to Load Featured Leader</h3>
                <p className="text-gray-600 mb-4">
                  We're having trouble loading our featured leader. Please refresh the page.
                </p>
              </div>
            ) : featuredLeader ? (
              <FeaturedLeaderCard leader={featuredLeader} />
            ) : (
              <div className="text-center py-12 border border-gray-200 rounded-xl p-8 bg-gray-50">
                <h3 className="font-serif font-semibold text-xl mb-2 text-gray-800">No Featured Leader Yet</h3>
                <p className="text-gray-600">
                  Check back soon for our featured leader of the month!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Leaders Grid */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">
                Global Leaders
              </h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                Our network of certified leaders who are driving the Latina Empire mission across communities worldwide
              </p>
            </div>
            
            {isLoading ? (
              // Loading state
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <LeaderCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              // Error state
              <div className="text-center py-12 border border-red-200 rounded-xl p-8 bg-red-50 shadow-md">
                <h3 className="font-serif font-semibold text-xl mb-2 text-red-600">Unable to Load Leaders</h3>
                <p className="text-gray-700 mb-4">
                  We're having trouble loading our community leaders. Please try again.
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-white text-red-600 hover:bg-red-50 border border-red-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Refresh Page
                </Button>
              </div>
            ) : otherLeaders && otherLeaders.length > 0 ? (
              // Display leaders
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherLeaders.map((leader: Ambassador) => (
                  <LeaderCard key={leader.id} leader={leader} />
                ))}
              </div>
            ) : (
              // No leaders available
              <div className="text-center py-12 border border-gray-200 rounded-xl p-8 bg-gray-50 shadow-md">
                <h3 className="font-serif font-semibold text-xl mb-2 text-gray-800">No Additional Leaders Yet</h3>
                <p className="text-gray-600 mb-4">
                  We're in the process of adding more community leaders. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Become a Leader CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Join Our Movement</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6">
              Feeling Called to Lead?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Step into your power as a certified Latina Empire Leader and create transformative experiences for women in your community.
            </p>
            <Link href="/programs/certification">
              <Button className="bg-magenta hover:bg-magenta/90 text-white px-10 py-6 h-auto rounded-lg text-lg shadow-lg transition-all duration-300">
                Become a Leader
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Leaders;