import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
import JoinModal from "./JoinModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md" 
          : "bg-transparent"
      }`}>
        <nav className="container mx-auto px-4 md:px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className={`font-serif font-bold text-2xl md:text-3xl ${
                  scrolled ? "text-black" : "text-white"
                }`}>Latina Empire</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`font-sans font-medium hover:text-magenta transition-all ${
                location === '/' 
                  ? 'text-magenta' 
                  : scrolled ? 'text-black' : 'text-white'
              }`}>
                HOME
              </Link>
              <Link href="/program" className={`font-sans font-medium hover:text-magenta transition-all ${
                location === '/program' 
                  ? 'text-magenta' 
                  : scrolled ? 'text-black' : 'text-white'
              }`}>
                PROGRAM
              </Link>
              <Link href="/events" className={`font-sans font-medium hover:text-magenta transition-all ${
                location.startsWith('/events') 
                  ? 'text-magenta' 
                  : scrolled ? 'text-black' : 'text-white'
              }`}>
                EVENTS
              </Link>
              <Link href="/ambassadors" className={`font-sans font-medium hover:text-magenta transition-all ${
                location.startsWith('/ambassadors') 
                  ? 'text-magenta' 
                  : scrolled ? 'text-black' : 'text-white'
              }`}>
                AMBASSADORS
              </Link>
              <div className="flex items-center">
                <button 
                  className={`mr-4 hover:text-magenta transition-all ${
                    scrolled ? 'text-black' : 'text-white'
                  }`}
                >
                  <Search className="h-5 w-5" />
                </button>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className={`rounded-full px-6 py-2 font-medium h-auto ${
                    scrolled 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  JOIN NOW
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                type="button" 
                onClick={toggleMenu}
                className={`focus:outline-none ${
                  scrolled ? 'text-black' : 'text-white'
                }`}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden bg-white mt-4 rounded-lg shadow-xl p-4">
              <div className="space-y-3">
                <Link href="/" className={`block py-2 font-sans font-medium text-black hover:text-magenta ${location === '/' ? 'text-magenta' : ''}`}>
                  HOME
                </Link>
                <Link href="/program" className={`block py-2 font-sans font-medium text-black hover:text-magenta ${location === '/program' ? 'text-magenta' : ''}`}>
                  PROGRAM
                </Link>
                <Link href="/events" className={`block py-2 font-sans font-medium text-black hover:text-magenta ${location.startsWith('/events') ? 'text-magenta' : ''}`}>
                  EVENTS
                </Link>
                <Link href="/ambassadors" className={`block py-2 font-sans font-medium text-black hover:text-magenta ${location.startsWith('/ambassadors') ? 'text-magenta' : ''}`}>
                  AMBASSADORS
                </Link>
                <div className="pt-4">
                  <Button 
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsOpen(false);
                    }}
                    className="w-full bg-black text-white rounded-full py-2 font-medium hover:bg-gray-800"
                  >
                    JOIN NOW
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
