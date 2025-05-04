
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { X, Instagram, Phone, Mail } from "lucide-react";
import JoinModal from "./JoinModal";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglineRef = useRef<HTMLDivElement>(null);

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

  // Rotating taglines
  const taglines = [
    "LATINA EMPIRE IS AN INDEPENDENT PLATFORM FOR EMPOWERING LATINA LEADERS",
    "JOIN THOUSANDS OF LATINA LEADERS CREATING GENERATIONAL WEALTH AND IMPACT",
    "TRANSFORM YOUR LIFE AND LEGACY WITH OUR COMMUNITY OF AMBITIOUS LATINAS"
  ];

  // Animate the tagline
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Content for the About dropdown
  const aboutMenuContent = (
    <div className="grid grid-cols-2 gap-1">
      <Link href="/about-founder" className="p-4 hover:bg-white/10 transition-colors">
        <h3 className="text-base font-medium mb-1">Our Founder</h3>
      </Link>
      <Link href="/program" className="p-4 hover:bg-white/10 transition-colors">
        <h3 className="text-base font-medium mb-1">Leadership Program</h3>
      </Link>
      <Link href="/ambassadors" className="p-4 hover:bg-white/10 transition-colors">
        <h3 className="text-base font-medium mb-1">Ambassadors</h3>
      </Link>
      <Link href="/join" className="p-4 hover:bg-white/10 transition-colors">
        <h3 className="text-base font-medium mb-1">Join the Movement</h3>
      </Link>
    </div>
  );

  // Content for the Contact dropdown
  const contactMenuContent = (
    <div className="p-4">
      <div className="mb-5">
        <h3 className="text-xs uppercase tracking-wider text-white/60 mb-2">GENERAL INQUIRIES</h3>
        <p className="text-base mb-1">contact@latina-empire.com</p>
        <p className="text-base mb-2">+1 (888) 123-4567</p>
        <Button className="px-0 text-white hover:text-white/80 bg-transparent hover:bg-transparent p-0 h-auto underline underline-offset-4 text-sm">
          Plan a Call
        </Button>
      </div>
      
      <div className="mb-5">
        <h3 className="text-xs uppercase tracking-wider text-white/60 mb-2">VISIT</h3>
        <p className="text-base mb-1">123 Ocean Avenue</p>
        <p className="text-base mb-1">Miami, FL 33139</p>
        <p className="text-base mb-2">United States</p>
      </div>
      
      <div className="mb-5">
        <h3 className="text-xs uppercase tracking-wider text-white/60 mb-2">CAREERS</h3>
        <p className="text-base mb-1">Join Our Team</p>
        <p className="text-base mb-2">Ambassador Program</p>
      </div>
      
      <div className="flex space-x-4 mt-5">
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
      
      <div className="w-full flex items-center justify-center fixed z-50 pt-4 px-5">
        <header className="bg-black/20 backdrop-blur-sm max-w-5xl w-full rounded-2xl overflow-hidden shadow-xl">
          {/* Main navigation bar */}
          <nav className="relative z-20">
            <div className="flex flex-col">
              {/* Top row with main navigation links */}
              <div className="flex items-center justify-between px-5 py-3 relative">
                {/* Main nav buttons */}
                <button 
                  onClick={() => toggleMenu('about')}
                  className={`px-6 py-1.5 text-base transition-all relative ${
                    activeMenu === 'about' 
                      ? 'text-black bg-white rounded-md' 
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  About
                </button>
                
                <button 
                  onClick={() => location !== '/' ? (window.location.href = '/') : toggleMenu('work')}
                  className={`px-6 py-1.5 text-base transition-all ${
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
                  className={`px-6 py-1.5 text-base transition-all ${
                    activeMenu === 'contact' 
                      ? 'text-black bg-white rounded-md' 
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  Contact
                </button>
              </div>
              
              {/* Bottom row with rotating tagline */}
              <div className="px-5 pb-2 overflow-hidden" ref={taglineRef}>
                <div 
                  className="whitespace-nowrap relative transition-transform duration-1000 ease-in-out"
                  style={{ 
                    transform: `translateX(${-100 * taglineIndex}%)`,
                    width: '300%' // 3 taglines side by side
                  }}
                >
                  {taglines.map((tagline, idx) => (
                    <span 
                      key={idx} 
                      className="inline-block w-1/3 text-center text-white/70 text-xs tracking-wider uppercase"
                    >
                      {tagline}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </nav>
          
          {/* Dropdown menus */}
          {activeMenu && (
            <div className="bg-black/80 text-white relative z-10">
              {activeMenu === 'about' && aboutMenuContent}
              {activeMenu === 'contact' && contactMenuContent}
              {activeMenu === 'work' && (
                <div className="grid grid-cols-2 gap-1">
                  <Link href="/events" className="p-4 hover:bg-white/10 transition-colors">
                    <h3 className="text-base font-medium mb-1">All Events</h3>
                  </Link>
                  <Link href="/blog" className="p-4 hover:bg-white/10 transition-colors">
                    <h3 className="text-base font-medium mb-1">Blog & Resources</h3>
                  </Link>
                  <Link href="/events/latina-leadership-summit-2023" className="p-4 hover:bg-white/10 transition-colors">
                    <h3 className="text-base font-medium mb-1">Leadership Summit</h3>
                  </Link>
                  <Link href="/events/entrepreneurship-intensive-2023" className="p-4 hover:bg-white/10 transition-colors">
                    <h3 className="text-base font-medium mb-1">Entrepreneurship Intensive</h3>
                  </Link>
                </div>
              )}
            </div>
          )}
        </header>
      </div>
      
      {/* Mobile menu - only shown on small screens */}
      <div className="lg:hidden fixed bottom-5 left-0 right-0 z-50 flex justify-center">
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 flex space-x-4">
          <Button 
            onClick={() => toggleMenu('about')}
            className={`rounded-full px-4 py-1 h-auto text-sm ${
              activeMenu === 'about' 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-transparent text-white border border-white/30 hover:bg-white/10'
            }`}
          >
            About
          </Button>
          <Button 
            onClick={() => location !== '/' ? (window.location.href = '/') : toggleMenu('work')}
            className={`rounded-full px-4 py-1 h-auto text-sm ${
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
            className={`rounded-full px-4 py-1 h-auto text-sm ${
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
