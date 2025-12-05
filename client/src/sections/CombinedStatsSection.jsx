import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Trophy, Code2, Target, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import GitHubCalendar from 'react-github-calendar'
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts'
import { getGitHubUser, getLeetCodeStats } from '../utils/api'

/** Combined GitHub + LeetCode stats for scroll-driven landing page */
export default function CombinedStatsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1])

  const [githubProfile, setGithubProfile] = useState(null)
  const [leetcodeData, setLeetcodeData] = useState(null)

  useEffect(() => {
    // Fetch GitHub stats
    getGitHubUser('primexshade')
      .then((res) => setGithubProfile(res.data))
      .catch(() => {})

    // Fetch LeetCode stats
    getLeetCodeStats('primexshade')
      .then((res) => setLeetcodeData(res.data))
      .catch(() => {})
  }, [])

  const leetcodeChartData = leetcodeData ? [
    { name: 'Easy', value: leetcodeData.easySolved || 0, fill: '#22c55e' },
    { name: 'Medium', value: leetcodeData.mediumSolved || 0, fill: '#f59e0b' },
    { name: 'Hard', value: leetcodeData.hardSolved || 0, fill: '#ef4444' },
  ] : []

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
                <h2 className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(110,231,255,0.3)] pb-1 leading-tight">
                  Coding Journey
                </h2>
              </div>
              <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
                My contributions and problem-solving achievements across platforms
              </p>
            </motion.div>

        {/* Split Layout: GitHub + LeetCode */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* GitHub Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 min-w-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2 sm:gap-3">
                <Github className="text-accent" size={24} />
                <span className="truncate">GitHub Activity</span>
              </h3>
              <Link
                to="/github"
                className="text-xs sm:text-sm text-accent hover:text-accent/80 flex items-center gap-1 whitespace-nowrap"
              >
                View Details <ArrowRight size={16} />
              </Link>
            </div>

            {/* GitHub Calendar */}
            <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:bg-white/7 transition-all overflow-x-auto">
              <div className="min-w-[300px]">
                <GitHubCalendar 
                  username="primexshade" 
                  colorScheme="dark" 
                  blockMargin={4}
                  blockSize={12}
                />
              </div>
            </div>

            {/* GitHub Stats */}
            {githubProfile && (
              <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:bg-white/7 transition-all">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <img
                    src={githubProfile.avatar_url}
                    alt={githubProfile.login}
                    className="w-16 h-16 rounded-full border-2 border-accent/30"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">{githubProfile.name || githubProfile.login}</h4>
                    <p className="text-sm text-white/70 mt-1 line-clamp-2">{githubProfile.bio}</p>
                    <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 text-xs sm:text-sm text-white/80">
                      <div className="flex items-center gap-2">
                        <Code2 size={16} className="text-accent" />
                        <span className="whitespace-nowrap">{githubProfile.public_repos} repos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent">★</span>
                        <span className="whitespace-nowrap">{githubProfile.followers} followers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* LeetCode Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 sm:space-y-6 min-w-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2 sm:gap-3">
                <Trophy className="text-accent" size={24} />
                <span className="truncate">LeetCode Stats</span>
              </h3>
              <Link
                to="/leetcode"
                className="text-xs sm:text-sm text-accent hover:text-accent/80 flex items-center gap-1 whitespace-nowrap"
              >
                View Details <ArrowRight size={16} />
              </Link>
            </div>

            {leetcodeData ? (
              <>
                {/* Overview Card */}
                <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:bg-white/7 transition-all">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-white/60">Total Solved</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white mt-1 truncate">
                        {leetcodeData.totalSolved}
                        <span className="text-base sm:text-lg text-white/50 ml-1">/ {leetcodeData.totalQuestions}</span>
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-white/60">Global Ranking</p>
                      <p className="text-2xl sm:text-3xl font-bold text-accent mt-1 truncate">
                        {leetcodeData.ranking ? `#${leetcodeData.ranking.toLocaleString()}` : '—'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chart Card */}
                <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:bg-white/7 transition-all h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="30%" 
                      outerRadius="90%" 
                      barSize={16} 
                      data={leetcodeChartData}
                    >
                      <RadialBar 
                        minAngle={15} 
                        label={{ position: 'insideStart', fill: '#fff', fontSize: 14 }} 
                        background 
                        clockWise 
                        dataKey="value" 
                      />
                      <Legend 
                        iconSize={12} 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ fontSize: '14px' }}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>

                {/* Difficulty Breakdown */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-center">
                    <Target size={20} className="mx-auto mb-2 text-green-400" />
                    <p className="text-xl sm:text-2xl font-bold text-white">{leetcodeData.easySolved || 0}</p>
                    <p className="text-xs text-white/60 mt-1">Easy</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-center">
                    <Target size={20} className="mx-auto mb-2 text-amber-400" />
                    <p className="text-xl sm:text-2xl font-bold text-white">{leetcodeData.mediumSolved || 0}</p>
                    <p className="text-xs text-white/60 mt-1">Medium</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-center">
                    <Target size={20} className="mx-auto mb-2 text-red-400" />
                    <p className="text-xl sm:text-2xl font-bold text-white">{leetcodeData.hardSolved || 0}</p>
                    <p className="text-xs text-white/60 mt-1">Hard</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-center">
                <p className="text-white/70">Loading LeetCode stats...</p>
              </div>
            )}
          </motion.div>
        </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
