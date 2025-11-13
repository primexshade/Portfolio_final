import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getProjects } from '../utils/api'

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

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getProjects()
      .then((res) => {
        if (mounted) {
          // Show only featured or first 6 projects
          const data = res.data || []
          const featured = data.filter(p => p.featured).slice(0, 6)
          setProjects(featured.length > 0 ? featured : data.slice(0, 6))
          setLoading(false)
        }
      })
      .catch(() => {
        if (mounted) setLoading(false)
      })
    return () => { mounted = false }
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, y, scale }}
      className="relative flex items-center justify-center py-20"
    >
      <div className="section max-w-7xl mx-auto">
        {/* Single Liquid Glass Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -4 }}
          className="relative bg-white/10 backdrop-blur-3xl rounded-[32px] border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.35)] p-8 md:p-12 lg:p-16 space-y-12"
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
                <h2 className="relative text-4xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(110,231,255,0.3)]">
                  Featured Work
                </h2>
              </div>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
                A showcase of projects that blend creativity with technical excellence
              </p>
            </motion.div>

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((p, idx) => (
              <motion.article
                key={p._id || p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Gradient glow on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                
                <div className="relative bg-[#0D1117]/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full hover:border-white/20 transition-all">
                  {/* Image */}
                  {p.imageUrl && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={p.imageUrl}
                        alt={p.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {p.featured && (
                        <div className="absolute top-3 right-3 px-3 py-1 text-xs font-medium bg-accent text-white rounded-full flex items-center gap-1 shadow-lg">
                          <Sparkles size={12} />
                          Featured
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-white/70 line-clamp-3 flex-1">
                      {p.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {(p.techStack || []).slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-md bg-white/7 text-white/80 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.techStack?.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/50">
                          +{p.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="mt-auto flex gap-3 pt-3 border-t border-white/10">
                      {p.githubUrl && (
                        <a
                          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-white/10 hover:border-accent/30 transition-all text-white"
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Github size={16} />
                          Code
                        </a>
                      )}
                      {p.demoUrl && (
                        <a
                          className="flex-1 px-3 py-2 bg-white/90 text-black rounded-lg text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all font-medium"
                          href={p.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* View All Link */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/7 backdrop-blur-xl border border-white/10 text-white font-medium rounded-full hover:bg-white/10 hover:ring-1 hover:ring-white/20 transition-all"
            >
              View All Projects
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-center"
          >
            <p className="text-white/70">No projects available yet</p>
            <p className="text-sm text-white/50 mt-2">Run <code className="text-accent">npm run seed</code> in the server folder</p>
          </motion.div>
        )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
