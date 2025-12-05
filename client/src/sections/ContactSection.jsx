import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Mail, User, MessageSquare, Github, Linkedin, Instagram, Twitter } from 'lucide-react'
import { postContact } from '../utils/api'

/** Contact section for scroll-driven landing page */
export default function ContactSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1])

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState({ name: false, email: false, message: false })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await postContact(form)
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/primexshade', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/aryan-tiwari-shade', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/ig__.aryan', label: 'Instagram' },
    { icon: Mail, href: 'mailto:aaryan.tiwari54@gmail.com', label: 'Email' },
  ]

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, y, scale }}
      className="relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Single Liquid Glass Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -4 }}
          className="relative bg-white/10 backdrop-blur-3xl rounded-[32px] border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.35)] p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 space-y-8 sm:space-y-12 overflow-hidden"
        >
          {/* Soft reflection overlay */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />
          
          {/* Content */}
          <div className="relative space-y-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-3xl opacity-40" />
                <h2 className="relative text-4xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(110,231,255,0.3)]">
                  Let's Connect
                </h2>
              </div>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
                Have a project in mind? I'd love to hear from you
              </p>
            </motion.div>

        {/* Contact Form & Info */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0"
          >
            {/* Info card */}
            <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl space-y-4 sm:space-y-6 hover:bg-white/7 transition-all">
              <div className="space-y-2">
                <h3 className="font-semibold text-base sm:text-lg text-white">Get in Touch</h3>
                <p className="text-xs sm:text-sm text-white/70">
                  I'm always open to discussing new projects and opportunities.
                </p>
              </div>

              <a
                href="mailto:aaryan.tiwari54@gmail.com"
                className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors group min-w-0"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                  <Mail size={18} className="text-accent" />
                </div>
                <span className="text-xs sm:text-sm truncate">aaryan.tiwari54@gmail.com</span>
              </a>

              <div className="pt-4 sm:pt-6 border-t border-white/10">
                <p className="text-xs sm:text-sm text-white/70 mb-3 sm:mb-4">Connect with me</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/30 flex items-center justify-center transition-all hover:text-accent"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick response badge */}
            <div className="p-3 sm:p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 bg-accent/5 border-accent/20">
              <p className="text-xs sm:text-sm text-white/70">
                ⚡ <span className="text-accent font-medium">Quick Response</span> — I typically reply within 24 hours
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 p-4 sm:p-6 md:p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl space-y-4 sm:space-y-6 hover:bg-white/7 transition-all min-w-0"
          >
            {/* Name Field */}
            <div className="relative">
              <User
                size={18}
                className={`absolute left-4 top-4 transition-colors ${
                  focused.name || form.name ? 'text-accent' : 'text-white/40'
                }`}
              />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocused({ ...focused, name: true })}
                onBlur={() => setFocused({ ...focused, name: false })}
                required
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-accent/50 focus:bg-white/10 transition-all text-white text-sm sm:text-base placeholder:text-white/40"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <Mail
                size={18}
                className={`absolute left-4 top-4 transition-colors ${
                  focused.email || form.email ? 'text-accent' : 'text-white/40'
                }`}
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused({ ...focused, email: true })}
                onBlur={() => setFocused({ ...focused, email: false })}
                required
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-accent/50 focus:bg-white/10 transition-all text-white text-sm sm:text-base placeholder:text-white/40"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <MessageSquare
                size={18}
                className={`absolute left-4 top-4 transition-colors ${
                  focused.message || form.message ? 'text-accent' : 'text-white/40'
                }`}
              />
              <textarea
                rows="5"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused({ ...focused, message: true })}
                onBlur={() => setFocused({ ...focused, message: false })}
                required
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-accent/50 focus:bg-white/10 transition-all resize-none text-white text-sm sm:text-base placeholder:text-white/40"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-white/90 text-black text-sm sm:text-base font-semibold rounded-full hover:shadow-[0_0_35px_10px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-medium text-sm">Message sent successfully! 🎉</p>
                    <p className="text-white/60 text-xs mt-1">I'll get back to you shortly.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}