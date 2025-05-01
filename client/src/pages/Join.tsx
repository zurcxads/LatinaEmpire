import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Zap, Calendar, Star, ArrowRight, Check, AlertCircle, Loader } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

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
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
      <div className="w-12 h-12 bg-magenta/10 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-serif font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const Join = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Join the Latina Empire Movement
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-700 mb-10">
              Access our free community and step into your power with Latinas around the world.
            </p>
            <Button 
              className="bg-magenta text-white px-8 py-6 h-auto rounded text-lg hover:bg-opacity-90 shadow-md"
              onClick={() => document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
              What's Included in Your Free Membership
            </h2>
            <p className="font-sans text-gray-700">
              Join thousands of Latinas who are growing, connecting, and rising together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard 
              icon={<Users className="h-6 w-6 text-magenta" />}
              title="Private Community Access"
              description="Connect with like-minded Latinas in our exclusive online community for support, networking, and inspiration."
            />
            
            <BenefitCard 
              icon={<Zap className="h-6 w-6 text-magenta" />}
              title="Weekly Empowerment Content"
              description="Receive weekly emails with personal development resources, success stories, and actionable tips."
            />
            
            <BenefitCard 
              icon={<Calendar className="h-6 w-6 text-magenta" />}
              title="Virtual Events Access"
              description="Join our regular virtual workshops, panels, and networking sessions with successful Latina leaders."
            />
            
            <BenefitCard 
              icon={<Star className="h-6 w-6 text-magenta" />}
              title="Early Event Invites"
              description="Get first access to tickets for our in-person experiences and retreats before they sell out."
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
              What Our Community Members Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  alt="Testimonial author" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-serif font-bold">Maria G.</h4>
                  <p className="text-gray-600 text-sm">Community Member</p>
                </div>
              </div>
              <p className="italic text-gray-700">
                "Joining the Latina Empire community has connected me with incredible women who understand my journey. The resources and support have been invaluable for my personal growth."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  alt="Testimonial author" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-serif font-bold">Sofia R.</h4>
                  <p className="text-gray-600 text-sm">Community Member</p>
                </div>
              </div>
              <p className="italic text-gray-700">
                "The weekly content and virtual workshops have given me practical tools to advance my career while embracing my Latina identity. It's the supportive community I've been looking for."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  alt="Testimonial author" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-serif font-bold">Carmen T.</h4>
                  <p className="text-gray-600 text-sm">Community Member</p>
                </div>
              </div>
              <p className="italic text-gray-700">
                "Finding this community has been transformational. The connections I've made and the inspiration I've found have helped me launch my business with confidence."
              </p>
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
      
      <Footer />
    </div>
  );
};

export default Join;