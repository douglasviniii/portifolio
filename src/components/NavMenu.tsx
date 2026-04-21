import { motion } from 'framer-motion'


interface NavMenuProps {
  language: 'pt' | 'en'
  colorIndex: number
  setColorIndex: (index: number) => void
}

const menuItems = {
  pt: [
    { label: 'Projetos', href: '#projects' },
    { label: 'Sobre', href: '#about' },
    { label: 'GitHub', href: 'https://github.com/douglasviniii', isExternal: true },
    { label: 'Contato', href: '#contact' },
  ],
  en: [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'GitHub', href: 'https://github.com/douglasviniii', isExternal: true },
    { label: 'Contact', href: '#contact' },
  ],
}

export default function NavMenu({ language, colorIndex, setColorIndex }: NavMenuProps) {
  const items = menuItems[language]

  const colors = [
    'from-gray-600 to-gray-400',      // 0: cinza (padrão)
    'from-pink-500 to-blue-500',      // 1: pink -> blue
    'from-purple-500 to-cyan-500',    // 2: purple -> cyan
    'from-indigo-500 to-green-500',   // 3: indigo -> green
    'from-red-500 to-orange-500',     // 4: red -> orange
    'from-yellow-500 to-pink-500',    // 5: yellow -> pink
    'from-green-500 to-blue-500',     // 6: green -> blue
    'from-cyan-500 to-purple-500',    // 7: cyan -> purple
    'from-orange-500 to-red-500',     // 8: orange -> red
    'from-blue-500 to-indigo-500',    // 9: blue -> indigo
    'from-violet-500 to-fuchsia-500', // 10: violet -> fuchsia
  ]

  const currentColor = colors[colorIndex]

  const handleMenuClick = () => {
    setColorIndex((colorIndex + 1) % colors.length)
  }

  // 6 dots positions
  const dots = [
    { x: 0, y: -8 },      // top
    { x: 6.9, y: -4 },    // top-right
    { x: 6.9, y: 4 },     // bottom-right
    { x: 0, y: 8 },       // bottom
    { x: -6.9, y: 4 },    // bottom-left
    { x: -6.9, y: -4 },   // top-left
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Menu Button - 6 dots */}
      <motion.button
        onClick={handleMenuClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 rounded-lg transition-all relative w-10 h-10 flex items-center justify-center"
      >
        {/* 6 Dots */}
        <div className="relative w-full h-full flex items-center justify-center">
          {dots.map((dot, i) => (
            <motion.div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r ${currentColor}`}
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-3px',
                marginTop: '-3px',
              }}
              animate={{
                x: dot.x,
                y: dot.y,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.button>

      {/* Dropdown Menu - REMOVIDO */}
    </motion.div>
  )
}
