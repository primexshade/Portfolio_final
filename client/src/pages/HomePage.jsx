import { motion } from 'framer-motion'

/** Brief intro and animated tech logos */
export default function HomePage() {
  const tech = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Express', color: '#000000' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Tailwind', color: '#06B6D4' },
    { name: 'Vite', color: '#646CFF' },
  ]

  return (
    <section className="section space-y-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 text-center max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center"
        >
          <span className="text-3xl">👋</span>
        </motion.div>
        
        <h2 className="text-4xl font-bold">
          Hi, I'm <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">Aryan Tiwari</span>
        </h2>
        
        <p className="text-lg text-text/70 leading-relaxed">
          Full-stack developer passionate about crafting modern web experiences with a focus on
          performance, accessibility, and developer ergonomics. Specializing in the MERN stack
          and bringing ideas to life through clean, maintainable code.
        </p>
      </motion.div>

      {/* Tech Stack Grid */}
      <div className="space-y-4">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm uppercase tracking-wider text-text/60 font-medium"
        >
          Technologies I Work With
        </motion.h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {tech.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.5 + i * 0.08,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: `0 10px 30px ${t.color}20`,
              }}
              className="card p-6 text-center flex flex-col items-center gap-3 group cursor-default"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{
                  backgroundColor: `${t.color}15`,
                  border: `1px solid ${t.color}30`,
                }}
              >
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: t.color }}
                />
              </div>
              <span className="text-sm font-medium">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-12"
      >
        {[
          { label: 'Years Experience', value: '5+' },
          { label: 'Projects Completed', value: '50+' },
          { label: 'Happy Clients', value: '30+' },
          { label: 'Code Commits', value: '5K+' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center space-y-2"
          >
            <div className="text-3xl font-bold text-accent">{stat.value}</div>
            <div className="text-sm text-text/60">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
