import { motion, useScroll, useTransform } from 'framer-motion'
import { Code2, Trophy, Briefcase, GraduationCap, Download, Target } from 'lucide-react'
import { useRef } from 'react'
import { PERSONAL_DATA, SKILLS, EXPERIENCE, ACHIEVEMENTS, EDUCATION } from '../utils/constants'
import { getSkillIcon, getSkillColor } from '../utils/skillIcons'

/** Liquid Glass About section for landing page with official resume data */
export default function AboutSection() {
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
                {PERSONAL_DATA.title}
              </p>
            </motion.div>

            {/* Content Grid: Column 1 (Identity + Achievements), Column 2-3 (Bio+Skills) */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Column 1: stack Identity + Achievements */}
              <div className="lg:col-span-1 space-y-6">
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl space-y-4 sm:space-y-6 hover:bg-white/7 transition-all">
                  {/* Profile Photo or Gradient ring avatar */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
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
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center" style={{ display: 'none' }}>
                        <Code2 size={48} className="text-accent" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-2 sm:space-y-3">
                    <h3 className="font-semibold text-lg sm:text-xl text-white truncate px-2">{PERSONAL_DATA.name}</h3>
                    <p className="text-xs sm:text-sm text-white/70 line-clamp-2 px-2">{PERSONAL_DATA.title}</p>
                    <div className="flex items-center justify-center gap-2 text-xs text-white/60">
                      <Trophy size={14} className="text-accent flex-shrink-0" />
                      <span className="whitespace-nowrap">Credit Score: 89</span>
                    </div>
                  </div>

                  {/* Download Resume */}
                  <motion.a
                    href={PERSONAL_DATA.resumePath}
                    download
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/90 text-black text-sm sm:text-base font-semibold rounded-full hover:shadow-[0_0_35px_10px_rgba(255,255,255,0.2)] transition-all"
                  >
                    <Download size={18} />
                    Resume
                  </motion.a>
                </div>
                </motion.div>

                {/* Achievements Tile (match Summary size, single column) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative overflow-hidden p-4 sm:p-6 md:p-8 bg-white/10 backdrop-blur-3xl rounded-[32px] border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.35)] flex flex-col gap-3 sm:gap-4 h-auto w-full">
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />
                    <h3 className="relative font-semibold text-base sm:text-lg flex items-center gap-2 text-white">
                      <Trophy size={18} className="text-accent flex-shrink-0" />
                      <span className="truncate">Achievements & Leadership</span>
                    </h3>
                    <div className="relative grid grid-cols-1 gap-0 space-y-2 sm:space-y-3">
                      {ACHIEVEMENTS.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.08 }}
                          className="block w-full flex items-start gap-2 text-sm text-white/70"
                        >
                          <Target size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bio & Skills (Columns 2-3) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Summary Card */}
                <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl space-y-4 hover:bg-white/7 transition-all">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-white">
                    <div className="h-1 w-8 bg-accent rounded-full" />
                    Summary
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    {PERSONAL_DATA.summary}
                  </p>
                </div>

                {/* Skills Card */}
                <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl space-y-5 hover:bg-white/7 transition-all">
                  <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2 text-white">
                    <div className="h-1 w-6 sm:w-8 bg-accent rounded-full flex-shrink-0" />
                    <span>Technical Skills</span>
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {/* Languages */}
                    <div>
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {SKILLS.languages.map((skill, i) => {
                          const IconComponent = getSkillIcon(skill)
                          const colorClass = getSkillColor(skill)
                          return (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/7 border border-white/10 text-white/90 rounded-lg text-xs font-medium hover:bg-white/10 hover:border-accent/30 transition-all cursor-default whitespace-nowrap flex items-center gap-1.5"
                            >
                              <IconComponent size={14} className={colorClass} />
                              <span>{skill}</span>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Frameworks */}
                    <div>
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">Frameworks & Libraries</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {SKILLS.frameworks.map((skill, i) => {
                          const IconComponent = getSkillIcon(skill)
                          const colorClass = getSkillColor(skill)
                          return (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/7 border border-white/10 text-white/90 rounded-lg text-xs font-medium hover:bg-white/10 hover:border-accent/30 transition-all cursor-default whitespace-nowrap flex items-center gap-1.5"
                            >
                              <IconComponent size={14} className={colorClass} />
                              <span>{skill}</span>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Databases */}
                    <div>
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">Databases</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {SKILLS.databases.map((skill, i) => {
                          const IconComponent = getSkillIcon(skill)
                          const colorClass = getSkillColor(skill)
                          return (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/7 border border-white/10 text-white/90 rounded-lg text-xs font-medium hover:bg-white/10 hover:border-accent/30 transition-all cursor-default whitespace-nowrap flex items-center gap-1.5"
                            >
                              <IconComponent size={14} className={colorClass} />
                              <span>{skill}</span>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Tools */}
                    <div>
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">Tools</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {SKILLS.tools.map((skill, i) => {
                          const IconComponent = getSkillIcon(skill)
                          const colorClass = getSkillColor(skill)
                          return (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/7 border border-white/10 text-white/90 rounded-lg text-xs font-medium hover:bg-white/10 hover:border-accent/30 transition-all cursor-default whitespace-nowrap flex items-center gap-1.5"
                            >
                              <IconComponent size={14} className={colorClass} />
                              <span>{skill}</span>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            

            {/* Experience & Education Grid */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -4 }}
                className="p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:bg-white/7 transition-all min-w-0"
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={18} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-white truncate">{EXPERIENCE[0].title}</h3>
                    <p className="text-xs sm:text-sm text-white/70 truncate">{EXPERIENCE[0].company}</p>
                    <p className="text-xs text-accent mt-1 truncate">{EXPERIENCE[0].period}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                  {EXPERIENCE[0].description.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -4 }}
                className="p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:bg-white/7 transition-all min-w-0"
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={18} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-white line-clamp-2">{EDUCATION.degree}</h3>
                    <p className="text-xs sm:text-sm text-white/70 truncate">{EDUCATION.institution}</p>
                    <p className="text-xs text-accent mt-1 truncate">{EDUCATION.period}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-white/70">
                  <div className="flex justify-between">
                    <span>Current Year:</span>
                    <span className="text-white font-medium">{EDUCATION.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credit Scored:</span>
                    <span className="text-accent font-semibold">{EDUCATION.creditScore}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
