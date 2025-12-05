import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import GitHubCalendar from 'react-github-calendar'
import { getGitHubUser } from '../utils/api'
import VisionProLayout from '../layouts/VisionProLayout'

/** GitHub activity calendar + basic stats */
export default function GitHubStats() {
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const [username, setUsername] = useState('primexshade')
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    getGitHubUser(username)
      .then((res) => { if (mounted) setProfile(res.data) })
      .catch(() => setError('Failed to fetch GitHub user'))
    return () => { mounted = false }
  }, [username])

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
              GitHub Activity
            </motion.h2>
            <motion.input
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-base outline-none focus:border-white/30 focus:bg-white/10 transition-all shadow-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="GitHub username"
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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <GitHubCalendar username={username} colorScheme="dark" blockMargin={6} blockSize={14} />
        </motion.div>

        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 grid sm:grid-cols-2 gap-8 border border-white/10 shadow-2xl"
          >
            <div className="space-y-3">
              <h3 className="font-semibold text-2xl text-white">{profile.name || profile.login}</h3>
              <p className="text-base text-white/70">{profile.bio}</p>
            </div>
            <div className="flex gap-8 text-base items-center">
              <div className="space-y-1">
                <span className="font-medium text-white/80">Repos:</span>
                <p className="text-2xl font-bold text-[#6EE7FF]">{profile.public_repos}</p>
              </div>
              <div className="space-y-1">
                <span className="font-medium text-white/80">Followers:</span>
                <p className="text-2xl font-bold text-[#C084FC]">{profile.followers}</p>
              </div>
              <div className="space-y-1">
                <span className="font-medium text-white/80">Following:</span>
                <p className="text-2xl font-bold text-[#F472B6]">{profile.following}</p>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </VisionProLayout>
  )
}
