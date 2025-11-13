import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

/** Animated button to switch between light/dark themes */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-14 h-8 rounded-full bg-white/10 border border-white/10 hover:border-accent/30 transition-colors p-1"
    >
      {/* Track background */}
      <motion.div
        animate={{
          backgroundColor: isDark ? 'rgba(47, 129, 247, 0.2)' : 'rgba(234, 179, 8, 0.2)',
        }}
        className="absolute inset-0 rounded-full"
      />

      {/* Sliding toggle */}
      <motion.div
        animate={{
          x: isDark ? 0 : 24,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="relative w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-lg"
      >
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 180,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon size={14} className="text-white" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? -180 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Sun size={14} className="text-white" />
        </motion.div>
      </motion.div>
    </motion.button>
  )
}
