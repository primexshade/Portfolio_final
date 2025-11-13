import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SpotlightCursor = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 150 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  // Don't render on mobile (no mouse)
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }
  
  if (!isMounted) return null;
  
  return (
    <motion.div
      className="fixed pointer-events-none z-[15]"
      style={{
        left: spotlightX,
        top: spotlightY,
        x: '-50%',
        y: '-50%',
      }}
    >
      <div
        className="w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
};

export default SpotlightCursor;
