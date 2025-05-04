import { useParams, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ArrowLeft, ArrowRight, Ticket, Loader2, Globe, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { eventsService } from "@/lib/eventsService";
import { useEffect, useRef } from "react";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";
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
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <section className="bg-black pt-20 pb-0 relative">
        {/* Full-width event banner with rounded corners */}
        <div className="mx-4 md:mx-12 rounded-[24px] overflow-hidden relative">
          <div 
            className="w-full h-[550px] bg-center bg-cover bg-no-repeat relative"
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
            
            {/* Back to Events button - positioned on top left corner of image */}
            <div className="absolute top-6 left-6 z-20">
              <Link href="/events" className="inline-flex items-center text-white bg-black/30 px-4 py-2 rounded-full hover:bg-black/50 transition-all backdrop-blur-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </div>
            
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
                    <h1 className="font-serif font-bold text-4xl md:text-5xl leading-tight mb-4 text-white">
                      Rejuvenate your health<br />and build your wealth
                    </h1>
                    <p className="font-sans text-base md:text-lg mb-6 max-w-2xl text-white/90">
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
                    <div className="bg-black p-3 rounded-lg shadow-lg">
                      <div className="text-center text-white uppercase">
                        <div className="font-bold text-sm tracking-wide">{getEventBadgeTitle().sub}</div>
                        <div className="font-bold text-xl tracking-wide">{getEventBadgeTitle().main}</div>
                        <div className="mt-1 text-xs tracking-wide">{event.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Content - Redesigned */}
      <section className="py-16 bg-black text-white" ref={contentRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex mb-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-magenta"></span>
                </div>
                <div className="uppercase text-sm tracking-widest text-gray-400 mb-2">ABOUT THIS EVENT</div>
                <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Transform your leadership</h2>
              </div>
              <div className="prose max-w-none font-sans text-gray-300">
                <p className="whitespace-pre-line leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-8 sticky top-24 border border-gray-800">
                <div className="mb-6">
                  <h3 className="font-serif font-semibold text-xl mb-6 text-white">Event Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <Calendar className="h-5 w-5 text-magenta mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-sans font-semibold text-white text-sm mb-1">DATE</p>
                        <p className="font-sans text-gray-300">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <Clock className="h-5 w-5 text-magenta mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-sans font-semibold text-white text-sm mb-1">TIME</p>
                        <p className="font-sans text-gray-300">
                          {event.startTime && event.endTime ? `${event.startTime} - ${event.endTime}` : 'TBA'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <MapPin className="h-5 w-5 text-magenta mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-sans font-semibold text-white text-sm mb-1">LOCATION</p>
                        <p className="font-sans text-gray-300">{event.location}</p>
                        {event.locationAddress && (
                          <p className="font-sans text-gray-400 text-sm mt-1">{event.locationAddress}</p>
                        )}
                        {event.locationMapUrl && (
                          <a 
                            href={event.locationMapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-sans text-magenta text-sm mt-2 inline-block hover:underline"
                          >
                            View on Map
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex">
                      <Users className="h-5 w-5 text-magenta mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-sans font-semibold text-white text-sm mb-1">HOST</p>
                        <div className="flex items-center mt-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-800">
                            {event.hostImage ? (
                              <img 
                                src={getImageSrc(event.hostImage, true)} 
                                alt={event.host} 
                                className="w-full h-full object-cover"
                                onError={createImageErrorHandler()}
                              />
                            ) : (
                              <div className="placeholder-image w-full h-full rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-sans text-white">{event.host}</p>
                            {event.hostTitle && <p className="font-sans text-sm text-gray-400">{event.hostTitle}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {event.ticketPrice && (
                      <div className="flex">
                        <Ticket className="h-5 w-5 text-magenta mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-sans font-semibold text-white text-sm mb-1">PRICE</p>
                          <p className="font-sans text-gray-300">{event.ticketPrice}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {event.ticketLink && !event.isPast && (
                  <Button 
                    className="w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center font-medium px-6 py-3 h-auto rounded-full mt-4"
                  >
                    Get Tickets
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                
                {event.isPast && (
                  <div className="text-center p-3 bg-gray-800 rounded-md mt-4">
                    <p className="font-sans text-gray-300">This event has ended</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-black text-white border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-2">
              <span className="inline-block h-3 w-3 rounded-full bg-magenta"></span>
            </div>
            <div className="uppercase text-sm tracking-widest text-gray-400 mb-2">KEY BENEFITS</div>
            <h2 className="font-serif font-bold text-4xl md:text-5xl mb-0">Drive meaningful change</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-6xl mx-auto">
            {/* Item 1 */}
            <div className="flex flex-col items-start">
              <div className="mb-4 p-4 bg-gray-800 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 2v5"></path>
                  <path d="M8 2v5"></path>
                  <path d="M3 10h18"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Learn from the experts</h3>
              <p className="text-gray-400">
                Get insights from experts in persuasion, non-verbal communication, coaching and more.
              </p>
            </div>
            
            {/* Item 2 */}
            <div className="flex flex-col items-start">
              <div className="mb-4 p-4 bg-gray-800 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v8"></path>
                  <path d="M8 12h8"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Retrain your brain</h3>
              <p className="text-gray-400">
                Discover your identity as a leader and gain a new level of emotional mastery and clarity.
              </p>
            </div>
            
            {/* Item 3 */}
            <div className="flex flex-col items-start">
              <div className="mb-4 p-4 bg-gray-800 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Decode body language</h3>
              <p className="text-gray-400">
                Tune into what people are really saying by understanding non-verbal communication.
              </p>
            </div>
            
            {/* Item 4 */}
            <div className="flex flex-col items-start">
              <div className="mb-4 p-4 bg-gray-800 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Communicate with impact</h3>
              <p className="text-gray-400">
                Learn to inspire, persuade, and connect with others for measurable results and change.
              </p>
            </div>
            
            {/* Item 5 */}
            <div className="flex flex-col items-start">
              <div className="mb-4 p-4 bg-gray-800 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect>
                  <line x1="2" y1="20" x2="22" y2="20"></line>
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Experience real-time mentoring</h3>
              <p className="text-gray-400">
                Practice what you learn with team building exercises led by professional mentors.
              </p>
            </div>
            
            {/* Item 6 */}
            <div className="flex flex-col items-start">
              <div className="mb-4 p-4 bg-gray-800 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Increase your influence</h3>
              <p className="text-gray-400">
                Overcome the psychological challenges of leadership and learn what motivates people.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Leadership Carousel Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl leading-tight mb-6">
                Leadership is the<br />most important<br />skill you can master
              </h2>
            </div>
            <div>
              <p className="text-gray-600 text-lg">
                Top leaders didn't just make the most of their innate talents – they committed themselves to learning how to motivate, inspire, and positively impact those around them.
              </p>
            </div>
          </div>
          
          <div className="mt-12 overflow-hidden relative">
            <div className="flex space-x-6 animate-carousel">
              {/* Image 1 */}
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Leadership Event" 
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.classList.add("placeholder-image");
                    e.currentTarget.alt = "Leadership Event Image";
                  }}
                />
              </div>
              
              {/* Image 2 */}
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Leadership Training" 
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.classList.add("placeholder-image");
                    e.currentTarget.alt = "Leadership Training Image";
                  }}
                />
              </div>
              
              {/* Image 3 */}
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Team Building" 
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.classList.add("placeholder-image");
                    e.currentTarget.alt = "Team Building Image";
                  }}
                />
              </div>
              
              {/* Duplicate images for continuous scroll */}
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Leadership Event" 
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.classList.add("placeholder-image");
                    e.currentTarget.alt = "Leadership Event Image";
                  }}
                />
              </div>
              
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Leadership Training" 
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.classList.add("placeholder-image");
                    e.currentTarget.alt = "Leadership Training Image";
                  }}
                />
              </div>
              
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Team Building" 
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.classList.add("placeholder-image");
                    e.currentTarget.alt = "Team Building Image";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Agenda Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <div className="flex mb-2">
              <span className="inline-block h-3 w-3 rounded-full bg-magenta"></span>
            </div>
            <div className="uppercase text-sm tracking-widest text-gray-400 mb-2">AGENDA</div>
            <h2 className="font-serif font-bold text-4xl md:text-5xl leading-tight">
              More than 45 years of<br />expertise in 3 powerful days
            </h2>
          </div>
          
          {/* Day 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="text-gray-400 font-medium mb-2">Day 1</div>
              <h3 className="font-serif font-bold text-2xl md:text-3xl mb-4">Awaken your inner leader</h3>
              <p className="text-gray-600">
                Learn why people think, feel, and behave the way they do; how to utilize advanced 
                communication styles; and the fundamentals of leadership.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1531263060782-b024de9b9793?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Leadership Day 1" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.classList.add("placeholder-image");
                  e.currentTarget.alt = "Leadership Workshop Day 1";
                }}
              />
            </div>
          </div>
          
          {/* Day 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="text-gray-400 font-medium mb-2">Day 2</div>
              <h3 className="font-serif font-bold text-2xl md:text-3xl mb-4">Lead through obstacles</h3>
              <p className="text-gray-600">
                Begin using neuro-linguistic programming and deciphering body language 
                communication, while learning how to create positive change.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Leadership Day 2" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.classList.add("placeholder-image");
                  e.currentTarget.alt = "Team Building Day 2";
                }}
              />
            </div>
          </div>
          
          {/* Day 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-gray-400 font-medium mb-2">Day 3</div>
              <h3 className="font-serif font-bold text-2xl md:text-3xl mb-4">Transform your influence</h3>
              <p className="text-gray-600">
                Master the psychology of leadership excellence and learn how to inspire others 
                to achieve their best through empowering delegation and motivation techniques.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Leadership Day 3" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.classList.add("placeholder-image");
                  e.currentTarget.alt = "Leadership Transformation Day 3";
                }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership Legacy CTA */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="font-serif font-bold text-4xl md:text-5xl leading-tight mb-4">
            Create your leadership legacy
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Be more, inspire more, give more than you ever thought possible.
          </p>
          <Button 
            className="bg-white text-black hover:bg-gray-100 px-8 py-3 h-auto rounded-full font-medium"
          >
            Schedule a call
          </Button>
        </div>
      </section>
      
      {/* 4-Grid Leadership Academy Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Top Left - Logo */}
            <div className="bg-[#E83E8C] p-8 md:p-12 rounded-lg flex flex-col justify-center items-center text-center">
              <div className="max-w-[300px]">
                <div className="text-center mb-2">
                  <p className="uppercase tracking-wide text-white font-bold text-sm mb-1">LATINA EMPIRE</p>
                  <h3 className="font-serif text-4xl md:text-5xl font-black tracking-tight text-white leading-none">LEADERSHIP</h3>
                  <p className="uppercase tracking-widest text-white font-medium text-sm mt-1">ACADEMY</p>
                </div>
              </div>
            </div>
            
            {/* Top Right - Title */}
            <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
              <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
                Access exclusive<br />leadership expertise
              </h2>
            </div>
            
            {/* Bottom Left - Paragraph */}
            <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
              <p className="text-gray-600">
                Join our immersive leadership program that provides full access to the proprietary 
                training system Latina Empire has developed specifically for ambitious Latina professionals.
                Learn advanced skills from renowned experts in communication, negotiation, networking, 
                cultural intelligence, and executive presence designed to elevate your career to new heights.
              </p>
            </div>
            
            {/* Bottom Right - Image */}
            <div className="rounded-lg overflow-hidden h-full">
              <img 
                src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Latina Empire Leadership Academy" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.classList.add("placeholder-image");
                  e.currentTarget.alt = "Latina Empire Leadership Academy";
                }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership Academy Speakers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl leading-tight">
                Leadership<br />Academy Speakers
              </h2>
            </div>
            <div>
              <p className="text-gray-600 text-lg">
                Discover our elite lineup of past and present speakers, including successful entrepreneurs, 
                coaches, and thought leaders, handpicked to inspire and empower you.
              </p>
            </div>
          </div>
          
          {/* Speakers Carousel */}
          <div className="mt-8 overflow-hidden relative">
            <div className="flex space-x-6 speakers-carousel">
              {/* Speaker 1 */}
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg overflow-hidden relative group">
                <div className="relative h-96 w-72">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                    alt="Arthur Samuel Joseph" 
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.classList.add("placeholder-image");
                      e.currentTarget.alt = "Speaker Profile";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="font-serif text-white font-bold text-lg">Arthur Samuel Joseph</h3>
                    <p className="text-white text-sm opacity-90">
                      Communication strategist, Founder of Vocal Awareness: Changing the World Through Voice
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Speaker 2 */}
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg overflow-hidden relative group">
                <div className="relative h-96 w-72">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80" 
                    alt="Jan Hargrave" 
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.classList.add("placeholder-image");
                      e.currentTarget.alt = "Speaker Profile";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="font-serif text-white font-bold text-lg">Jan Hargrave</h3>
                    <p className="text-white text-sm opacity-90">
                      Nation's leading expert on body language & non-verbal communication
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Speaker 3 */}
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg overflow-hidden relative group">
                <div className="relative h-96 w-72">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Sid Jacobson" 
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.classList.add("placeholder-image");
                      e.currentTarget.alt = "Speaker Profile";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="font-serif text-white font-bold text-lg">Sid Jacobson</h3>
                    <p className="text-white text-sm opacity-90">
                      Neuro-Linguistic Programming (NLP)
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Speaker 4 */}
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg overflow-hidden relative group">
                <div className="relative h-96 w-72">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                    alt="Dr. Robert Cialdini" 
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.classList.add("placeholder-image");
                      e.currentTarget.alt = "Speaker Profile";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="font-serif text-white font-bold text-lg">Dr. Robert Cialdini</h3>
                    <p className="text-white text-sm opacity-90">
                      Foundational expert in the science of influence, NYT Bestselling Author of Influence: The Psychology of Persuasion
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Duplicate Speakers for Continuous Scrolling */}
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg overflow-hidden relative group">
                <div className="relative h-96 w-72">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                    alt="Arthur Samuel Joseph" 
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.classList.add("placeholder-image");
                      e.currentTarget.alt = "Speaker Profile";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="font-serif text-white font-bold text-lg">Arthur Samuel Joseph</h3>
                    <p className="text-white text-sm opacity-90">
                      Communication strategist, Founder of Vocal Awareness: Changing the World Through Voice
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg overflow-hidden relative group">
                <div className="relative h-96 w-72">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80" 
                    alt="Jan Hargrave" 
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.classList.add("placeholder-image");
                      e.currentTarget.alt = "Speaker Profile";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="font-serif text-white font-bold text-lg">Jan Hargrave</h3>
                    <p className="text-white text-sm opacity-90">
                      Nation's leading expert on body language & non-verbal communication
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <div className="flex mb-2">
              <span className="inline-block h-3 w-3 rounded-full bg-black"></span>
            </div>
            <div className="uppercase text-sm tracking-widest text-gray-400 mb-2">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="font-serif font-bold text-4xl md:text-5xl leading-tight">
              FAQs
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium">
                Contact Us
              </button>
            </div>
            
            <div className="col-span-1 md:col-span-3">
              <div className="space-y-4">
                {/* FAQ Item 1 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer py-2">
                    <h3 className="font-serif font-medium text-lg">What is the Latina Empire Leadership Academy?</h3>
                    <div className="text-gray-400">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                {/* FAQ Item 2 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer py-2">
                    <h3 className="font-serif font-medium text-lg">What makes the Latina Empire Leadership Academy unique?</h3>
                    <div className="text-gray-400">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                {/* FAQ Item 3 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer py-2">
                    <h3 className="font-serif font-medium text-lg">Who is the Latina Empire Leadership Academy for?</h3>
                    <div className="text-gray-400">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                {/* FAQ Item 4 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer py-2">
                    <h3 className="font-serif font-medium text-lg">What can I expect to gain from attending the Latina Empire Leadership Academy?</h3>
                    <div className="text-gray-400">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                {/* FAQ Item 5 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer py-2">
                    <h3 className="font-serif font-medium text-lg">Is the Latina Empire Leadership Academy only for business leaders?</h3>
                    <div className="text-gray-400">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                {/* FAQ Item 6 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer py-2">
                    <h3 className="font-serif font-medium text-lg">How long is the event, and what is the schedule like?</h3>
                    <div className="text-gray-400">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                {/* FAQ Item 7 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer py-2">
                    <h3 className="font-serif font-medium text-lg">Who will I learn from at the Latina Empire Leadership Academy?</h3>
                    <div className="text-gray-400">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                {/* FAQ Item 8 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer py-2">
                    <h3 className="font-serif font-medium text-lg">Will I have access to a community or networking opportunities?</h3>
                    <div className="text-gray-400">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                {/* FAQ Item 9 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer py-2">
                    <h3 className="font-serif font-medium text-lg">What is the refund policy?</h3>
                    <div className="text-gray-400">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Full-width CTA Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')` 
          }}
        >
          {/* Dark overlay with gradient fade at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
            Become the leader<br />you aspire to be
          </h2>
          <Button 
            className="bg-white text-black hover:bg-gray-100 px-8 py-3 h-auto rounded-full font-medium mt-6"
          >
            Schedule a call
          </Button>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="font-serif font-bold text-3xl md:text-4xl">Blog</h2>
              <Link href="/blog" className="text-white/80 hover:text-white flex items-center">
                Explore our blog
                <ChevronDown className="h-4 w-4 ml-2 rotate-[-90deg]" />
              </Link>
            </div>
            <div className="hidden md:flex space-x-2">
              <button className="rounded-full p-2 bg-black border border-gray-700 hover:bg-gray-800">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 bg-black border border-gray-700 hover:bg-gray-800">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blog Post 1 */}
            <div className="bg-black rounded-lg overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Leadership blog post" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="uppercase text-xs tracking-wider text-gray-400 mb-2">LEADERSHIP</div>
                <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-magenta transition-colors">
                  5 Strategies for Latina Leaders to Navigate Global Markets
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  In our previous post, we explored how cultural intelligence creates a competitive edge. Today we're diving into specific strategies for...
                </p>
              </div>
            </div>
            
            {/* Blog Post 2 */}
            <div className="bg-black rounded-lg overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Business leadership blog post" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="uppercase text-xs tracking-wider text-gray-400 mb-2">BUSINESS</div>
                <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-magenta transition-colors">
                  Breaking the Glass Ceiling: Latina Leadership in Corporate America
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  Our research with successful Latina executives reveals key strategies for overcoming bias and advancing to the C-suite. Learn how to...
                </p>
              </div>
            </div>
            
            {/* Blog Post 3 */}
            <div className="bg-black rounded-lg overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1589666564459-93cdd3ab856a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Influence blog post" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="uppercase text-xs tracking-wider text-gray-400 mb-2">LEADERSHIP • ACADEMY</div>
                <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-magenta transition-colors">
                  Leveraging Cultural Heritage in Leadership
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  Latina Empire Academy teaches how embracing your cultural roots creates an authentic leadership style that bridges diverse perspectives in today's global business environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;