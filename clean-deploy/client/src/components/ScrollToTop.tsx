import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * This component scrolls the window to the top whenever the route changes
 */
export default function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Scroll to the top of the page when the location changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // Use 'auto' instead of 'smooth' for immediate scroll (better UX for page changes)
    });
  }, [location]);
  
  return null; // This component doesn't render anything
}