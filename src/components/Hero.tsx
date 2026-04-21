import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface HeroProps {
  setActiveSection: (section: string) => void
  language: 'pt' | 'en'
  onExpandedChange: (expanded: boolean) => void
  colorIndex?: number
}

const content = {
  pt: {
    title: 'Douglas Vini',
    subtitle: 'Fullstack & Mobile',
    description: 'Apaixonado por criar, desenvolver e trabalho com excelência',
    cta1: 'Ver Trabalhos',
    cta2: 'GitHub',
    buttonProjects: 'Projetos',
    aboutTitle: 'Sobre Mim',
    about: 'Olá, me chamo Evandro Douglas, conhecido como Douglas Vini. Tenho 25 anos e conhecimento de programação desde os meus 16 anos de idade. Tenho experiência com as linguagens citadas acima e estou pronto para te conhecer através dos meus projetos. Se algum projeto te chamou atenção, se você quer algo sob medida ou tem interesse em uma proposta empresarial, me chame em uma das minhas redes sociais!',
  },
  en: {
    title: 'Douglas Vini',
    subtitle: 'Fullstack & Mobile',
    description: 'Building high-performance apps and scalable backends',
    cta1: 'View My Work',
    cta2: 'GitHub',
    buttonProjects: 'Projects',
    aboutTitle: 'About Me',
    about: `Hi, my name is Evandro Douglas, known as Douglas Vini. I'm 25 years old with programming knowledge since I was 16. I have experience with the languages listed above and I'm ready to meet you through my projects. If any project caught your attention, if you want something custom-made or are interested in a business proposal, reach out to me on one of my social networks!`,
  },
}

