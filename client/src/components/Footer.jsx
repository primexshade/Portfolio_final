import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/** Global footer with gradient divider and social links */
export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:taryan54@gmail.com', label: 'Email' },
  ]

  return (
    <footer className="relative border-t border-white/10 bg-background/60 backdrop-blur-sm">
      {/* Gradient divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="section py-8 space-y-6">
        {/* Main footer content */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-text/60">
            <span>© {year} Built with</span>
            <Heart size={14} className="text-red-400 animate-pulse" fill="currentColor" />
            <span>by Aryan Tiwari</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
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
                className="p-2 rounded-lg bg-white/5 hover:bg-accent/10 hover:text-accent border border-white/10 hover:border-accent/30 transition-all"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-4 text-sm text-text/60">
            <Link to="/projects" className="hover:text-accent transition-colors">
              Work
            </Link>
            <span className="w-px h-4 bg-white/10" />
            <Link to="/about" className="hover:text-accent transition-colors">
              About
            </Link>
            <span className="w-px h-4 bg-white/10" />
            <a href="/resume.pdf" className="hover:text-accent transition-colors">
              Resume
            </a>
          </div>
        </div>

        {/* Tech stack badge */}
        <div className="text-center text-xs text-text/40 pt-4 border-t border-white/5">
          Built with React, Node.js, Express, MongoDB · Deployed on Vercel & Render
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-accent text-white shadow-lg hover:shadow-accent/50 transition-shadow z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  )
}
