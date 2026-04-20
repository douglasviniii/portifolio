import { motion } from 'framer-motion'
import NavMenu from './NavMenu'

interface LanguageSelectorProps {
  language: 'pt' | 'en'
  setLanguage: (lang: 'pt' | 'en') => void
  colorIndex: number
  setColorIndex: (index: number) => void
}

export default function LanguageSelector({ language, setLanguage, colorIndex, setColorIndex }: LanguageSelectorProps) {
  const colors = [
    'from-gray-600 to-gray-400',      // 0: cinza (padrão)
    'from-pink-500 to-blue-500',      // 1
    'from-purple-500 to-cyan-500',    // 2
    'from-indigo-500 to-green-500',   // 3
    'from-red-500 to-orange-500',     // 4
    'from-yellow-500 to-pink-500',    // 5
    'from-green-500 to-blue-500',     // 6
    'from-cyan-500 to-purple-500',    // 7
    'from-orange-500 to-red-500',     // 8
    'from-blue-500 to-indigo-500',    // 9
    'from-violet-500 to-fuchsia-500', // 10
  ]

  const currentColor = colors[colorIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 right-6 z-50 flex gap-3 items-center"
    >
      {/* Language Buttons - Com underline dinâmico */}
      <div className="flex gap-6 relative">
        <motion.button
          onClick={() => setLanguage('pt')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-1 py-1.5 font-medium transition-all text-xs tracking-wider text-gray-700 hover:text-gray-900 relative"
        >
          PT
          {language === 'pt' && (
            <motion.div
              layoutId="underline"
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${currentColor}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
        <motion.button
          onClick={() => setLanguage('en')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-1 py-1.5 font-medium transition-all text-xs tracking-wider text-gray-700 hover:text-gray-900 relative"
        >
          EN
          {language === 'en' && (
            <motion.div
              layoutId="underline"
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${currentColor}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      </div>

      {/* Menu Button */}
      <NavMenu language={language} colorIndex={colorIndex} setColorIndex={setColorIndex} />
    </motion.div>
  )
}
