import { useParams, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ArrowLeft, ArrowRight, Ticket, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { eventsService } from "@/lib/eventsService";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  
  // Fetch event data
  const { data: event, isLoading, isError } = useQuery({
    queryKey: [`/api/events/${slug}`],
    queryFn: () => eventsService.getEventBySlug(slug),
    retry: 1,
  });

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
      <section 
        className="pt-32 pb-20 bg-center bg-cover bg-no-repeat relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${event.bannerImage || event.image}')` 
        }}
        onError={(e) => {
          const section = e.currentTarget as HTMLElement;
          section.style.backgroundImage = "";
          section.classList.add("hero-placeholder");
        }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-4xl">
            <Link href="/events" className="inline-flex items-center text-white bg-black/30 px-4 py-2 rounded-full mb-6 hover:bg-black/50 transition-all backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
            <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4">{event.name}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.date}</span>
              </div>
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.location}</span>
              </div>
              {(event.startTime && event.endTime) && (
                <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.startTime} - {event.endTime}</span>
                </div>
              )}
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">Hosted by {event.host}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-16 bg-white">
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