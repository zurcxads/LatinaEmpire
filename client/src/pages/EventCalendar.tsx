import { useState, useEffect } from "react";
import { Link } from "wouter";
import { format, parse, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, isValid } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { eventsService } from "@/lib/eventsService";
import { Event } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Helper function to convert the date format used in the API to a Date object
const parseEventDate = (dateString: string): Date | null => {
  // Try different formats
  const formats = [
    "MMMM d, yyyy", // August 15, 2024
    "MMMM d-d, yyyy", // August 15-17, 2024
    "MMMM yyyy", // August 2024
  ];
  
  for (const formatString of formats) {
    try {
      // For date ranges, just use the first date
      const firstDate = dateString.split('-')[0].trim();
      const parsedDate = parse(firstDate, formatString, new Date());
      if (isValid(parsedDate)) {
        return parsedDate;
      }
    } catch (e) {
      // Continue to next format
    }
  }
  
  return null;
};

// Event card for the list view
const EventListItem = ({ event }: { event: Event }) => {
  // Parse date
  const eventDate = parseEventDate(event.date);
  
  return (
    <Link href={`/events/${event.slug}`}>
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100 hover:border-gray-200">
        {/* Date panel */}
        <div className="flex-shrink-0 w-full md:w-24 h-24 bg-black text-white rounded-lg flex flex-col items-center justify-center p-2">
          <div className="text-2xl font-bold">
            {eventDate ? format(eventDate, "dd") : "TBA"}
          </div>
          <div className="text-sm uppercase tracking-wider">
            {eventDate ? format(eventDate, "MMM") : ""}
          </div>
          <div className="text-xs mt-1">
            {eventDate ? format(eventDate, "yyyy") : ""}
          </div>
        </div>
        
        {/* Event details */}
        <div className="flex-grow">
          <h3 className="font-bold text-xl mb-1">{event.name}</h3>
          <p className="text-gray-700 line-clamp-2 text-sm mb-2">{event.shortDescription}</p>
          <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            {event.startTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{event.startTime}{event.endTime ? ` - ${event.endTime}` : ''}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Event image */}
        <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 order-first md:order-last">
          <img 
            src={event.image} 
            alt={event.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Link>
  );
};

// Component that displays events happening on a specific date
const DayEventsList = ({ events, date }: { events: Event[], date: Date }) => {
  // Filter events happening on this date
  const eventsOnDay = events.filter(event => {
    const eventDate = parseEventDate(event.date);
    return eventDate && isSameDay(eventDate, date);
  });
  
  if (eventsOnDay.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No events scheduled for this day.
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {eventsOnDay.map(event => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  );
};

// Component for the table view of events
const EventTable = ({ events }: { events: Event[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter events based on the search term
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Check if an event is upcoming or past
  const isUpcoming = (event: Event) => {
    if (event.isPast) return false;
    
    const eventDate = parseEventDate(event.date);
    if (!eventDate) return false;
    
    return eventDate >= new Date();
  };

  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="relative w-full md:w-1/2 lg:w-1/3">
        <Input
          type="text"
          placeholder="Search events by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      
      {/* Table */}
      <div className="overflow-auto border rounded-lg">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="py-4 px-6 text-left font-semibold text-sm">Event</TableHead>
              <TableHead className="py-4 px-6 text-left font-semibold text-sm">Date</TableHead>
              <TableHead className="py-4 px-6 text-left font-semibold text-sm">Location</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <TableRow key={event.id} className="border-t">
                  <TableCell className="py-6 px-6 font-medium">{event.name}</TableCell>
                  <TableCell className="py-6 px-6 text-gray-600">{event.date}</TableCell>
                  <TableCell className="py-6 px-6 text-gray-600">{event.location}</TableCell>
                  <TableCell className="py-6 px-6 text-right">
                    {isUpcoming(event) ? (
                      <Link href={`/events/${event.slug}`}>
                        <Button variant="default" className="rounded-full bg-black hover:bg-gray-800 text-white px-6">
                          View event
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" className="rounded-full" disabled>
                        Coming soon
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-gray-500">
                  No events match your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const EventCalendar = () => {
  const [view, setView] = useState<"calendar" | "list" | "table">("table");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [location, setLocation] = useState<string>("all");
  
  // Fetch events
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['/api/events'],
    queryFn: () => eventsService.getAllEvents(),
  });
  
  // Get unique locations for the filter
  const uniqueLocations = events
    .map(event => event.location)
    .filter((location, index, self) => self.indexOf(location) === index);
  const locations = ["all", ...uniqueLocations];
  
  // Filter events based on selected location
  const filteredEvents = location === "all" 
    ? events 
    : events.filter(event => event.location === location);
  
  // Get events for the selected month (for calendar highlighting)
  const eventsInSelectedMonth = filteredEvents.filter(event => {
    const eventDate = parseEventDate(event.date);
    return eventDate && isSameMonth(eventDate, currentMonth);
  });
  
  // Dates with events for the current month (for highlighting in calendar)
  const datesWithEvents = eventsInSelectedMonth.map(event => {
    const eventDate = parseEventDate(event.date);
    return eventDate;
  }).filter(date => date !== null) as Date[];
  
  // Handle month navigation
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };
  
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  // Function to determine if a date has events
  const hasEvents = (date: Date) => {
    return datesWithEvents.some(eventDate => eventDate && isSameDay(date, eventDate));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl">
            <h1 className="font-sans font-bold text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-none">
              Latina Empire
              <br />
              events calendar
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-6 max-w-xl">
              Create your own success story through the powerful impact of a Latina Empire event.
            </p>
            <Link href="/events">
              <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-6 h-auto">
                View all events
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Controls and filters */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            {/* View toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={view === "table" ? "default" : "outline"}
                onClick={() => setView("table")}
                className="rounded-none"
              >
                <Filter className="h-4 w-4 mr-2" />
                Table View
              </Button>
              <Button
                variant={view === "calendar" ? "default" : "outline"}
                onClick={() => setView("calendar")}
                className="rounded-none"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar View
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                onClick={() => setView("list")}
                className="rounded-none"
              >
                <Filter className="h-4 w-4 mr-2" />
                List View
              </Button>
            </div>
            
            {/* Location filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter by location:</span>
              <Select
                value={location}
                onValueChange={(value) => setLocation(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>
                      {loc === "all" ? "All Locations" : loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Loading spinner */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              <p className="mt-4">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-xl">No events found</div>
              <p className="text-gray-500 mt-2">
                {location !== "all" 
                  ? `There are no events scheduled in ${location}` 
                  : "There are no upcoming events at this time"}
              </p>
            </div>
          ) : (
            <>
              {/* Table View */}
              {view === "table" && (
                <EventTable events={filteredEvents} />
              )}
              
              {/* Calendar View */}
              {view === "calendar" && (
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {/* Calendar Days */}
                  {eachDayOfInterval({
                    start: startOfMonth(currentMonth),
                    end: endOfMonth(currentMonth)
                  }).map((date, index) => {
                    // Get events for this day
                    const dayEvents = filteredEvents.filter(event => {
                      const eventDate = parseEventDate(event.date);
                      return eventDate && isSameDay(eventDate, date);
                    });
                    
                    return (
                      <div 
                        key={date.toISOString()} 
                        className={`border rounded-lg p-2 min-h-[120px] ${
                          hasEvents(date) ? 'border-pink-200 bg-pink-50' : ''
                        } ${
                          isSameDay(date, new Date()) ? 'border-black' : ''
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">
                          {format(date, "EEE")} {format(date, "d")}
                        </div>
                        {dayEvents.length > 0 ? (
                          <div className="space-y-1">
                            {dayEvents.map((event, i) => (
                              <Link key={event.id} href={`/events/${event.slug}`}>
                                <div className="p-1 bg-pink-100 hover:bg-pink-200 rounded text-xs truncate cursor-pointer">
                                  {event.name}
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400">No events</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              
              {/* List View */}
              {view === "list" && (
                <div className="space-y-4">
                  {selectedDate ? (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">
                        Events on {format(selectedDate, "MMMM d, yyyy")}
                      </h2>
                      <DayEventsList events={filteredEvents} date={selectedDate} />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredEvents.map(event => (
                        <EventListItem key={event.id} event={event} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't miss the opportunity to be part of our powerful community of Latina leaders.
            Stay updated with all our events.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/join">
              <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-6 h-auto">
                Join Our Community
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-8 py-6 h-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default EventCalendar;