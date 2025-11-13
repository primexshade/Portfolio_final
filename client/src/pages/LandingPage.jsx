import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Code2, Zap } from 'lucide-react'
import AuroraBackground from '../components/AuroraBackground'
import GradientClouds from '../components/GradientClouds'
import FloatingIcons from '../components/FloatingIcons'
import SpotlightCursor from '../components/SpotlightCursor'
import AboutSection from '../sections/AboutSection'
import ProjectsSection from '../sections/ProjectsSection'
import CombinedStatsSection from '../sections/CombinedStatsSection'
import ContactSection from '../sections/ContactSection'

/** Vision Pro-level scroll-driven landing page with unified sections */
export default function LandingPage() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const [isMounted, setIsMounted] = useState(false)
  
  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring physics for smooth tilt
  const springConfig = { damping: 20, stiffness: 100 }
  const rotateX = useSpring(mouseY, springConfig)
  const rotateY = useSpring(mouseX, springConfig)
  
  // Scroll-triggered animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -35])
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])
  
  useEffect(() => {
    setIsMounted(true)
    
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return
      
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      
      // Calculate rotation based on mouse position (-4 to 4 degrees)
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      
      mouseX.set(deltaX * 4) // Max 4 degrees
      mouseY.set(-deltaY * 4) // Inverted for natural tilt
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring',
        damping: 18,
        stiffness: 120,
      },
    },
  }

  return (
    <>
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative h-[calc(100vh-48px)] grid place-items-center overflow-hidden"
      >
        {/* Layer 1: Apple Sonoma-style aurora background (z-[-30]) */}
        <AuroraBackground />

        {/* Layer 2: Gradient clouds (z-0) */}
        <GradientClouds />
        
        {/* AirPods Pro spotlight effect (z-15) */}
        <SpotlightCursor />

        {/* Layer 3: Floating tech/CS icons with 3D tilt (z-10) */}
        <FloatingIcons />

        {/* Grid pattern overlay (z-0, dimmed) */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Hero content with 3D tilt and scroll animations (z-20) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            opacity: heroOpacity,
            y: heroY,
            rotateX: isMounted && window.innerWidth >= 768 ? rotateX : 0,
            rotateY: isMounted && window.innerWidth >= 768 ? rotateY : 0,
            transformPerspective: 1200,
          }}
          whileHover={{ scale: 1.01 }}
          transition={{ scale: { duration: 0.3 } }}
          className="relative z-20 section max-w-6xl mx-auto text-center space-y-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 text-xs sm:text-sm font-medium shadow-xl">
              <Sparkles size={16} className="animate-pulse text-accent" />
              Available for new opportunities
            </div>
          </motion.div>

          {/* Hero text - Vision Pro scale with text glow */}
          <motion.div variants={itemVariants} className="relative">
            {/* Soft glow behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-3xl opacity-40" />
            
            <h1 className="relative text-7xl sm:text-8xl md:text-[110px] font-semibold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
                Building Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
                Experiences with Craft
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-white/60 leading-relaxed font-light"
          >
            Full-stack developer specializing in high-quality, scalable web applications.
            Transforming ideas into elegant solutions.
          </motion.p>

          {/* CTA Buttons with upgraded glassmorphism */}
          <motion.div
            variants={itemVariants}
            style={{ opacity: buttonOpacity }}
            className="flex flex-wrap items-center justify-center gap-4 pt-6"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white/90 text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-[1.03] shadow-[0_0_35px_10px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_15px_rgba(255,255,255,0.25)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Let's Work Together
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/7 backdrop-blur-xl border border-white/10 text-white font-medium rounded-full transition-all hover:bg-white/10 hover:ring-1 hover:ring-white/20 hover:shadow-xl"
            >
              Explore My Work
              <Code2 size={20} className="transition-transform group-hover:rotate-12" />
            </Link>
          </motion.div>

          {/* Tech highlights */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 pt-12 text-sm text-white/50"
          >
            {['React', 'Node.js', 'MongoDB', 'TypeScript'].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -3, color: 'rgba(255,255,255,0.9)' }}
                className="flex items-center gap-2 transition-all cursor-default"
              >
                <Zap size={16} className="text-accent" />
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Combined Stats Section */}
      <CombinedStatsSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  )
}
