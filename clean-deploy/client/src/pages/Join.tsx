import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, Zap, Calendar, Star, ArrowRight, Check, AlertCircle, 
  Loader, Shield, Key, Crown, Lock, CreditCard
} from "lucide-react";
import Navbar from "@/components/Navbar";

import { useToast } from "@/hooks/use-toast";
import SuccessConfetti from "@/components/SuccessConfetti";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const BenefitCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
      {/* Gradient highlight on hover */}
      <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-magenta to-magenta/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      <div className="flex flex-col h-full">
        <div className="w-14 h-14 bg-gradient-to-br from-magenta to-magenta/70 rounded-xl flex items-center justify-center shadow-md mb-5">
          {icon && <div className="text-white">{icon}</div>}
        </div>
        
        <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-magenta transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

interface MembershipTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  isPopular?: boolean;
  ctaText: string;
  ctaAction: () => void;
}

const MembershipTier = ({ 
  title, 
  price, 
  description, 
  features, 
  icon, 
  isPopular = false,
  ctaText,
  ctaAction
}: MembershipTierProps) => {
  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-300 relative ${
      isPopular ? 'transform hover:-translate-y-2 shadow-xl' : 'hover:shadow-lg'
    }`}>
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-0 right-0 bg-magenta text-white text-xs px-3 py-1 uppercase font-semibold tracking-wider z-10">
          Popular
        </div>
      )}
      
      {/* Card Content */}
      <div className={`h-full flex flex-col ${
        isPopular 
          ? 'bg-gradient-to-br from-gray-900 to-black text-white border-2 border-magenta' 
          : 'bg-white border border-gray-200'
      }`}>
        {/* Card Header */}
        <div className="p-6 border-b border-gray-200/20">
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              isPopular ? 'bg-magenta/30' : 'bg-magenta/10'
            }`}>
              {icon}
            </div>
            <h3 className="font-serif font-bold text-2xl">{title}</h3>
          </div>
          <div className="mb-4">
            <span className="font-serif font-bold text-3xl">{price}</span>
            {price !== 'Free' && <span className="text-sm opacity-70 ml-1">/month</span>}
          </div>
          <p className={`${isPopular ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            {description}
          </p>
        </div>
        
        {/* Features */}
        <div className="p-6 flex-grow">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${
                  isPopular ? 'text-magenta' : 'text-magenta'
                }`} />
                <span className={isPopular ? 'text-gray-200' : 'text-gray-700'}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* CTA Button */}
        <div className="p-6 pt-2">
          <Button 
            onClick={ctaAction}
            className={`w-full py-6 h-auto text-md font-medium ${
              isPopular 
                ? 'bg-magenta hover:bg-magenta/90 text-white shadow-lg shadow-magenta/20' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Join = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing again
    if (emailError) {
      setEmailError(null);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This is where you would connect to a backend API or email service
      // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
      
      // For now, we'll simulate an API call
      console.log("Join form submitted:", email);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success state
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowConfetti(true); // Trigger confetti
      
      // Clear form
      setEmail("");
      
      // Log for future implementation
      console.log("Ready to integrate this form with a service like Mailchimp, ConvertKit, or a custom API endpoint at '/api/subscribe'");
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };
  
  // Handler for try again button
  const handleTryAgain = () => {
    setIsSubmitted(false);
    setEmailError(null);
  };
  
  // CTA handlers for membership tiers
  const handleScrollToJoinForm = () => {
    document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleVIPJoin = () => {
    toast({
      title: "VIP Membership",
      description: "You'll be redirected to our payment page to complete your subscription.",
    });
    // In a real implementation, this would redirect to a payment page
    // window.location.href = "/payment/vip-membership";
  };
  
  const handlePremiumJoin = () => {
    toast({
      title: "Premium Membership",
      description: "You'll be redirected to our payment page to complete your subscription.",
    });
    // In a real implementation, this would redirect to a payment page
    // window.location.href = "/payment/premium-membership";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SuccessConfetti active={showConfetti} />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-end relative overflow-hidden bg-black text-white">
        <div className="container mx-auto px-4 relative z-10 flex flex-col h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[calc(100vh-8rem)]">
            {/* Main Hero Content */}
            <div className="flex-1 flex flex-col justify-center lg:max-w-2xl py-12">
              <h1 className="hero-heading text-white mb-6 md:mb-8">
                Join the Latina Empire Movement
              </h1>
              
              <p className="font-sans text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 max-w-xl">
                Access our exclusive community and step into your power with Latinas around the world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="primary-button text-lg py-3 px-8"
                  onClick={() => document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Join For Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  className="outline-button text-lg py-3 px-8"
                  onClick={() => document.getElementById('membership-tiers')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Membership Tiers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Stats box */}
            <div className="lg:w-[400px] mb-12 mt-8 lg:mt-0">
              <div className="relative bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 p-8">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-magenta/20 blur-3xl"></div>
                
                <h3 className="font-serif text-2xl mb-6">Join Our Global Community</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-magenta/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-magenta" />
                    </div>
                    <div>
                      <div className="text-2xl font-serif font-bold">10,000+</div>
                      <div className="text-sm text-white/70">Active Members</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-magenta/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-magenta" />
                    </div>
                    <div>
                      <div className="text-2xl font-serif font-bold">2-3</div>
                      <div className="text-sm text-white/70">Events Monthly</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-magenta/20 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-magenta" />
                    </div>
                    <div>
                      <div className="text-2xl font-serif font-bold">Premium</div>
                      <div className="text-sm text-white/70">Resources & Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-magenta/30 to-transparent mix-blend-overlay z-10" />
          <img 
            src={getImageSrc("https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&auto=format&fit=crop&q=80", true)}
            alt="Latina women in professional setting" 
            className="w-full h-full object-cover"
            onError={createImageErrorHandler()}
          />
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-2/3 h-40 bg-gradient-to-l from-magenta/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-24 bg-gradient-to-r from-magenta/5 to-transparent"></div>
        <div className="absolute top-40 right-20 opacity-30 blur-xl">
          <div className="w-64 h-64 rounded-full bg-magenta/10"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-magenta/10 text-magenta font-medium text-sm mb-4">
              FREE COMMUNITY
            </span>
            <h2 className="section-heading mb-6">
              What's Included in Your Membership
            </h2>
            <p className="section-subheading max-w-2xl mx-auto text-gray-600">
              Join thousands of Latinas who are growing, connecting, and rising together in our supportive community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <BenefitCard 
              icon={<Users className="h-7 w-7" />}
              title="Private Community Access"
              description="Connect with like-minded Latinas in our exclusive online community for support, networking, and inspiration."
            />
            
            <BenefitCard 
              icon={<Zap className="h-7 w-7" />}
              title="Weekly Empowerment Content"
              description="Receive weekly emails with personal development resources, success stories, and actionable tips."
            />
            
            <BenefitCard 
              icon={<Calendar className="h-7 w-7" />}
              title="Virtual Events Access"
              description="Join our regular virtual workshops, panels, and networking sessions with successful Latina leaders."
            />
            
            <BenefitCard 
              icon={<Star className="h-7 w-7" />}
              title="Early Event Invites"
              description="Get first access to tickets for our in-person experiences and retreats before they sell out."
            />
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              className="bg-magenta hover:bg-magenta/90 text-white font-medium px-8 py-4 rounded-full shadow-lg shadow-magenta/10"
              onClick={() => document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-40 left-0 w-full h-[500px] bg-gradient-to-r from-magenta/5 via-black/0 to-magenta/5 transform -skew-y-6 z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-magenta/10 text-magenta font-medium text-sm mb-4">
              TESTIMONIALS
            </span>
            <h2 className="section-heading mb-6">
              What Our Community Members Say
            </h2>
            <p className="section-subheading max-w-2xl mx-auto text-gray-600">
              Hear directly from Latinas who have transformed their lives as part of our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
              {/* Quote marks */}
              <div className="absolute top-4 right-6 text-6xl text-magenta/10 font-serif">"</div>
              
              <div className="flex items-center mb-6">
                <img 
                  src={getImageSrc("https://images.unsplash.com/photo-1494790108377-be9c29b29330", true)} 
                  alt="Testimonial author" 
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-magenta/20"
                  onError={createImageErrorHandler()}
                />
                <div>
                  <h4 className="font-serif font-bold text-lg">Maria G.</h4>
                  <p className="text-gray-600 text-sm">Community Member</p>
                </div>
              </div>
              <p className="italic text-gray-700 text-lg mb-4 relative z-10">
                "Joining the Latina Empire community has connected me with incredible women who understand my journey. The resources and support have been invaluable for my personal growth."
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative md:mt-8">
              {/* Quote marks */}
              <div className="absolute top-4 right-6 text-6xl text-magenta/10 font-serif">"</div>
              
              <div className="flex items-center mb-6">
                <img 
                  src={getImageSrc("https://images.unsplash.com/photo-1573497161161-c3e73707e25c", true)} 
                  alt="Testimonial author" 
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-magenta/20"
                  onError={createImageErrorHandler()}
                />
                <div>
                  <h4 className="font-serif font-bold text-lg">Sofia R.</h4>
                  <p className="text-gray-600 text-sm">Community Member</p>
                </div>
              </div>
              <p className="italic text-gray-700 text-lg mb-4 relative z-10">
                "The weekly content and virtual workshops have given me practical tools to advance my career while embracing my Latina identity. It's the supportive community I've been looking for."
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
              {/* Quote marks */}
              <div className="absolute top-4 right-6 text-6xl text-magenta/10 font-serif">"</div>
              
              <div className="flex items-center mb-6">
                <img 
                  src={getImageSrc("https://images.unsplash.com/photo-1544005313-94ddf0286df2", true)} 
                  alt="Testimonial author" 
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-magenta/20"
                  onError={createImageErrorHandler()}
                />
                <div>
                  <h4 className="font-serif font-bold text-lg">Carmen T.</h4>
                  <p className="text-gray-600 text-sm">Community Member</p>
                </div>
              </div>
              <p className="italic text-gray-700 text-lg mb-4 relative z-10">
                "Finding this community has been transformational. The connections I've made and the inspiration I've found have helped me launch my business with confidence."
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Membership Tiers Section */}
      <section id="membership-tiers" className="py-24 bg-black text-white relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/20 to-black z-0"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-magenta/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-magenta/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-magenta/20 text-magenta font-medium text-sm mb-4">
              EXCLUSIVE ACCESS
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl mb-6">
              Choose Your Membership Level
            </h2>
            <p className="font-sans text-lg text-white/80 max-w-2xl mx-auto">
              Get access to exclusive resources, mentorship, and community support with our premium membership tiers designed for committed members.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <MembershipTier
              title="Free"
              price="Free"
              description="Start your journey with our supportive community"
              icon={<Users className="h-5 w-5 text-magenta" />}
              features={[
                "Community forum access",
                "Weekly newsletters",
                "Virtual event invitations",
                "Resource library access"
              ]}
              ctaText="Join Now"
              ctaAction={handleScrollToJoinForm}
            />
            
            {/* VIP Tier */}
            <MembershipTier
              title="VIP Access"
              price="$29"
              description="Enhanced resources and priority support"
              icon={<Shield className="h-5 w-5 text-magenta" />}
              isPopular={true}
              features={[
                "All Free tier benefits",
                "Exclusive VIP workshops",
                "Priority event registration",
                "1 monthly group coaching call",
                "Premium resource library",
                "Member directory access"
              ]}
              ctaText="Become a VIP Member"
              ctaAction={handleVIPJoin}
            />
            
            {/* Premium Tier */}
            <MembershipTier
              title="Premium"
              price="$99"
              description="Full suite of premium benefits and personal guidance"
              icon={<Crown className="h-5 w-5 text-magenta" />}
              features={[
                "All VIP tier benefits",
                "1:1 monthly coaching session",
                "Personalized success roadmap",
                "Early access to all new content",
                "Exclusive mastermind group",
                "VIP event discounts",
                "Featured member profile"
              ]}
              ctaText="Go Premium"
              ctaAction={handlePremiumJoin}
            />
          </div>
        </div>
      </section>
      
      {/* Secure Portal Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-4 block">
                  PRIVATE MEMBERS PORTAL
                </span>
                <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">
                  A Secure Space for Your Growth Journey
                </h2>
                <p className="text-gray-700 mb-6">
                  Our exclusive members portal provides a secure environment where you can access your personal development resources, connect with other members, and track your growth journey.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-magenta/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <Lock className="h-3 w-3 text-magenta" />
                    </div>
                    <span className="text-gray-700">Secure, members-only access to exclusive content</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-magenta/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <Key className="h-3 w-3 text-magenta" />
                    </div>
                    <span className="text-gray-700">Personalized dashboard to track your progress</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-magenta/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <CreditCard className="h-3 w-3 text-magenta" />
                    </div>
                    <span className="text-gray-700">Manage your subscription and benefits in one place</span>
                  </li>
                </ul>
                <Button
                  className="bg-magenta text-white px-6 py-2 rounded hover:bg-magenta/90"
                  onClick={handleScrollToJoinForm}
                >
                  Start Your Journey
                </Button>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-tl from-magenta/20 to-transparent -m-4 rounded-3xl blur-xl"></div>
                <div className="relative bg-gray-100 rounded-xl p-6 border border-gray-200 shadow-lg">
                  <div className="w-full h-10 flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                    <div className="flex">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="w-48 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="w-32 h-6 bg-magenta/20 rounded"></div>
                      <div className="w-20 h-6 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-20 bg-gray-200 rounded-lg"></div>
                      <div className="h-20 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="w-full h-12 bg-magenta/20 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Form Section */}
      <section id="join-form" className="py-20 bg-magenta text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
              Ready to Join the Empire?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Enter your email to join our free community and start your journey with us.
            </p>
            
            {isSubmitted ? (
              <div className="bg-white text-gray-900 rounded-lg p-8 text-center mx-auto max-w-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-serif font-bold text-2xl mb-2">You're In!</h3>
                <p className="text-gray-700 mb-6">
                  Check your inbox for a confirmation email and next steps to access the community.
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleTryAgain}
                  className="border-magenta text-magenta hover:bg-magenta hover:text-white"
                >
                  Join with Another Email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      className={`py-3 px-4 rounded-md border-transparent focus:border-transparent ${
                        emailError ? 'ring-2 ring-red-500' : ''
                      }`}
                      aria-invalid={!!emailError}
                      aria-describedby={emailError ? "email-error" : undefined}
                    />
                    {emailError && (
                      <div 
                        id="email-error" 
                        className="absolute -bottom-6 left-0 text-xs text-red-300 flex items-center bg-red-900/40 px-2 py-1 rounded"
                      >
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {emailError}
                      </div>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-black text-white hover:bg-gray-900 px-6 flex items-center justify-center min-w-[100px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                        <span>Joining...</span>
                      </>
                    ) : (
                      "Join Now"
                    )}
                  </Button>
                </div>
                <p className="text-white/80 text-sm mt-6">
                  We respect your privacy and will never share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-serif font-bold text-lg mb-2">Is the community really free?</h3>
                <p className="text-gray-700">
                  Yes! Our community is completely free to join. We believe in making resources and connections accessible to all Latinas. We do offer premium programs and events, but the community access is always free.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-serif font-bold text-lg mb-2">What kind of content can I expect?</h3>
                <p className="text-gray-700">
                  Our content focuses on personal and professional development, cultural celebration, leadership skills, wellness, financial literacy, and more. All content is created specifically for the unique experiences and needs of Latina women.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-serif font-bold text-lg mb-2">How do I access the community?</h3>
                <p className="text-gray-700">
                  After signing up, you'll receive an email with instructions to join our private online community platform. You'll be able to create a profile, join discussion threads, access resources, and connect with other members.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-serif font-bold text-lg mb-2">How often are virtual events held?</h3>
                <p className="text-gray-700">
                  We host at least two virtual events each month, including workshops, panel discussions, networking sessions, and Q&A with successful Latina leaders. All virtual events are recorded and available in our resource library for members who can't attend live.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">
              Your Journey Begins Here
            </h2>
            <p className="font-sans text-lg text-gray-700 mb-8">
              Join thousands of Latinas who are growing, connecting, and rising together in our supportive community.
            </p>
            <Button 
              className="bg-magenta text-white px-8 py-6 h-auto rounded text-lg hover:bg-opacity-90 shadow-md flex items-center mx-auto"
              onClick={() => document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join The Movement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      

    </div>
  );
};

export default Join;