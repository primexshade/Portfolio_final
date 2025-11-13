import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Send, CheckCircle, Mail, User, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react'
import { postContact } from '../utils/api'
import VisionProLayout from '../layouts/VisionProLayout'

/** Contact form with floating labels and success animation */
export default function ContactPage() {
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
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
      
      // Confetti effect
      setTimeout(() => setSuccess(false), 5000)
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
  ]

  return (
    <VisionProLayout>
      <section className="py-20 px-6 sm:px-8 md:px-12 lg:px-16 min-h-screen relative z-20">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header with parallax */}
          <motion.div
            ref={headerRef}
            style={{ y: headerY, opacity: headerOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center"
          >
            <div className="relative inline-block">
              {/* Soft glow behind text */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#6EE7FF]/20 via-[#C084FC]/20 to-[#F472B6]/20 blur-3xl opacity-60" 
                style={{ filter: 'blur(80px)' }}
              />
              
              <h2 
                className="relative text-[60px] sm:text-[80px] md:text-[110px] font-semibold leading-none bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent"
                style={{ textShadow: '0 0 80px rgba(110, 231, 255, 0.3)' }}
              >
                Let's Connect
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </motion.div>

          {/* Main Liquid Glass Panel */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="relative bg-white/10 backdrop-blur-3xl border border-white/15 rounded-[32px] shadow-[0_40px_120px_rgba(0,0,0,0.35)] overflow-hidden"
          >
            {/* Soft reflection overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 via-white/0 to-transparent" />
            
            {/* Content */}
            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-5 gap-8 md:gap-10">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 space-y-6 sm:space-y-8"
                >
                  {/* Info card */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-white/10 shadow-xl space-y-6 sm:space-y-8">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-xl sm:text-2xl text-white">Get in Touch</h3>
                      <p className="text-sm sm:text-base text-white/70">
                        I'm always open to discussing new projects, creative ideas, or opportunities.
                      </p>
                    </div>

                    <div className="space-y-5">
                      <a
                        href="mailto:hello@example.com"
                        className="flex items-center gap-4 text-white/80 hover:text-[#6EE7FF] transition-colors group"
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <Mail size={20} className="sm:w-6 sm:h-6 text-[#6EE7FF]" />
                        </div>
                        <span className="text-sm sm:text-base">hello@example.com</span>
                      </a>
                    </div>

                    <div className="pt-6 sm:pt-8 border-t border-white/10">
                      <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-5">Connect with me</p>
                      <div className="flex gap-3 sm:gap-4">
                        {socialLinks.map((social) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.1, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/30 flex items-center justify-center transition-all hover:text-[#6EE7FF] shadow-lg"
                            aria-label={social.label}
                          >
                            <social.icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick response badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-xl rounded-[24px] p-5 sm:p-6 border border-[#6EE7FF]/20 shadow-[0_0_30px_rgba(110,231,255,0.1)]"
                  >
                    <p className="text-sm sm:text-base text-white/80">
                      ⚡ <span className="text-[#6EE7FF] font-medium">Quick Response</span> — I typically reply within 24 hours
                    </p>
                  </motion.div>
                </motion.div>

                {/* Form */}
                <motion.form
                  onSubmit={submit}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-3 bg-white/5 backdrop-blur-xl rounded-[24px] p-8 sm:p-10 border border-white/10 shadow-xl space-y-6 sm:space-y-8"
                >
                  {/* Name Field */}
                  <div className="relative">
                    <User
                      size={20}
                      className={`absolute left-4 sm:left-5 top-4 sm:top-5 transition-colors ${
                        focused.name || form.name ? 'text-[#6EE7FF]' : 'text-white/40'
                      }`}
                    />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused({ ...focused, name: true })}
                      onBlur={() => setFocused({ ...focused, name: false })}
                      required
                      className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-3.5 sm:py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm sm:text-base shadow-lg"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <Mail
                      size={20}
                      className={`absolute left-4 sm:left-5 top-4 sm:top-5 transition-colors ${
                        focused.email || form.email ? 'text-[#6EE7FF]' : 'text-white/40'
                      }`}
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused({ ...focused, email: true })}
                      onBlur={() => setFocused({ ...focused, email: false })}
                      required
                      className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-3.5 sm:py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm sm:text-base shadow-lg"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <MessageSquare
                      size={20}
                      className={`absolute left-4 sm:left-5 top-4 sm:top-5 transition-colors ${
                        focused.message || form.message ? 'text-[#6EE7FF]' : 'text-white/40'
                      }`}
                    />
                    <textarea
                      rows="6"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused({ ...focused, message: true })}
                      onBlur={() => setFocused({ ...focused, message: false })}
                      required
                      className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-3.5 sm:py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none text-sm sm:text-base shadow-lg"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3.5 sm:py-4 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(110,231,255,0.2)] hover:shadow-[0_0_40px_rgba(110,231,255,0.4)] hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="sm:w-5 sm:h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  {/* Success Message */}
                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 sm:p-5 bg-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl flex items-start sm:items-center gap-3 sm:gap-4"
                      >
                        <CheckCircle size={22} className="sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <div>
                          <p className="text-green-400 font-medium text-sm sm:text-base">Message sent successfully! 🎉</p>
                          <p className="text-white/60 text-xs sm:text-sm mt-1">I'll get back to you shortly.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 sm:p-5 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl"
                      >
                        <p className="text-red-400 text-sm sm:text-base">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </VisionProLayout>
  )
}
