import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <header className={`fixed w-full bg-white z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      <nav className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="font-serif font-bold text-2xl md:text-3xl">Latina Empire</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-sans text-sm font-medium hover:text-magenta transition-all">Home</Link>
            <Link href="#" className="font-sans text-sm font-medium hover:text-magenta transition-all">Program</Link>
            <Link href="#" className="font-sans text-sm font-medium hover:text-magenta transition-all">Events</Link>
            <Link href="#" className="font-sans text-sm font-medium hover:text-magenta transition-all">Ambassadors</Link>
            <Link href="#" className="font-sans text-sm font-medium hover:text-magenta transition-all">Join</Link>
            <Link href="#" className="font-sans text-sm font-medium hover:text-magenta transition-all">Contact</Link>
            <Button className="bg-magenta text-white hover:bg-magenta hover:bg-opacity-90">Apply Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              type="button" 
              onClick={toggleMenu}
              className="text-gray-900 hover:text-magenta focus:outline-none"
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
        <div className={`md:hidden ${isOpen ? "block" : "hidden"} transition-all`}>
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link href="/" className="block py-2 font-sans text-base font-medium hover:text-magenta">Home</Link>
            <Link href="#" className="block py-2 font-sans text-base font-medium hover:text-magenta">Program</Link>
            <Link href="#" className="block py-2 font-sans text-base font-medium hover:text-magenta">Events</Link>
            <Link href="#" className="block py-2 font-sans text-base font-medium hover:text-magenta">Ambassadors</Link>
            <Link href="#" className="block py-2 font-sans text-base font-medium hover:text-magenta">Join</Link>
            <Link href="#" className="block py-2 font-sans text-base font-medium hover:text-magenta">Contact</Link>
            <Button className="w-full bg-magenta text-white hover:bg-magenta hover:bg-opacity-90 mt-4">Apply Now</Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
