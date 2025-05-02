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
  return (
    <Link href={`/events/${event.slug}`} className="block">
      <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
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
        <div className="absolute inset-0 z-20 flex flex-col justify-end text-white">
          {/* Tag at top */}
          <div className="absolute top-6 left-6">
            <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="text-[10px] uppercase tracking-wider font-medium">IN-PERSON & VIRTUAL</span>
            </div>
          </div>
          
          {/* Main content at bottom */}
          <div className="p-6 lg:p-8">
            {/* Title - Simplified and larger */}
            <h3 className="font-sans font-bold text-2xl md:text-3xl mb-2 leading-tight tracking-tight">
              {event.name}
            </h3>
            
            {/* Description - Hidden on small screens, shortened on all screens */}
            <p className="text-white/80 text-sm md:text-base max-w-md mb-4 hidden sm:block line-clamp-2">
              {event.shortDescription}
            </p>

            {/* Event Details - Simplified */}
            <div className="flex items-center gap-6 text-white/90 text-xs uppercase">
              <div>
                <div className="text-[10px] text-white/60 mb-1 tracking-wider">DATE</div>
                <div className="font-medium">{event.date}</div>
              </div>
              <div>
                <div className="text-[10px] text-white/60 mb-1 tracking-wider">PLACE</div>
                <div className="font-medium">{event.location}</div>
              </div>
            </div>
          </div>
          
          {/* Brand Logo - Smaller and positioned at top */}
          <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm rounded px-3 py-1.5">
            <div className="text-white uppercase font-bold text-center leading-none">
              <span className="text-[8px] tracking-wider">LATINA</span>
              <div className="text-sm tracking-tight">EMPIRE</div>
            </div>
          </div>
          
          {/* Learn More Button - Shows on Hover */}
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button className="bg-white text-black hover:bg-white/90 rounded-full text-sm px-4 py-1.5 h-auto">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Loading skeleton for event cards
const EventCardSkeleton = () => (
  <div className="relative aspect-video rounded-lg overflow-hidden animate-pulse bg-gray-800">
    {/* Simulating the gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
    
    <div className="absolute inset-0 z-20 flex flex-col">
      {/* Tag skeleton - top left */}
      <div className="absolute top-6 left-6">
        <div className="h-5 w-28 bg-white/20 rounded-full"></div>
      </div>
      
      {/* Logo skeleton - top right */}
      <div className="absolute top-6 right-6 h-8 w-16 bg-black/70 rounded"></div>
      
      {/* Content skeleton - bottom */}
      <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
        {/* Title skeleton */}
        <div className="h-7 bg-white/30 rounded mb-2 w-3/4"></div>
        <div className="h-7 bg-white/30 rounded mb-4 w-1/2"></div>
        
        {/* Description skeleton - hide on small screens */}
        <div className="hidden sm:block h-4 bg-white/20 rounded mb-2 w-full"></div>
        <div className="hidden sm:block h-4 bg-white/20 rounded mb-4 w-2/3"></div>
        
        {/* Event details skeleton */}
        <div className="flex gap-6">
          <div className="w-20">
            <div className="h-3 bg-white/20 rounded mb-1 w-full"></div>
            <div className="h-4 bg-white/30 rounded w-full"></div>
          </div>
          <div className="w-20">
            <div className="h-3 bg-white/20 rounded mb-1 w-full"></div>
            <div className="h-4 bg-white/30 rounded w-full"></div>
          </div>
        </div>
      </div>
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
            <div className="lg:max-w-2xl mb-10 lg:mb-0">
              <h1 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-tight">
                Explore Latina Empire Events
              </h1>
            </div>
            <div className="lg:max-w-md">
              <div className="bg-black text-white">
                <p className="text-base md:text-lg mb-4 text-gray-300">
                  Join us in-person and experience the energy, connection, and transformation of Latina Empire events. Whether it's a workshop, live activation, or global gathering — this is where your next chapter begins.
                </p>
                <Button className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-5 h-auto">
                  View the calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latina Empire Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif font-bold text-3xl mb-10 text-center">Upcoming Latina Empire Events</h2>
          {isLoadingUpcoming ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          ) : hasError ? (
            // Error state
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
              <div className="absolute inset-0 z-20 p-10 lg:p-16 flex flex-col justify-center items-start max-w-2xl">
                <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm mb-6">
                  <span className="text-xs uppercase tracking-wide font-medium text-white">CONNECTION ERROR</span>
                </div>
                <h3 className="font-sans font-bold text-3xl lg:text-4xl mb-4 text-white leading-tight">Unable to Load Events</h3>
                <p className="font-sans text-white/80 text-lg mb-8 max-w-lg">
                  We're having trouble connecting to our event database. This might be a temporary connection issue.
                </p>
                <Button 
                  onClick={() => upcomingEventsQuery.refetch()}
                  className="bg-white text-black hover:bg-white/90 font-medium px-6 py-3"
                >
                  Retry Connection
                </Button>
              </div>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
              <div className="absolute inset-0 z-20 p-10 lg:p-16 flex flex-col justify-center items-start max-w-2xl">
                <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm mb-6">
                  <span className="text-xs uppercase tracking-wide font-medium text-white">COMING SOON</span>
                </div>
                <h3 className="font-sans font-bold text-3xl lg:text-4xl mb-4 text-white leading-tight">New Events Being Planned</h3>
                <p className="font-sans text-white/80 text-lg mb-8 max-w-lg">
                  We're currently planning our next series of transformative events. Join our mailing list to be the first to know when registrations open.
                </p>
                <Button className="bg-white text-black hover:bg-white/90 font-medium px-6 py-3">
                  Join Our Mailing List
                </Button>
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