import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, Globe, ArrowLeft, ArrowDown } from "lucide-react";
import Navbar from "@/components/Navbar";
// Footer is already included in App.tsx
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";
import { useState } from "react";
import JoinLeaderModal from "@/components/JoinLeaderModal";

import { useQuery } from "@tanstack/react-query";
import { ambassadorsService } from "@/lib/ambassadorsService";
import { Ambassador } from "@/lib/types";

// Leader Card Component
const LeaderCard = ({ leader }: { leader: Ambassador }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl group transition-all duration-500 hover:scale-102">
      <div className="relative h-80 overflow-hidden">
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
        
        <img 
          src={getImageSrc(leader.image, false)} 
          alt={leader.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          onError={createImageErrorHandler()}
        />
        
        {/* Location badge */}
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center shadow-md">
          <MapPin className="h-3 w-3 mr-1.5 text-magenta" />
          <span className="text-xs font-medium text-gray-800">{leader.location}</span>
        </div>
        
        {/* Name overlay at bottom of image */}
        <div className="absolute left-0 right-0 bottom-0 p-5 z-20">
          <h3 className="font-serif font-bold text-xl text-white text-shadow-sm group-hover:text-shadow-md transition-all duration-300">{leader.name}</h3>
          <p className="text-white/90 text-sm">{leader.title}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="font-sans text-gray-700 mb-6 line-clamp-3 text-base leading-relaxed">
          {leader.shortBio}
        </p>
        <Link href={`/leaders/${leader.slug}`}>
          <Button className="w-full bg-white border-2 border-magenta hover:bg-magenta hover:text-white text-magenta transition-all duration-300 flex items-center justify-center py-2.5 rounded-full shadow-sm hover:shadow-md group">
            <span>View Profile</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Featured Leader Card Component
const FeaturedLeaderCard = ({ leader }: { leader: Ambassador }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-full min-h-[400px] overflow-hidden">
          {/* Image gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10"></div>
          
          <img 
            src={getImageSrc(leader.image, false)} 
            alt={leader.name} 
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            onError={createImageErrorHandler()}
          />
          
          {/* Featured badge */}
          <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center shadow-md">
            <Star className="h-4 w-4 mr-2 text-magenta fill-current" />
            <span className="text-sm font-medium text-gray-800">Featured Leader</span>
          </div>
          
          {/* Quote overlay on mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 md:hidden">
            <p className="text-white/90 text-lg italic mb-3 font-medium">"{leader.quote}"</p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0 mr-3 overflow-hidden">
                <img 
                  src={getImageSrc(leader.image, false)} 
                  alt={leader.name} 
                  className="h-full w-full object-cover"
                  onError={createImageErrorHandler()}
                />
              </div>
              <div>
                <p className="text-white font-bold">{leader.name}</p>
                <p className="text-white/80 text-sm">{leader.title}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8 md:p-10 lg:p-12 flex flex-col">
          <div className="flex-1">
            <div className="inline-flex items-center bg-magenta/10 px-4 py-1.5 rounded-full mb-6">
              <span className="text-xs uppercase tracking-wider font-medium text-magenta">Monthly Spotlight</span>
            </div>
            
            <h3 className="font-serif font-bold text-2xl md:text-3xl mb-3 text-gray-900">{leader.name}</h3>
            <p className="text-gray-600 mb-3 text-lg">{leader.title}</p>
            
            <div className="flex items-center text-sm text-gray-600 mb-6 border-b border-gray-100 pb-6">
              <MapPin className="h-4 w-4 mr-2 text-magenta" />
              <span className="text-base">{leader.location}, {leader.country}</span>
            </div>
            
            <div className="hidden md:block mb-6">
              <p className="text-gray-700 text-lg italic mb-6 relative">
                <span className="text-magenta text-4xl absolute -top-4 -left-2 opacity-20 font-serif">"</span>
                {leader.quote}
                <span className="text-magenta text-4xl absolute -bottom-8 -right-2 opacity-20 font-serif">"</span>
              </p>
            </div>
            
            <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed line-clamp-4">
              {leader.shortBio}
            </p>
          </div>
          
          <Link href={`/leaders/${leader.slug}`}>
            <Button className="w-full bg-white border-2 border-magenta hover:bg-magenta hover:text-white text-magenta transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center py-3 rounded-full text-base md:text-lg group">
              <span>View Full Profile</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton for leader cards
const LeaderCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="relative h-80 bg-gray-200 overflow-hidden">
      {/* Simulate location badge */}
      <div className="absolute top-4 left-4 bg-white/80 h-6 w-24 rounded-full"></div>
      {/* Simulate name overlay */}
      <div className="absolute left-0 right-0 bottom-0 p-5">
        <div className="h-6 bg-white/50 rounded mb-2 w-2/3"></div>
        <div className="h-4 bg-white/40 rounded w-1/2"></div>
      </div>
    </div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-6 w-4/5"></div>
      <div className="h-12 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

// Featured Leader Skeleton
const FeaturedLeaderSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-xl animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative min-h-[400px] bg-gray-200">
        {/* Featured badge skeleton */}
        <div className="absolute top-6 left-6 bg-white/80 h-8 w-36 rounded-full"></div>
        
        {/* Mobile quote overlay skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
          <div className="h-5 bg-white/50 rounded mb-4 w-full"></div>
          <div className="h-5 bg-white/50 rounded mb-6 w-4/5"></div>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-white/30 flex-shrink-0 mr-3"></div>
            <div>
              <div className="h-4 bg-white/50 rounded mb-1 w-24"></div>
              <div className="h-3 bg-white/40 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-8 md:p-10 lg:p-12">
        {/* Monthly spotlight badge skeleton */}
        <div className="h-6 bg-magenta/10 rounded-full mb-6 w-36"></div>
        
        {/* Name and title skeletons */}
        <div className="h-8 bg-gray-200 rounded mb-3 w-2/3"></div>
        <div className="h-5 bg-gray-200 rounded mb-3 w-1/2"></div>
        
        {/* Location skeleton */}
        <div className="h-5 bg-gray-200 rounded mb-6 w-1/2 border-b border-gray-100 pb-6"></div>
        
        {/* Quote skeleton (hidden on mobile) */}
        <div className="hidden md:block mb-6">
          <div className="h-5 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-5 bg-gray-200 rounded mb-6 w-4/5"></div>
        </div>
        
        {/* Bio skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded mb-8 w-3/4"></div>
        
        {/* Button skeleton */}
        <div className="h-12 bg-gray-200 rounded-full w-full mt-auto"></div>
      </div>
    </div>
  </div>
);

// Leaders Page Component
const Leaders = () => {
  // Modal state
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  
  // Scroll to "who are leaders" section
  const scrollToLeadersInfo = () => {
    const section = document.getElementById('who-are-leaders');
    if (section) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Empty space for nav bar */}
        <div className="h-16 w-full absolute top-0 left-0 z-20"></div>
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black z-10"></div>
          {/* Radial gradients for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f23889,_transparent)] opacity-20 z-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#140a1f,_transparent)] opacity-40 z-30"></div>
          {/* Fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-40"></div>
          <img 
            src={getImageSrc("https://images.pexels.com/photos/7712474/pexels-photo-7712474.jpeg", true)} 
            alt="Latina leaders network" 
            className="w-full h-full object-cover"
            onError={createImageErrorHandler()}
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-50 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Global Impact</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Extraordinary lives answer to a higher calling
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Meet the women leading the Latina Empire movement in cities around the world.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-5 items-center">
              <Button 
                className="bg-magenta hover:bg-magenta/90 text-white rounded-full px-6 py-3 text-base font-semibold min-w-[200px] h-auto transition-all duration-300 hover:shadow-md"
                onClick={() => setJoinModalOpen(true)}
              >
                Join The Network
              </Button>
              <Button 
                className="bg-transparent text-white border border-white/30 hover:bg-white/10 rounded-full px-6 py-3 text-base font-semibold min-w-[200px] h-auto transition-all duration-300 backdrop-blur-sm hover:border-white/80"
                onClick={scrollToLeadersInfo}
              >
                Learn More <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
              </Button>
            </div>
            
            {/* Join Leader Modal */}
            <JoinLeaderModal 
              open={joinModalOpen}
              onOpenChange={setJoinModalOpen}
            />
          </div>
        </div>
      </section>
      
      {/* Who Are the Global Leaders Section */}
      <section id="who-are-leaders" className="py-16 md:py-20 bg-black/95 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Who Are the Global Leaders?</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-300">
              Latina Empire Global Leaders are ambitious women who lead local communities, represent our brand worldwide, and serve as the pillars of inspiration, education, and cultural empowerment.
            </p>
            <ul className="mt-6 list-disc pl-6 space-y-2 text-sm text-gray-400">
              <li>Host local meetups and workshops</li>
              <li>Serve as chapter leads in their cities</li>
              <li>Represent Latina Empire values on a global stage</li>
              <li>Receive exclusive leadership training and perks</li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Map Placeholder */}
      <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto relative overflow-hidden rounded-2xl bg-white h-[350px] flex items-center justify-center shadow-xl">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f9f9f9,_#ffffff)] opacity-90"></div>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(216,27,96,0.03),_rgba(216,27,96,0.07),_transparent)] opacity-80"></div>
            
            {/* Decorative elements */}
            <Globe className="h-32 w-32 text-gray-100 absolute opacity-20" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-magenta/30 to-transparent"></div>
            
            <div className="text-center z-10 px-4 max-w-2xl">
              <span className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
                <span className="text-xs uppercase tracking-wider font-medium text-magenta">Coming Soon</span>
              </span>
              <h3 className="font-serif font-bold text-2xl md:text-3xl mb-4 text-gray-800">Global Leaders Map</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Explore our growing network of Latina Empire leaders across the globe
              </p>
              <Button 
                variant="outline" 
                className="bg-white shadow-md backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-magenta/30 transition-all duration-300 rounded-full px-6"
              >
                <Globe className="mr-2 h-4 w-4 text-magenta" />
                View All Locations
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Leader Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
                <span className="text-xs uppercase tracking-wider font-medium text-magenta">Monthly Spotlight</span>
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6 tracking-tight">
                Featured Leader
              </h2>
              <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
                Each month we highlight a leader making exceptional impact in their community
              </p>
            </div>
            
            {isLoading ? (
              <FeaturedLeaderSkeleton />
            ) : isError ? (
              <div className="text-center py-16 border border-gray-200 rounded-2xl p-8 bg-gray-50/50 shadow-md">
                <h3 className="font-serif font-semibold text-2xl mb-4 text-gray-800">Unable to Load Featured Leader</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  We're having trouble loading our featured leader. Please refresh the page.
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-white text-black hover:bg-gray-100 border border-gray-300 shadow-md rounded-full px-6 py-2.5 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Refresh Page
                </Button>
              </div>
            ) : featuredLeader ? (
              <FeaturedLeaderCard leader={featuredLeader} />
            ) : (
              <div className="text-center py-16 border border-gray-200 rounded-2xl p-8 bg-gray-50/50 shadow-md">
                <h3 className="font-serif font-semibold text-2xl mb-4 text-gray-800">No Featured Leader Yet</h3>
                <p className="text-gray-600 text-lg">
                  Check back soon for our featured leader of the month!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Leaders Grid */}
      <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
                <span className="text-xs uppercase tracking-wider font-medium text-magenta">Community Network</span>
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6 tracking-tight">
                Global Leaders
              </h2>
              <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
                Our network of certified leaders who are driving the Latina Empire mission across communities worldwide
              </p>
            </div>
            
            {isLoading ? (
              // Loading state
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <LeaderCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              // Error state
              <div className="text-center py-16 border border-gray-200 rounded-2xl p-8 bg-gray-50/50 shadow-md max-w-3xl mx-auto">
                <div className="text-red-500 mb-6 opacity-80">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-2xl mb-4 text-gray-800">Unable to Load Leaders</h3>
                <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
                  We're having trouble loading our community leaders. Our team has been notified of this issue. Please try again in a moment.
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-white text-black hover:bg-gray-100 border border-gray-300 shadow-md rounded-full px-6 py-2.5 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Refresh Page
                </Button>
              </div>
            ) : otherLeaders && otherLeaders.length > 0 ? (
              // Display leaders
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {otherLeaders.map((leader: Ambassador) => (
                  <LeaderCard key={leader.id} leader={leader} />
                ))}
              </div>
            ) : (
              // No leaders available
              <div className="text-center py-16 border border-gray-200 rounded-2xl p-8 bg-gray-50/50 shadow-md max-w-3xl mx-auto">
                <div className="text-magenta/40 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-2xl mb-4 text-gray-800">No Additional Leaders Yet</h3>
                <p className="text-gray-600 mb-4 text-lg">
                  We're in the process of adding more community leaders. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Become a Leader CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-black text-white">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          {/* Radial gradient for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d81b60,_transparent)] opacity-10 z-20"></div>
          {/* Fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
          <img 
            src={getImageSrc("https://images.pexels.com/photos/6325772/pexels-photo-6325772.jpeg", true)} 
            alt="Leadership background" 
            className="w-full h-full object-cover"
            onError={createImageErrorHandler()}
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Join Our Movement</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Feeling Called to Lead?
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Step into your power as a certified Latina Empire Leader and create transformative experiences for women in your community.
            </p>
            <Link href="/programs/certification">
              <Button className="bg-magenta hover:bg-magenta/90 text-white px-10 py-6 h-auto rounded-full text-lg shadow-xl transition-all duration-300 hover:shadow-magenta hover:scale-102">
                Become a Leader
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer is rendered in App.tsx */}
    </div>
  );
};

export default Leaders;