export default function Hero({ setActiveSection, language, onExpandedChange, colorIndex = 0 }: HeroProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [section, setSection] = useState(0) // 0 = nome/foto, 1 = about/foto1
  const [autoCloseTimer, setAutoCloseTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [expandTimer, setExpandTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [navTimer, setNavTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [isNameHovered, setIsNameHovered] = useState(false)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const expandedRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef(section)
  const texts = content[language]

  useEffect(() => { sectionRef.current = section }, [section])

  const colors = [
    'from-gray-600 to-gray-400',      
    'from-pink-500 to-blue-500',      
    'from-purple-500 to-cyan-500',    
    'from-indigo-500 to-green-500',   
    'from-red-500 to-orange-500',     
    'from-yellow-500 to-pink-500',    
    'from-green-500 to-blue-500',     
    'from-cyan-500 to-purple-500',    
    'from-orange-500 to-red-500',     
    'from-blue-500 to-indigo-500',    
    'from-violet-500 to-fuchsia-500', 
  ]

  const currentColor = colors[colorIndex]

  const handleNameMouseEnter = () => {
    setIsNameHovered(true)
    if (expandTimer) clearTimeout(expandTimer)
    const timer = setTimeout(() => {
      setIsExpanded(true)
    }, 800)
    setExpandTimer(timer)
  }

  const handleNameMouseLeave = () => {
    setIsNameHovered(false)
    if (expandTimer) clearTimeout(expandTimer)
    setExpandTimer(null)
  }

  useEffect(() => {
    onExpandedChange(isExpanded)
  }, [isExpanded, onExpandedChange])

  useEffect(() => {
    const el = expandedRef.current
    if (!el || !isExpanded) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 100) {
        if (sectionRef.current === 0) setSection(1)
        if (autoCloseTimer) clearTimeout(autoCloseTimer)
      }
      if (e.deltaY < -100) {
        if (sectionRef.current === 1) setSection(0)
        if (autoCloseTimer) clearTimeout(autoCloseTimer)
      }
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [isExpanded])

  const handleMouseEnter = () => {
    setIsExpanded(true)
    if (autoCloseTimer) clearTimeout(autoCloseTimer)
  }

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsExpanded(false)
      setSection(0)
    }, 3000)
    setAutoCloseTimer(timer)
  }

  const handleMoveDown = () => {
    if (section === 0) {
      setSection(1)
    }
    if (autoCloseTimer) clearTimeout(autoCloseTimer)
    if (navTimer) clearTimeout(navTimer)
  }

  const handleMouseOnBottom = () => {
    if (navTimer) clearTimeout(navTimer)
    const timer = setTimeout(() => {
      handleMoveDown()
    }, 2000)
    setNavTimer(timer)
  }

  const handleMouseOffBottom = () => {
    if (navTimer) clearTimeout(navTimer)
    setNavTimer(null)
  }

  const handleMouseOnTop = () => {
    if (navTimer) clearTimeout(navTimer)
    const timer = setTimeout(() => {
      handleMoveUp()
    }, 2000)
    setNavTimer(timer)
  }

  const handleMouseOffTop = () => {
    if (navTimer) clearTimeout(navTimer)
    setNavTimer(null)
  }

  const handleMoveUp = () => {
    if (section === 1) {
      setSection(0)
    }
    if (navTimer) clearTimeout(navTimer)
  }

  const handleClose = () => {
    setIsExpanded(false)
    setSection(0)
    if (autoCloseTimer) clearTimeout(autoCloseTimer)
  }

  const renderWaveText = (text: string) => {
    const nameColor = colorIndex === 0 ? 'text-gray-900' : `bg-gradient-to-r ${currentColor} bg-clip-text text-transparent`
    
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ y: 0, scale: 1 }}
        animate={isNameHovered ? {
          y: [0, -15, 0],
          scale: [1, 1.3, 1],
        } : { y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
          type: 'spring',
          stiffness: 200,
        }}
        className={`inline-block ${nameColor}`}
        style={{ display: 'inline-block' }}
      >
        {char}
      </motion.span>
    ))
  }

  return (
    <section className="min-h-screen pt-20 pb-20 flex items-center justify-center overflow-hidden">
      {/* Close button */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-6 z-50"
          >
            <motion.button
              onClick={handleClose}
              className="text-gray-700 hover:text-gray-900 transition-colors font-normal text-lg"
            >
              ← Fechar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // ESTADO NORMAL
          <motion.div
            key="normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
            onTouchStart={(e) => setTouchStartY(e.touches[0].clientY)}
            onTouchMove={(e) => {
              if (touchStartY === null) return
              const delta = touchStartY - e.touches[0].clientY
              if (delta > 50) {
                setTouchStartY(null)
                setIsExpanded(true)
                setSection(1)
              }
            }}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.div 
                  onMouseEnter={handleNameMouseEnter}
                  onMouseLeave={handleNameMouseLeave}
                  onClick={() => setIsExpanded(true)}
                  className="mb-6 cursor-pointer group">
                  <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight transition-all text-gray-900"
                  >
                    {renderWaveText(texts.title)}
                  </motion.h1>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={colorIndex === 0 ? "text-2xl md:text-4xl font-bold text-gray-600 mb-8" : `text-2xl md:text-4xl font-bold bg-gradient-to-r ${currentColor} bg-clip-text text-transparent mb-8`}
                >
                  {texts.subtitle}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center"
                >
                  <motion.button
                    onClick={() => setActiveSection('projects')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={colorIndex === 0 ? "px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors" : `px-8 py-3 bg-gradient-to-r ${currentColor} text-white font-semibold rounded-lg hover:scale-110 transition-all`}
                  >
                    {texts.buttonProjects}
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // ESTADO EXPANDIDO - Carousel de seções
          <motion.div
            ref={expandedRef}
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-start md:items-center justify-center p-4"
            onMouseLeave={handleMouseLeave}
            onTouchStart={(e) => setTouchStartY(e.touches[0].clientY)}
            onTouchMove={(e) => {
              if (touchStartY === null) return
              const delta = touchStartY - e.touches[0].clientY
              if (delta > 50) { handleMoveDown(); setTouchStartY(null) }
              else if (delta < -50) { handleMoveUp(); setTouchStartY(null) }
            }}
          >
            <div className="w-full">
              <AnimatePresence mode="wait">
                {section === 0 && (
                  // SEÇÃO 1: Nome + Foto
                  <motion.div
                    key="section-0"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 60, damping: 20 }}
                    className="max-w-7xl mx-auto w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="order-2 md:order-1 text-center md:text-left"
                      >
                        <motion.h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-2">
                          <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                            Douglas Vini
                          </span>
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className={colorIndex === 0 ? "text-sm md:text-base text-gray-600 mb-8" : `text-sm md:text-base bg-gradient-to-r ${currentColor} bg-clip-text text-transparent mb-8`}
                        >
                          {texts.subtitle}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="flex justify-center md:justify-start gap-6"
                        >
                          <motion.a
                            href="mailto:douglas@delvind.com"
                            whileHover={{ scale: 1.05, color: '#000' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="text-gray-700 text-sm hover:text-gray-900 transition-colors"
                          >
                            Email
                          </motion.a>
                          <motion.a
                            href="https://wa.me/5511999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, color: '#000' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="text-gray-700 text-sm hover:text-gray-900 transition-colors"
                          >
                            Whatsapp
                          </motion.a>
                          <motion.a
                            href="https://instagram.com/douglasviniii"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, color: '#000' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="text-gray-700 text-sm hover:text-gray-900 transition-colors"
                          >
                            Instagram
                          </motion.a>
                          <motion.a
                            href="https://github.com/douglasviniii"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, color: '#000' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="text-gray-700 text-sm hover:text-gray-900 transition-colors"
                          >
                            Github
                          </motion.a>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="order-1 md:order-2 flex justify-center md:justify-end"
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                          className="rounded-2xl overflow-hidden shadow-2xl relative inline-block"
                        >
                          <img 
                            src="/foto/foto1.jpeg" 
                            alt="Foto1" 
                            className="max-h-52 md:max-h-96 w-auto h-auto block"
                          />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Botão navegação mobile - ir para About */}
                    <div className="flex justify-center mt-6 md:hidden">
                      <button
                        onClick={handleMoveDown}
                        className="flex items-center gap-2 text-gray-600 text-sm font-medium border border-gray-300 rounded-full px-4 py-2"
                      >
                        Sobre Mim <span>↓</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {section === 1 && (
                  // SEÇÃO 2: About + Foto1
                  <motion.div
                    key="section-1"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 60, damping: 20 }}
                    className="max-w-7xl mx-auto w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="order-2 md:order-1"
                      >
                        <motion.h2 className="text-2xl md:text-4xl font-semibold tracking-tighter mb-4 md:mb-6">
                          <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                            {texts.aboutTitle}
                          </span>
                        </motion.h2>

                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 md:mb-8"
                        >
                          {texts.about}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="space-y-3"
                        >
                          <p className="text-sm text-gray-600 font-semibold">Linguagens & Tecnologias:</p>
                          <div className="flex flex-wrap gap-2">
                            {['JavaScript', 'TypeScript', 'React', 'React Native', 'Next.js', 'Node.js', 'Firebase', 'NestJS'].map((tech, i) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, y: 5, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.05, type: 'spring', stiffness: 100 }}
                                whileHover={{ scale: 1.1, backgroundColor: '#e5e7eb' }}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full transition-all"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="order-1 md:order-2"
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                          className="w-full rounded-2xl overflow-hidden shadow-xl relative"
                        >
                          <img 
                            src="/foto/foto.jpeg" 
                            alt="Douglas Vini" 
                            className="w-full h-auto block object-cover"
                          />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Botão navegação mobile - voltar para início */}
                    <div className="flex justify-center mt-6 md:hidden">
                      <button
                        onClick={handleMoveUp}
                        className="flex items-center gap-2 text-gray-600 text-sm font-medium border border-gray-300 rounded-full px-4 py-2"
                      >
                        <span>↑</span> Voltar
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
