import { motion, useScroll, useTransform } from 'framer-motion'
import { Code2, Award, Briefcase, GraduationCap, Download } from 'lucide-react'
import { useRef } from 'react'

/** Liquid Glass About section for landing page */
export default function AboutSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1])

  const skills = [
    'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript',
    'TailwindCSS', 'Framer Motion', 'Docker', 'AWS', 'Git'
  ]

  const experience = [
    {
      icon: Briefcase,
      title: 'Senior Developer',
      company: 'Tech Company',
      period: '2022 - Present',
    },
    {
      icon: Briefcase,
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
    },
  ]

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
          
          {/* Content - relative z-index to appear above reflection */}
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
                  About Me
                </h2>
              </div>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
                Passionate developer crafting elegant solutions to complex problems
              </p>
            </motion.div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -4 }}
                className="lg:col-span-1"
              >
                <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl space-y-6 hover:bg-white/7 transition-all">
                  {/* Gradient ring avatar */}
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/50 to-accent/20 animate-spin-slow blur" />
                    <div className="absolute inset-2 rounded-full bg-[#0D1117] flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                        <Code2 size={48} className="text-accent" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <h3 className="font-semibold text-xl text-white">Aryan Tiwari</h3>
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
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/90 text-black font-semibold rounded-full hover:shadow-[0_0_35px_10px_rgba(255,255,255,0.2)] transition-all"
                  >
                    <Download size={18} />
                    Resume
                  </motion.a>
                </div>
              </motion.div>

              {/* Bio & Skills */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Bio Card */}
                <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl space-y-4 hover:bg-white/7 transition-all">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-white">
                    <div className="h-1 w-8 bg-accent rounded-full" />
                    My Story
                  </h3>
                  <div className="space-y-3 text-white/70 leading-relaxed text-sm sm:text-base">
                    <p>
                      I'm a full-stack developer passionate about creating elegant solutions to complex problems.
                      With expertise in the MERN stack, I build scalable web applications that prioritize user experience and performance.
                    </p>
                    <p>
                      When I'm not coding, you'll find me exploring new technologies, contributing to open source,
                      or sharing knowledge with the developer community.
                    </p>
                  </div>
                </div>

                {/* Skills Card */}
                <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl space-y-4 hover:bg-white/7 transition-all">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-white">
                    <div className="h-1 w-8 bg-accent rounded-full" />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-4 py-2 bg-white/7 border border-white/10 text-white/90 rounded-lg text-sm font-medium hover:bg-white/10 hover:border-accent/30 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Quick Experience Timeline */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {experience.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl hover:bg-white/7 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                          <item.icon size={18} className="text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-white truncate">{item.title}</h4>
                          <p className="text-xs text-white/70 mt-0.5">{item.company}</p>
                          <p className="text-xs text-accent mt-1">{item.period}</p>
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
    </motion.section>
  )
}
