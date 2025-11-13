import { memo } from 'react'

/**
 * AuroraBackground
 * Apple Sonoma-inspired aurora background with smooth gradient blobs.
 * Positioned behind all content with extremely slow, subtle animations.
 */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 -z-30 overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
      {/* Aurora Blob 1 - Aqua Blue */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl animate-aurora-1"
        style={{
          background: 'radial-gradient(circle, #6EE7FF 0%, transparent 70%)',
          top: '-10%',
          left: '-5%',
        }}
      />

      {/* Aurora Blob 2 - Purple */}
      <div
        className="absolute w-[1000px] h-[1000px] rounded-full opacity-15 blur-3xl animate-aurora-2"
        style={{
          background: 'radial-gradient(circle, #C084FC 0%, transparent 70%)',
          top: '10%',
          right: '-10%',
        }}
      />

      {/* Aurora Blob 3 - Pink */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full opacity-18 blur-3xl animate-aurora-3"
        style={{
          background: 'radial-gradient(circle, #F472B6 0%, transparent 70%)',
          bottom: '-15%',
          left: '20%',
        }}
      />

      {/* Aurora Blob 4 - Aqua/Purple Mix */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-12 blur-3xl animate-aurora-4"
        style={{
          background: 'radial-gradient(circle, #6EE7FF 0%, #C084FC 50%, transparent 70%)',
          bottom: '5%',
          right: '15%',
        }}
      />

      {/* Subtle vignette overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/40" />
    </div>
  )
}

export default memo(AuroraBackground)
