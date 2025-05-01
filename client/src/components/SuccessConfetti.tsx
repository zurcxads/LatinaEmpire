import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface SuccessConfettiProps {
  active: boolean;
  duration?: number; // in milliseconds
  colors?: string[];
}

const SuccessConfetti = ({
  active,
  duration = 3000,
  colors = ['#D81B60', '#9C27B0', '#3F51B5', '#FFFFFF']
}: SuccessConfettiProps) => {
  const [windowDimension, setWindowDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    // Function to detect and update window dimensions
    const detectSize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add window resize listener
    window.addEventListener('resize', detectSize);

    // Clean up resize listener
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, []);

  useEffect(() => {
    if (active) {
      setShowConfetti(true);
      
      // Hide confetti after duration
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  return showConfetti ? (
    <Confetti
      width={windowDimension.width}
      height={windowDimension.height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.1}
      colors={colors}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
    />
  ) : null;
};

export default SuccessConfetti;