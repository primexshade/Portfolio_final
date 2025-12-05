import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, GraduationCap, Download, Award, Code2 } from 'lucide-react'
import { useRef } from 'react'
import VisionProLayout from '../layouts/VisionProLayout'
import { PERSONAL_DATA } from '../utils/constants'
import { getSkillIcon, getSkillColor } from '../utils/skillIcons'

/** About page with Vision Pro aesthetic - timeline, gradient avatar, and animated skills */
export default function AboutPage() {
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  })
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const timeline = [
    {
      icon: Briefcase,
      title: 'Full Stack Developer',
      company: 'Freelance & Academic Projects',
      period: '2023 — Present',
      description: 'Designed and deployed end-to-end MERN applications emphasizing scalability and clean backend architecture. Worked with REST APIs, authentication, JWT-based security, and Socket.io real-time communication. Collaborated with frontend teams to implement UI/UX-optimized features using React + Tailwind.',
    },
  ]

  const education = [
    {
      icon: GraduationCap,
      title: 'B.Tech Computer Science Engineering',
      company: 'SRM Institute of Science and Technology',
      period: '2023 - Present',
      description: 'Pre-final year student',
      link: 'https://www.srmist.edu.in/',
    },
    {
      icon: GraduationCap,
      title: 'ICSE / ISC Board',
      company: 'City Montessori School, Lucknow',
      period: '2022',
      description: '',
      link: 'https://cmseducation.org/',
    },
  ]

  const skills = [
    'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Bootstrap',
    'Tailwind', 'Firebase', 'Git', 'Java', 'C++', 'SQL', 'HTML5', 'CSS3'
  ]

  return (
    <VisionProLayout
      darkVeilConfig={{
        hueShift: 0,
        noiseIntensity: 0.005,
        scanlineIntensity: 0.06,
        speed: 0.12,
        scanlineFrequency: 1.5,
        warpAmount: 0.03,
        resolutionScale: 0.5
      }}
    >
      <section className="w-full px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 min-h-screen py-16 sm:py-24 lg:py-32">
        {/* Header with Vision Pro typography and parallax */}
        <motion.div
          ref={headerRef}
          style={{ y: headerY, opacity: headerOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3 sm:space-y-4 text-center"
        >
          <div className="relative inline-block">
            {/* Soft glow behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-3xl opacity-40" />
            
            <h2 className="relative text-5xl sm:text-6xl md:text-7xl font-semibold bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
          <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Passionate developer crafting elegant solutions to complex problems
          </p>
        </motion.div>

        {/* Profile and intro */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
          {/* Avatar card with Vision Pro glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="lg:col-span-1 min-w-0"
          >
            <div className="p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl space-y-4 sm:space-y-6 hover:bg-white/7 transition-all">
              {/* Profile Photo */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/50 to-accent/20 animate-spin-slow blur" />
                <div className="absolute inset-2 rounded-full bg-[#0D1117] flex items-center justify-center overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)]">
                  <img 
                    src={PERSONAL_DATA.profileImage} 
                    alt={PERSONAL_DATA.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextElementSibling.style.display = 'flex'
                    }}
                  />
                  <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center" style={{ display: 'none' }}>
                    <Code2 size={56} className="text-accent" />
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-2 sm:space-y-3">
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-white truncate px-2">Aryan Tiwari</h3>
                <p className="text-xs sm:text-sm text-white/70">Full Stack Developer</p>
              </div>

              {/* Download Resume */}
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 lg:py-4 bg-white/90 text-black text-xs sm:text-sm lg:text-base font-semibold rounded-full hover:shadow-[0_0_35px_10px_rgba(255,255,255,0.2)] transition-all"
              >
                <Download size={18} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0"
          >
            <div className="p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl space-y-3 sm:space-y-5 hover:bg-white/7 transition-all">
              <h3 className="font-semibold text-base sm:text-lg lg:text-xl flex items-center gap-2 sm:gap-3 text-white">
                <div className="h-1 w-6 sm:w-8 lg:w-10 bg-accent rounded-full flex-shrink-0" />
                <span>My Story</span>
              </h3>
              <div className="space-y-2 sm:space-y-4 text-white/70 leading-relaxed text-xs sm:text-sm lg:text-base">
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
            <div className="p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl space-y-3 sm:space-y-5 hover:bg-white/7 transition-all">
              <h3 className="font-semibold text-base sm:text-lg lg:text-xl flex items-center gap-2 sm:gap-3 text-white">
                <div className="h-1 w-6 sm:w-8 lg:w-10 bg-accent rounded-full flex-shrink-0" />
                <span>Tech Stack</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                {skills.map((skill, i) => {
                  const IconComponent = getSkillIcon(skill)
                  const colorClass = getSkillColor(skill)
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="px-2 sm:px-3 lg:px-5 py-1 sm:py-1.5 lg:py-2.5 bg-white/7 border border-white/10 text-white/90 rounded-xl text-xs sm:text-sm font-medium hover:bg-white/10 hover:border-accent/30 hover:text-white transition-all cursor-default shadow-lg whitespace-nowrap flex items-center gap-1.5"
                    >
                      <IconComponent size={16} className={colorClass} />
                      <span>{skill}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="space-y-8 sm:space-y-12 max-w-7xl mx-auto w-full">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-8 flex items-center gap-2 sm:gap-4 text-white">
              <Briefcase className="text-accent flex-shrink-0" size={28} />
              <span className="truncate">Experience</span>
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl hover:bg-white/7 hover:border-accent/20 transition-all group min-w-0"
                >
                  <div className="flex gap-3 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                        <item.icon size={24} className="text-accent" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 min-w-0">
                        <h4 className="font-semibold text-base sm:text-lg lg:text-xl text-white truncate">{item.title}</h4>
                        <span className="text-xs sm:text-sm text-accent font-medium whitespace-nowrap">{item.period}</span>
                      </div>
                      <p className="text-sm sm:text-base font-medium text-white/80 truncate">{item.company}</p>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed break-words">{item.description}</p>
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
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-8 flex items-center gap-2 sm:gap-4 text-white">
              <GraduationCap className="text-accent flex-shrink-0" size={28} />
              <span>Education</span>
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {education.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl hover:bg-white/7 hover:border-accent/20 transition-all group min-w-0"
                >
                  <div className="flex gap-3 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                        <item.icon size={24} className="text-accent" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 min-w-0">
                        <h4 className="font-semibold text-base sm:text-lg lg:text-xl text-white line-clamp-2 sm:line-clamp-1">{item.title}</h4>
                        <span className="text-xs sm:text-sm text-accent font-medium whitespace-nowrap">{item.period}</span>
                      </div>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base font-medium text-white/80 hover:text-accent transition-colors inline-block truncate"
                        >
                          {item.company}
                        </a>
                      ) : (
                        <p className="text-sm sm:text-base font-medium text-white/80 truncate">{item.company}</p>
                      )}
                      {item.description && <p className="text-xs sm:text-sm text-white/60 leading-relaxed break-words">{item.description}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </VisionProLayout>
  )
}
