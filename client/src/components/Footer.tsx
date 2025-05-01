import { Link } from "wouter";
import { 
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <span className="font-serif font-bold text-2xl">Latina Empire</span>
            </Link>
            <p className="font-sans text-gray-400 mb-6">
              Empowering Latinas to reach their highest potential through community, coaching, and connection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-magenta transition-all" aria-label="Instagram">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-magenta transition-all" aria-label="Facebook">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-magenta transition-all" aria-label="Twitter">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-magenta transition-all" aria-label="LinkedIn">
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="font-sans text-gray-400 hover:text-magenta transition-all">Home</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">About Us</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Program</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Events</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Ambassadors</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Blog</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Podcast</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Free Courses</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Community</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Testimonials</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Contact Us</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Support</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Partnerships</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Careers</Link></li>
                <li><Link href="#" className="font-sans text-gray-400 hover:text-magenta transition-all">Media Inquiries</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="font-sans text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Latina Empire. All rights reserved.
          </p>
          <div className="flex space-x-6">
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
