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
      
      
      {/* Main Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            
            
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
