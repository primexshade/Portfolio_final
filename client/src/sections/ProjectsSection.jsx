import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FEATURED_PROJECTS } from '../utils/constants'

/** Projects section for scroll-driven landing page */
export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1])

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, y, scale }}
      className="relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Single Liquid Glass Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -4 }}
          className="relative bg-white/10 backdrop-blur-3xl rounded-[32px] border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.35)] p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 space-y-8 sm:space-y-12 overflow-hidden"
        >
          {/* Soft reflection overlay */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />
          
          {/* Content */}
          <div className="relative space-y-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-3xl opacity-40" />
                <h2 className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(110,231,255,0.3)]">
                  Featured Work
                </h2>
              </div>
              <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
                A showcase of projects that blend creativity with technical excellence
              </p>
            </motion.div>

        {/* Projects Grid - 2 Featured Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto"
        >
          {FEATURED_PROJECTS.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Gradient glow on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              
              <div className="relative bg-white/5 backdrop-blur-xl rounded-[24px] border border-white/10 overflow-hidden flex flex-col h-full hover:border-white/20 transition-all shadow-xl">
                {/* Tech Header */}
                <div className="relative h-24 sm:h-32 md:h-40 w-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                  <Code2 size={32} className="sm:w-[40px] sm:h-[40px] text-accent relative z-10" />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-xl text-white rounded-full border border-white/20">
                    {project.year}
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:p-6 flex flex-col gap-2 sm:gap-3 md:gap-4 flex-1">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-accent transition-colors mb-1 truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/50 font-medium truncate">{project.tech}</p>
                  </div>

                  {/* Description as bullet list */}
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/70 flex-1">
                    {project.description.map((desc, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-white/10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-xl bg-white/7 text-white/80 border border-white/10 hover:bg-white/10 hover:border-accent/20 transition-colors whitespace-nowrap"
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

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/7 backdrop-blur-xl border border-white/10 text-white text-sm sm:text-base font-medium rounded-full hover:bg-white/10 hover:ring-1 hover:ring-white/20 transition-all"
          >
            <span className="whitespace-nowrap">View All Projects</span>
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
