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
  Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAmbassadorBySlug } from "@/data/ambassadors";
import { useEffect } from "react";

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
      icon = <Instagram className="h-5 w-5" />;
      label = `@${username}`;
      break;
    case "linkedin":
      icon = <Linkedin className="h-5 w-5" />;
      label = username;
      break;
    case "twitter":
      icon = <Twitter className="h-5 w-5" />;
      label = `@${username}`;
      break;
    case "website":
      icon = <Globe className="h-5 w-5" />;
      label = url;
      break;
  }
  
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-gray-700 hover:text-magenta"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

const AmbassadorDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const ambassador = getAmbassadorBySlug(slug);

  useEffect(() => {
    // If ambassador not found, redirect to ambassadors page
    if (!ambassador) {
      setLocation("/ambassadors");
    }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [ambassador, setLocation]);

  if (!ambassador) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Ambassador Banner */}
      <section 
        className="pt-32 pb-20 bg-center bg-cover bg-no-repeat relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${ambassador.bannerImage || ambassador.image}')` 
        }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-4xl">
            <Link href="/ambassadors" className="inline-flex items-center text-white bg-black/30 px-4 py-2 rounded-full mb-6 hover:bg-black/50 transition-all backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ambassadors
            </Link>
            <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4">{ambassador.name}</h1>
            <p className="text-xl mb-6">{ambassador.title}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{ambassador.location}, {ambassador.country}</span>
              </div>
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Member since {ambassador.membersSince}</span>
              </div>
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">{ambassador.eventsHosted} Events Hosted</span>
              </div>
            </div>
            <div className="inline-flex items-center bg-magenta/90 px-4 py-2 rounded-full backdrop-blur-sm">
              <Star className="h-4 w-4 mr-2" fill="white" />
              <span className="text-sm font-medium">"{ambassador.quote}"</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ambassador Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-serif font-bold text-2xl md:text-3xl mb-6">About {ambassador.name}</h2>
              <div className="prose max-w-none font-sans">
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {ambassador.fullBio}
                </p>
              </div>
              
              {/* Expertise */}
              <div className="mt-12">
                <h3 className="font-serif font-bold text-xl mb-4">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {ambassador.expertise.map((expertise, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {expertise}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                {/* Ambassador Image */}
                <div className="mb-6 flex justify-center">
                  <div className="relative rounded-full overflow-hidden w-40 h-40 border-4 border-white shadow-md">
                    <img 
                      src={ambassador.image} 
                      alt={ambassador.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans font-semibold">Years in Program</p>
                      <p className="font-sans text-gray-600">{ambassador.yearsInProgram} years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Languages className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans font-semibold">Languages</p>
                      <p className="font-sans text-gray-600">{ambassador.languages.join(", ")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Briefcase className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans font-semibold">Role</p>
                      <p className="font-sans text-gray-600">{ambassador.title}</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mb-6">
                  <h3 className="font-serif font-semibold text-lg mb-4">Connect</h3>
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
                <Button className="w-full bg-magenta text-white hover:bg-opacity-90">
                  Contact {ambassador.name.split(" ")[0]}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ambassadors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl mb-4">Meet More Ambassadors</h2>
            <p className="font-sans text-gray-700 max-w-2xl mx-auto">
              Discover other powerful Latinas who are leading the Empire movement across the globe.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/ambassadors">
              <Button className="bg-white text-magenta border-2 border-magenta hover:bg-magenta hover:text-white transition-all px-8">
                View All Ambassadors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AmbassadorDetail;