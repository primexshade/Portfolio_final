import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Send, CheckCircle, Mail, User, MessageSquare, Github, Linkedin, Instagram, Twitter } from 'lucide-react'
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
    { icon: Github, href: 'https://github.com/primexshade', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/aryan-tiwari-shade', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/ig__.aryan', label: 'Instagram' },
    { icon: Mail, href: 'mailto:aaryan.tiwari54@gmail.com', label: 'Email' },
  ]

  return (
    <VisionProLayout
      darkVeilConfig={{
        hueShift: 0,
        noiseIntensity: 0.01,
        scanlineIntensity: 0.08,
        speed: 0.15,
        scanlineFrequency: 2,
        warpAmount: 0.05,
        resolutionScale: 0.5
      }}
    >
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 min-h-screen relative z-20">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
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
            <div className="relative p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="grid lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 min-w-0 w-full"
                >
                  {/* Info card */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/10 shadow-xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                    <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                      <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-white">Get in Touch</h3>
                      <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                        I'm always open to discussing new projects, creative ideas, or opportunities.
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <a
                        href="mailto:aaryan.tiwari54@gmail.com"
                        className="flex items-center gap-2 sm:gap-3 md:gap-4 text-white/80 hover:text-[#6EE7FF] transition-colors group min-w-0"
                      >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                          <Mail size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#6EE7FF]" />
                        </div>
                        <span className="text-xs sm:text-sm md:text-base truncate">aaryan.tiwari54@gmail.com</span>
                      </a>
                    </div>

                    <div className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 border-t border-white/10">
                      <p className="text-xs sm:text-sm md:text-base text-white/70 mb-2 sm:mb-3 md:mb-4">Connect with me</p>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {socialLinks.map((social) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.1, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/30 flex items-center justify-center transition-all hover:text-[#6EE7FF] shadow-lg flex-shrink-0"
                            aria-label={social.label}
                          >
                            <social.icon size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
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
                  className="lg:col-span-3 bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/10 shadow-xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 min-w-0 w-full"
                >
                  {/* Name Field */}
                  <div className="relative">
                    <User
                      size={16}
                      className={`absolute left-2.5 sm:left-3 md:left-4 top-2.5 sm:top-3 md:top-4 transition-colors text-sm sm:text-base ${
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
                      className="w-full pl-8 sm:pl-9 md:pl-10 pr-2.5 sm:pr-3 md:pr-4 py-2.5 sm:py-3 md:py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl md:rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 transition-all text-xs sm:text-sm md:text-base shadow-lg min-h-[44px]"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <Mail
                      size={16}
                      className={`absolute left-2.5 sm:left-3 md:left-4 top-2.5 sm:top-3 md:top-4 transition-colors text-sm sm:text-base ${
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
                      className="w-full pl-8 sm:pl-9 md:pl-10 pr-2.5 sm:pr-3 md:pr-4 py-2.5 sm:py-3 md:py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl md:rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 transition-all text-xs sm:text-sm md:text-base shadow-lg min-h-[44px]"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <MessageSquare
                      size={16}
                      className={`absolute left-2.5 sm:left-3 md:left-4 top-2.5 sm:top-3 md:top-4 transition-colors text-sm sm:text-base ${
                        focused.message || form.message ? 'text-[#6EE7FF]' : 'text-white/40'
                      }`}
                    />
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused({ ...focused, message: true })}
                      onBlur={() => setFocused({ ...focused, message: false })}
                      required
                      className="w-full pl-8 sm:pl-9 md:pl-10 pr-2.5 sm:pr-3 md:pr-4 py-2.5 sm:py-3 md:py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl md:rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none text-xs sm:text-sm md:text-base shadow-lg min-h-[100px] sm:min-h-[120px]"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-xl md:rounded-2xl py-2.5 sm:py-3 md:py-3.5 flex items-center justify-center gap-2 sm:gap-3 shadow-[0_0_30px_rgba(110,231,255,0.2)] hover:shadow-[0_0_40px_rgba(110,231,255,0.4)] hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base font-medium min-h-[44px]"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span className="text-xs sm:text-sm">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="whitespace-nowrap">Send Message</span>
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
                        className="p-2.5 sm:p-3 md:p-4 bg-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-lg sm:rounded-xl md:rounded-2xl flex items-start gap-2 sm:gap-3 md:gap-4"
                      >
                        <CheckCircle size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="text-green-400 font-medium text-xs sm:text-sm md:text-base leading-tight">Message sent successfully! 🎉</p>
                          <p className="text-white/60 text-xs leading-tight mt-0.5 sm:mt-1">I'll get back to you shortly.</p>
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
                        className="p-2.5 sm:p-3 md:p-4 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-lg sm:rounded-xl md:rounded-2xl"
                      >
                        <p className="text-red-400 text-xs sm:text-sm md:text-base leading-tight">{error}</p>
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
