import { motion } from 'framer-motion'
import AuroraBackground from '../components/AuroraBackground'
import GradientClouds from '../components/GradientClouds'
import SpotlightCursor from '../components/SpotlightCursor'
import FloatingIcons from '../components/FloatingIcons'

/**
 * VisionProLayout - Shared layout wrapper for all pages
 * Provides consistent Aurora background, gradient clouds, spotlight cursor, floating icons, and grid overlay
 */
export default function VisionProLayout({ children, className = '' }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Layer 1: Apple Sonoma-style aurora background (z-[-30]) */}
      <AuroraBackground />

      {/* Layer 2: Gradient clouds (z-0) */}
      <GradientClouds />

      {/* Layer 3: Floating tech icons (z-10) */}
      <FloatingIcons />
      
      {/* AirPods Pro spotlight effect (z-15) */}
      <SpotlightCursor />

      {/* Grid pattern overlay (z-0, dimmed) */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Page content (z-20) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative z-20 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  )
}
