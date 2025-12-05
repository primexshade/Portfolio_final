import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../utils/constants'

/** Global navigation bar with glass morphism */
export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const [isOpen, setIsOpen] = useState(mobileMenuOpen)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(isOpen)
  }, [isOpen, setMobileMenuOpen])

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
      className={`fixed top-0 w-full z-50 h-14 sm:h-16 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 border-b transition-[background,backdrop-filter,border-color,box-shadow] duration-300 backdrop-blur-xl bg-white/6 dark:bg-white/6 border-white/10 ${
        scrolled ? 'bg-white/8 border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.12)]' : ''
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center gap-4 sm:gap-6 md:gap-8 relative">
        {/* Logo - positioned absolutely on left */}
        <div className="absolute left-0">
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0" aria-label="Aryan Tiwari – Home">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.05 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-[0_0_20px_rgba(47,129,247,0.3)] hover:shadow-[0_0_30px_rgba(47,129,247,0.5)] transition-shadow"
            >
              <span className="text-white font-extrabold text-[9px] sm:text-[10px] leading-none">AT</span>
            </motion.div>
            <span className="font-semibold text-sm sm:text-base tracking-tight group-hover:text-accent transition-colors truncate">
              Portfolio
            </span>
          </Link>
        </div>

        {/* Desktop Nav - centered */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              className={({ isActive }) =>
                `group relative text-xs sm:text-sm md:text-sm font-medium transition-colors hover:text-accent ${
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

        {/* Mobile menu button - positioned absolutely on right */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-0 md:hidden p-2 sm:p-2.5 rounded-lg hover:bg-white/10 transition-colors active:scale-95"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu - Vision OS Theme */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Opaque overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Centered mobile menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 flex items-center justify-center z-50 md:hidden px-6"
            >
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-xs">
                <div className="p-5 flex flex-col gap-1">
                  {NAV_LINKS.map((l, i) => (
                    <motion.div
                      key={l.path}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                    >
                      <NavLink
                        to={l.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap text-center ${
                            isActive 
                              ? 'text-white bg-gradient-to-r from-accent/80 to-accent/60 shadow-lg shadow-accent/20' 
                              : 'text-text/90 hover:text-accent hover:bg-white/10'
                          }`
                        }
                      >
                        {l.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
