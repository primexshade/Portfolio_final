import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

/** Subtle, performant particle background */
export default function BackgroundParticles() {
  const init = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const options = {
    fullScreen: { enable: false },
    background: { color: 'transparent' },
    fpsLimit: 45,
    detectRetina: true,
    particles: {
      number: { value: 24, density: { enable: true, area: 900 } },
      color: { value: ['#2F81F7'] },
      links: { enable: false },
      move: { enable: true, speed: 0.25, direction: 'none', outModes: { default: 'out' } },
      opacity: { value: 0.25, animation: { enable: false } },
      size: { value: { min: 1, max: 2 } },
      shape: { type: 'circle' },
    },
    interactivity: {
      events: { onHover: { enable: false }, resize: true },
    },
    pauseOnBlur: true,
  }

  return (
    <Particles id="bg-particles" init={init} options={options} className="absolute inset-0 -z-20" />
  )
}
