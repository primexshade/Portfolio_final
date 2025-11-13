import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, Search, Sparkles } from 'lucide-react'
import { getProjects } from '../utils/api'
import Loader from '../components/Loader'
import VisionProLayout from '../layouts/VisionProLayout'

/** Projects page with filters, search, and gradient cards */
export default function ProjectsPage() {
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    let mounted = true
    getProjects()
      .then((res) => {
        if (mounted) {
          const data = res.data || []
          setProjects(data)
          setFilteredProjects(data)
          setLoading(false)
        }
      })
      .catch((e) => {
        if (mounted) {
          setError(e?.response?.data?.message || 'Failed to load projects')
          setLoading(false)
        }
      })
    return () => { mounted = false }
  }, [])

  // Filter logic
  useEffect(() => {
    let filtered = projects

    if (activeFilter === 'featured') {
      filtered = filtered.filter((p) => p.featured)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.techStack.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredProjects(filtered)
  }, [activeFilter, searchTerm, projects])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <VisionProLayout>
      <section className="py-20 px-6 sm:px-8 md:px-12 lg:px-16 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
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
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto"
            >
              A collection of projects I've built — from full-stack web apps to creative experiments
            </motion.p>
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
              {/* Search and filters */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-sm sm:text-base focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all shadow-lg text-white placeholder:text-white/40"
                  />
                </div>

                {/* Filter tabs */}
                <div className="flex gap-3">
                  {['all', 'featured'].map((filter) => (
                    <motion.button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-medium transition-all ${
                        activeFilter === filter
                          ? 'bg-white/10 backdrop-blur-xl text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20'
                          : 'bg-white/5 backdrop-blur-xl text-white/70 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Loading state */}
              {loading && (
                <div className="flex items-center justify-center py-20">
                  <Loader />
                </div>
              )}

              {/* Error state */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-[24px] p-8 border border-red-500/20"
                >
                  <p className="text-red-400 text-base sm:text-lg">{error}</p>
                  <p className="text-sm sm:text-base text-white/60 mt-3">
                    Backend should be running on port 5002. Run <code className="text-[#6EE7FF]">npm run seed</code> in server folder.
                  </p>
                </motion.div>
              )}

              {/* Empty state */}
              {!loading && !error && filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-[24px] p-12 sm:p-16 text-center border border-white/10"
                >
                  <p className="text-white/70 text-base sm:text-lg">
                    {searchTerm ? 'No projects match your search' : 'No projects found'}
                  </p>
                  {!searchTerm && (
                    <code className="block mt-4 text-sm sm:text-base text-[#6EE7FF]">node server/seedProjects.js</code>
                  )}
                </motion.div>
              )}

              {/* Projects grid */}
              {!loading && filteredProjects.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((p) => (
                      <motion.article
                        key={p._id || p.title}
                        layout
                        variants={cardVariants}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.4 }}
                        className="group relative bg-white/5 backdrop-blur-xl rounded-[24px] overflow-hidden flex flex-col border border-white/10 hover:border-white/20 shadow-lg hover:shadow-2xl"
                      >
                      {/* Image */}
                      {p.imageUrl && (
                        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            src={p.imageUrl}
                            alt={p.title}
                            className="h-full w-full object-cover"
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {p.featured && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 sm:top-4 right-3 sm:right-4 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-xl text-white rounded-full flex items-center gap-1.5 sm:gap-2 shadow-lg border border-white/20"
                            >
                              <Sparkles size={12} />
                              Featured
                            </motion.div>
                          )}
                        </div>
                      )}

                      <div className="p-5 sm:p-7 flex flex-col gap-3 sm:gap-4 flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#6EE7FF] transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/60 line-clamp-3 flex-1">
                          {p.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 sm:gap-2.5">
                          {(p.techStack || []).slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-xl bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                          {p.techStack?.length > 4 && (
                            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-xl bg-white/5 text-white/50">
                              +{p.techStack.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Links */}
                        <div className="mt-auto flex gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10">
                          {p.githubUrl && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 py-2.5 sm:py-3 bg-white/5 backdrop-blur-xl rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-white/10 border border-white/10 transition-all"
                              href={p.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={16} />
                              Code
                            </motion.a>
                          )}
                          {p.demoUrl && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 py-2.5 sm:py-3 bg-white/10 backdrop-blur-xl rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 text-white shadow-[0_0_30px_rgba(110,231,255,0.2)] hover:shadow-[0_0_40px_rgba(110,231,255,0.4)] border border-white/20 transition-all"
                              href={p.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={16} />
                              Demo
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
            </div>
          </motion.div>
        </div>
      </section>
    </VisionProLayout>
  )
}
