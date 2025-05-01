import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FaInstagram, 
  FaFacebookF, 
  FaYoutube, 
  FaLinkedinIn 
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    // This would typically send the email to a server
    console.log("Newsletter signup:", email);
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-serif font-bold text-2xl mb-4">Join Our Newsletter</h3>
            <p className="font-sans text-gray-400 mb-8 max-w-xl mx-auto">
              Stay updated with the latest events, resources, and inspiration from the Latina Empire community.
            </p>
            {subscribed ? (
              <div className="bg-magenta/10 rounded-lg p-4 text-center max-w-md mx-auto">
                <p className="text-gray-100">
                  Thank you for subscribing! Check your inbox for a confirmation email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow py-3 px-4 rounded-md border-0 bg-gray-800 text-white placeholder-gray-500"
                />
                <Button 
                  type="submit" 
                  className="bg-magenta hover:bg-magenta/90 text-white"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <span className="font-serif font-bold text-2xl">Latina Empire</span>
            </Link>
            <p className="font-sans text-gray-400 mb-6">
              Empowering Latinas to reach their highest potential through community, coaching, and connection.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/latinaempire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-magenta transition-all" aria-label="Instagram">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://facebook.com/latinaempire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-magenta transition-all" aria-label="Facebook">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="https://youtube.com/latinaempire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-magenta transition-all" aria-label="YouTube">
                <FaYoutube className="text-xl" />
              </a>
              <a href="https://linkedin.com/company/latinaempire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-magenta transition-all" aria-label="LinkedIn">
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="font-sans text-gray-400 hover:text-magenta transition-all">Home</Link></li>
                <li><Link href="/program" className="font-sans text-gray-400 hover:text-magenta transition-all">Elite Program</Link></li>
                <li><Link href="/events" className="font-sans text-gray-400 hover:text-magenta transition-all">Events</Link></li>
                <li><Link href="/ambassadors" className="font-sans text-gray-400 hover:text-magenta transition-all">Ambassadors</Link></li>
                <li><Link href="/join" className="font-sans text-gray-400 hover:text-magenta transition-all">Join Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/program" className="font-sans text-gray-400 hover:text-magenta transition-all">Elite Coaching</Link></li>
                <li><Link href="/events" className="font-sans text-gray-400 hover:text-magenta transition-all">Upcoming Events</Link></li>
                <li><Link href="/join" className="font-sans text-gray-400 hover:text-magenta transition-all">Free Community</Link></li>
                <li><Link href="/ambassadors" className="font-sans text-gray-400 hover:text-magenta transition-all">Find an Ambassador</Link></li>
                <li><Link href="/contact" className="font-sans text-gray-400 hover:text-magenta transition-all">Request Info</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li><Link href="/contact" className="font-sans text-gray-400 hover:text-magenta transition-all">Contact Us</Link></li>
                <li><Link href="/contact" className="font-sans text-gray-400 hover:text-magenta transition-all">Support</Link></li>
                <li><Link href="/contact" className="font-sans text-gray-400 hover:text-magenta transition-all">Partnerships</Link></li>
                <li><Link href="/contact" className="font-sans text-gray-400 hover:text-magenta transition-all">Media Inquiries</Link></li>
                <li><a href="mailto:hello@latinaempire.com" className="font-sans text-gray-400 hover:text-magenta transition-all">hello@latinaempire.com</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="font-sans text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Latina Empire. All rights reserved. 123 Ocean Drive, Miami, FL 33139
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="font-sans text-gray-500 text-sm hover:text-magenta transition-all">Privacy Policy</Link>
            <Link href="#" className="font-sans text-gray-500 text-sm hover:text-magenta transition-all">Terms of Service</Link>
            <Link href="#" className="font-sans text-gray-500 text-sm hover:text-magenta transition-all">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
