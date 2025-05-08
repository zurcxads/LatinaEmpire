import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  Users, 
  Building, 
  Newspaper, 
  UserPlus, 
  Globe,
  Handshake,
  AlertCircle, 
  Loader, 
  ArrowRight 
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
// Footer is already included in App.tsx
import { Link } from "wouter";

import { useToast } from "@/hooks/use-toast";
import SuccessConfetti from "@/components/SuccessConfetti";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Contact card component
const ContactCard = ({ 
  icon, 
  title, 
  email, 
  description, 
  buttonText, 
  buttonHref 
}: { 
  icon: React.ReactNode;
  title: string;
  email?: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col h-full">
      <div className="w-12 h-12 bg-magenta/10 rounded-full flex items-center justify-center text-magenta mb-4">
        {icon}
      </div>
      
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      
      {email && (
        <a 
          href={`mailto:${email}`} 
          className="text-magenta hover:underline mb-2 inline-block"
        >
          {email}
        </a>
      )}
      
      <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
      
      {buttonText && buttonHref && (
        <Link href={buttonHref}>
          <Button className="mt-auto text-sm w-full justify-between bg-white text-magenta border border-magenta hover:bg-magenta/5 group">
            {buttonText}
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error on field change
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
    
    // Clear error
    if (formErrors.subject) {
      setFormErrors(prev => ({
        ...prev,
        subject: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;
    
    // Validate name
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }
    
    // Validate subject
    if (!formData.subject) {
      errors.subject = "Please select a subject";
      isValid = false;
    }
    
    // Validate message
    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Please check your form",
        description: "There are some errors in your submission.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This is where you would normally connect to a backend API
      // For now, we'll simulate API call
      console.log("Form submitted:", formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowConfetti(true); // Trigger confetti
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly via email.",
        variant: "destructive"
      });
    }
  };

  const sendAnotherMessage = () => {
    setIsSubmitted(false);
    setFormErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SuccessConfetti active={showConfetti} />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-black via-black/90 to-magenta/30 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif font-bold text-5xl md:text-6xl mb-6">
              Let's Build Together
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get in touch with Latina Empire's global leadership team for media, partnership, or team opportunities.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">How Can We Help You?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ContactCard
              icon={<Mail className="h-6 w-6" />}
              title="General Inquiries"
              email="contact@latinaempire.com"
              description="Have a question about our organization? We'd love to hear from you and will respond promptly."
            />
            
            <ContactCard
              icon={<Handshake className="h-6 w-6" />}
              title="Partnerships & Sponsors"
              email="sponsor@latinaempire.com"
              description="Interested in partnering with Latina Empire? Let's create impact together."
            />
            
            <ContactCard
              icon={<Newspaper className="h-6 w-6" />}
              title="Press & Media"
              email="media@latinaempire.com"
              description="For media inquiries, expert commentary, and interview requests."
            />
            
            <ContactCard
              icon={<UserPlus className="h-6 w-6" />}
              title="Join Our Team"
              description="Become part of our global network of leaders driving impactful change."
              buttonText="Apply to be a Leader"
              buttonHref="/leaders"
            />
            
            <ContactCard
              icon={<Globe className="h-6 w-6" />}
              title="Start a Chapter"
              description="Launch a local Manahood chapter and create a community in your area."
              buttonText="Start a Manahood"
              buttonHref="/manahood/start"
            />
            
            <ContactCard
              icon={<Building className="h-6 w-6" />}
              title="Corporate Engagements"
              email="corporate@latinaempire.com"
              description="Book a workshop or speaker for your organization or corporate event."
            />
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold mb-4">Send Us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            
            {isSubmitted ? (
              <div className="bg-white border border-green-200 rounded-xl shadow-sm p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-700 mb-6">
                  We've received your message and will get back to you as soon as possible.
                </p>
                <Button 
                  onClick={sendAnotherMessage}
                  className="bg-magenta hover:bg-magenta/90 text-white"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors.name && (
                        <div className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {formErrors.name}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors.email && (
                        <div className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {formErrors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={handleSelectChange} value={formData.subject}>
                      <SelectTrigger 
                        className={`w-full rounded-lg border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="media">Press & Media</SelectItem>
                        <SelectItem value="careers">Join Our Team</SelectItem>
                        <SelectItem value="chapter">Start a Chapter</SelectItem>
                        <SelectItem value="corporate">Corporate Engagement</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.subject && (
                      <div className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.subject}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`rounded-lg border ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.message && (
                      <div className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.message}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-magenta hover:bg-magenta/90 text-white rounded-lg py-6 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    All fields marked with <span className="text-red-500">*</span> are required
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Want to learn more before reaching out?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Discover the story behind Latina Empire and meet the visionary founder who started it all.
            </p>
            <Link href="/about-founder">
              <Button className="bg-magenta hover:bg-magenta/90 text-white rounded-full text-lg py-6 px-10">
                Explore Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer is rendered in App.tsx */}
    </div>
  );
};

export default Contact;