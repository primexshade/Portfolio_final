import { motion } from 'framer-motion'
import SpotlightCursor from '../components/SpotlightCursor'
import FloatingIcons from '../components/FloatingIcons'
import DarkVeil from '../components/DarkVeil'

/**
 * VisionProLayout - Shared layout wrapper for all pages
 * Provides Dark Veil animated WebGL background, spotlight cursor, floating icons, and grid overlay
 */
export default function VisionProLayout({ 
  children, 
  className = '',
  darkVeilConfig = {
    hueShift: 0,
    noiseIntensity: 0.02,
    scanlineIntensity: 0.1,
    speed: 0.3,
    scanlineFrequency: 3,
    warpAmount: 0.1,
    resolutionScale: 1
  }
}) {
  return (
    <div className="relative w-full min-h-screen">
      {/* Layer 0: Dark Veil animated WebGL background (z-0, absolute full page) */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="fixed top-0 left-0 w-screen h-screen z-0">
          <DarkVeil 
            hueShift={darkVeilConfig.hueShift} 
            noiseIntensity={darkVeilConfig.noiseIntensity} 
            scanlineIntensity={darkVeilConfig.scanlineIntensity} 
            speed={darkVeilConfig.speed} 
            scanlineFrequency={darkVeilConfig.scanlineFrequency} 
            warpAmount={darkVeilConfig.warpAmount}
            resolutionScale={darkVeilConfig.resolutionScale}
          />
        </div>
      </div>

      {/* Layer 1: Floating tech icons (z-10, fixed positioning) */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <FloatingIcons />
      </div>
      
      {/* Layer 2: AirPods Pro spotlight effect (z-15, fixed positioning) */}
      <div className="fixed inset-0 z-15 pointer-events-none">
        <SpotlightCursor />
      </div>

      {/* Grid pattern overlay (z-3, subtle overlay above DarkVeil, fixed) */}
      <div className="fixed inset-0 z-3 pointer-events-none bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Page content (z-20, relative positioning) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative z-20 w-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  )
}