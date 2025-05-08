
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { X, Instagram, Phone, Mail, ArrowRight, Menu, ChevronDown, ChevronUp } from "lucide-react";
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
  const toggleMenu = (menu: string | null) => {
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

  // Menu structure organized as mega menu with three main tabs
  const menuStructure = {
    empower: {
      title: "Empower",
      description: "Leadership, community, and our founder",
      sections: [
        {
          items: [
            { label: "Our Story", href: "/about-founder" },
            { label: "Global Leaders Network", href: "/leaders" },
            { label: "Become a Leader", href: "/programs/certification" },
            { label: "Manahood Chapters", href: "/manahood" },
            { label: "Start a Chapter", href: "/manahood/start" }
          ]
        }
      ]
    },
    learn: {
      title: "Learn & Grow",
      description: "Education, events, blog, and membership",
      sections: [
        {
          items: [
            { label: "Programs Hub", href: "/programs" },
            { label: "Workshops & Courses", href: "/programs#courses" },
            { label: "Events & Retreats", href: "/events" },
            { label: "Event Calendar", href: "/events-calendar" },
            { label: "Blog & Media", href: "/blog" },
            { label: "Membership Tiers", href: "/membership" }
          ]
        }
      ]
    },
    give: {
      title: "Give & Get",
      description: "Shop, donate, and get involved",
      sections: [
        {
          items: [
            { label: "Mana Boutique (Shop)", href: "/shop" },
            { label: "Scholarship Fund", href: "/donate" },
            { label: "Partner & Sponsor", href: "/contact#partners" },
            { label: "Press & Media Requests", href: "/contact#press" },
            { label: "Join Our Team", href: "/contact#careers" }
          ]
        }
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

  // Generate mega menu content with enhanced styling
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
      <div className="p-8 animate-fadeIn">
        {/* Menu Header with Title and Description */}
        <div className="mb-8 pb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-2">{menu.title}</h2>
            <p className="text-sm text-white/70 max-w-md">{menu.description}</p>
          </div>
          
          {/* Featured CTA based on section */}
          <div className="hidden md:block">
            <Link
              href={menuKey === 'empower' ? '/leaders' : 
                    menuKey === 'learn' ? '/programs' : '/shop'}
              onClick={() => setActiveMenu(null)}
            >
              <Button 
                className="bg-magenta hover:bg-magenta/90 text-white px-5 py-2 rounded-md text-sm shadow-md"
              >
                {menuKey === 'empower' ? 'Meet Our Leaders' : 
                 menuKey === 'learn' ? 'Browse Programs' : 'Shop Now'}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Menu Items in Columns with Visual Enhancement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1.5">
          {menu.sections[0].items.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              className="group flex items-center py-3 px-4 hover:bg-white/10 rounded-md transition-all duration-200 border border-transparent hover:border-white/10"
            >
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white group-hover:text-magenta transition-colors duration-200">
                  {item.label}
                </h3>
              </div>
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <span className="mr-1 text-xs text-magenta font-medium">Explore</span>
                <ArrowRight className="h-3.5 w-3.5 text-magenta" />
              </div>
            </Link>
          ))}
        </div>
        
        {/* Bottom Promotional Banner */}
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
          <p className="text-xs text-white/60">
            {menuKey === 'empower' ? 'Join our global leaders network of Latina professionals' : 
             menuKey === 'learn' ? 'Access world-class programs designed for Latina success' : 
             'Make an impact through our marketplace and donation programs'}
          </p>
          
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="link"
            className="text-white text-xs hover:text-magenta"
          >
            Join Now <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
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
                  <div className="hidden md:flex items-center space-x-3">
                    <button 
                      onClick={() => toggleMenu('empower')}
                      className={`px-4 h-8 text-sm transition-all duration-200 relative flex items-center gap-1.5 ${
                        activeMenu === 'empower' 
                          ? 'text-black bg-white rounded-md shadow-lg' 
                          : 'text-white hover:text-white/90 hover:bg-white/10 rounded-md text-shadow-sm'
                      }`}
                    >
                      <span>Empower</span>
                      {activeMenu === 'empower' ? 
                        <ChevronUp className="h-3 w-3" /> : 
                        <ChevronDown className="h-3 w-3 opacity-70" />
                      }
                    </button>
                    
                    <button 
                      onClick={() => toggleMenu('learn')}
                      className={`px-4 h-8 text-sm transition-all duration-200 flex items-center gap-1.5 ${
                        activeMenu === 'learn'
                          ? 'text-black bg-white rounded-md shadow-lg'
                          : 'text-white hover:text-white/90 hover:bg-white/10 rounded-md text-shadow-sm'
                      }`}
                    >
                      <span>Learn & Grow</span>
                      {activeMenu === 'learn' ? 
                        <ChevronUp className="h-3 w-3" /> : 
                        <ChevronDown className="h-3 w-3 opacity-70" />
                      }
                    </button>
                    
                    <button 
                      onClick={() => toggleMenu('give')}
                      className={`px-4 h-8 text-sm transition-all duration-200 flex items-center gap-1.5 ${
                        activeMenu === 'give' 
                          ? 'text-black bg-white rounded-md shadow-lg' 
                          : 'text-white hover:text-white/90 hover:bg-white/10 rounded-md text-shadow-sm'
                      }`}
                    >
                      <span>Give & Get</span>
                      {activeMenu === 'give' ? 
                        <ChevronUp className="h-3 w-3" /> : 
                        <ChevronDown className="h-3 w-3 opacity-70" />
                      }
                    </button>
                  </div>
                  
                  {/* Join Button - Sticky CTA */}
                  <Button 
                    className="bg-magenta text-white hover:bg-magenta/90 text-xs ml-4 h-8 px-5 py-0 rounded-full shadow-md font-medium transition-all duration-300"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Join Now
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
              
              {/* Mobile navigation menu with accordions */}
              {mobileMenuOpen && (
                <div className="md:hidden bg-black/50 backdrop-blur-md text-white p-4 border-t border-white/10 animate-fadeIn">
                  <div className="flex flex-col space-y-3">
                    {/* Empower Accordion */}
                    <div className="rounded-lg overflow-hidden">
                      <button 
                        onClick={() => toggleMenu(activeMenu === 'empower' ? null : 'empower')}
                        className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-colors duration-200 ${
                          activeMenu === 'empower' ? 'bg-magenta text-white' : 'hover:bg-white/10 rounded-lg'
                        }`}
                      >
                        <span className="font-medium">{menuStructure.empower.title}</span>
                        <div className="flex items-center">
                          <span className="text-xs mr-2 opacity-70 hidden sm:inline">{menuStructure.empower.description}</span>
                          {activeMenu === 'empower' ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </div>
                      </button>
                      
                      {activeMenu === 'empower' && (
                        <div className="bg-black/30 rounded-b-lg animate-slideDown">
                          <div className="p-3 grid gap-1">
                            {menuStructure.empower.sections[0].items.map((item, idx) => (
                              <Link 
                                key={idx} 
                                href={item.href}
                                className="flex items-center py-2 px-3 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-150"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <ArrowRight className="h-3 w-3 mr-2 text-magenta" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Learn & Grow Accordion */}
                    <div className="rounded-lg overflow-hidden">
                      <button 
                        onClick={() => toggleMenu(activeMenu === 'learn' ? null : 'learn')}
                        className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-colors duration-200 ${
                          activeMenu === 'learn' ? 'bg-magenta text-white' : 'hover:bg-white/10 rounded-lg'
                        }`}
                      >
                        <span className="font-medium">{menuStructure.learn.title}</span>
                        <div className="flex items-center">
                          <span className="text-xs mr-2 opacity-70 hidden sm:inline">{menuStructure.learn.description}</span>
                          {activeMenu === 'learn' ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </div>
                      </button>
                      
                      {activeMenu === 'learn' && (
                        <div className="bg-black/30 rounded-b-lg animate-slideDown">
                          <div className="p-3 grid gap-1">
                            {menuStructure.learn.sections[0].items.map((item, idx) => (
                              <Link 
                                key={idx} 
                                href={item.href}
                                className="flex items-center py-2 px-3 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-150"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <ArrowRight className="h-3 w-3 mr-2 text-magenta" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Give & Get Accordion */}
                    <div className="rounded-lg overflow-hidden">
                      <button 
                        onClick={() => toggleMenu(activeMenu === 'give' ? null : 'give')}
                        className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-colors duration-200 ${
                          activeMenu === 'give' ? 'bg-magenta text-white' : 'hover:bg-white/10 rounded-lg'
                        }`}
                      >
                        <span className="font-medium">{menuStructure.give.title}</span>
                        <div className="flex items-center">
                          <span className="text-xs mr-2 opacity-70 hidden sm:inline">{menuStructure.give.description}</span>
                          {activeMenu === 'give' ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </div>
                      </button>
                      
                      {activeMenu === 'give' && (
                        <div className="bg-black/30 rounded-b-lg animate-slideDown">
                          <div className="p-3 grid gap-1">
                            {menuStructure.give.sections[0].items.map((item, idx) => (
                              <Link 
                                key={idx} 
                                href={item.href}
                                className="flex items-center py-2 px-3 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-150"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <ArrowRight className="h-3 w-3 mr-2 text-magenta" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Join Button */}
                    <Button 
                      className="bg-magenta hover:bg-magenta/90 text-white text-sm mt-3 px-4 py-4 justify-center w-full rounded-md shadow-md transition-all duration-300"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Join the Empire
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
            <div className="bg-black/50 backdrop-blur-md text-white relative z-10 rounded-b-2xl border-t border-white/10 shadow-2xl">
              {getMenuContent(activeMenu)}
            </div>
          )}
        </header>
      </div>
    </>
  );
};

export default Navbar;
