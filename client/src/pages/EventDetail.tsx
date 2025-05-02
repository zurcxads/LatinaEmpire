import { useParams, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ArrowLeft, ArrowRight, Ticket, Loader2, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { eventsService } from "@/lib/eventsService";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Fetch event data
  const { data: event, isLoading, isError } = useQuery({
    queryKey: [`/api/events/${slug}`],
    queryFn: () => eventsService.getEventBySlug(slug),
    retry: 1,
  });
  
  // Function to determine event type (in-person, virtual, hybrid)
  const getEventType = () => {
    if (!event) return "IN-PERSON"; // Default
    
    // Use the location to make a guess about event type
    if (event.location.toLowerCase().includes("virtual") || 
        event.location.toLowerCase().includes("online") ||
        event.location.toLowerCase().includes("zoom")) {
      return "VIRTUAL";
    } else if (event.location.toLowerCase().includes("hybrid")) {
      return "HYBRID";
    } else {
      return "IN-PERSON";
    }
  };
  
  // Function to generate a compact title for the event badge
  const getEventBadgeTitle = () => {
    if (!event) return { main: "MASTERY", sub: "EVENT" };
    
    const nameParts = event.name.toUpperCase().split(' ');
    
    // For short names, use as is
    if (nameParts.length <= 2) {
      return { main: nameParts.join(' '), sub: "EVENT" };
    }
    
    // For "Latina X" format, make it more compact
    if (nameParts[0] === "LATINA" && nameParts.length >= 3) {
      return { 
        main: `${nameParts[1]} MASTERY`, 
        sub: "LATINA EMPIRE" 
      };
    }
    
    // For longer names, create a balanced split
    const midPoint = Math.ceil(nameParts.length / 2);
    return {
      main: nameParts.slice(midPoint).join(' '),
      sub: nameParts.slice(0, midPoint).join(' ')
    };
  };
  
  // Handler for Learn More button
  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // If event not found after loading finished, redirect to events page
    if (!isLoading && !event) {
      setLocation("/events");
    }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [event, isLoading, setLocation]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-magenta mx-auto mb-4" />
            <h2 className="font-serif text-xl">Loading event details...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <h2 className="font-serif text-2xl text-red-600 mb-4">Unable to Load Event</h2>
            <p className="text-gray-700 mb-6">We encountered a problem while trying to load this event.</p>
            <Link href="/events">
              <Button className="bg-magenta text-white hover:bg-magenta/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Redirect if event not found (handled in useEffect)
  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Event Banner */}
      <section className="bg-black pt-10 pb-0 relative">
        {/* Back to Events button */}
        <div className="container mx-auto px-4 md:px-12 mb-4">
          <Link href="/events" className="inline-flex items-center text-white bg-black/30 px-4 py-2 rounded-full hover:bg-black/50 transition-all backdrop-blur-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </div>
        
        {/* Full-width event banner with rounded corners */}
        <div className="mx-4 md:mx-12 rounded-[24px] overflow-hidden relative">
          <div 
            className="w-full h-[600px] bg-center bg-cover bg-no-repeat relative"
            style={{ 
              backgroundImage: `url('${event.bannerImage || event.image}')` 
            }}
            onError={(e) => {
              const section = e.currentTarget as HTMLElement;
              section.style.backgroundImage = "";
              section.classList.add("hero-placeholder");
            }}
          >
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
            
            {/* Content container */}
            <div className="absolute bottom-0 left-0 right-0 px-10 pb-16 z-10">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between">
                  <div className="max-w-3xl">
                    {/* In-person tag on top of title */}
                    <div className="mb-4">
                      <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-wider font-medium text-white">{getEventType()}</span>
                      </div>
                    </div>
                    
                    {/* Title and Description */}
                    <h1 className="font-serif font-bold text-5xl md:text-6xl leading-tight mb-4 text-white">
                      Rejuvenate your health<br />and build your wealth
                    </h1>
                    <p className="font-sans text-lg md:text-xl mb-8 max-w-2xl text-white/90">
                      Embark on a journey of change in a tropical oasis with the leading minds in health, wellbeing, finance and more.
                    </p>
                    
                    {/* Event details and CTA - rearranged */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                      {/* CTA Button on the left */}
                      <Button 
                        onClick={scrollToContent}
                        className="bg-white text-black hover:bg-white/90 px-8 py-3 h-auto rounded-full font-medium mb-4 sm:mb-0"
                      >
                        Learn more
                      </Button>

                      {/* Event details in a row */}
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 ml-0 sm:ml-6">
                        <div>
                          <p className="uppercase text-xs tracking-wider mb-1 text-white/80">DATE</p>
                          <p className="text-base font-medium text-white">{event.date}</p>
                        </div>
                        <div>
                          <p className="uppercase text-xs tracking-wider mb-1 text-white/80">PLACE</p>
                          <p className="text-base font-medium text-white">{event.location}</p>
                        </div>
                        <div>
                          <p className="uppercase text-xs tracking-wider mb-1 text-white/80">TIMEZONE</p>
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-1 text-white" />
                            <span className="text-base font-medium text-white">
                              {event.location === "Santa Fe, NM" ? "MST" : "Local Time"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event badge in bottom right corner */}
                  <div className="hidden md:block">
                    <div className="bg-black p-4 rounded-lg shadow-lg">
                      <div className="text-center text-white uppercase">
                        <div className="font-bold text-lg tracking-wide">{getEventBadgeTitle().sub}</div>
                        <div className="font-bold text-2xl tracking-wide">{getEventBadgeTitle().main}</div>
                        <div className="mt-1 text-sm tracking-wide">{event.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-16 bg-white" ref={contentRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-serif font-bold text-2xl md:text-3xl mb-6">About This Event</h2>
              <div className="prose max-w-none font-sans">
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <div className="mb-6">
                  <h3 className="font-serif font-semibold text-xl mb-4">Event Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <Calendar className="h-5 w-5 text-magenta mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-sans font-semibold">Date</p>
                        <p className="font-sans text-gray-600">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <Clock className="h-5 w-5 text-magenta mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-sans font-semibold">Time</p>
                        <p className="font-sans text-gray-600">
                          {event.startTime && event.endTime ? `${event.startTime} - ${event.endTime}` : 'TBA'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <MapPin className="h-5 w-5 text-magenta mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-sans font-semibold">Location</p>
                        <p className="font-sans text-gray-600">{event.location}</p>
                        {event.locationAddress && (
                          <p className="font-sans text-gray-600 text-sm mt-1">{event.locationAddress}</p>
                        )}
                        {event.locationMapUrl && (
                          <a 
                            href={event.locationMapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-sans text-magenta text-sm mt-1 inline-block hover:underline"
                          >
                            View on Map
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex">
                      <Users className="h-5 w-5 text-magenta mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-sans font-semibold">Host</p>
                        <div className="flex items-center mt-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            {event.hostImage ? (
                              <img 
                                src={event.hostImage} 
                                alt={event.host} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.classList.add("hidden");
                                  e.currentTarget.parentElement?.classList.add("placeholder-image");
                                }}
                              />
                            ) : (
                              <div className="placeholder-image w-full h-full rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-sans">{event.host}</p>
                            {event.hostTitle && <p className="font-sans text-sm text-gray-500">{event.hostTitle}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {event.ticketPrice && (
                      <div className="flex">
                        <Ticket className="h-5 w-5 text-magenta mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-sans font-semibold">Price</p>
                          <p className="font-sans text-gray-600">{event.ticketPrice}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {event.ticketLink && !event.isPast && (
                  <Button 
                    className="w-full bg-magenta text-white hover:bg-opacity-90 flex items-center justify-center"
                    size="lg"
                  >
                    Get Tickets
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                
                {event.isPast && (
                  <div className="text-center p-3 bg-gray-200 rounded-md">
                    <p className="font-sans text-gray-600">This event has ended</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Placeholder */}
      {event.locationMapUrl && !event.isPast && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-serif font-bold text-2xl md:text-3xl mb-6 text-center">Event Location</h2>
            <div className="bg-gray-200 h-[400px] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-magenta mx-auto mb-3" />
                <p className="font-sans font-semibold mb-1">{event.location}</p>
                {event.locationAddress && <p className="font-sans text-gray-600">{event.locationAddress}</p>}
                <a 
                  href={event.locationMapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-sans text-magenta mt-3 inline-block hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      {!event.isPast && (
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif font-bold text-3xl mb-6">Ready to Join Us?</h2>
              <p className="font-sans text-lg opacity-90 mb-8">
                Secure your spot at this transformational event. Limited spaces available.
              </p>
              <Button 
                className="bg-magenta text-white px-8 py-6 h-auto rounded font-sans font-semibold text-base hover:bg-opacity-90 inline-flex items-center"
                size="lg"
              >
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default EventDetail;