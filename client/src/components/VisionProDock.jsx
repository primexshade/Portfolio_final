import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Home, User, Briefcase, BarChart3, Mail } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const dockItems = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'about', icon: User, label: 'About', path: '/about' },
  { id: 'projects', icon: Briefcase, label: 'Projects', path: '/projects' },
  { id: 'stats', icon: BarChart3, label: 'Stats', path: '/stats' },
  { id: 'contact', icon: Mail, label: 'Contact', path: '/contact' },
]

export default function VisionProDock() {
  const navigate = useNavigate()
  const location = useLocation()
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const mouseX = useMotionValue(Infinity)
  const dockRef = useRef(null)

  // Scroll detection
  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 100 && currentScrollY > lastScrollY)
      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gyroscope effect for mobile
  useEffect(() => {
    const handleOrientation = (e) => {
      if (dockRef.current && window.innerWidth < 768) {
        const tiltX = e.gamma ? e.gamma / 90 : 0 // -1 to 1
        const tiltY = e.beta ? (e.beta - 45) / 90 : 0 // -1 to 1
        dockRef.current.style.transform = `perspective(1000px) rotateX(${tiltY * 2}deg) rotateY(${tiltX * 2}deg)`
      }
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation)
      return () => window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  // Get active path
  const getActivePath = () => {
    if (location.pathname === '/github' || location.pathname === '/leetcode') return '/stats'
    return location.pathname
  }

  const activePath = getActivePath()

  return (
    <>
      {/* Bottom padding spacer */}
      <div className="h-28 sm:h-32 md:h-36" />

      {/* Dock */}
      <motion.div
        ref={dockRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: scrolled ? 0.7 : 1,
          scale: scrolled ? 0.9 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onMouseMove={(e) => {
          const rect = dockRef.current?.getBoundingClientRect()
          if (rect) {
            mouseX.set(e.clientX - rect.left)
          }
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50"
        style={{ 
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="relative bg-white/10 backdrop-blur-[40px] border border-white/15 rounded-[32px] shadow-[0_40px_120px_rgba(0,0,0,0.35),0_0_80px_rgba(110,231,255,0.15)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          {/* Soft reflection overlay */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-30 pointer-events-none" />
          
          <div className="relative flex items-end gap-2 sm:gap-3 md:gap-4">
            {dockItems.map((item, index) => (
              <DockIcon
                key={item.id}
                item={item}
                index={index}
                mouseX={mouseX}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                isActive={activePath === item.path}
                onClick={() => navigate(item.path)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}

function DockIcon({ item, index, mouseX, hoveredIndex, setHoveredIndex, isActive, onClick }) {
  const ref = useRef(null)

  // Calculate distance from mouse for magnetic effect
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Scale based on distance and hover
  const widthSync = useTransform(distance, [-150, 0, 150], [36, 52, 36])
  const widthMobile = useTransform(distance, [-100, 0, 100], [22, 32, 22])
  
  const width = useSpring(
    typeof window !== 'undefined' && window.innerWidth < 768 ? widthMobile : widthSync,
    { damping: 20, stiffness: 300 }
  )

  // Neighbor effect
  const getScale = () => {
    if (hoveredIndex === null) return isActive ? 1.1 : 1
    const diff = Math.abs(hoveredIndex - index)
    if (diff === 0) return 1.35 // Hovered icon
    if (diff === 1) return 1.15 // Neighbor icons
    return isActive ? 1.05 : 1
  }

  const scale = useSpring(getScale(), { damping: 20, stiffness: 300 })

  const Icon = item.icon

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onTouchStart={() => setHoveredIndex(index)}
      onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 200)}
      style={{ width, scale }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="relative flex flex-col items-center gap-1 sm:gap-1.5"
    >
      {/* Active glow ring */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -inset-1 sm:-inset-2 rounded-2xl bg-gradient-to-r from-[#6EE7FF]/30 via-[#C084FC]/30 to-[#F472B6]/30 blur-md"
          />
        )}
      </AnimatePresence>

      {/* Icon container */}
      <motion.div
        className={`relative aspect-square w-full rounded-2xl flex items-center justify-center transition-all ${
          isActive
            ? 'bg-white/20 border-2 border-white/40 shadow-[0_0_20px_rgba(110,231,255,0.4)]'
            : 'bg-white/10 border border-white/20 hover:bg-white/20'
        }`}
      >
        {/* Icon reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/10 to-transparent rounded-b-2xl opacity-40 pointer-events-none" />

        {/* Ripple effect on tap (mobile) */}
        <AnimatePresence>
          {hoveredIndex === index && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-2xl bg-white/20"
            />
          )}
        </AnimatePresence>

        <Icon 
          size={typeof window !== 'undefined' && window.innerWidth < 768 ? 14 : 20} 
          className={isActive ? 'text-[#6EE7FF]' : 'text-white/90'} 
        />
      </motion.div>

      {/* Label - ALWAYS visible */}
      <motion.span
        className={`text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap ${
          isActive 
            ? 'bg-gradient-to-r from-[#6EE7FF] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent'
            : 'text-white/80'
        }`}
      >
        {item.label}
      </motion.span>
    </motion.button>
  )
}
