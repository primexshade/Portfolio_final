import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, GraduationCap, Download, Award, Code2 } from 'lucide-react'
import { useRef } from 'react'
import VisionProLayout from '../layouts/VisionProLayout'

/** About page with Vision Pro aesthetic - timeline, gradient avatar, and animated skills */
export default function AboutPage() {
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  })
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const experience = [
    {
      icon: Briefcase,
      title: 'Senior Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Leading full-stack development projects with React, Node.js, and cloud infrastructure.',
    },
    {
      icon: Briefcase,
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      description: 'Built scalable web applications and REST APIs serving 100K+ users.',
    },
  ]

  const education = [
    {
      icon: GraduationCap,
      title: 'B.S. Computer Science',
      company: 'University Name',
      period: '2016 - 2020',
      description: 'Focus on software engineering, algorithms, and distributed systems.',
    },
  ]

  const skills = [
    'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript',
    'TailwindCSS', 'Framer Motion', 'Docker', 'AWS', 'Git'
  ]

  return (
    <VisionProLayout>
      <section className="py-20 px-6 sm:px-8 md:px-12 lg:px-16 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header with parallax */}
          <motion.div
            ref={headerRef}
            style={{ y: headerY, opacity: headerOpacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="relative inline-block">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#6EE7FF]/20 via-[#C084FC]/20 to-[#F472B6]/20 blur-3xl opacity-60" 
                style={{ filter: 'blur(80px)' }}
              />
              
              <h1 
                className="relative text-[60px] sm:text-[80px] md:text-[110px] font-semibold leading-none bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent"
                style={{ textShadow: '0 0 80px rgba(110, 231, 255, 0.3)' }}
              >
                About Me
              </h1>
            </div>
            <p className="text-white/60 text-lg sm:text-xl max-w-3xl mx-auto">
              Passionate developer crafting elegant solutions to complex problems
            </p>
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
            <div className="relative p-8 md:p-12 lg:p-16 space-y-12">
              {/* Profile and intro */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Avatar card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ y: -4 }}
                  className="lg:col-span-1"
                >
                  <div className="p-6 sm:p-8 bg-white/5 backdrop-blur-xl rounded-[24px] border border-white/10 shadow-xl space-y-6 hover:bg-white/7 transition-all">
                    {/* Gradient ring avatar */}
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/50 to-accent/20 animate-spin-slow blur" />
                      <div className="absolute inset-2 rounded-full bg-[#0D1117] flex items-center justify-center">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                          <Code2 size={64} className="text-accent sm:w-[72px] sm:h-[72px]" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center space-y-3">
                      <h3 className="font-semibold text-xl sm:text-2xl text-white">Aryan Tiwari</h3>
                      <p className="text-sm text-white/70">Full Stack Developer</p>
                      <div className="flex items-center justify-center gap-2 text-xs text-white/60">
                        <Award size={14} className="text-accent" />
                        <span>5+ Years Experience</span>
                      </div>
                    </div>

                    {/* Download Resume */}
                    <motion.a
                      href="/resume.pdf"
                      download
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-white/90 text-black font-semibold rounded-full hover:shadow-[0_0_35px_10px_rgba(255,255,255,0.2)] transition-all"
                    >
                      <Download size={20} />
                      Resume
                    </motion.a>
                  </div>
                </motion.div>

                {/* Bio & Skills */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="lg:col-span-2 space-y-6"
                >
                  {/* Bio */}
                  <div className="p-6 sm:p-8 bg-white/5 backdrop-blur-xl rounded-[24px] border border-white/10 shadow-xl space-y-5 hover:bg-white/7 transition-all">
                    <h3 className="font-semibold text-lg sm:text-xl flex items-center gap-3 text-white">
                      <div className="h-1 w-8 sm:w-10 bg-accent rounded-full" />
                      My Story
                    </h3>
                    <div className="space-y-3 sm:space-y-4 text-white/70 leading-relaxed text-sm sm:text-base">
                      <p>
                        I'm a full-stack developer passionate about creating elegant solutions to complex problems.
                        With expertise in the MERN stack, I build scalable web applications that prioritize user experience and performance.
                      </p>
                      <p>
                        My journey into tech started with curiosity about how things work. Today, I specialize in
                        React, Node.js, and modern web technologies, bringing ideas to life through clean code and thoughtful design.
                      </p>
                      <p>
                        When I'm not coding, you'll find me exploring new technologies, contributing to open source,
                        or sharing knowledge with the developer community.
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="p-6 sm:p-8 bg-white/5 backdrop-blur-xl rounded-[24px] border border-white/10 shadow-xl space-y-5 hover:bg-white/7 transition-all">
                    <h3 className="font-semibold text-lg sm:text-xl flex items-center gap-3 text-white">
                      <div className="h-1 w-8 sm:w-10 bg-accent rounded-full" />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05, duration: 0.4 }}
                          whileHover={{ scale: 1.1, y: -3 }}
                          className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white/7 border border-white/10 text-white/90 rounded-xl text-sm font-medium hover:bg-white/10 hover:border-accent/30 hover:text-white transition-all cursor-default shadow-lg"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Timeline sections */}
              <div className="space-y-10">
                {/* Experience */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 text-white">
                    <Briefcase className="text-accent" size={28} />
                    <span className="sm:text-3xl">Experience</span>
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    {experience.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.6 }}
                        whileHover={{ y: -4 }}
                        className="p-6 sm:p-8 bg-white/5 backdrop-blur-xl rounded-[24px] border border-white/10 shadow-xl hover:bg-white/7 hover:border-accent/20 transition-all group"
                      >
                        <div className="flex gap-4 sm:gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                              <item.icon size={24} className="text-accent sm:w-7 sm:h-7" />
                            </div>
                          </div>
                          <div className="flex-1 space-y-2 sm:space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                              <h4 className="font-semibold text-lg sm:text-xl text-white">{item.title}</h4>
                              <span className="text-xs sm:text-sm text-accent font-medium">{item.period}</span>
                            </div>
                            <p className="text-sm sm:text-base font-medium text-white/80">{item.company}</p>
                            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Education */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 text-white">
                    <GraduationCap className="text-accent" size={28} />
                    <span className="sm:text-3xl">Education</span>
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    {education.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ y: -4 }}
                        className="p-6 sm:p-8 bg-white/5 backdrop-blur-xl rounded-[24px] border border-white/10 shadow-xl hover:bg-white/7 hover:border-accent/20 transition-all group"
                      >
                        <div className="flex gap-4 sm:gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                              <item.icon size={24} className="text-accent sm:w-7 sm:h-7" />
                            </div>
                          </div>
                          <div className="flex-1 space-y-2 sm:space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                              <h4 className="font-semibold text-lg sm:text-xl text-white">{item.title}</h4>
                              <span className="text-xs sm:text-sm text-accent font-medium">{item.period}</span>
                            </div>
                            <p className="text-sm sm:text-base font-medium text-white/80">{item.company}</p>
                            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </VisionProLayout>
  )
}
