import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Code2 } from 'lucide-react'
import VisionProLayout from '../layouts/VisionProLayout'
import { FEATURED_PROJECTS } from '../utils/constants'

/** Projects page - showcasing 2 featured projects from resume */
export default function ProjectsPage() {
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <VisionProLayout
      darkVeilConfig={{
        hueShift: 0,
        noiseIntensity: 0.008,
        scanlineIntensity: 0.08,
        speed: 0.15,
        scanlineFrequency: 2,
        warpAmount: 0.05,
        resolutionScale: 0.5
      }}
    >
      <section className="py-20 px-6 sm:px-8 md:px-12 lg:px-16 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12" style={{ position: 'relative' }}>
          {/* Header with parallax */}
          <motion.div
            ref={headerRef}
            style={{ y: headerY, opacity: headerOpacity }}
            className="space-y-6 text-center"
          >
            <div className="relative inline-block">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#6EE7FF]/20 via-[#C084FC]/20 to-[#F472B6]/20 blur-3xl opacity-60" 
                style={{ filter: 'blur(80px)' }}
              />
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative text-[60px] sm:text-[80px] md:text-[110px] font-semibold leading-none bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent"
                style={{ textShadow: '0 0 80px rgba(110, 231, 255, 0.3)' }}
              >
                Featured Work
              </motion.h1>
            </div>
          </motion.div>

          {/* Main Liquid Glass Panel */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="relative bg-white/10 backdrop-blur-3xl border border-white/15 rounded-[32px] shadow-[0_40px_120px_rgba(0,0,0,0.35)] overflow-hidden"
          >
            {/* Soft reflection overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 via-white/0 to-transparent" />
            
            {/* Content */}
            <div className="relative p-8 md:p-12 lg:p-16 space-y-10">
              {/* Projects grid - 2 featured projects */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid sm:grid-cols-2 gap-8 max-w-6xl mx-auto"
              >
                {FEATURED_PROJECTS.map((project, idx) => (
                  <motion.article
                    key={project.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * idx }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative"
                  >
                    {/* Gradient glow on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-accent/20 rounded-[28px] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    
                    <div className="relative bg-white/5 backdrop-blur-xl rounded-[28px] border border-white/10 overflow-hidden flex flex-col h-full hover:border-white/20 transition-all shadow-2xl">
                      {/* Tech Header with gradient background */}
                      <div className="relative h-48 w-full bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(110,231,255,0.15),transparent_50%)]" />
                        <Code2 size={56} className="text-accent relative z-10 drop-shadow-[0_0_20px_rgba(47,129,247,0.5)]" />
                        <div className="absolute top-4 right-4 px-4 py-1.5 text-sm font-medium bg-white/10 backdrop-blur-xl text-white rounded-full border border-white/20 shadow-lg">
                          {project.year}
                        </div>
                      </div>

                      <div className="p-7 sm:p-8 flex flex-col gap-5 flex-1">
                        <div>
                          <h3 className="text-2xl font-semibold text-white group-hover:text-accent transition-colors mb-2">
                            {project.title}
                          </h3>
                          <p className="text-base text-white/50 font-medium">{project.tech}</p>
                        </div>

                        {/* Description as bullet list */}
                        <ul className="space-y-3 text-sm sm:text-base text-white/70 flex-1">
                          {project.description.map((desc, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="text-accent mt-1.5 text-lg">•</span>
                              <span className="leading-relaxed">{desc}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/10">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white/10 text-white/80 border border-white/15 hover:bg-white/15 hover:border-accent/30 transition-all cursor-default shadow-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </VisionProLayout>
  )
}
