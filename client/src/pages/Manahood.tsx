import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Search, ArrowRight, Calendar, UserPlus, Users, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertCircle, Loader } from "lucide-react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";
import SuccessConfetti from "@/components/SuccessConfetti";

interface FormData {
  name: string;
  email: string;
  location: string;
  reason: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  location?: string;
  reason?: string;
}

interface Chapter {
  id: string;
  name: string;
  location: string;
  leader: string;
  memberCount: number;
  image?: string;
}

interface Leader {
  id: string;
  name: string;
  chapter: string;
  quote: string;
  image?: string;
}

interface ManaEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  chapter: string;
  image?: string;
}

// Placeholder data for the page
// In a real app, this would come from a backend API
const chapters: Chapter[] = [
  {
    id: "1",
    name: "Manahood Miami",
    location: "Miami, FL",
    leader: "Sofia Rodriguez",
    memberCount: 32
  },
  {
    id: "2",
    name: "LA Manas",
    location: "Los Angeles, CA",
    leader: "Carmen Vega",
    memberCount: 48
  },
  {
    id: "3",
    name: "Chicago Latinas",
    location: "Chicago, IL",
    leader: "Elena Diaz",
    memberCount: 27
  },
  {
    id: "4",
    name: "NYC Poderosas",
    location: "New York, NY",
    leader: "Gabriela Torres",
    memberCount: 53
  },
  {
    id: "5",
    name: "Houston Hermanas",
    location: "Houston, TX",
    leader: "Isabella Martinez",
    memberCount: 29
  },
  {
    id: "6",
    name: "Phoenix Rising",
    location: "Phoenix, AZ",
    leader: "Valeria Ortiz",
    memberCount: 21
  },
];

const leaders: Leader[] = [
  {
    id: "1",
    name: "Sofia Rodriguez",
    chapter: "Manahood Miami",
    quote: "Building a community of Latinas who uplift each other is my life's mission."
  },
  {
    id: "2",
    name: "Carmen Vega",
    chapter: "LA Manas",
    quote: "When Latinas come together, there's nothing we can't accomplish."
  },
  {
    id: "3",
    name: "Elena Diaz",
    chapter: "Chicago Latinas",
    quote: "Our power lies in our shared experiences and collective wisdom."
  },
  {
    id: "4",
    name: "Gabriela Torres",
    chapter: "NYC Poderosas",
    quote: "Leadership is about creating spaces where others can thrive."
  },
];

const events: ManaEvent[] = [
  {
    id: "1",
    title: "Summer Network Mixer",
    date: "July 15, 2025",
    location: "Miami Beach Community Center",
    chapter: "Manahood Miami"
  },
  {
    id: "2",
    title: "Professional Development Workshop",
    date: "July 22, 2025",
    location: "Downtown LA Conference Center",
    chapter: "LA Manas"
  },
  {
    id: "3",
    title: "Financial Freedom Masterclass",
    date: "August 5, 2025",
    location: "Chicago Business Hub",
    chapter: "Chicago Latinas"
  },
  {
    id: "4",
    title: "Latina Leadership Summit",
    date: "August 18, 2025",
    location: "NYC Innovation Space",
    chapter: "NYC Poderosas"
  },
  {
    id: "5",
    title: "Wellness & Self-Care Retreat",
    date: "September 10, 2025",
    location: "Houston Wellness Center",
    chapter: "Houston Hermanas"
  },
];

