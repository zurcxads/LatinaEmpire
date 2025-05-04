
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { X, Instagram, Phone, Mail, ArrowRight } from "lucide-react";
import JoinModal from "./JoinModal";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
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
    "LATINA EMPIRE IS AN INDEPENDENT PLATFORM FOR EMPOWERING LATINA LEADERS • ",
    "JOIN THOUSANDS OF LATINA LEADERS CREATING GENERATIONAL WEALTH AND IMPACT • ",
    "TRANSFORM YOUR LIFE AND LEGACY WITH OUR COMMUNITY OF AMBITIOUS LATINAS • "
  ].join(' ');

  // Menu structure reorganized
  const menuStructure = {
    about: {
      title: "About",
      items: [
        { label: "Our Founder", href: "/about-founder" },
        { label: "Leadership Program", href: "/program" },
        { label: "Ambassadors", href: "/ambassadors" },
        { label: "Join the Movement", href: "/join" }
      ]
    },
    explore: {
      title: "Explore",
      items: [
        { label: "Events", href: "/events" },
        { label: "Blog & Resources", href: "/blog" },
        { label: "Leadership Summit", href: "/events/latina-leadership-summit-2023" },
        { label: "Entrepreneurship Intensive", href: "/events/entrepreneurship-intensive-2023" }
      ]
    },
    contact: {
      title: "Contact",
      content: (
        <div className="p-3">
          <div className="mb-4">
            <h3 className="text-xs uppercase tracking-wider text-white/60 mb-2 text-center">GENERAL INQUIRIES</h3>
            <p className="text-sm mb-1 text-center">contact@latina-empire.com</p>
            <p className="text-sm mb-2 text-center">+1 (888) 123-4567</p>
            <div className="text-center">
              <Button className="px-0 text-white hover:text-white/80 bg-transparent hover:bg-transparent p-0 h-auto underline underline-offset-4 text-sm mx-auto">
                Plan a Call
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-xs uppercase tracking-wider text-white/60 mb-2 text-center">VISIT</h3>
            <p className="text-sm mb-1 text-center">123 Ocean Avenue</p>
            <p className="text-sm mb-1 text-center">Miami, FL 33139</p>
            <p className="text-sm mb-2 text-center">United States</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-xs uppercase tracking-wider text-white/60 mb-2 text-center">CAREERS</h3>
            <p className="text-sm mb-1 text-center">Join Our Team</p>
            <p className="text-sm mb-2 text-center">Ambassador Program</p>
          </div>
          
          <div className="flex justify-center items-center space-x-4 mt-4">
            <h3 className="text-xs uppercase tracking-wider text-white/60">FOLLOW US</h3>
            <Instagram className="w-4 h-4" />
            <Mail className="w-4 h-4" />
            <Phone className="w-4 h-4" />
          </div>
        </div>
      )
    }
  };

  // Generate menu content
  const getMenuContent = (menuKey: string) => {
    if (menuKey === 'contact') {
      return menuStructure.contact.content;
    }
    
    const menu = menuKey === 'about' ? menuStructure.about : menuStructure.explore;
    
    return (
      <div className="grid grid-cols-2 gap-0.5">
        {menu.items.map((item, idx) => (
          <Link key={idx} href={item.href} className="p-3 hover:bg-white/10 transition-colors">
            <h3 className="text-sm font-medium text-center">{item.label}</h3>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <div className="w-full flex items-center justify-center fixed z-50 pt-3 px-5">
        <header className="bg-black/15 backdrop-blur-sm max-w-4xl w-full rounded-2xl overflow-hidden shadow-xl">
          {/* Main navigation bar */}
          <nav className="relative z-20">
            <div className="flex flex-col">
              {/* Top row with main navigation links */}
              <div className="flex items-center justify-between px-4 py-2 relative">
                {/* Main nav buttons */}
                <button 
                  onClick={() => toggleMenu('about')}
                  className={`px-4 py-1 text-sm transition-all relative ${
                    activeMenu === 'about' 
                      ? 'text-black bg-white rounded-md' 
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  About
                </button>
                
                <button 
                  onClick={() => toggleMenu('explore')}
                  className={`px-4 py-1 text-sm transition-all ${
                    activeMenu === 'explore'
                      ? 'text-black bg-white rounded-md'
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  Explore
                </button>
                
                <button 
                  onClick={() => toggleMenu('contact')}
                  className={`px-4 py-1 text-sm transition-all ${
                    activeMenu === 'contact' 
                      ? 'text-black bg-white rounded-md' 
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  Contact
                </button>
              </div>
              
              {/* Continuously scrolling marquee tagline */}
              <div className="whitespace-nowrap overflow-hidden px-4 pb-1.5" ref={marqueeRef}>
                <div className="inline-block animate-marquee">
                  <p className="text-white/70 text-[10px] tracking-wider uppercase">
                    {taglines} {taglines}
                  </p>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Dropdown menus */}
          {activeMenu && (
            <div className="bg-black/80 text-white relative z-10">
              {getMenuContent(activeMenu)}
            </div>
          )}
        </header>
      </div>
      
      {/* Mobile menu - only shown on small screens */}
      <div className="lg:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center">
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 flex space-x-3">
          <Button 
            onClick={() => toggleMenu('about')}
            className={`rounded-full px-3 py-0.5 h-auto text-xs ${
              activeMenu === 'about' 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-transparent text-white border border-white/30 hover:bg-white/10'
            }`}
          >
            About
          </Button>
          <Button 
            onClick={() => toggleMenu('explore')}
            className={`rounded-full px-3 py-0.5 h-auto text-xs ${
              activeMenu === 'explore'
                ? 'bg-white text-black hover:bg-white/90'
                : 'bg-transparent text-white border border-white/30 hover:bg-white/10'
            }`}
          >
            Explore
          </Button>
          <Button 
            onClick={() => toggleMenu('contact')}
            className={`rounded-full px-3 py-0.5 h-auto text-xs ${
              activeMenu === 'contact' 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-transparent text-white border border-white/30 hover:bg-white/10'
            }`}
          >
            Contact
          </Button>
        </div>
      </div>

      {/* Home button - only shown when not on home page */}
      {location !== '/' && (
        <div className="fixed bottom-20 right-6 z-50">
          <Button
            onClick={() => window.location.href = '/'}
            className="rounded-full bg-white text-black hover:bg-white/90 p-3 h-auto w-auto shadow-lg"
          >
            <ArrowRight className="h-5 w-5 rotate-225" />
          </Button>
        </div>
      )}
    </>
  );
};

export default Navbar;
