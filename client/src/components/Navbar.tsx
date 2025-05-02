
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

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/program", label: "PROGRAM" },
    { href: "/events", label: "EVENTS" },
    { href: "/ambassadors", label: "AMBASSADORS" },
  ];

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        } ${isOpen ? "bg-white" : ""}`}
      >
        <nav className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <span className={`font-serif font-bold text-2xl md:text-3xl ${
                scrolled || isOpen ? "text-black" : "text-white"
              }`}>
                Latina Empire
              </span>
            </Link>

            <div className="flex items-center gap-2 lg:hidden">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className={`rounded-full px-4 py-2 font-medium h-auto ${
                  scrolled 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                START NOW
              </Button>
              <button 
                type="button" 
                onClick={toggleMenu}
                className={`focus:outline-none ${
                  scrolled || isOpen ? 'text-black' : 'text-white'
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

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans font-medium hover:text-magenta transition-all ${
                    (link.href === '/' ? location === '/' : location.startsWith(link.href))
                      ? 'text-magenta'
                      : scrolled ? 'text-black' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
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

          {isOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t">
              <div className="container mx-auto px-4 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2 font-sans font-medium text-black hover:text-magenta ${
                      (link.href === '/' ? location === '/' : location.startsWith(link.href))
                        ? 'text-magenta'
                        : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