const Manahood = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStartModal, setShowStartModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    location: "",
    reason: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  const { toast } = useToast();
  
  const filteredChapters = chapters.filter(chapter => 
    chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chapter.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }
    
    if (!formData.reason.trim()) {
      errors.reason = "Please share why you want to lead";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle success
      setShowStartModal(false);
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        location: "",
        reason: ""
      });
      
      toast({
        title: "Application Submitted!",
        description: "We'll be in touch with next steps for your Manahood chapter.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(216,27,96,0.4),transparent_70%)] z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Latina Empire</span>
            </div>
            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight tracking-tight">
              The Manahood Sisterhood
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              Your local circle of Latina empowerment, connection, and growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button 
                className="bg-magenta hover:bg-magenta/90 text-white px-8 py-6 h-auto rounded-lg text-lg shadow-lg transition-all"
                onClick={() => {
                  document.getElementById('find-chapter')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Find Your Chapter <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white/30 text-white px-8 py-6 h-auto rounded-lg text-lg hover:bg-white/10 transition-all"
                onClick={() => setShowStartModal(true)}
              >
                Start a Chapter
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* What Is Manahood? */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(245,228,240,1),transparent_70%)] rounded-full -z-0 opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-8">What Is Manahood?</h2>
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-xl md:text-2xl text-gray-800 font-serif italic leading-relaxed mb-8">
                "Manahood is where powerful Latina women gather locally to support, grow, and activate each other. Together, we are más que amigas — somos hermanas."
              </p>
              <div className="w-20 h-1 bg-magenta mx-auto mb-8"></div>
              <p className="text-gray-600 leading-relaxed">
                Our chapters meet monthly to create connection, engage in personal and professional development, 
                and build a supportive network that uplifts every member. Each Manahood is unique, reflecting the diverse
                needs and strengths of Latinas in different communities, but all are united in our mission to 
                empower Latinas to lead with confidence and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Find a Chapter */}
      <section id="find-chapter" className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Find a Chapter</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with local chapters in your area and join a community of ambitious, supportive Latinas.
            </p>
          </div>

          {/* Search Filter Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-md p-3 flex items-center">
              <Search className="text-gray-400 h-5 w-5 ml-2 mr-3 flex-shrink-0" />
              <Input
                type="text"
                placeholder="Search by city, state, or zip code..."
                className="border-0 focus:ring-0 py-2 px-0 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select>
                <SelectTrigger className="w-[140px] border-0 focus:ring-0">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                  <SelectItem value="midwest">Midwest</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="max-w-5xl mx-auto mb-16 rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <div className="relative aspect-video flex items-center justify-center bg-gray-100">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
              <div className="relative z-10 text-center p-8">
                <div className="bg-white/80 backdrop-blur p-8 rounded-xl shadow-sm max-w-md mx-auto">
                  <MapPin className="h-12 w-12 text-magenta mb-3 mx-auto" />
                  <h3 className="font-serif font-bold text-xl mb-3">Interactive Map Coming Soon</h3>
                  <p className="text-gray-600 mb-4">Our chapter map is under development. Browse the directory below to find chapters near you.</p>
                  <Button 
                    variant="outline" 
                    className="border-magenta text-magenta hover:bg-magenta hover:text-white"
                    onClick={() => setShowStartModal(true)}
                  >
                    Start a Chapter in Your City
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Directory */}
          <div className="max-w-6xl mx-auto">
            <h3 className="font-serif font-semibold text-2xl mb-8 text-center">Active Chapters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.length > 0 ? (
                filteredChapters.map(chapter => (
                  <Card key={chapter.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 bg-white">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-white pb-0">
                      <CardTitle className="text-xl font-serif font-bold">{chapter.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-gray-600 my-1">
                        <MapPin className="h-4 w-4 text-magenta" /> {chapter.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                        <Users className="h-4 w-4" /> {chapter.memberCount} members
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-sm">{chapter.leader}</p>
                          <p className="text-xs text-gray-500">Chapter Leader</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50">
                      <Button 
                        className="w-full bg-white border border-magenta text-magenta hover:bg-magenta hover:text-white transition-all flex items-center justify-center"
                      >
                        View Chapter
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12 border border-gray-200 rounded-xl p-8 bg-white">
                  <p className="text-gray-700 font-medium mb-2">No chapters found for "{searchQuery}"</p>
                  <p className="text-gray-500 mb-6">Try a different search term or consider starting a chapter in your area.</p>
                  <Button 
                    className="bg-magenta hover:bg-magenta/90 text-white"
                    onClick={() => setShowStartModal(true)}
                  >
                    Start a Chapter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Leaders */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Meet the Chapter Leaders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These inspiring women are building communities of support and empowerment across the country.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto overflow-hidden">
            <div className="flex gap-6 pb-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {leaders.map(leader => (
                <div 
                  key={leader.id} 
                  className="min-w-[280px] w-64 flex-shrink-0 snap-center bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-magenta/10 to-transparent z-0"></div>
                    <img 
                      src={leader.image || getImageSrc("", true)}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      onError={createImageErrorHandler()}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-bold text-lg">{leader.name}</h3>
                    <p className="text-magenta text-sm mb-3">{leader.chapter}</p>
                    <p className="text-gray-600 italic text-sm line-clamp-2">"{leader.quote}"</p>
                    <div className="flex justify-between items-center mt-4">
                      <Button 
                        variant="link" 
                        className="text-magenta hover:text-magenta/80 p-0 h-auto flex items-center"
                      >
                        View Profile <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-magenta p-1 h-auto"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="rounded-full border-gray-200">
                View All Leaders <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Start a Manahood */}
      <section className="py-20 md:py-28 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665321e3075?ixlib=rb-4.0.3')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(216,27,96,0.4),_transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Join the Movement</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6">Ready to Lead in Your City?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Start a Manahood chapter and guide your local Latina community toward empowerment, connection, and growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/manahood/start">
                <Button 
                  className="bg-magenta hover:bg-magenta/90 text-white px-8 py-6 h-auto rounded-lg text-lg shadow-[0_0_20px_rgba(242,56,137,0.4)] transition-all"
                >
                  Start a Chapter <UserPlus className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="border-2 border-white/30 text-white px-8 py-6 h-auto rounded-lg text-lg hover:bg-white/10 transition-all"
                onClick={() => setShowStartModal(true)}
              >
                Get More Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Manahood Events */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Upcoming Manahood Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with fellow Latinas at these community gatherings and expand your network.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.slice(0, 6).map(event => (
                <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/70 z-10"></div>
                    <img 
                      src={event.image || getImageSrc("", true)}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={createImageErrorHandler()}
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium z-20 flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-magenta" />
                      {event.date}
                    </div>
                    <div className="absolute top-3 right-3 bg-magenta/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium z-20 text-white">
                      {event.chapter}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-magenta transition-colors">{event.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <Button 
                        className="px-4 py-2 h-auto text-sm bg-white border border-magenta text-magenta hover:bg-magenta hover:text-white transition-all"
                      >
                        View Details
                      </Button>
                      <div className="text-sm text-gray-500">
                        Manahood Event
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/events">
                <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 h-auto rounded-lg shadow-md">
                  View All Events <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Start a Manahood Modal */}
      <Dialog open={showStartModal} onOpenChange={setShowStartModal}>
        <DialogContent className="max-w-md mx-auto rounded-xl p-0 overflow-hidden">
          <div className="bg-magenta py-6 px-6 text-white">
            <DialogTitle className="text-2xl font-serif font-bold mb-2">
              Start a Manahood Chapter
            </DialogTitle>
            <DialogDescription className="text-white/80">
              Tell us about yourself and why you want to lead a Manahood chapter in your area.
            </DialogDescription>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full rounded-lg", 
                    formErrors.name ? "border-red-500 ring-red-500" : "focus:border-magenta focus:ring-magenta"
                  )}
                  disabled={isSubmitting}
                />
                {formErrors.name && (
                  <div className="text-red-500 text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.name}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full rounded-lg", 
                    formErrors.email ? "border-red-500 ring-red-500" : "focus:border-magenta focus:ring-magenta"
                  )}
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <div className="text-red-500 text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.email}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Location <span className="text-red-500">*</span>
                </label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full rounded-lg", 
                    formErrors.location ? "border-red-500 ring-red-500" : "focus:border-magenta focus:ring-magenta"
                  )}
                  disabled={isSubmitting}
                />
                {formErrors.location && (
                  <div className="text-red-500 text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.location}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you want to lead? <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="reason"
                  name="reason"
                  rows={4}
                  value={formData.reason}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full rounded-lg", 
                    formErrors.reason ? "border-red-500 ring-red-500" : "focus:border-magenta focus:ring-magenta"
                  )}
                  disabled={isSubmitting}
                />
                {formErrors.reason && (
                  <div className="text-red-500 text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.reason}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit" 
                className="w-full bg-magenta hover:bg-magenta/90 text-white rounded-full py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Confetti */}
      <SuccessConfetti active={showSuccess} duration={4000} />
    </div>
  );
};

export default Manahood;