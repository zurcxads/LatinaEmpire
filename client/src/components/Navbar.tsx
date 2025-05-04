
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Home, Calendar, Newspaper, User, Users, Phone, Menu } from "lucide-react";
import JoinModal from "./JoinModal";

const Navbar = () => {
  const [location] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define navigation items
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", path: "/" },
    { icon: <Calendar className="w-5 h-5" />, label: "Events", path: "/events" },
    { icon: <Newspaper className="w-5 h-5" />, label: "Blog", path: "/blog" },
    { icon: <User className="w-5 h-5" />, label: "Founder", path: "/about-founder" },
    { icon: <Users className="w-5 h-5" />, label: "Ambassadors", path: "/ambassadors" },
    { icon: <Phone className="w-5 h-5" />, label: "Contact", path: "/contact" },
  ];

  // Helper function to check if path is active
  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      {/* macOS Dock-style Navbar */}
      <div className={`dock-navbar ${scrolled ? 'opacity-80 scale-95' : ''}`}>
        {navItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <div className={`dock-item ${isActive(item.path) ? 'active' : ''}`}>
              <div className="flex flex-col items-center">
                {item.icon}
                <span className="mt-1 text-xs text-white glow-text">{item.label}</span>
              </div>
            </div>
          </Link>
        ))}
        
        {/* Menu Button for Mobile */}
        <div 
          className="dock-item md:hidden" 
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="flex flex-col items-center">
            <Menu className="w-5 h-5" />
            <span className="mt-1 text-xs text-white glow-text">Menu</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
