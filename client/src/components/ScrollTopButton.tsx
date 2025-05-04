import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScroll } from '@/hooks/use-scroll';

interface ScrollTopButtonProps {
  showAfter?: number; // Show button after scrolling this many pixels
  position?: 'bottom-right' | 'bottom-left';
  size?: 'sm' | 'md' | 'lg';
}

export default function ScrollTopButton({
  showAfter = 300,
  position = 'bottom-right',
  size = 'md'
}: ScrollTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useScroll();

  // Track scroll position to show/hide button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  // Size classes
  const sizeClasses = {
    'sm': 'h-8 w-8',
    'md': 'h-10 w-10',
    'lg': 'h-12 w-12'
  };

  if (!isVisible) return null;

  return (
    <Button
      variant="secondary"
      size="icon"
      className={`fixed z-50 rounded-full opacity-80 hover:opacity-100 shadow-md ${positionClasses[position]} ${sizeClasses[size]}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}