import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

interface SuccessConfettiProps {
  active: boolean;
  duration?: number; // in milliseconds
  colors?: string[];
}

const SuccessConfetti = ({ 
  active, 
  duration = 3000, 
  colors = ['#D81B60', '#FFC0CB', '#E91E63', '#FF69B4', '#FFFFFF']
}: SuccessConfettiProps) => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isActive, setIsActive] = useState(false);
  
  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Control confetti visibility
  useEffect(() => {
    if (active) {
      setIsActive(true);
      
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);
      
      return () => {
        clearTimeout(timer);
      };
    }
    
    return undefined;
  }, [active, duration]);
  
  if (!isActive) return null;
  
  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      colors={colors}
      numberOfPieces={300}
      recycle={false}
      gravity={0.2}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default SuccessConfetti;