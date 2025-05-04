import { useState, useEffect } from "react";
import { Link } from "wouter";

const FloatingLogo = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`floating-logo ${scrolled ? 'scale-90 opacity-80' : ''}`}>
      <Link href="/">
        <div className="cursor-pointer">
          <h1 className="floating-logo-text">LATINA EMPIRE</h1>
          {!scrolled && (
            <div className="whitespace-nowrap overflow-hidden">
              <div className="inline-block animate-marquee">
                <p className="text-white/70 text-[10px] tracking-wider uppercase">
                  EMPOWERING LATINA LEADERS • CREATING GENERATIONAL WEALTH • BUILDING LASTING IMPACT •
                </p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default FloatingLogo;