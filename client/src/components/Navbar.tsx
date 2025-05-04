
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import JoinModal from "./JoinModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  // Keep the same navigation links
  const navLinks = [
    { href: "/about-founder", label: "About" },
    { href: "/program", label: "Program" },
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  // Adding tagline text similar to the image
  const tagline = "EMPOWERING LATINA LEADERS SPECIALIZED IN PROFESSIONAL GROWTH & SUCCESS";

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <header 
        className={`fixed w-full z-50 transition-all duration-300
          ${scrolled ? "bg-white/95 backdrop-blur-sm" : "bg-black/20 backdrop-blur-sm"}
          ${isOpen ? "bg-white" : ""}`}
      >
        {/* Main navigation */}
        <nav className="mx-auto px-8 lg:px-16 py-6">
          <div className="flex flex-col items-center">
            {/* Top row with main navigation links */}
            <div className="w-full flex items-center justify-between mb-4">
              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <button 
                  type="button" 
                  onClick={toggleMenu}
                  className="focus:outline-none text-white"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
              
              {/* Desktop navigation */}
              <div className="hidden lg:flex items-center justify-center flex-1 space-x-16">
                {navLinks.map((link, index) => {
                  // Render the first three links on the left side
                  if (index <= 2) {
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`font-sans text-base hover:opacity-70 transition-all ${
                          (link.href === '/' ? location === '/' : location.startsWith(link.href))
                            ? 'text-white font-medium'
                            : 'text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>
              
              {/* Logo or Brand (centered on desktop) */}
              <div className="hidden lg:block">
                <Link href="/" className="flex-shrink-0">
                  <span className="text-white font-medium text-xl">
                    Latina Empire
                  </span>
                </Link>
              </div>
              
              {/* Mobile brand - centered */}
              <div className="lg:hidden flex-1 text-center">
                <Link href="/" className="inline-block">
                  <span className="text-white font-medium text-xl">
                    Latina Empire
                  </span>
                </Link>
              </div>
              
              {/* Right side navigation links */}
              <div className="hidden lg:flex items-center justify-center flex-1 space-x-16">
                {navLinks.map((link, index) => {
                  // Render the last two links on the right side
                  if (index > 2) {
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`font-sans text-base hover:opacity-70 transition-all ${
                          (link.href === '/' ? location === '/' : location.startsWith(link.href))
                            ? 'text-white font-medium'
                            : 'text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>
              
              {/* Join button on mobile */}
              <div className="lg:hidden">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-transparent hover:bg-white/10 text-white font-medium border border-white/30 rounded-none px-4 py-1 h-auto text-sm"
                >
                  JOIN
                </Button>
              </div>
            </div>
            
            {/* Bottom row with tagline */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex justify-center">
                <p className="text-white/80 text-xs tracking-wider text-center uppercase">
                  {tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {isOpen && (
            <div className="lg:hidden fixed top-[100px] left-0 right-0 bottom-0 bg-black/95 overflow-y-auto z-50">
              <div className="container mx-auto px-4 py-10 space-y-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-3 text-center font-sans font-medium text-white text-lg hover:text-gray-300 ${
                      (link.href === '/' ? location === '/' : location.startsWith(link.href))
                        ? 'text-white underline underline-offset-4'
                        : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 text-center">
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white text-black hover:bg-gray-200 font-medium rounded-none px-8 py-2 h-auto"
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
