import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Code2, Zap, Download } from 'lucide-react'
import AboutSection from '../sections/AboutSection'
import ProjectsSection from '../sections/ProjectsSection'
import CombinedStatsSection from '../sections/CombinedStatsSection'
import ContactSection from '../sections/ContactSection'
import VisionProLayout from '../layouts/VisionProLayout'

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
    
    const handleMouseLeave = () => {
      // Reset to center when mouse leaves
      mouseX.set(0)
      mouseY.set(0)
    }
    
    const section = sectionRef.current
    if (section) {
      section.addEventListener('mouseleave', handleMouseLeave)
    }
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      if (section) {
        section.removeEventListener('mouseleave', handleMouseLeave)
      }
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
    <VisionProLayout
      darkVeilConfig={{
        hueShift: 0,
        noiseIntensity: 0.01,
        scanlineIntensity: 0.08,
        speed: 0.15,
        scanlineFrequency: 2,
        warpAmount: 0.05,
        resolutionScale: 0.5
      }}
    >
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative h-[calc(100vh-64px)] grid place-items-center overflow-hidden"
      >
        {/* Background layers provided globally by VisionProLayout */}

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
          className="relative z-20 section max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center space-y-8"
        >
          {/* Badge removed per request */}

          {/* Hero text - Vision Pro scale with text glow */}
          <motion.div variants={itemVariants} className="relative space-y-6">
            {/* Soft glow behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-3xl opacity-40" />
            
            {/* Main Name */}
            <h1 className="relative text-[48px] sm:text-[80px] md:text-[110px] font-semibold tracking-tight leading-[0.95]">
              <span className="bg-gradient-to-b from-white via-white/70 to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(110,231,255,0.35)]">
                Aryan Tiwari
              </span>
            </h1>

            {/* Tagline */}
            <p className="relative text-xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight">
              <span className="bg-gradient-to-b from-white via-white/80 to-white/50 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(110,231,255,0.25)]">
                Crafting Systems. Shaping Experiences.
              </span>
              <br />
              <span className="bg-gradient-to-b from-white via-white/80 to-white/50 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(110,231,255,0.25)]">
                Engineered with Intent.
              </span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-3xl mx-auto text-base sm:text-lg text-white/70 leading-relaxed font-light"
          >
            I'm a software developer who loves turning ideas into fluid, reliable, and beautifully engineered digital experiences. With a strong foundation in MERN, backend systems, AI fundamentals, and cloud-native architecture, I build products that scale effortlessly and feel great to use. I thrive at the intersection of design and engineering — crafting systems that are both thoughtful and technically robust.
          </motion.p>

          {/* CTA Buttons with upgraded glassmorphism */}
          <motion.div
            variants={itemVariants}
            style={{ opacity: buttonOpacity }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-6"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white/90 text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-[1.03] shadow-[0_0_35px_10px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_15px_rgba(255,255,255,0.25)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>

            <a
              href="/resume/Aryan_Tiwari.pdf"
              download
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/7 backdrop-blur-xl border border-white/10 text-white font-medium rounded-full transition-all hover:bg-white/10 hover:ring-1 hover:ring-white/20 hover:shadow-xl"
            >
              Download Resume
              <Download size={20} className="transition-transform group-hover:translate-y-1" />
            </a>

            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/7 backdrop-blur-xl border border-white/10 text-white font-medium rounded-full transition-all hover:bg-white/10 hover:ring-1 hover:ring-white/20 hover:shadow-xl"
            >
              View Projects
              <Code2 size={20} className="transition-transform group-hover:rotate-12" />
            </Link>
          </motion.div>

          {/* Tech highlights */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 pt-12 text-sm text-white/50"
          >
            {['MERN Stack', 'AWS', 'REST APIs', 'System Design'].map((tech, i) => (
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
      <div id="contact">
        <ContactSection />
      </div>
    </VisionProLayout>
  )
}
