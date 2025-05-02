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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md group hover:shadow-magenta">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          onError={(e) => {
            e.currentTarget.classList.add("hidden");
            e.currentTarget.parentElement?.classList.add("placeholder-image");
          }}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium">{event.location}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3 text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.date}</span>
        </div>
        <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-magenta transition-colors">{event.name}</h3>
        <p className="font-sans text-gray-600 mb-4 line-clamp-3">
          {event.shortDescription}
        </p>
        <div className="flex items-center mb-4">
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
            <p className="font-sans font-semibold text-sm">Hosted by {event.host}</p>
            {event.hostTitle && <p className="font-sans text-xs text-gray-500">{event.hostTitle}</p>}
          </div>
        </div>
        <Link href={`/events/${event.slug}`}>
          <Button className="w-full bg-white text-magenta border-2 border-magenta hover:bg-magenta hover:text-white transition-magenta flex items-center justify-center">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Loading skeleton for event cards (retained for loading state)
const EventCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse">
    <div className="h-64 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
      <div className="h-6 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      <div className="h-10 bg-gray-200 rounded"></div>
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
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Upcoming Events
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-700 mb-10">
              Join us at our transformative events designed to empower Latina professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {isLoadingUpcoming ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          ) : hasError ? (
            // Error state
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <h3 className="font-serif font-semibold text-xl mb-2 text-red-600">Unable to Load Events</h3>
              <p className="font-sans text-gray-700 mb-4">
                We're having trouble loading our events. Please refresh the page or try again later.
              </p>
              <Button 
                onClick={() => upcomingEventsQuery.refetch()}
                className="bg-magenta text-white hover:bg-magenta/90"
              >
                Try Again
              </Button>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="font-serif font-semibold text-xl mb-2">No Upcoming Events</h3>
              <p className="font-sans text-gray-600 mb-4">
                Check back soon for new event announcements, or join our mailing list to be the first to know.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Events;