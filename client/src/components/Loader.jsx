import { motion } from 'framer-motion'

/** Simple animated loader used during API requests */
export default function Loader() {
  const dot = {
    initial: { y: 0 },
    animate: {
      y: [0, -6, 0],
      transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
    },
  }
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <motion.span className="h-2 w-2 rounded-full bg-accent" variants={dot} initial="initial" animate="animate" />
      <motion.span className="h-2 w-2 rounded-full bg-accent" variants={dot} initial="initial" animate="animate" transition={{ delay: 0.1 }} />
      <motion.span className="h-2 w-2 rounded-full bg-accent" variants={dot} initial="initial" animate="animate" transition={{ delay: 0.2 }} />
    </div>
  )
}
