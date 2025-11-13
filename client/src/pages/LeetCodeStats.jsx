import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getLeetCodeStats } from '../utils/api'
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts'
import VisionProLayout from '../layouts/VisionProLayout'

/** LeetCode stats via backend proxy to unofficial API */
export default function LeetCodeStats() {
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const [username, setUsername] = useState('leetcode')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    getLeetCodeStats(username)
      .then((res) => { if (mounted) setData(res.data) })
      .catch(() => setError('Failed to fetch LeetCode stats'))
    return () => { mounted = false }
  }, [username])

  const chartData = data ? [
    { name: 'Easy', value: data.easySolved || 0, fill: '#22c55e' },
    { name: 'Medium', value: data.mediumSolved || 0, fill: '#f59e0b' },
    { name: 'Hard', value: data.hardSolved || 0, fill: '#ef4444' },
  ] : []

  return (
    <VisionProLayout>
      <section className="section space-y-12 min-h-screen relative z-20">
        {/* Header with parallax */}
        <motion.div
          ref={headerRef}
          style={{ y: headerY, opacity: headerOpacity }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent"
            >
              LeetCode Stats
            </motion.h2>
            <motion.input
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-base outline-none focus:border-white/30 focus:bg-white/10 transition-all shadow-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="LeetCode username"
            />
          </div>
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-base"
          >
            {error}
          </motion.p>
        )}

        {data && (
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6"
            >
              <h3 className="font-semibold text-2xl text-white">Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base text-white/70">Total Solved</span>
                  <span className="text-3xl font-bold text-[#6EE7FF]">
                    {data.totalSolved} <span className="text-xl text-white/50">/ {data.totalQuestions}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-white/70">Ranking</span>
                  <span className="text-3xl font-bold text-[#C084FC]">{data.ranking ?? '—'}</span>
                </div>
              </div>
              
              {/* Difficulty breakdown */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-base text-white/70">Easy</span>
                  <span className="text-xl font-semibold text-green-400">{data.easySolved || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-white/70">Medium</span>
                  <span className="text-xl font-semibold text-yellow-400">{data.mediumSolved || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-white/70">Hard</span>
                  <span className="text-xl font-semibold text-red-400">{data.hardSolved || 0}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl h-96"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" barSize={24} data={chartData}>
                  <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff', fontSize: 14 }} background clockWise dataKey="value" />
                  <Legend iconSize={12} layout="vertical" verticalAlign="middle" align="right" />
                </RadialBarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        )}
      </section>
    </VisionProLayout>
  )
}
