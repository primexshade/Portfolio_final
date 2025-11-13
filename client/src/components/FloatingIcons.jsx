import { memo, useMemo, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  Code2,
  Database,
  Cpu,
  Brain,
  Cloud,
  GitBranch,
  Terminal,
  Globe,
  Shield,
  CircuitBoard,
  BookOpen,
  Server,
} from 'lucide-react'
import { SiDocker, SiKubernetes, SiNextdotjs } from 'react-icons/si'

/**
 * FloatingIcons - Vision Pro Edition
 * Reduced count by 20%, added 3D tilt based on mouse movement
 * Subtle, drifting icons with depth effect
 */
function FloatingIcons() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Mouse position tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring for tilt
  const springConfig = { damping: 20, stiffness: 100 };
  const tiltX = useSpring(mouseX, springConfig);
  const tiltY = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e) => {
      // Calculate tilt based on mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x * 8); // Max 8px shift
      mouseY.set(y * 8);
    };
    
    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  // Reduced icon count by ~20% (19 -> 15 icons)
  const items = useMemo(
    () => [
      // Core + CS subjects
      { Icon: Code2, top: '8%', left: '10%', size: 22, delay: 0.2, duration: 18, hideOnMobile: false },
      { Icon: Database, top: '18%', left: '78%', size: 22, delay: 0.6, duration: 20, hideOnMobile: false },
      { Icon: Cpu, top: '28%', left: '22%', size: 24, delay: 0.4, duration: 22, hideOnMobile: true },
      { Icon: Brain, top: '85%', left: '70%', size: 24, delay: 0.8, duration: 24, hideOnMobile: false },
      { Icon: Cloud, top: '12%', left: '55%', size: 22, delay: 0.3, duration: 21, hideOnMobile: true },
      { Icon: GitBranch, top: '62%', left: '16%', size: 22, delay: 0.7, duration: 20, hideOnMobile: false },
      { Icon: Terminal, top: '75%', left: '30%', size: 22, delay: 1.0, duration: 22, hideOnMobile: true },
      { Icon: Globe, top: '90%', left: '85%', size: 22, delay: 0.5, duration: 19, hideOnMobile: true },
      { Icon: Shield, top: '54%', left: '58%', size: 22, delay: 0.6, duration: 22, hideOnMobile: true },
      { Icon: CircuitBoard, top: '82%', left: '12%', size: 22, delay: 0.9, duration: 23, hideOnMobile: true },
      { Icon: BookOpen, top: '84%', left: '88%', size: 22, delay: 1.1, duration: 21, hideOnMobile: true },
      { Icon: Server, top: '40%', left: '86%', size: 22, delay: 0.3, duration: 24, hideOnMobile: true },

      // Trending technologies
      { Icon: SiDocker, top: '22%', left: '88%', size: 26, delay: 0.35, duration: 22, hideOnMobile: true },
      { Icon: SiKubernetes, top: '68%', left: '6%', size: 26, delay: 0.55, duration: 23, hideOnMobile: true },
      { Icon: SiNextdotjs, top: '90%', left: '24%', size: 28, delay: 0.45, duration: 25, hideOnMobile: true },
    ],
    []
  )

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden
      style={{
        x: isMounted && window.innerWidth >= 768 ? tiltX : 0,
        y: isMounted && window.innerWidth >= 768 ? tiltY : 0,
      }}
    >
      {items.map(({ Icon, top, left, size, delay, duration, hideOnMobile }, idx) => (
        <motion.div
          key={idx}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 6, -6, 0],
            y: [0, -10, 0, 10, 0],
            opacity: 0.15,
          }}
          transition={{
            x: { duration: duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay },
            y: { duration: duration * 1.15, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: delay * 1.1 },
            opacity: { duration: 1.2, delay },
          }}
          style={{ top, left }}
          className={`absolute ${hideOnMobile ? 'hidden md:block' : ''}`}
        >
          <Icon
            size={hideOnMobile ? size : size * 0.7}
            className="text-zinc-600/15 dark:text-zinc-300/12 drop-shadow-sm md:text-zinc-600/15 md:dark:text-zinc-300/12"
            strokeWidth={1.2}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default memo(FloatingIcons)
