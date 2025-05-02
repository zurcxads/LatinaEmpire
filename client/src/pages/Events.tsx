import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ChevronDown, ChevronUp, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { eventsService } from "@/lib/eventsService";
import { Event } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const EventCard = ({ event }: { event: Event }) => {
  // Generate a random event type for the demo
  const eventTypes = [
    { tag: "VIRTUAL", name: "LEADERSHIP ACADEMY" },
    { tag: "IN-PERSON", name: "BUSINESS MASTERY" },
    { tag: "HYBRID", name: "LIFE MASTERY" },
    { tag: "VIRTUAL", name: "SUCCESS SUMMIT" }
  ];
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  
  return (
    <Link href={`/events/${event.slug}`} className="block">
      <div className="relative aspect-[16/11] rounded-xl overflow-hidden group cursor-pointer shadow-lg">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
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
        <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-end text-white">
          {/* Tag at top */}
          <div className="absolute top-8 left-8">
            <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider font-medium">{eventType.tag}</span>
            </div>
          </div>
          
          {/* Main content at bottom */}
          <div className="w-full pr-32">
            {/* Title - Large and Bold */}
            <h3 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-tight">
              {event.name.split(' ').slice(0, 4).join(' ')}
            </h3>
            
            {/* Simple Description */}
            <p className="text-white/90 text-base md:text-lg max-w-md mb-0 leading-relaxed">
              {event.shortDescription.split('.')[0]}.
            </p>
          </div>
          
          {/* Brand Logo - Bottom right */}
          <div className="absolute bottom-8 right-8 bg-black text-white p-3 rounded">
            <div className="uppercase font-bold text-center leading-none">
              <div className="text-xs tracking-widest mb-1">{eventType.name.split(' ')[0]}</div>
              <div className="text-sm tracking-wider">{eventType.name.split(' ')[1] || "ACADEMY"}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Loading skeleton for event cards
const EventCardSkeleton = () => (
  <div className="relative aspect-[16/11] rounded-xl overflow-hidden animate-pulse bg-gray-800 shadow-lg">
    {/* Simulating the gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
    
    <div className="absolute inset-0 z-20 flex flex-col">
      {/* Tag skeleton - top left */}
      <div className="absolute top-8 left-8">
        <div className="h-5 w-28 bg-white/20 rounded-full"></div>
      </div>
      
      {/* Content skeleton - bottom left */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="pr-32">
          {/* Title skeleton */}
          <div className="h-10 bg-white/30 rounded mb-2 w-1/2"></div>
          <div className="h-10 bg-white/30 rounded mb-6 w-1/3"></div>
          
          {/* Description skeleton */}
          <div className="h-5 bg-white/20 rounded mb-2 w-full max-w-md"></div>
          <div className="h-5 bg-white/20 rounded w-2/3 max-w-md"></div>
        </div>
      </div>
      
      {/* Logo skeleton - bottom right */}
      <div className="absolute bottom-8 right-8 h-16 w-24 bg-black rounded"></div>
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
      <section className="pt-28 pb-16 bg-black text-white">
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
                <Button className="bg-white hover:bg-gray-100 text-black font-semibold text-lg py-1.5 px-8 rounded-full transition-all shadow-xl w-fit">
                  View the calendar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          
          {isLoadingUpcoming ? (
            // Loading state
            <div className="space-y-16">
              {/* Featured event skeleton */}
              <div className="relative aspect-[21/9] rounded-xl overflow-hidden animate-pulse bg-gray-800 shadow-lg mb-16">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                <div className="absolute inset-0 z-20 flex flex-col">
                  {/* Tag skeleton - top left */}
                  <div className="absolute top-10 left-10 md:top-14 md:left-14 lg:top-20 lg:left-20">
                    <div className="h-5 w-36 bg-white/20 rounded-full"></div>
                  </div>
                  
                  {/* Content skeleton - bottom left */}
                  <div className="absolute bottom-20 left-10 right-0 md:left-14 lg:left-20 p-0">
                    {/* Title skeleton */}
                    <div className="h-14 bg-white/30 rounded mb-3 w-3/4 max-w-xl"></div>
                    <div className="h-14 bg-white/30 rounded mb-8 w-1/2 max-w-md"></div>
                    
                    {/* Description skeleton */}
                    <div className="h-8 bg-white/20 rounded mb-2 w-full max-w-2xl"></div>
                    <div className="h-8 bg-white/20 rounded mb-12 w-4/5 max-w-2xl"></div>
                    
                    {/* Event details skeleton */}
                    <div className="flex gap-8">
                      <div className="w-24">
                        <div className="h-3 bg-white/30 rounded mb-2 w-full"></div>
                        <div className="h-5 bg-white/40 rounded w-full"></div>
                      </div>
                      <div className="w-24">
                        <div className="h-3 bg-white/30 rounded mb-2 w-full"></div>
                        <div className="h-5 bg-white/40 rounded w-full"></div>
                      </div>
                      <div className="w-24">
                        <div className="h-3 bg-white/30 rounded mb-2 w-full"></div>
                        <div className="h-5 bg-white/40 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Logo skeleton - top right */}
                  <div className="absolute top-10 right-10 md:top-14 md:right-14 lg:top-20 lg:right-20 h-24 w-36 bg-black rounded"></div>
                </div>
              </div>
              
              {/* Regular events skeleton */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {[...Array(2)].map((_, index) => (
                    <EventCardSkeleton key={index} />
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
                
                <div className="max-w-4xl">
                  <h3 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
                    Unable to
                    <br />
                    load events
                  </h3>
                  <p className="text-white/90 text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed pr-4">
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
                <div className="absolute top-10 right-10 md:top-14 md:right-14 lg:top-20 lg:right-20 bg-black/90 p-4 rounded">
                  <div className="text-white uppercase font-bold text-center leading-none">
                    <div className="text-sm tracking-widest mb-1">LATINA</div>
                    <div className="text-2xl tracking-wider">EMPIRE</div>
                  </div>
                </div>
              </div>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="space-y-16">
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
                  <div className="absolute inset-0 z-20 p-10 md:p-14 lg:p-20 flex flex-col justify-end text-white">
                    {/* Tag at top */}
                    <div className="absolute top-10 left-10 md:top-14 md:left-14 lg:top-20 lg:left-20">
                      <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-wider font-medium">BUSINESS MASTERY</span>
                      </div>
                    </div>
                    
                    <div className="max-w-4xl">
                      {/* Title */}
                      <h3 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight tracking-tight">
                        Grow your business <br />exponentially
                      </h3>
                      
                      {/* Description */}
                      <p className="text-white/90 text-xl md:text-2xl max-w-2xl mb-0 leading-relaxed pr-4">
                        Get the concrete strategies and tools that have transformed thousands of businesses at every stage.
                      </p>
                    </div>
                    
                    {/* Event Details */}
                    <div className="flex flex-wrap items-center gap-8 text-white/90 text-sm uppercase mt-12">
                      <div>
                        <div className="text-[10px] text-white/60 mb-1 tracking-wider">DATE</div>
                        <div className="font-medium">{upcomingEvents[0].date}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white/60 mb-1 tracking-wider">PLACE</div>
                        <div className="font-medium">{upcomingEvents[0].location}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white/60 mb-1 tracking-wider">TIMEZONE</div>
                        <div className="font-medium">Eastern</div>
                      </div>
                    </div>
                  
                    {/* Brand Logo */}
                    <div className="absolute top-10 right-10 md:top-14 md:right-14 lg:top-20 lg:right-20 bg-black/90 p-4 rounded">
                      <div className="text-white uppercase font-bold text-center leading-none">
                        <div className="text-sm tracking-widest mb-1">TONY ROBBINS</div>
                        <div className="text-2xl tracking-wider">BUSINESS<br/>MASTERY</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Other Events - Skip the first (featured) event */}
              {upcomingEvents.length > 1 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {upcomingEvents.slice(1).map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-black shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
              <div className="absolute inset-0 z-20 p-10 md:p-14 lg:p-20 flex flex-col justify-end">
                <div className="absolute top-10 left-10 md:top-14 md:left-14 lg:top-20 lg:left-20">
                  <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-wider font-medium text-white">COMING SOON</span>
                  </div>
                </div>
                
                <div className="max-w-4xl">
                  <h3 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
                    New events
                    <br />
                    being planned
                  </h3>
                  <p className="text-white/90 text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed pr-4">
                    We're currently planning our next series of transformative events. Join our mailing list to be the first to know when registrations open.
                  </p>
                  <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-1.5 h-auto text-base">
                    Join Our Mailing List
                  </Button>
                </div>
                
                {/* Brand Logo */}
                <div className="absolute top-10 right-10 md:top-14 md:right-14 lg:top-20 lg:right-20 bg-black/90 p-4 rounded">
                  <div className="text-white uppercase font-bold text-center leading-none">
                    <div className="text-sm tracking-widest mb-1">LATINA</div>
                    <div className="text-2xl tracking-wider">EMPIRE</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Events;