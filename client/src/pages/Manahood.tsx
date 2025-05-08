import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Search, ArrowRight, Calendar, UserPlus, Users, Heart } from "lucide-react";
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
      {/* SECTION 1: Hero - What is Manahood? */}
      <section className="relative bg-black text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(216,27,96,0.3),transparent_70%)] z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight tracking-tight">
              Welcome to the <span className="text-magenta">Manahood</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              A powerful sisterhood of Latinas leading with heart, purpose, and legacy.
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Manahood chapters bring together Latina women in local communities, creating spaces for connection, 
              growth, and celebration of our shared heritage. Through mentorship, events, and support, 
              each chapter empowers Latinas to achieve their highest potential.
            </p>
            <Button 
              className="bg-magenta hover:bg-magenta/90 text-white rounded-full px-8 py-6 text-lg font-medium"
              onClick={() => {
                document.getElementById('find-chapter')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Find Your Chapter <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: Searchable Map + Chapter Directory */}
      <section id="find-chapter" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Find a Manahood Near You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with local chapters in your area and join a community of ambitious, supportive Latinas.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by city, state, or zip code..."
                className="pl-10 py-6 rounded-full border-gray-300 focus:border-magenta focus:ring-magenta"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mb-16 rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
            <div className="relative aspect-[21/9] flex items-center justify-center bg-gray-200">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300"></div>
              <div className="relative z-10 text-center p-4">
                <MapPin className="h-16 w-16 text-magenta mb-3 mx-auto" />
                <p className="text-gray-600 text-lg">Interactive map coming soon</p>
                <p className="text-gray-500">Browse the directory below to find chapters near you</p>
              </div>
            </div>
          </div>

          {/* Chapter Directory */}
          <h3 className="font-serif font-semibold text-2xl mb-6 text-center">Chapter Directory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChapters.length > 0 ? (
              filteredChapters.map(chapter => (
                <Card key={chapter.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-200">
                  <CardHeader className="pb-0">
                    <CardTitle className="text-xl font-serif font-bold">{chapter.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-gray-600 my-1">
                      <MapPin className="h-4 w-4 text-magenta" /> {chapter.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                      <Users className="h-4 w-4" /> {chapter.memberCount} members
                    </div>
                    <div className="mt-1 text-sm text-gray-600 flex items-center gap-1">
                      <Heart className="h-4 w-4" /> Led by {chapter.leader}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full bg-white hover:bg-magenta hover:text-white hover:border-magenta rounded-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No chapters found for "{searchQuery}"</p>
                <p className="text-gray-400 mt-2">Try a different search or start your own chapter</p>
                <Button 
                  className="mt-4 bg-magenta hover:bg-magenta/90 text-white rounded-full"
                  onClick={() => setShowStartModal(true)}
                >
                  Start a Chapter
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: Meet the Leaders */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Meet the Women Leading the Movement</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These inspiring leaders are building communities of support and empowerment across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {leaders.map(leader => (
              <div key={leader.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-magenta/20 to-transparent z-0"></div>
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
                  <p className="text-gray-600 italic text-sm">"{leader.quote}"</p>
                  <Button 
                    variant="link" 
                    className="text-magenta hover:text-magenta/80 p-0 h-auto mt-2 flex items-center"
                  >
                    Full Story <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Start a Manahood */}
      <section className="py-16 md:py-24 bg-magenta text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Ready to Lead?</h2>
            <p className="text-xl mb-8">
              If you've felt the call to lead other Latinas in your city, we've made it simple.
            </p>
            <Button 
              className="bg-white text-magenta hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium"
              onClick={() => setShowStartModal(true)}
            >
              Start a Manahood <UserPlus className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5: Upcoming Manahood Events */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Manahood Gatherings Near You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with fellow Latinas at these upcoming events and expand your network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                  <img 
                    src={event.image || getImageSrc("", true)}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={createImageErrorHandler()}
                  />
                  <div className="absolute bottom-3 left-3 bg-white text-black px-3 py-1 rounded-full text-sm font-medium z-20">
                    {event.chapter}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-serif">{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-gray-500">
                    <Calendar className="h-4 w-4" /> {event.date}
                  </CardDescription>
                  <CardDescription className="flex items-center gap-1 text-gray-500">
                    <MapPin className="h-4 w-4" /> {event.location}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full hover:bg-magenta hover:text-white hover:border-magenta rounded-full">
                    Event Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6">
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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