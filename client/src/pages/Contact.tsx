import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Instagram, MapPin, AlertCircle, Loader } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import SuccessConfetti from "@/components/SuccessConfetti";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
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
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      
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
        message: ""
      });
      
      // Log for future implementation
      console.log("Ready to integrate with Formspree or custom API at: '/api/contact'");
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
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6">We'd Love to Hear From You</h1>
            <p className="font-sans text-lg text-gray-700 mb-4">
              Whether you're press, media, partnership, or just curious — reach out.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-bold text-2xl mb-2">Thank You!</h3>
                  <p className="text-gray-700 mb-4">
                    We've received your message and will get back to you as soon as possible.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={sendAnotherMessage}
                    className="mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 border ${formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-magenta'} rounded-md`}
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                    />
                    {formErrors.name && (
                      <div id="name-error" className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
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
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 border ${formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-magenta'} rounded-md`}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                    />
                    {formErrors.email && (
                      <div id="email-error" className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.email}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full p-3 border ${formErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-magenta'} rounded-md`}
                      aria-invalid={!!formErrors.message}
                      aria-describedby={formErrors.message ? "message-error" : undefined}
                    />
                    {formErrors.message && (
                      <div id="message-error" className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.message}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-magenta text-white hover:bg-opacity-90 py-3 flex items-center justify-center"
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
              )}
            </div>
            
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="font-serif font-bold text-2xl mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      <div className="w-10 h-10 bg-magenta/10 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-magenta" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold mb-1">Email Us</h3>
                      <a 
                        href="mailto:hello@latinaempire.com" 
                        className="text-magenta hover:underline"
                      >
                        hello@latinaempire.com
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        We'll respond within 48 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      <div className="w-10 h-10 bg-magenta/10 rounded-full flex items-center justify-center">
                        <Instagram className="h-5 w-5 text-magenta" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold mb-1">Follow Us</h3>
                      <a 
                        href="https://instagram.com/latinaempire" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-magenta hover:underline"
                      >
                        @latinaempire
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        DM us for quick responses
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      <div className="w-10 h-10 bg-magenta/10 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-magenta" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold mb-1">Call Us</h3>
                      <a 
                        href="tel:+1234567890" 
                        className="text-magenta hover:underline"
                      >
                        (123) 456-7890
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        Mon-Fri, 9am-5pm EST
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-serif font-semibold text-lg mb-3">Media Inquiries</h3>
                  <p className="text-gray-700 mb-4">
                    For press and media inquiries, please contact our media relations team.
                  </p>
                  <a 
                    href="mailto:press@latinaempire.com" 
                    className="text-magenta hover:underline font-medium"
                  >
                    press@latinaempire.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Location Map (Optional) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-serif font-bold text-3xl mb-4">Visit Us</h2>
            <p className="font-sans text-gray-700">
              Our headquarters is located in Miami, with regional offices across the United States and Latin America.
            </p>
          </div>
          
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-magenta mx-auto mb-3" />
              <p className="font-sans font-semibold mb-1">Miami Headquarters</p>
              <p className="font-sans text-gray-600">123 Ocean Drive, Miami, FL 33139</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;