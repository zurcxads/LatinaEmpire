import { useParams, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Award, 
  Languages, 
  Briefcase,
  Instagram, 
  Linkedin, 
  Twitter, 
  Globe, 
  Users,
  Star,
  Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";

import { useQuery } from "@tanstack/react-query";
import { ambassadorsService } from "@/lib/ambassadorsService";
import { Ambassador } from "@/lib/types";
import { useEffect, Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SocialMediaLink = ({ 
  platform, 
  username, 
  url 
}: { 
  platform: "instagram" | "linkedin" | "twitter" | "website", 
  username: string,
  url: string
}) => {
  let icon;
  let label;
  
  switch (platform) {
    case "instagram":
      icon = <Instagram className="h-5 w-5 text-magenta" />;
      label = `@${username}`;
      break;
    case "linkedin":
      icon = <Linkedin className="h-5 w-5 text-magenta" />;
      label = username;
      break;
    case "twitter":
      icon = <Twitter className="h-5 w-5 text-magenta" />;
      label = `@${username}`;
      break;
    case "website":
      icon = <Globe className="h-5 w-5 text-magenta" />;
      label = url;
      break;
  }
  
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-gray-700 hover:text-magenta transition-colors"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

// Loading skeleton for ambassador profile
const AmbassadorDetailSkeleton = () => (
  <Fragment>
    {/* Banner skeleton - keep dark for contrast with banner image */}
    <section className="pt-32 pb-20 bg-center bg-cover bg-black animate-pulse">
      <div className="container mx-auto px-4 md:px-6 text-white">
        <div className="h-10 w-48 bg-white/20 rounded-full mb-6"></div>
        <div className="max-w-4xl">
          <div className="h-12 bg-white/20 rounded mb-4 w-3/4"></div>
          <div className="h-8 bg-white/20 rounded mb-6 w-1/2"></div>
          <div className="flex flex-wrap gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-32 bg-white/20 rounded-full"></div>
            ))}
          </div>
          <div className="h-10 w-64 bg-magenta/50 rounded-full"></div>
        </div>
      </div>
    </section>
    {/* Content skeleton - white theme */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <div className="h-10 bg-gray-200 rounded mb-6 w-1/3"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
            <div className="mt-12">
              <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 w-24 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
              <div className="mb-6 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-gray-200"></div>
              </div>
              <div className="space-y-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 rounded mb-6 w-1/2"></div>
              <div className="h-10 bg-magenta/30 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

const LeaderDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  
  // Fetch leader data with React Query
  const { data: ambassador, isLoading, isError } = useQuery({
    queryKey: [`/api/leaders/${slug}`],
    queryFn: async () => {
      if (!slug) {
        return null;
      }
      const ambassador = await ambassadorsService.getAmbassadorBySlug(slug);
      return ambassador;
    },
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-magenta mx-auto mb-4" />
            <h2 className="font-serif text-xl text-gray-900">Loading leader profile...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state or ambassador not found
  if (isError || !ambassador) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <section className="pt-32 pb-32 flex items-center justify-center">
          <div className="text-center max-w-lg p-8 border border-gray-200 rounded-lg shadow-md">
            <h1 className="font-serif font-bold text-3xl mb-4 text-gray-900">
              {isError ? "Something went wrong" : "Leader Not Found"}
            </h1>
            <p className="text-gray-600 mb-6">
              {isError 
                ? "We're having trouble loading this leader's profile. Please try again later."
                : "The leader you're looking for doesn't exist or may have been removed."}
            </p>
            <Link href="/leaders">
              <Button className="bg-magenta text-white hover:bg-magenta/90 shadow-md">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Leaders
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Leader Banner - Keep dark for contrast with banner image */}
      <section 
        className="pt-32 pb-20 bg-center bg-cover bg-no-repeat relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${ambassador.bannerImage || ambassador.image}')` 
        }}
        onError={(e) => {
          const section = e.currentTarget as HTMLElement;
          section.style.backgroundImage = "";
          section.classList.add("hero-placeholder");
        }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-4xl">
            <Link href="/leaders" className="inline-flex items-center text-white bg-white/10 px-4 py-2 rounded-full mb-6 hover:bg-white/20 transition-all backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Leaders
            </Link>
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Leader Profile</span>
            </div>
            <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4">{ambassador.name}</h1>
            <p className="text-xl mb-6 text-white/90">{ambassador.title}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <MapPin className="h-4 w-4 mr-2 text-magenta" />
                <span className="text-sm">{ambassador.location}, {ambassador.country}</span>
              </div>
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Calendar className="h-4 w-4 mr-2 text-magenta" />
                <span className="text-sm">Member since {ambassador.membersSince}</span>
              </div>
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Users className="h-4 w-4 mr-2 text-magenta" />
                <span className="text-sm">{ambassador.eventsHosted} Events Hosted</span>
              </div>
            </div>
            <div className="inline-flex items-center bg-magenta px-4 py-2 rounded-full backdrop-blur-sm">
              <Star className="h-4 w-4 mr-2" fill="white" />
              <span className="text-sm font-medium">"{ambassador.quote}"</span>
            </div>
          </div>
        </div>
      </section>

      {/* Leader Content - White Theme */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-serif font-bold text-2xl md:text-3xl mb-6 text-gray-900">About {ambassador.name}</h2>
              <div className="prose max-w-none font-sans">
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {ambassador.fullBio}
                </p>
              </div>
              
              {/* Expertise */}
              <div className="mt-12">
                <h3 className="font-serif font-bold text-xl mb-4 text-gray-900">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {ambassador.expertise.map((expertise, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm border border-gray-200"
                    >
                      {expertise}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-24 border border-gray-200 shadow-md">
                {/* Leader Image */}
                <div className="mb-6 flex justify-center">
                  <div className="relative rounded-full overflow-hidden w-40 h-40 border-4 border-white shadow-lg">
                    <img 
                      src={ambassador.image} 
                      alt={ambassador.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.classList.add("hidden");
                        e.currentTarget.parentElement?.classList.add("placeholder-image");
                      }}
                    />
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans font-semibold text-gray-900">Years in Program</p>
                      <p className="font-sans text-gray-700">{ambassador.yearsInProgram} years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Languages className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans font-semibold text-gray-900">Languages</p>
                      <p className="font-sans text-gray-700">{ambassador.languages.join(", ")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Briefcase className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans font-semibold text-gray-900">Role</p>
                      <p className="font-sans text-gray-700">{ambassador.title}</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mb-6">
                  <h3 className="font-serif font-semibold text-lg mb-4 text-gray-900">Connect</h3>
                  <div className="space-y-3">
                    {ambassador.socialMedia.instagram && (
                      <SocialMediaLink 
                        platform="instagram" 
                        username={ambassador.socialMedia.instagram} 
                        url={`https://instagram.com/${ambassador.socialMedia.instagram}`} 
                      />
                    )}
                    
                    {ambassador.socialMedia.linkedin && (
                      <SocialMediaLink 
                        platform="linkedin" 
                        username={ambassador.socialMedia.linkedin} 
                        url={`https://linkedin.com/in/${ambassador.socialMedia.linkedin}`} 
                      />
                    )}
                    
                    {ambassador.socialMedia.twitter && (
                      <SocialMediaLink 
                        platform="twitter" 
                        username={ambassador.socialMedia.twitter} 
                        url={`https://twitter.com/${ambassador.socialMedia.twitter}`} 
                      />
                    )}
                    
                    {ambassador.socialMedia.website && (
                      <SocialMediaLink 
                        platform="website" 
                        username={ambassador.socialMedia.website} 
                        url={`https://${ambassador.socialMedia.website}`} 
                      />
                    )}
                  </div>
                </div>
                
                {/* Contact Button */}
                <Button className="w-full bg-magenta text-white hover:bg-magenta/90 shadow-md rounded-md">
                  Contact {ambassador.name.split(" ")[0]}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Leaders */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gray-100 px-4 py-1.5 rounded-full mb-6">
              <span className="text-sm uppercase tracking-wider font-medium text-gray-900">Explore The Network</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 text-gray-900">Meet More Leaders</h2>
            <p className="font-sans text-gray-700 mb-8 max-w-2xl mx-auto">
              Discover other powerful Latinas who are leading the Empire movement across the globe.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/leaders">
              <Button className="bg-magenta text-white hover:bg-magenta/90 px-8 py-6 h-auto rounded-full text-lg shadow-md">
                View All Leaders
              </Button>
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
};

export default LeaderDetail;