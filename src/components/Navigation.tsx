import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', section: 'home', id: '#' },
    { label: 'Projects', section: 'projects', id: '#projects' },
    { label: 'About', section: 'about', id: '#about' },
    { label: 'Skills', section: 'skills', id: '#skills' },
    { label: 'Contact', section: 'contact', id: '#contact' },
  ]

  const handleNavClick = (section: string) => {
    setActiveSection(section)
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass border-b border-white/10"
    >
      <div className="container-custom py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold cursor-pointer"
        >
          <span className="neon-text">DV</span>
        </motion.div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.section}
              onClick={() => handleNavClick(item.section)}
              className={`relative font-medium transition-colors ${
                activeSection === item.section ? 'text-neon-pink' : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {item.label}
              {activeSection === item.section && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-neon-pink to-neon-cyan"
                  initial={false}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          onClick={() => handleNavClick('contact')}
          whileHover={{ scale: 1.05 }}
          className="hidden md:block btn-primary"
        >
          Get in Touch
        </motion.a>

        {/* Mobile menu button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto' } : { height: 0 }}
        className="md:hidden overflow-hidden border-t border-white/10"
      >
        <div className="container-custom py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <motion.button
              key={item.section}
              onClick={() => handleNavClick(item.section)}
              className={`text-left py-2 font-medium transition-colors ${
                activeSection === item.section ? 'text-neon-pink' : 'text-gray-300'
              }`}
            >
              {item.label}
            </motion.button>
          ))}
          <motion.a
            href="#contact"
            className="btn-primary text-center mt-2"
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
