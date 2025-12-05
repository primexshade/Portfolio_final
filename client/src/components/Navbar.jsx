import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../utils/constants'

/** Global navigation bar with glass morphism */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 w-full z-50 h-12 flex items-center justify-between px-6 border-b transition-[background,backdrop-filter,border-color,box-shadow] duration-300 backdrop-blur-xl bg-white/6 dark:bg-white/6 border-white/10 ${
        scrolled ? 'bg-white/8 border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.12)]' : ''
      }`}
    >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group min-w-[120px]" aria-label="Aryan Tiwari – Home">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-[0_0_20px_rgba(47,129,247,0.3)] hover:shadow-[0_0_30px_rgba(47,129,247,0.5)] transition-shadow"
          >
            <span className="text-white font-extrabold text-[10px] leading-none">AT</span>
          </motion.div>
          <span className="font-semibold tracking-tight group-hover:text-accent transition-colors">
            Portfolio
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              className={({ isActive }) =>
                `group relative text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-accent nav-shimmer' : 'text-text/70'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover underline */}
                  <span className="pointer-events-none absolute -bottom-3 left-0 right-0 h-[2px] bg-accent/0 group-hover:bg-accent/30 transition-colors" />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* CTA + Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Hire Me button hidden per request */}
          {/* <Link
            to="/contact"
            className="hidden sm:inline-flex btn-primary text-xs px-4 py-2 shadow-[0_0_12px_rgba(47,129,247,0.25)] hover:shadow-[0_0_18px_rgba(47,129,247,0.4)] transition-shadow"
          >
            Hire Me
          </Link> */}
          {/* Theme toggle removed as dark/light mode is not required */}
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute top-12 left-0 right-0 md:hidden border-t border-white/10 bg-white/6 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <NavLink
                    to={l.path}
                    className={({ isActive }) =>
                      `block py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-accent' : 'text-text/80 hover:text-accent'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
