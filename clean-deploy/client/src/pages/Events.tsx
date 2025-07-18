import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ChevronDown, ChevronUp, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
// Footer is already included in App.tsx

import { eventsService } from "@/lib/eventsService";
import { Event } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const EventCard = ({ event }: { event: Event }) => {
  // Generate event type for the demo based on event name and location
  let eventType = { tag: "IN-PERSON", name: "LEADERSHIP ACADEMY" };
  
  if (event.name.includes("Wealth") || event.name.includes("Financial")) {
    eventType = { tag: event.location === "Virtual Event" ? "VIRTUAL" : "IN-PERSON", name: "WEALTH ACADEMY" };
  } else if (event.name.includes("Tech") || event.name.includes("Innovation")) {
    eventType = { tag: event.location === "Virtual Event" ? "VIRTUAL" : "IN-PERSON", name: "TECH ACADEMY" };
  } else if (event.name.includes("Wellness") || event.name.includes("Retreat")) {
    eventType = { tag: "IN-PERSON", name: "WELLNESS TRACK" };
  } else if (event.name.includes("Leadership") || event.name.includes("Conference")) {
    eventType = { tag: "IN-PERSON", name: "SUCCESS SUMMIT" };
  } else if (event.name.includes("Master") || event.name.includes("Workshop")) {
    eventType = { tag: event.location === "Virtual Event" ? "VIRTUAL" : "IN-PERSON", name: "LATINA ACADEMY" };
  } else if (event.name.includes("Entrepreneur")) {
    eventType = { tag: event.location === "Virtual Event" ? "VIRTUAL" : "IN-PERSON", name: "EMPIRE ACADEMY" };
  }
  
  return (
    <Link href={`/events/${event.slug}`}>
      <div className="relative aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10" />
        
        <img 
          src={event.image} 
          alt={event.name}
          onError={(e) => {
            e.currentTarget.classList.add("hidden");
            e.currentTarget.parentElement?.classList.add("placeholder-image");
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 p-4 sm:p-6 md:p-8 flex flex-col justify-end text-white space-y-3">
          {/* Top Tags - Responsive positioning and styling */}
          <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 flex flex-wrap gap-2 max-w-[80%]">
            <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
              <span className="text-xs uppercase tracking-wider font-medium">{eventType.tag}</span>
            </div>
            <div className="inline-flex items-center bg-magenta px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
              <span className="text-xs uppercase tracking-wider font-medium">{eventType.name}</span>
            </div>
          </div>
          
          {/* Main content at bottom - Improved responsive layout */}
          <div className="w-full pr-4 sm:pr-24 md:pr-32">
            {/* Title - Responsive typography */}
            <h3 className="font-sans font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-4 leading-tight tracking-tight line-clamp-2">
              {event.name}
            </h3>
            
            {/* Description - Hidden on smallest screens */}
            <p className="hidden sm:block text-white/90 text-sm sm:text-base max-w-md mb-2 sm:mb-4 leading-relaxed line-clamp-2">
              {event.shortDescription.split('.')[0]}.
            </p>
            
            {/* Event metadata - Stacked on mobile, side by side on larger screens */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 items-start sm:items-center text-xs sm:text-sm text-white/80">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-magenta" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-magenta" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>
          </div>
          
          {/* Brand Logo - Responsive positioning */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 bg-black text-white p-2 sm:p-3 rounded shadow-md">
            <div className="uppercase font-bold text-center leading-none">
              <div className="text-xs tracking-widest mb-1">{eventType.name.split(' ')[0]}</div>
              <div className="text-xs sm:text-sm tracking-wider">{eventType.name.split(' ')[1] || "ACADEMY"}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Loading skeleton for event cards
const EventCardSkeleton = () => (
  <div className="relative aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden animate-pulse bg-gray-800 shadow-md">
    {/* Simulating the gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
    
    <div className="absolute inset-0 z-20 flex flex-col">
      {/* Tags skeleton - top left with responsive positioning */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 flex flex-wrap gap-2">
        <div className="h-5 w-20 sm:w-24 md:w-28 bg-white/20 rounded-full"></div>
        <div className="h-5 w-16 sm:w-18 md:w-20 bg-magenta/60 rounded-full"></div>
      </div>
      
      {/* Content skeleton - bottom with responsive layout */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8">
        <div className="pr-4 sm:pr-20 md:pr-32">
          {/* Title skeleton - responsive sizing */}
          <div className="h-6 sm:h-8 md:h-10 bg-white/30 rounded mb-2 w-1/2"></div>
          <div className="hidden sm:block h-6 sm:h-8 md:h-10 bg-white/30 rounded mb-2 sm:mb-4 w-1/3"></div>
          
          {/* Description skeleton - hidden on mobile */}
          <div className="hidden sm:block h-4 sm:h-5 bg-white/20 rounded mb-2 sm:mb-4 w-full max-w-md"></div>
          
          {/* Event metadata skeleton - stacked on mobile */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-3.5 w-3.5 rounded-full bg-magenta"></div>
              <div className="h-3.5 sm:h-4 w-14 sm:w-16 bg-white/30 rounded"></div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3.5 w-3.5 rounded-full bg-magenta"></div>
              <div className="h-3.5 sm:h-4 w-16 sm:w-20 bg-white/30 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logo skeleton - responsive positioning */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 h-12 sm:h-14 md:h-16 w-18 sm:w-20 md:w-24 bg-black rounded"></div>
    </div>
  </div>
);

const Events = () => {
  const upcomingEventsQuery = useQuery({
    queryKey: ['/api/events/upcoming'],
    queryFn: () => eventsService.getUpcomingEvents(),
  });

  const upcomingEvents = upcomingEventsQuery.data || [];
  const isLoadingUpcoming = upcomingEventsQuery.isLoading;
  const hasError = upcomingEventsQuery.isError;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="hero-navbar-spacing pt-10 pb-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-2xl mb-0">
              <h1 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-tight">
                Explore Latina Empire Events
              </h1>
            </div>
            <div className="lg:max-w-md">
              <div className="bg-black text-white">
                <p className="text-base md:text-lg mb-4 text-gray-300">
                  Whether it's a workshop, live activation, or global gathering — this is where your next chapter begins.
                </p>
                <Link href="/events-calendar">
                  <Button className="bg-white hover:bg-gray-100 text-black font-semibold text-lg py-1.5 px-8 rounded-full transition-all shadow-xl w-fit">
                    View the calendar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Text Area */}
      <section className="pt-16 pb-8 bg-white spacing-compact">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              Discover transformational retreats, summits, and workshops led by the most powerful Latina leaders across the globe.
            </p>
          </div>
        </div>
      </section>
          
      {/* Events Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4 md:px-6">
          
          {isLoadingUpcoming ? (
            // Loading state
            <div className="space-y-20">
              {/* Section Headers Skeleton */}
              <div className="mb-16">
                {/* Section Title Skeleton */}
                <div className="h-10 bg-gray-200 rounded w-64 mb-10 pb-4 border-b border-gray-200"></div>

                {/* Featured event skeleton */}
                <div className="relative aspect-[21/9] rounded-xl overflow-hidden animate-pulse bg-gray-800 shadow-lg mb-16">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                  <div className="absolute inset-0 z-20 flex flex-col">
                    {/* Tags skeleton - top left */}
                    <div className="absolute top-8 left-8 flex gap-2">
                      <div className="h-5 w-32 bg-white/20 rounded-full"></div>
                      <div className="h-5 w-28 bg-magenta/60 rounded-full"></div>
                    </div>
                    
                    {/* Content skeleton - bottom left */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="pr-32">
                        {/* Title skeleton */}
                        <div className="h-12 bg-white/30 rounded mb-3 w-2/3"></div>
                        <div className="h-12 bg-white/30 rounded mb-6 w-1/2"></div>
                        
                        {/* Description skeleton */}
                        <div className="h-6 bg-white/20 rounded mb-2 w-full max-w-md"></div>
                        <div className="h-6 bg-white/20 rounded mb-8 w-4/5 max-w-md"></div>
                        
                        {/* Event metadata skeleton */}
                        <div className="flex gap-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-magenta"></div>
                            <div className="h-5 w-20 bg-white/30 rounded"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-magenta"></div>
                            <div className="h-5 w-24 bg-white/30 rounded"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-magenta"></div>
                            <div className="h-5 w-32 bg-white/30 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Logo skeleton - bottom right */}
                    <div className="absolute bottom-8 right-8 h-20 w-28 bg-black rounded"></div>
                  </div>
                </div>
                
                {/* Regular events skeleton - Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {[...Array(2)].map((_, index) => (
                    <EventCardSkeleton key={`sig-${index}`} />
                  ))}
                </div>
              </div>
              
              {/* Academy Tracks Section Skeleton */}
              <div className="mb-16">
                <div className="h-10 bg-gray-200 rounded w-56 mb-10 pb-4 border-b border-gray-200"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {[...Array(2)].map((_, index) => (
                    <EventCardSkeleton key={`track-${index}`} />
                  ))}
                </div>
              </div>
              
              {/* Virtual Events Section Skeleton */}
              <div className="mb-16">
                <div className="h-10 bg-gray-200 rounded w-48 mb-10 pb-4 border-b border-gray-200"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {[...Array(2)].map((_, index) => (
                    <EventCardSkeleton key={`virtual-${index}`} />
                  ))}
                </div>
              </div>
            </div>
          ) : hasError ? (
            // Error state
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-black shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
              <div className="absolute inset-0 z-20 p-10 md:p-14 lg:p-20 flex flex-col justify-end">
                <div className="absolute top-10 left-10 md:top-14 md:left-14 lg:top-20 lg:left-20">
                  <div className="inline-flex items-center bg-red-900/70 px-3 py-1 rounded-full backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-wider font-medium text-white">CONNECTION ERROR</span>
                  </div>
                </div>
                
                <div className="max-w-4xl pr-32">
                  <h3 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
                    Unable to
                    <br />
                    load events
                  </h3>
                  <p className="text-white/90 text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed">
                    We're having trouble connecting to our event database. This might be a temporary connection issue.
                  </p>
                  <Button 
                    onClick={() => upcomingEventsQuery.refetch()}
                    className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-1.5 h-auto text-base"
                  >
                    Retry Connection
                  </Button>
                </div>
                
                {/* Brand Logo */}
                <div className="absolute bottom-10 right-10 md:bottom-14 md:right-14 lg:bottom-20 lg:right-20 bg-black text-white p-3 rounded">
                  <div className="uppercase font-bold text-center leading-none">
                    <div className="text-xs tracking-widest mb-1">LATINA</div>
                    <div className="text-sm tracking-wider">EMPIRE</div>
                  </div>
                </div>
              </div>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="space-y-20">
              {/* Upcoming Signature Events Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-serif font-bold mb-10 pb-4 border-b border-gray-200">Upcoming Signature Events</h2>
                
                {/* Featured Event */}
                <Link href={`/events/${upcomingEvents[0].slug}`} className="block mb-16">
                  <div className="relative aspect-[21/9] rounded-xl overflow-hidden shadow-lg">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                    <img 
                      src={upcomingEvents[0].image} 
                      alt={upcomingEvents[0].name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-end text-white">
                      {/* Tag at top */}
                      <div className="absolute top-8 left-8 flex gap-2 flex-wrap">
                        <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          <span className="text-xs uppercase tracking-wider font-medium">SIGNATURE EVENT</span>
                        </div>
                        <div className="inline-flex items-center bg-magenta/60 px-3 py-1 rounded-full backdrop-blur-sm">
                          <span className="text-xs uppercase tracking-wider font-medium">SUCCESS SUMMIT</span>
                        </div>
                      </div>
                      
                      <div className="w-full pr-32">
                        {/* Title */}
                        <h3 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-tight">
                          {upcomingEvents[0].name}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-white/90 text-base md:text-lg max-w-md mb-6 leading-relaxed">
                          {upcomingEvents[0].shortDescription}
                        </p>
                        
                        {/* Event metadata */}
                        <div className="flex flex-wrap gap-6 items-center text-base text-white/80 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-magenta" />
                            {upcomingEvents[0].date}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-magenta" />
                            {upcomingEvents[0].location}
                          </div>
                          {upcomingEvents[0].host && (
                            <div className="flex items-center gap-2">
                              <Users className="h-5 w-5 text-magenta" />
                              Hosted by {upcomingEvents[0].host}
                            </div>
                          )}
                        </div>
                      </div>
                    
                      {/* Brand Logo */}
                      <div className="absolute bottom-8 right-8 bg-black text-white p-3 rounded">
                        <div className="uppercase font-bold text-center leading-none">
                          <div className="text-xs tracking-widest mb-1">LATINA EMPIRE</div>
                          <div className="text-sm tracking-wider">SUCCESS<br/>SUMMIT</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Additional Signature Events */}
                {upcomingEvents.filter(event => 
                  event.name.includes("Leadership") || 
                  event.name.includes("Conference") || 
                  event.name.includes("Summit")).length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {upcomingEvents.filter(event => 
                      event.name.includes("Leadership") || 
                      event.name.includes("Conference") || 
                      event.name.includes("Summit"))
                      .slice(0, 2)
                      .map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))
                    }
                  </div>
                )}
              </div>
              
              {/* Latina Academy Tracks Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-serif font-bold mb-10 pb-4 border-b border-gray-200">Latina Academy Tracks</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {upcomingEvents.filter(event => 
                    event.name.includes("Wealth") || 
                    event.name.includes("Wellness") || 
                    event.name.includes("Master") ||
                    event.name.includes("Financial"))
                    .map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))
                  }
                </div>
              </div>
              
              {/* Virtual Masterclasses Section - if there are virtual events */}
              {upcomingEvents.filter(event => event.location === "Virtual Event").length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-serif font-bold mb-10 pb-4 border-b border-gray-200">Virtual Masterclasses</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {upcomingEvents.filter(event => event.location === "Virtual Event")
                      .map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-black shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
              <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-end">
                <div className="absolute top-8 left-8">
                  <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-wider font-medium text-white">COMING SOON</span>
                  </div>
                </div>
                
                <div className="w-full pr-32">
                  <h3 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-white leading-tight">
                    New events
                    <br />
                    being planned
                  </h3>
                  <p className="text-white/90 text-base md:text-lg max-w-md mb-8 leading-relaxed">
                    We're currently planning our next series of transformative events. Join our mailing list to be the first to know when registrations open.
                  </p>
                  <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-1.5 h-auto text-base">
                    Join Our Mailing List
                  </Button>
                </div>
                
                {/* Brand Logo */}
                <div className="absolute bottom-8 right-8 bg-black text-white p-3 rounded">
                  <div className="uppercase font-bold text-center leading-none">
                    <div className="text-xs tracking-widest mb-1">LATINA</div>
                    <div className="text-sm tracking-wider">EMPIRE</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-magenta to-purple-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-8">
              Be a Part of Our Next Movement
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join us at our upcoming events and connect with powerful Latina leaders from around the world.
            </p>
            <Link href="/events-calendar">
              <Button className="bg-white hover:bg-gray-100 text-black font-semibold text-lg py-6 px-10 rounded-lg transition-all shadow-2xl">
                View the Full Calendar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer is rendered in App.tsx */}
    </div>
  );
};

export default Events;