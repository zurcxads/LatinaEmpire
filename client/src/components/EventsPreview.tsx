import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Event {
  image: string;
  location: string;
  date: string;
  title: string;
  description: string;
}

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-magenta-light text-magenta text-xs font-semibold px-3 py-1 rounded-full">{event.location}</span>
          <span className="text-gray-600 text-sm">{event.date}</span>
        </div>
        <h3 className="font-serif font-bold text-xl mb-3">{event.title}</h3>
        <p className="font-sans text-gray-600 mb-4">
          {event.description}
        </p>
        <button className="font-sans font-semibold text-magenta hover:underline inline-flex items-center">
          Learn More
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

const EventsPreview = () => {
  const events: Event[] = [
    {
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Miami, FL",
      date: "June 15-17, 2023",
      title: "Latina Leadership Summit",
      description: "Three days of transformational workshops, networking, and inspiration for ambitious Latinas."
    },
    {
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Los Angeles, CA",
      date: "September 8-9, 2023",
      title: "Entrepreneurship Intensive",
      description: "Master the fundamentals of building your own business with expert coaching and peer support."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Upcoming Events</h2>
          <p className="font-sans text-lg text-gray-700 max-w-3xl mx-auto">
            Experience the power of in-person connection at our transformational events across the globe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="inline-flex items-center font-sans font-semibold border-2 border-magenta text-magenta px-6 py-3 rounded hover:bg-magenta hover:text-white transition-all"
          >
            View All Events
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
