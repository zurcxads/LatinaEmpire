import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUpcomingEvents, getPastEvents, Event } from "@/data/events";

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name} 
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
          {event.hostImage && (
            <img 
              src={event.hostImage} 
              alt={event.host} 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          )}
          <div>
            <p className="font-sans font-semibold text-sm">Hosted by {event.host}</p>
            {event.hostTitle && <p className="font-sans text-xs text-gray-500">{event.hostTitle}</p>}
          </div>
        </div>
        <Link href={`/events/${event.slug}`}>
          <Button className="w-full bg-white text-magenta border-2 border-magenta hover:bg-magenta hover:text-white transition-all flex items-center justify-center">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Events = () => {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  const [showPastEvents, setShowPastEvents] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6">Upcoming Experiences</h1>
            <p className="font-sans text-lg text-gray-700 mb-8">
              Attend immersive Latina Empire events around the world.
            </p>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="font-serif font-bold text-3xl mb-4">Upcoming Events</h2>
            <p className="font-sans text-gray-700">
              Join us at these transformational events designed exclusively for ambitious Latinas.
            </p>
          </div>
          
          {upcomingEvents.length > 0 ? (
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
      
      {/* Past Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-serif font-bold text-3xl mb-4">Past Events</h2>
              <p className="font-sans text-gray-700">
                Relive the moments from our previous gatherings.
              </p>
            </div>
            
            <Button
              variant="ghost"
              onClick={() => setShowPastEvents(!showPastEvents)}
              className="flex items-center text-gray-700 hover:text-magenta"
            >
              {showPastEvents ? (
                <>
                  Hide Past Events
                  <ChevronUp className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Show Past Events
                  <ChevronDown className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
          
          {showPastEvents && pastEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
          
          {showPastEvents && pastEvents.length === 0 && (
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="font-serif font-semibold text-xl mb-2">No Past Events</h3>
              <p className="font-sans text-gray-600">
                We don't have any past events to display at this time.
              </p>
            </div>
          )}
          
          {!showPastEvents && pastEvents.length > 0 && (
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="font-serif font-semibold text-xl mb-2">{pastEvents.length} Past Events Available</h3>
              <p className="font-sans text-gray-600 mb-4">
                Click the "Show Past Events" button to view our previous events.
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