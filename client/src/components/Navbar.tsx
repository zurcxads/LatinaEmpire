
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { X, Instagram, Phone, Mail } from "lucide-react";
import JoinModal from "./JoinModal";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close menus when navigating to a new page
  useEffect(() => {
    setActiveMenu(null);
  }, [location]);

  // Handle scroll and resize events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle menu function
  const toggleMenu = (menu: string) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  // Tagline text
  const tagline = "LATINA EMPIRE IS AN INDEPENDENT PLATFORM FOR EMPOWERING LATINA LEADERS";

  // Content for the About dropdown
  const aboutMenuContent = (
    <div className="grid grid-cols-2 gap-1">
      <Link href="/about-founder" className="p-5 hover:bg-white/10 transition-colors">
        <h3 className="text-xl font-medium mb-2">Our Founder</h3>
      </Link>
      <Link href="/program" className="p-5 hover:bg-white/10 transition-colors">
        <h3 className="text-xl font-medium mb-2">Leadership Program</h3>
      </Link>
      <Link href="/ambassadors" className="p-5 hover:bg-white/10 transition-colors">
        <h3 className="text-xl font-medium mb-2">Ambassadors</h3>
      </Link>
      <Link href="/join" className="p-5 hover:bg-white/10 transition-colors">
        <h3 className="text-xl font-medium mb-2">Join the Movement</h3>
      </Link>
    </div>
  );

  // Content for the Contact dropdown
  const contactMenuContent = (
    <div className="p-5">
      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-wider text-white/60 mb-3">GENERAL INQUIRIES</h3>
        <p className="text-xl mb-1">contact@latina-empire.com</p>
        <p className="text-xl mb-3">+1 (888) 123-4567</p>
        <Button className="px-0 text-white hover:text-white/80 bg-transparent hover:bg-transparent p-0 h-auto underline underline-offset-4">
          Plan a Call
        </Button>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-wider text-white/60 mb-3">VISIT</h3>
        <p className="text-xl mb-1">123 Ocean Avenue</p>
        <p className="text-xl mb-1">Miami, FL 33139</p>
        <p className="text-xl mb-3">United States</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-wider text-white/60 mb-3">CAREERS</h3>
        <p className="text-xl mb-1">Join Our Team</p>
        <p className="text-xl mb-3">Ambassador Program</p>
      </div>
      
      <div className="flex space-x-4 mt-6">
        <h3 className="text-xs uppercase tracking-wider text-white/60">FOLLOW US</h3>
        <Instagram className="w-4 h-4" />
        <Mail className="w-4 h-4" />
        <Phone className="w-4 h-4" />
      </div>
    </div>
  );

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <div className="w-full flex items-center justify-center fixed z-50 pt-5 px-5">
        <header className="bg-black/30 backdrop-blur-sm max-w-6xl w-full rounded-2xl overflow-hidden shadow-xl">
          {/* Main navigation bar */}
          <nav className="relative z-20">
            <div className="flex flex-col">
              {/* Top row with main navigation links */}
              <div className="flex items-center justify-between px-6 py-4 relative">
                {/* Main nav buttons */}
                <button 
                  onClick={() => toggleMenu('about')}
                  className={`px-8 py-2 text-lg transition-all relative ${
                    activeMenu === 'about' 
                      ? 'text-black bg-white rounded-md' 
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  About
                </button>
                
                <button 
                  onClick={() => location !== '/' ? (window.location.href = '/') : toggleMenu('work')}
                  className={`px-8 py-2 text-lg transition-all ${
                    location === '/' && !activeMenu 
                      ? 'text-white font-medium' 
                      : activeMenu === 'work'
                        ? 'text-black bg-white rounded-md'
                        : 'text-white hover:text-white/80'
                  }`}
                >
                  {location === '/' ? 'Events' : 'Home'}
                </button>
                
                <button 
                  onClick={() => toggleMenu('contact')}
                  className={`px-8 py-2 text-lg transition-all ${
                    activeMenu === 'contact' 
                      ? 'text-black bg-white rounded-md' 
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  Contact
                </button>
              </div>
              
              {/* Bottom row with tagline */}
              <div className="px-6 pb-3">
                <p className="text-white/70 text-xs tracking-wider uppercase">
                  {tagline}
                </p>
              </div>
            </div>
          </nav>
          
          {/* Dropdown menus */}
          {activeMenu && (
            <div className="bg-black/90 text-white relative z-10">
              {activeMenu === 'about' && aboutMenuContent}
              {activeMenu === 'contact' && contactMenuContent}
              {activeMenu === 'work' && (
                <div className="grid grid-cols-2 gap-1">
                  <Link href="/events" className="p-5 hover:bg-white/10 transition-colors">
                    <h3 className="text-xl font-medium mb-2">All Events</h3>
                  </Link>
                  <Link href="/blog" className="p-5 hover:bg-white/10 transition-colors">
                    <h3 className="text-xl font-medium mb-2">Blog & Resources</h3>
                  </Link>
                  <Link href="/events/latina-leadership-summit-2023" className="p-5 hover:bg-white/10 transition-colors">
                    <h3 className="text-xl font-medium mb-2">Leadership Summit</h3>
                  </Link>
                  <Link href="/events/entrepreneurship-intensive-2023" className="p-5 hover:bg-white/10 transition-colors">
                    <h3 className="text-xl font-medium mb-2">Entrepreneurship Intensive</h3>
                  </Link>
                </div>
              )}
            </div>
          )}
        </header>
      </div>
      
      {/* Mobile menu - only shown on small screens */}
      <div className="lg:hidden fixed bottom-5 left-0 right-0 z-50 flex justify-center">
        <div className="bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 flex space-x-6">
          <Button 
            onClick={() => toggleMenu('about')}
            className={`rounded-full px-5 ${
              activeMenu === 'about' 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-transparent text-white border border-white/30 hover:bg-white/10'
            }`}
          >
            About
          </Button>
          <Button 
            onClick={() => location !== '/' ? (window.location.href = '/') : toggleMenu('work')}
            className={`rounded-full px-5 ${
              location === '/' && !activeMenu
                ? 'bg-transparent text-white border border-white/30 hover:bg-white/10 font-bold'
                : activeMenu === 'work'
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-transparent text-white border border-white/30 hover:bg-white/10'
            }`}
          >
            {location === '/' ? 'Events' : 'Home'}
          </Button>
          <Button 
            onClick={() => toggleMenu('contact')}
            className={`rounded-full px-5 ${
              activeMenu === 'contact' 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-transparent text-white border border-white/30 hover:bg-white/10'
            }`}
          >
            Contact
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
