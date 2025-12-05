import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import GitHubCalendar from 'react-github-calendar'
import { getGitHubUser, getLeetCodeStats } from '../utils/api'
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts'
import VisionProLayout from '../layouts/VisionProLayout'
import { Github, Trophy, TrendingUp, Award } from 'lucide-react'

/** Combined GitHub + LeetCode stats page */
export default function StatsPage() {
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // GitHub state
  const [githubUsername, setGithubUsername] = useState('primexshade')
  const [githubProfile, setGithubProfile] = useState(null)
  const [githubError, setGithubError] = useState('')

  // LeetCode state
  const [leetcodeUsername, setLeetcodeUsername] = useState('primexshade')
  const [leetcodeData, setLeetcodeData] = useState(null)
  const [leetcodeError, setLeetcodeError] = useState('')

  useEffect(() => {
    let mounted = true
    getGitHubUser(githubUsername)
      .then((res) => { if (mounted) setGithubProfile(res.data) })
      .catch(() => setGithubError('Failed to fetch GitHub user'))
    return () => { mounted = false }
  }, [githubUsername])

  useEffect(() => {
    let mounted = true
    getLeetCodeStats(leetcodeUsername)
      .then((res) => { if (mounted) setLeetcodeData(res.data) })
      .catch(() => setLeetcodeError('Failed to fetch LeetCode stats'))
    return () => { mounted = false }
  }, [leetcodeUsername])

  const chartData = leetcodeData ? [
    { name: 'Easy', value: leetcodeData.easySolved || 0, fill: '#22c55e' },
    { name: 'Medium', value: leetcodeData.mediumSolved || 0, fill: '#f59e0b' },
    { name: 'Hard', value: leetcodeData.hardSolved || 0, fill: '#ef4444' },
  ] : []

  return (
    <VisionProLayout
      darkVeilConfig={{
        hueShift: 0,
        noiseIntensity: 0.008,
        scanlineIntensity: 0.07,
        speed: 0.14,
        scanlineFrequency: 2,
        warpAmount: 0.04,
        resolutionScale: 0.5
      }}
    >
      <section className="py-20 px-6 sm:px-8 md:px-12 lg:px-16 min-h-screen relative z-20">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header with parallax */}
          <motion.div
            ref={headerRef}
            style={{ y: headerY, opacity: headerOpacity }}
            className="space-y-6 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[60px] sm:text-[80px] md:text-[110px] font-semibold leading-none bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 80px rgba(110, 231, 255, 0.3)',
              }}
            >
              Dev Stats
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto"
            >
              Track coding activity across GitHub and LeetCode
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
                  {/* GitHub Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <Github size={32} className="text-[#6EE7FF]" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent">
                    GitHub Activity
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-base text-white/70">Username:</label>
                  <input
                    className="px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-base outline-none focus:border-white/30 focus:bg-white/10 transition-all shadow-lg w-full sm:w-auto"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="GitHub username"
                  />
                </div>

                {githubError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-base"
                  >
                    {githubError}
                  </motion.p>
                )}

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-white/10 shadow-xl"
                >
                  <GitHubCalendar username={githubUsername} colorScheme="dark" blockMargin={6} blockSize={14} />
                </motion.div>

                {githubProfile && (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 grid sm:grid-cols-2 gap-6 sm:gap-8 border border-white/10 shadow-xl"
                  >
                    <div className="space-y-3">
                      <h3 className="font-semibold text-xl sm:text-2xl text-white">{githubProfile.name || githubProfile.login}</h3>
                      <p className="text-sm sm:text-base text-white/70">{githubProfile.bio}</p>
                    </div>
                    <div className="flex gap-6 sm:gap-8 text-sm sm:text-base items-center">
                      <div className="space-y-1">
                        <span className="font-medium text-white/80">Repos:</span>
                        <p className="text-xl sm:text-2xl font-bold text-[#6EE7FF]">{githubProfile.public_repos}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-medium text-white/80">Followers:</span>
                        <p className="text-xl sm:text-2xl font-bold text-[#C084FC]">{githubProfile.followers}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-medium text-white/80">Following:</span>
                        <p className="text-xl sm:text-2xl font-bold text-[#F472B6]">{githubProfile.following}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* LeetCode Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <Trophy size={32} className="text-[#F472B6]" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent">
                    LeetCode Stats
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-base text-white/70">Username:</label>
                  <input
                    className="px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-base outline-none focus:border-white/30 focus:bg-white/10 transition-all shadow-lg w-full sm:w-auto"
                    value={leetcodeUsername}
                    onChange={(e) => setLeetcodeUsername(e.target.value)}
                    placeholder="LeetCode username"
                  />
                </div>

                {leetcodeError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-base"
                  >
                    {leetcodeError}
                  </motion.p>
                )}

                {leetcodeData && (
                  <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-white/10 shadow-xl space-y-6"
                    >
                      <h3 className="font-semibold text-xl sm:text-2xl text-white flex items-center gap-3">
                        <TrendingUp size={24} className="text-[#6EE7FF]" />
                        Overview
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm sm:text-base text-white/70">Total Solved</span>
                          <span className="text-2xl sm:text-3xl font-bold text-[#6EE7FF]">
                            {leetcodeData.totalSolved} <span className="text-lg sm:text-xl text-white/50">/ {leetcodeData.totalQuestions}</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm sm:text-base text-white/70">Ranking</span>
                          <span className="text-2xl sm:text-3xl font-bold text-[#C084FC]">{leetcodeData.ranking ?? '—'}</span>
                        </div>
                      </div>
                      
                      {/* Difficulty breakdown */}
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                          <span className="text-sm sm:text-base text-white/70 flex items-center gap-2">
                            <Award size={18} className="text-green-400" />
                            Easy
                          </span>
                          <span className="text-lg sm:text-xl font-semibold text-green-400">{leetcodeData.easySolved || 0}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                          <span className="text-sm sm:text-base text-white/70 flex items-center gap-2">
                            <Award size={18} className="text-yellow-400" />
                            Medium
                          </span>
                          <span className="text-lg sm:text-xl font-semibold text-yellow-400">{leetcodeData.mediumSolved || 0}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                          <span className="text-sm sm:text-base text-white/70 flex items-center gap-2">
                            <Award size={18} className="text-red-400" />
                            Hard
                          </span>
                          <span className="text-lg sm:text-xl font-semibold text-red-400">{leetcodeData.hardSolved || 0}</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-white/10 shadow-xl h-80 sm:h-96"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" barSize={20} data={chartData}>
                          <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }} background clockWise dataKey="value" />
                          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </VisionProLayout>
  )
}
