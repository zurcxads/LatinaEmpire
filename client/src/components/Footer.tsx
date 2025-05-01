import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { 
  FaInstagram, 
  FaFacebookF, 
  FaYoutube, 
  FaLinkedinIn,
  FaTwitter 
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
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h3 className="font-serif font-bold text-3xl md:text-4xl mb-4">Get Latina Empire Updates</h3>
            <p className="font-sans text-lg text-white/70 mb-0 max-w-xl">
              Join our newsletter for the latest events, exclusive content and program updates.
            </p>
          </div>
          
          <div className="w-full">
            {subscribed ? (
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <p className="text-white font-semibold text-lg">
                  Thank you for subscribing!
                </p>
                <p className="text-white/70">
                  Check your inbox for a confirmation email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow py-6 px-6 rounded-full border-0 bg-white/10 text-white placeholder-white/50 focus:ring-magenta"
                />
                <Button 
                  type="submit" 
                  className="bg-white text-black hover:bg-gray-100 rounded-full py-6 px-8 h-auto"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <Link href="/" className="inline-block mb-6">
                <span className="font-serif font-bold text-3xl">Latina Empire</span>
              </Link>
              <p className="font-sans text-white/70 mb-6">
                Empowering Latinas to reach their highest potential through community, coaching, and connection.
              </p>
              <div className="flex space-x-5 mb-8">
                <a href="https://instagram.com/latinaempire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-magenta transition-all" aria-label="Instagram">
                  <FaInstagram className="text-lg" />
                </a>
                <a href="https://facebook.com/latinaempire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-magenta transition-all" aria-label="Facebook">
                  <FaFacebookF className="text-lg" />
                </a>
                <a href="https://youtube.com/latinaempire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-magenta transition-all" aria-label="YouTube">
                  <FaYoutube className="text-lg" />
                </a>
                <a href="https://twitter.com/latinaempire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-magenta transition-all" aria-label="Twitter">
                  <FaTwitter className="text-lg" />
                </a>
                <a href="https://linkedin.com/company/latinaempire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-magenta transition-all" aria-label="LinkedIn">
                  <FaLinkedinIn className="text-lg" />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="font-sans uppercase tracking-wider text-sm font-semibold mb-6">Program</h3>
              <ul className="space-y-4">
                <li><Link href="/program" className="font-sans text-white/70 hover:text-white transition-all">Elite Program</Link></li>
                <li><Link href="/program" className="font-sans text-white/70 hover:text-white transition-all">Coaching</Link></li>
                <li><Link href="/program" className="font-sans text-white/70 hover:text-white transition-all">Membership</Link></li>
                <li><Link href="/program" className="font-sans text-white/70 hover:text-white transition-all">Results</Link></li>
                <li><Link href="/program" className="font-sans text-white/70 hover:text-white transition-all">Success Stories</Link></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="font-sans uppercase tracking-wider text-sm font-semibold mb-6">Events</h3>
              <ul className="space-y-4">
                <li><Link href="/events" className="font-sans text-white/70 hover:text-white transition-all">Upcoming Events</Link></li>
                <li><Link href="/events" className="font-sans text-white/70 hover:text-white transition-all">Virtual Seminars</Link></li>
                <li><Link href="/events" className="font-sans text-white/70 hover:text-white transition-all">Live Conferences</Link></li>
                <li><Link href="/events" className="font-sans text-white/70 hover:text-white transition-all">Workshops</Link></li>
                <li><Link href="/events" className="font-sans text-white/70 hover:text-white transition-all">Past Events</Link></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="font-sans uppercase tracking-wider text-sm font-semibold mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><Link href="/ambassadors" className="font-sans text-white/70 hover:text-white transition-all">Ambassadors</Link></li>
                <li><Link href="/join" className="font-sans text-white/70 hover:text-white transition-all">Community</Link></li>
                <li><Link href="/program" className="font-sans text-white/70 hover:text-white transition-all">Free Resources</Link></li>
                <li><Link href="#" className="font-sans text-white/70 hover:text-white transition-all">Blog</Link></li>
                <li><Link href="#" className="font-sans text-white/70 hover:text-white transition-all">Podcast</Link></li>
              </ul>
            </div>
            
            <div className="md:col-span-3">
              <h3 className="font-sans uppercase tracking-wider text-sm font-semibold mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="font-sans text-white/70">
                  <span className="block font-semibold text-white mb-1">Email Us:</span> 
                  <a href="mailto:hello@latinaempire.com" className="hover:text-white transition-all">hello@latinaempire.com</a>
                </li>
                <li className="font-sans text-white/70">
                  <span className="block font-semibold text-white mb-1">Call Us:</span> 
                  <a href="tel:+18005551234" className="hover:text-white transition-all">(800) 555-1234</a>
                </li>
                <li className="font-sans text-white/70">
                  <span className="block font-semibold text-white mb-1">Location:</span> 
                  123 Ocean Drive,<br />Miami, FL 33139
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Latina Empire. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="#" className="font-sans text-white/50 text-sm hover:text-white transition-all">Privacy Policy</Link>
              <Link href="#" className="font-sans text-white/50 text-sm hover:text-white transition-all">Terms of Service</Link>
              <Link href="#" className="font-sans text-white/50 text-sm hover:text-white transition-all">Cookie Policy</Link>
              <Link href="#" className="font-sans text-white/50 text-sm hover:text-white transition-all">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
