import { motion } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi'
import { FiInstagram, FiMessageCircle, FiGithub } from 'react-icons/fi'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 py-12 relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-2">
              <span className="neon-text">Douglas Vini</span>
            </h3>
            <p className="text-gray-400 text-sm">
              Fullstack & Mobile Developer crafting high-performance digital experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Projects', href: '#projects' },
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-neon-pink transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://instagram.com/douglasvini.dev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-gray-400 hover:text-neon-pink transition-colors text-2xl"
                title="Instagram"
              >
                <FiInstagram />
              </motion.a>
              <motion.a
                href="https://github.com/douglasviniii"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-gray-400 hover:text-neon-cyan transition-colors text-2xl"
                title="GitHub"
              >
                <FiGithub />
              </motion.a>
              <motion.a
                href="https://wa.me/5545999190438"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-gray-400 hover:text-neon-purple transition-colors text-2xl"
                title="WhatsApp"
              >
                <FiMessageCircle />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-gray-500">
            © {currentYear} Douglas Vini. All rights reserved. Crafted with passion and coffee.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-neon-pink hover:text-neon-cyan transition-colors"
          >
            Back to top
            <HiArrowUp />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}
