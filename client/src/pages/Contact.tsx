import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
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
                  <h3 className="font-serif font-bold text-2xl mb-2">Message Sent!</h3>
                  <p className="text-gray-700 mb-4">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-magenta focus:border-magenta"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-magenta focus:border-magenta"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="How can we help you?"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-magenta focus:border-magenta"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-magenta text-white hover:bg-opacity-90 py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
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