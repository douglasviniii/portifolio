import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiPhone, HiLocationMarker, HiMailOpen } from 'react-icons/hi'
import { FiGithub } from 'react-icons/fi'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple form submission handling
    console.log('Form submitted:', formState)
    setSubmitted(true)
    setTimeout(() => {
      setFormState({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const contactMethods = [
    {
      icon: HiMail,
      label: 'Email',
      value: 'douglas@example.com',
      href: 'mailto:douglas@example.com',
      color: 'neon-pink',
    },
    {
      icon: FiGithub,
      label: 'GitHub',
      value: '@douglasviniii',
      href: 'https://github.com/douglasviniii',
      color: 'neon-cyan',
    },
    {
      icon: HiPhone,
      label: 'Phone',
      value: 'Available on request',
      href: 'tel:+5511999999999',
      color: 'neon-purple',
    },
    {
      icon: HiLocationMarker,
      label: 'Location',
      value: 'Brazil',
      href: '#',
      color: 'neon-lime',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="contact" className="py-32 relative">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            Let's <span className="neon-text">Connect</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Got a project in mind or just want to chat? Reach out and let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>

            {contactMethods.map((method) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.label === 'GitHub' ? '_blank' : undefined}
                rel={method.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="glass p-6 rounded-lg border border-white/10 hover:border-white/20 block group"
              >
                <div className="flex items-start gap-4">
                  <method.icon className={`text-3xl text-${method.color} group-hover:scale-110 transition-transform`} />
                  <div>
                    <h4 className="text-lg font-bold mb-1 text-white">{method.label}</h4>
                    <p className="text-gray-400 break-all">{method.value}</p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Social Links Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg border border-neon-cyan/20 bg-gradient-to-r from-neon-cyan/5 to-transparent mt-8"
            >
              <p className="text-gray-300 mb-4">Or follow my journey on GitHub</p>
              <motion.a
                href="https://github.com/douglasviniii"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiGithub className="text-lg" />
                Visit GitHub
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8">Send a Message</h3>

            <motion.div
              whileHover={{ y: -2 }}
              className="glass p-4 rounded-lg border border-white/10 focus-within:border-neon-pink/50"
            >
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              />
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="glass p-4 rounded-lg border border-white/10 focus-within:border-neon-pink/50"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              />
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="glass p-4 rounded-lg border border-white/10 focus-within:border-neon-pink/50"
            >
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formState.subject}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              />
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="glass p-4 rounded-lg border border-white/10 focus-within:border-neon-pink/50"
            >
              <textarea
                name="message"
                placeholder="Your message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-transparent outline-none text-white placeholder-gray-500 resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <HiMailOpen className="text-lg" />
              Send Message
            </motion.button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-4 rounded-lg border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-center"
              >
                ✓ Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
