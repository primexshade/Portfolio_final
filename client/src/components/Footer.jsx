import { Github, Linkedin, Mail, Instagram, ArrowUp, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/** Global footer with gradient divider and social links */
export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/primexshade', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/aryan-tiwari-shade', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/ig__.aryan', label: 'Instagram' },
    { icon: Mail, href: 'mailto:aaryan.tiwari54@gmail.com', label: 'Email' },
  ]

  return (
    <footer className="relative z-30 border-t border-white/10 bg-background/60 backdrop-blur-sm">
      {/* Gradient divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 space-y-1.5 sm:space-y-2">
        {/* Main footer content */}
        <div className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm">
          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 text-text/60 order-3 sm:order-1">
            <span className="whitespace-nowrap">© {year} Built with</span>
            <Heart size={10} className="text-red-400 animate-pulse flex-shrink-0" fill="currentColor" />
            <span className="whitespace-nowrap">by Aryan Tiwari</span>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 order-1 sm:order-2">
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-accent/10 hover:text-accent border border-white/10 hover:border-accent/30 transition-all flex-shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center"
                aria-label={social.label}
              >
                <social.icon size={14} className="sm:w-4 sm:h-4" />
              </motion.a>
            ))}
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-text/60 order-2 sm:order-3">
            <Link to="/projects" className="hover:text-accent transition-colors whitespace-nowrap">
              Work
            </Link>
            <span className="w-px h-3 bg-white/10" />
            <Link to="/about" className="hover:text-accent transition-colors whitespace-nowrap">
              About
            </Link>
            <span className="w-px h-3 bg-white/10" />
            <a href="/Aryan_Tiwari.pdf" className="hover:text-accent transition-colors whitespace-nowrap" download>
              Resume
            </a>
          </div>
        </div>

        {/* Tech stack badge */}
        <div className="text-center text-[10px] sm:text-[11px] text-text/40 pt-2 sm:pt-3 border-t border-white/5">
          Built with Node.js, Express, MongoDB, React, Tailwind · Tools: Git, Firebase
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 p-2 rounded-full bg-accent text-white shadow-lg hover:shadow-accent/50 transition-shadow z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  )
}
