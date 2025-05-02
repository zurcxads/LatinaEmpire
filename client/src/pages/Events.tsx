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
      <div className="relative aspect-[16/10] rounded-lg overflow-hidden group cursor-pointer">
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
        <div className="absolute inset-0 z-20 p-10 flex flex-col justify-center text-white">
          {/* Tag at top */}
          <div className="absolute top-8 left-8">
            <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="text-[10px] uppercase tracking-wider font-medium">IN-PERSON & VIRTUAL</span>
            </div>
          </div>
          
          {/* Main content centered */}
          <div className="max-w-lg">
            {/* Title - Large and Bold */}
            <h3 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight tracking-tight">
              {event.name}
            </h3>
            
            {/* Description - Larger and more visible */}
            <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-md mb-8 leading-relaxed">
              {event.shortDescription}
            </p>

            {/* Learn More Button */}
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-2.5 h-auto text-base">
              Learn More
            </Button>
          </div>
          
          {/* Brand Logo - Top right */}
          <div className="absolute top-8 right-8 bg-black/70 backdrop-blur-sm rounded px-4 py-2">
            <div className="text-white uppercase font-bold text-center leading-none">
              <span className="text-[10px] tracking-wider">LATINA</span>
              <div className="text-sm tracking-tight">EMPIRE</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Loading skeleton for event cards
const EventCardSkeleton = () => (
  <div className="relative aspect-[16/10] rounded-lg overflow-hidden animate-pulse bg-gray-800">
    {/* Simulating the gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
    
    <div className="absolute inset-0 z-20 flex flex-col">
      {/* Tag skeleton - top left */}
      <div className="absolute top-8 left-8">
        <div className="h-5 w-28 bg-white/20 rounded-full"></div>
      </div>
      
      {/* Logo skeleton - top right */}
      <div className="absolute top-8 right-8 h-8 w-16 bg-black/70 rounded"></div>
      
      {/* Content skeleton - centered */}
      <div className="absolute inset-0 p-10 flex flex-col justify-center">
        {/* Title skeleton */}
        <div className="h-9 bg-white/30 rounded mb-2 w-3/5"></div>
        <div className="h-9 bg-white/30 rounded mb-6 w-2/5"></div>
        
        {/* Description skeleton */}
        <div className="h-5 bg-white/20 rounded mb-2 w-full max-w-md"></div>
        <div className="h-5 bg-white/20 rounded mb-8 w-4/5 max-w-sm"></div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-white/90 rounded-full w-32"></div>
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
          <h2 className="font-serif font-bold text-3xl mb-10 text-center">Latina Empire Events</h2>
          
          {isLoadingUpcoming ? (
            // Loading state
            <div className="space-y-16">
              {/* Featured event skeleton */}
              <div className="relative aspect-[21/9] rounded-lg overflow-hidden animate-pulse bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
                <div className="absolute inset-0 z-20 p-10 flex flex-col justify-center">
                  <div className="h-5 w-32 bg-white/20 rounded-full mb-6"></div>
                  <div className="h-12 bg-white/30 rounded mb-3 w-1/2 max-w-xl"></div>
                  <div className="h-12 bg-white/30 rounded mb-6 w-1/3 max-w-md"></div>
                  <div className="h-6 bg-white/20 rounded mb-2 w-full max-w-xl"></div>
                  <div className="h-6 bg-white/20 rounded mb-8 w-2/3 max-w-lg"></div>
                  <div className="h-10 bg-white/90 rounded-full w-40"></div>
                </div>
              </div>
              
              {/* Regular events skeleton */}
              <div>
                <h3 className="font-serif font-bold text-2xl mb-8">More Upcoming Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {[...Array(2)].map((_, index) => (
                    <EventCardSkeleton key={index} />
                  ))}
                </div>
              </div>
            </div>
          ) : hasError ? (
            // Error state
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
              <div className="absolute inset-0 z-20 p-10 lg:p-16 flex flex-col justify-center items-start max-w-2xl">
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
            <div className="space-y-16">
              {/* Featured Event */}
              <div className="relative aspect-[21/9] rounded-lg overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
                <img 
                  src={upcomingEvents[0].image} 
                  alt={upcomingEvents[0].name}
                  className="w-full h-full object-cover"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">
                  {/* Tag */}
                  <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm mb-8">
                    <span className="text-xs uppercase tracking-wider font-medium">IN-PERSON & VIRTUAL</span>
                  </div>
                  
                  <div className="max-w-3xl">
                    {/* Title */}
                    <h3 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight tracking-tight">
                      {upcomingEvents[0].name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                      {upcomingEvents[0].shortDescription}
                    </p>

                    {/* Event Details */}
                    <div className="flex flex-wrap items-center gap-8 text-white/90 text-sm uppercase mb-8">
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
                    
                    {/* CTA Button */}
                    <Link href={`/events/${upcomingEvents[0].slug}`}>
                      <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3 h-auto text-base">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Brand Logo */}
                  <div className="absolute top-8 right-8 md:right-16 bg-black/70 backdrop-blur-sm rounded px-6 py-4">
                    <div className="text-white uppercase font-bold text-center leading-none">
                      <span className="text-xs tracking-wider">LATINA</span>
                      <div className="text-2xl tracking-tight">EMPIRE</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Other Events - Skip the first (featured) event */}
              {upcomingEvents.length > 1 && (
                <div>
                  <h3 className="font-serif font-bold text-2xl mb-8">More Upcoming Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {upcomingEvents.slice(1).map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}
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