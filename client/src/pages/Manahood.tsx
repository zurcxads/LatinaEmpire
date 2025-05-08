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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white hero-navbar-spacing">
        {/* Empty space for nav bar */}
        <div className="h-16 w-full absolute top-0 left-0 z-20"></div>
        
        {/* Container with padding for rounded corners - Similar to about-founder */}
        <div className="absolute inset-x-8 top-24 bottom-8 rounded-3xl overflow-hidden z-0">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
          <img 
            src={getImageSrc("https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3", true)} 
            alt="Latina women networking"
            className="w-full h-full object-cover"
            onError={createImageErrorHandler()}
          />
        </div>
        
        {/* Radial gradients for depth and visual interest */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f23889,_transparent)] opacity-20 z-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#140a1f,_transparent)] opacity-40 z-30 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-50 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Latina Empire</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Sisterhood Rooted in Power and Purpose
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join your local circle of Latina empowerment, where women connect, grow, and transform their communities.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Button 
                className="bg-magenta hover:bg-magenta/90 text-white px-8 py-6 h-auto rounded-full text-lg shadow-xl transition-all duration-300 hover:shadow-magenta hover:scale-102"
                onClick={() => {
                  document.getElementById('find-chapter')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Find Your Chapter <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="bg-transparent text-white border border-white/30 hover:bg-white/10 px-8 py-6 h-auto rounded-full text-lg transition-all duration-300 backdrop-blur-sm hover:border-white/80"
                onClick={() => setShowStartModal(true)}
              >
                Start a Chapter
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* What Is Manahood? */}
      <section className="section-spacing bg-white/80 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(245,228,240,1),transparent_70%)] rounded-full -z-0 opacity-70"></div>
        <div className="absolute left-0 bottom-1/3 w-80 h-80 bg-[radial-gradient(circle,rgba(240,240,250,1),transparent_70%)] rounded-full -z-0 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-5">
              <span className="text-xs uppercase tracking-wider font-medium text-magenta">Our Community</span>
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-12 tracking-tight max-w-3xl mx-auto">
              What Is Manahood?
            </h2>
            
            <div className="relative max-w-3xl mx-auto bg-gradient-to-br from-gray-50 to-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-magenta/10 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-magenta/5 rounded-full"></div>
              
              <p className="text-xl md:text-2xl text-gray-800 font-serif italic leading-relaxed mb-8">
                "Manahood is where powerful Latina women gather locally to support, grow, and activate each other. Together, we are más que amigas — somos hermanas."
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-magenta/80 to-magenta/40 mx-auto mb-8 rounded-full"></div>
              <p className="text-gray-600 leading-relaxed text-lg">
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
      <section id="find-chapter" className="section-spacing bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs uppercase tracking-wider font-medium text-magenta">Local Connections</span>
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6 tracking-tight">Find a Chapter</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Connect with local chapters in your area and join a community of ambitious, supportive Latinas.
            </p>
          </div>

          {/* Search Filter Bar */}
          <div className="max-w-xl mx-auto mb-16">
            <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
              <Search className="text-gray-400 h-5 w-5 ml-3 mr-3 flex-shrink-0" />
              <Input
                type="text"
                placeholder="Search by city, state, or zip code..."
                className="border-0 focus:ring-0 py-2 px-0 text-gray-800 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select>
                <SelectTrigger className="w-[140px] border-0 focus:ring-0 rounded-full">
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
          <div className="max-w-5xl mx-auto mb-20 rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white">
            <div className="relative aspect-video flex items-center justify-center">
              {/* Background elements */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100/90 to-white/70"></div>
              <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-white/40 to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center px-4 max-w-lg">
                <div className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
                  <div className="rounded-full bg-magenta/10 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8 text-magenta" />
                  </div>
                  <h3 className="font-serif font-bold text-xl md:text-2xl mb-4">Interactive Map Coming Soon</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">Our chapter map is under development. Browse the directory below to find chapters near you.</p>
                  <Button 
                    className="bg-magenta hover:bg-magenta/90 text-white rounded-full px-6 py-2.5 h-auto shadow-md transition-all duration-300"
                    onClick={() => setShowStartModal(true)}
                  >
                    Start a Chapter in Your City
                    <UserPlus className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Directory */}
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-serif font-semibold text-2xl">Active Chapters</h3>
              <Button variant="link" className="text-magenta hover:text-magenta/80">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredChapters.length > 0 ? (
                filteredChapters.map(chapter => (
                  <Card key={chapter.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 bg-white group rounded-xl">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-white pb-0">
                      <CardTitle className="text-xl font-serif font-bold group-hover:text-magenta transition-colors duration-300">{chapter.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-gray-600 my-1">
                        <MapPin className="h-4 w-4 text-magenta" /> {chapter.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                        <Users className="h-4 w-4" /> {chapter.memberCount} members
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-magenta/20 to-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-magenta">{chapter.leader.substring(0, 2)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{chapter.leader}</p>
                          <p className="text-xs text-gray-500">Chapter Leader</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50 px-4 py-3">
                      <Button 
                        className="w-full bg-white border border-magenta text-magenta hover:bg-magenta hover:text-white transition-all flex items-center justify-center rounded-full"
                      >
                        View Chapter
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-16 border border-gray-200 rounded-2xl p-8 md:p-10 bg-white/90 shadow-md">
                  <div className="text-magenta mb-6 opacity-60">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="font-serif font-semibold text-2xl mb-3 text-gray-800">No chapters found for "{searchQuery}"</h3>
                  <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">Try a different search term or consider starting a Manahood chapter in your area to bring this community to life.</p>
                  <Button 
                    className="bg-magenta hover:bg-magenta/90 text-white px-8 py-2.5 rounded-full shadow-lg transition-all"
                    onClick={() => setShowStartModal(true)}
                  >
                    Start a Chapter
                    <UserPlus className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Leaders */}
      <section className="section-spacing bg-white border-t border-gray-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[radial-gradient(circle,rgba(245,220,240,1),transparent_70%)] rounded-full -z-0 opacity-30"></div>
      
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs uppercase tracking-wider font-medium text-magenta">Meet Our Community</span>
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6 tracking-tight">
              Meet the Chapter Leaders
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These inspiring women are building communities of support and empowerment across the country.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto overflow-hidden">
            <div className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {leaders.map(leader => (
                <div 
                  key={leader.id} 
                  className="min-w-[300px] w-72 flex-shrink-0 snap-center bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="aspect-square bg-gradient-to-br from-magenta/5 to-gray-50 relative overflow-hidden">
                    {/* Gradient overlay with animation */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-70 transition-opacity duration-300 group-hover:opacity-60"></div>
                    {/* Soft light effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_70%)] z-20"></div>
                    <img 
                      src={leader.image || getImageSrc("https://images.unsplash.com/photo-1573497019236-61938fa52ba1?ixlib=rb-4.0.3", true)}
                      alt={leader.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={createImageErrorHandler()}
                    />
                    
                    {/* Name overlay at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                      <h3 className="font-serif font-bold text-xl mb-1 drop-shadow-sm">{leader.name}</h3>
                      <p className="text-white/90 text-sm">{leader.chapter}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 italic text-base leading-relaxed mb-5">"{leader.quote}"</p>
                    <div className="flex justify-between items-center">
                      <Button 
                        variant="link" 
                        className="text-magenta hover:text-magenta/80 p-0 h-auto flex items-center font-medium"
                      >
                        View Profile <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Heart className="h-5 w-5 text-gray-300 hover:text-magenta cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="rounded-full border-gray-200 px-8 py-2.5 h-auto shadow-sm hover:shadow-md transition-all duration-300">
                View All Leaders <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Start a Manahood */}
      <section className="section-spacing py-8 md:py-12 bg-black text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          {/* Radial gradient for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d81b60,_transparent)] opacity-10 z-20"></div>
          {/* Fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
          <img 
            src={getImageSrc("https://images.unsplash.com/photo-1573164713988-8665321e3075?ixlib=rb-4.0.3", true)} 
            alt="Leadership background" 
            className="w-full h-full object-cover"
            onError={createImageErrorHandler()}
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-30">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Join the Movement</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Ready to Lead in Your City?
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Start a Manahood chapter and guide your local Latina community toward empowerment, connection, and growth.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/manahood/start">
                <Button 
                  className="bg-magenta hover:bg-magenta/90 text-white px-10 py-6 h-auto rounded-full text-lg shadow-xl transition-all duration-300 hover:shadow-magenta hover:scale-102"
                >
                  Start a Chapter
                  <UserPlus className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="bg-transparent text-white border border-white/30 hover:bg-white/10 px-8 py-6 h-auto rounded-full text-lg transition-all duration-300 backdrop-blur-sm hover:border-white/80"
                onClick={() => setShowStartModal(true)}
              >
                Get More Information
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Manahood Events */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs uppercase tracking-wider font-medium text-magenta">Connect & Learn</span>
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6 tracking-tight">
              Upcoming Manahood Events
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Connect with fellow Latinas at these community gatherings and expand your network.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.slice(0, 6).map(event => (
                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                  <div className="aspect-video bg-gradient-to-br from-magenta/5 to-gray-50 relative overflow-hidden">
                    {/* Gradient overlay with animation */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10 opacity-80 transition-opacity duration-300 group-hover:opacity-70"></div>
                    <img 
                      src={event.image || getImageSrc("https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3", true)}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={createImageErrorHandler()}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium z-20 flex items-center shadow-md">
                      <Calendar className="h-3 w-3 mr-1.5 text-magenta" />
                      {event.date}
                    </div>
                    <div className="absolute top-4 right-4 bg-magenta/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium z-20 text-white shadow-md">
                      {event.chapter}
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-magenta transition-colors duration-300">{event.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-5">
                      <MapPin className="h-4 w-4 text-magenta mr-1.5" />
                      {event.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <Button 
                        className="px-5 py-2.5 h-auto text-sm bg-white border border-magenta text-magenta hover:bg-magenta hover:text-white transition-all rounded-full shadow-sm"
                      >
                        View Details
                        <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Manahood</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link href="/events">
                <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 h-auto rounded-full shadow-md transition-all duration-300">
                  View All Events <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Start a Manahood Modal */}
      <Dialog open={showStartModal} onOpenChange={setShowStartModal}>
        <DialogContent className="max-w-md mx-auto rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
          {/* Header with background image and overlay */}
          <div className="relative py-8 px-6 text-white bg-black">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0 opacity-70">
              <div className="absolute inset-0 bg-black/80 z-10"></div>
              {/* Radial gradient for depth */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d81b60,_transparent)] opacity-20 z-20"></div>
              <img 
                src={getImageSrc("https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-4.0.3", true)}
                alt="Leadership background" 
                className="w-full h-full object-cover"
                onError={createImageErrorHandler()}
              />
            </div>
            
            <div className="relative z-30">
              <div className="inline-flex items-center bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
                <span className="text-xs uppercase tracking-wider font-medium text-white">Lead & Inspire</span>
              </div>
              
              <DialogTitle className="text-2xl font-serif font-bold mb-2">
                Start a Manahood Chapter
              </DialogTitle>
              <DialogDescription className="text-white/90">
                Tell us about yourself and why you want to lead a Manahood chapter in your area.
              </DialogDescription>
            </div>
          </div>
          
          {/* Form with subtle gradient background */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name <span className="text-magenta">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full rounded-full border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm", 
                      formErrors.name ? "border-red-400 ring-red-200" : "focus:border-magenta focus:ring-magenta/20"
                    )}
                    disabled={isSubmitting}
                  />
                  {formErrors.name && (
                    <div className="text-red-500 text-sm flex items-center gap-1.5 mt-1.5">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.name}
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-magenta">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full rounded-full border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm", 
                      formErrors.email ? "border-red-400 ring-red-200" : "focus:border-magenta focus:ring-magenta/20"
                    )}
                    disabled={isSubmitting}
                  />
                  {formErrors.email && (
                    <div className="text-red-500 text-sm flex items-center gap-1.5 mt-1.5">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.email}
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Location <span className="text-magenta">*</span>
                  </label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full rounded-full border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm", 
                      formErrors.location ? "border-red-400 ring-red-200" : "focus:border-magenta focus:ring-magenta/20"
                    )}
                    disabled={isSubmitting}
                  />
                  {formErrors.location && (
                    <div className="text-red-500 text-sm flex items-center gap-1.5 mt-1.5">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.location}
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Why do you want to lead? <span className="text-magenta">*</span>
                  </label>
                  <Textarea
                    id="reason"
                    name="reason"
                    rows={4}
                    value={formData.reason}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full rounded-xl border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm resize-none", 
                      formErrors.reason ? "border-red-400 ring-red-200" : "focus:border-magenta focus:ring-magenta/20"
                    )}
                    disabled={isSubmitting}
                  />
                  {formErrors.reason && (
                    <div className="text-red-500 text-sm flex items-center gap-1.5 mt-1.5">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.reason}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  type="submit" 
                  className="w-full bg-magenta hover:bg-magenta/90 text-white rounded-full py-3 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
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
                
                <div className="text-center mt-4 text-xs text-gray-500">
                  Our team will review your application and reach out within 2-3 business days.
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Confetti */}
      <SuccessConfetti active={showSuccess} duration={4000} />
    </div>
  );
};

export default Manahood;