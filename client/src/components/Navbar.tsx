
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { X, Instagram, Phone, Mail, ArrowRight, Menu } from "lucide-react";
import JoinModal from "./JoinModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Close menus when navigating to a new page
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
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

  // Add click outside listener to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the menu is open and we click outside, close it
      if (activeMenu && overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    // Add event listener when menu is open
    if (activeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu]);

  // Toggle menu function
  const toggleMenu = (menu: string) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (activeMenu) {
      setActiveMenu(null);
    }
  };

  // Rotating taglines
  const taglines = [
    "LATINA EMPIRE IS AN INDEPENDENT PLATFORM FOR EMPOWERING LATINA LEADERS • ",
    "JOIN THOUSANDS OF LATINA LEADERS CREATING GENERATIONAL WEALTH AND IMPACT • ",
    "TRANSFORM YOUR LIFE AND LEGACY WITH OUR COMMUNITY OF AMBITIOUS LATINAS • "
  ].join(' ');

  // Menu structure reorganized with three main tabs
  const menuStructure = {
    empower: {
      title: "Empower",
      items: [
        { label: "Our Founder", href: "/about-founder" },
        { label: "Leadership Program", href: "/programs" },
        { label: "Leaders Network", href: "/leaders" },
        { label: "Membership", href: "/membership" }
      ]
    },
    learn: {
      title: "Learn & Grow",
      items: [
        { label: "Events", href: "/events" },
        { label: "Events Calendar", href: "/events-calendar" },
        { label: "Blog & Resources", href: "/blog" },
        { label: "Manahood Program", href: "/manahood" }
      ]
    },
    give: {
      title: "Give & Get",
      items: [
        { label: "Shop Merch", href: "/shop" },
        { label: "Donate", href: "/donate" },
        { label: "Join the Movement", href: "/join" },
        { label: "Contact Us", href: "/contact" }
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
    
    let menu;
    if (menuKey === 'empower') {
      menu = menuStructure.empower;
    } else if (menuKey === 'learn') {
      menu = menuStructure.learn;
    } else if (menuKey === 'give') {
      menu = menuStructure.give;
    } else {
      menu = menuStructure.empower; // default fallback
    }
    
    return (
      <div className="grid grid-cols-2 gap-0">
        {menu.items.map((item, idx) => (
          <Link 
            key={idx} 
            href={item.href} 
            className="p-6 hover:bg-white/10 transition-colors border-b border-r border-white/10"
          >
            <h3 className="text-sm font-medium text-center text-shadow-sm">{item.label}</h3>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      {/* Overlay for closing the menu when clicking outside */}
      {activeMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveMenu(null)}
        />
      )}
      
      <div className="w-full flex items-center justify-center fixed z-50 pt-3 px-5">
        <header className="bg-black/15 backdrop-blur-sm max-w-4xl w-full rounded-2xl overflow-hidden shadow-xl" ref={overlayRef}>
          {/* Main navigation bar */}
          <nav className="relative z-20">
            <div className="flex flex-col">
              {/* Top row with logo and navigation links */}
              <div className="flex items-center justify-between px-4 py-2 relative">
                {/* Logo */}
                <Link href="/" className="text-white font-bold mr-4 text-shadow-md flex items-center">
                  <span className="tracking-wider text-sm md:text-base">LATINA EMPIRE</span>
                </Link>
                
                <div className="flex items-center ml-auto">
                  {/* Navigation links - desktop */}
                  <div className="hidden md:flex items-center space-x-2">
                    <button 
                      onClick={() => toggleMenu('empower')}
                      className={`px-4 h-7 text-sm transition-all relative flex items-center ${
                        activeMenu === 'empower' 
                          ? 'text-black bg-white rounded-md shadow-lg' 
                          : 'text-white hover:text-white/80 text-shadow-sm'
                      }`}
                    >
                      Empower
                    </button>
                    
                    <button 
                      onClick={() => toggleMenu('learn')}
                      className={`px-4 h-7 text-sm transition-all flex items-center ${
                        activeMenu === 'learn'
                          ? 'text-black bg-white rounded-md shadow-lg'
                          : 'text-white hover:text-white/80 text-shadow-sm'
                      }`}
                    >
                      Learn & Grow
                    </button>
                    
                    <button 
                      onClick={() => toggleMenu('give')}
                      className={`px-4 h-7 text-sm transition-all flex items-center ${
                        activeMenu === 'give' 
                          ? 'text-black bg-white rounded-md shadow-lg' 
                          : 'text-white hover:text-white/80 text-shadow-sm'
                      }`}
                    >
                      Give & Get
                    </button>
                  </div>
                  
                  {/* Join Button */}
                  <Button 
                    className="primary-button text-xs ml-4 h-7 px-4 py-0"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Join
                  </Button>
                  
                  {/* Mobile menu toggle */}
                  <button 
                    className="md:hidden ml-3 text-white p-1 rounded-md hover:bg-white/10 transition-colors h-7 w-7 flex items-center justify-center"
                    onClick={toggleMobileMenu}
                  >
                    {mobileMenuOpen ? <X size={18} className="text-shadow-sm" /> : <Menu size={18} className="text-shadow-sm" />}
                  </button>
                </div>
              </div>
              
              {/* Mobile navigation menu */}
              {mobileMenuOpen && (
                <div className="md:hidden bg-black/15 backdrop-blur-sm text-white p-4 border-t border-white/10">
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => toggleMenu('about')}
                      className={`px-4 py-2 text-sm text-shadow-sm transition-all rounded-md ${
                        activeMenu === 'about' 
                          ? 'text-black bg-white font-medium shadow-lg' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      About
                    </button>
                    <button 
                      onClick={() => toggleMenu('explore')}
                      className={`px-4 py-2 text-sm text-shadow-sm transition-all rounded-md ${
                        activeMenu === 'explore' 
                          ? 'text-black bg-white font-medium shadow-lg' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      Explore
                    </button>
                    <button 
                      onClick={() => toggleMenu('contact')}
                      className={`px-4 py-2 text-sm text-shadow-sm transition-all rounded-md ${
                        activeMenu === 'contact' 
                          ? 'text-black bg-white font-medium shadow-lg' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      Contact
                    </button>
                    <Button 
                      className="primary-button text-xs mt-2 px-4 h-7 py-0 justify-center w-full"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Join
                    </Button>
                  </div>
                </div>
              )}
              
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
            <div className="bg-black/15 backdrop-blur-sm text-white relative z-10">
              {getMenuContent(activeMenu)}
            </div>
          )}
        </header>
      </div>
    </>
  );
};

export default Navbar;
