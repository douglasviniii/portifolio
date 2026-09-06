import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface HeroProps {
  setActiveSection: (section: string) => void
  language: 'pt' | 'en'
  onExpandedChange: (expanded: boolean) => void
  colorIndex?: number
  registerOpenAboutMe?: (fn: () => void) => void
}

const content = {
  pt: {
    title: 'Douglas Vini',
    subtitle: 'Fullstack, Mobile & IA',
    description: 'Java, Kotlin e desenvolvimento web com IA aplicada a produtos reais.',
    cta1: 'Ver Trabalhos',
    cta2: 'GitHub',
    buttonProjects: 'Projetos',
    aboutTitle: 'Sobre Mim',
    education: 'Atualmente, estou cursando Análise e Desenvolvimento de Sistemas (ADS).',
    skillsTitle: 'Tecnologias & Práticas',
    practices: ['Governança de IA', 'Orquestração de agentes', 'Vibe coding', 'Automação'],
    about: 'Sou Edvandro Douglas, conhecido como Douglas Vini. Comecei a estudar programação aos dezesseis anos e desenvolvo aplicações mobile, plataformas web e backends. Minha experiência inclui Java, Kotlin, React Native, React, Next.js e TypeScript, conectando interfaces, APIs e dados para transformar ideias em produtos.\n\nTenho experiência prática colocando agentes de IA para trabalhar no desenvolvimento: organizo tarefas, forneço contexto do projeto e acompanho implementação, testes e correções. Uso vibe coding para explorar ideias e acelerar a construção, com revisão técnica e responsabilidade humana sobre o resultado.\n\nPara mim, governança de IA significa definir limites de atuação, proteger credenciais e dados, documentar decisões e validar mudanças antes da publicação. Otimizar o uso de IA no trabalho é escolher o contexto e as ferramentas certos, reduzir tarefas repetitivas e retrabalho e equilibrar velocidade, custo e qualidade.\n\nSou o desenvolvedor da [[Flipple Arcade]], um app para a comunidade gamer com lives, chat, comunidades, gamificação e multiplayer de Minecraft em beta, integrado à plataforma web. É onde aplico minha experiência em desenvolvimento mobile, backend e recursos em tempo real.\n\nTambém desenvolvi o AgiNotas, um emissor de notas fiscais eletrônicas pronto, com automação para emitir notas pelo WhatsApp. O projeto conecta desenvolvimento web, integrações de API e automação de processos para simplificar a rotina de emissão.\n\nTenho ainda projetos de mobilidade, gestão e comércio. Parte dos repositórios é privada, mas posso apresentar o trabalho em uma reunião. Vamos conversar sobre o próximo produto que você quer construir?',
  },
  en: {
    title: 'Douglas Vini',
    subtitle: 'Fullstack, Mobile & AI',
    description: 'Java, Kotlin and web development with AI applied to real products.',
    cta1: 'View My Work',
    cta2: 'GitHub',
    buttonProjects: 'Projects',
    aboutTitle: 'About Me',
    education: 'I am currently studying Systems Analysis and Development (ADS).',
    skillsTitle: 'Technologies & Practices',
    practices: ['AI governance', 'Agent orchestration', 'Vibe coding', 'Automation'],
    about: 'I am Edvandro Douglas, known as Douglas Vini. I started learning programming at sixteen and build mobile apps, web platforms and backends. My experience includes Java, Kotlin, React Native, React, Next.js and TypeScript, connecting interfaces, APIs and data to turn ideas into products.\n\nI have hands-on experience putting AI agents to work in software development: breaking down tasks, providing project context and overseeing implementation, testing and fixes. I use vibe coding to explore ideas and accelerate development, with technical review and human accountability for the outcome.\n\nTo me, AI governance means setting boundaries, protecting credentials and data, documenting decisions and validating changes before release. Optimizing AI at work means choosing the right context and tools, reducing repetitive tasks and rework, and balancing speed, cost and quality.\n\nI develop [[Flipple Arcade]], an app for the gaming community with live streaming, chat, communities, gamification and Minecraft multiplayer in beta, integrated with a web platform. It brings together my experience in mobile development, backends and real-time features.\n\nI also built AgiNotas, a ready-to-use electronic invoicing system with automation to issue invoices through WhatsApp. The project combines web development, API integrations and process automation to simplify invoicing workflows.\n\nMy other projects cover mobility, management and commerce. Some repositories are private, but I can walk you through the work in a meeting. Let’s talk about the next product you want to build.',
  },
}

export default function Hero({ setActiveSection, language, onExpandedChange, colorIndex = 0, registerOpenAboutMe }: HeroProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [section, setSection] = useState(0) // 0 = nome/foto, 1 = about/foto1
  const [autoCloseTimer, setAutoCloseTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [expandTimer, setExpandTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [navTimer, setNavTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [isNameHovered, setIsNameHovered] = useState(false)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
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
    if (registerOpenAboutMe) {
      registerOpenAboutMe(() => {
        setIsExpanded(true)
        setSection(0)
      })
    }
  }, [registerOpenAboutMe])

  useEffect(() => {
    const el = expandedRef.current
    if (!el || !isExpanded) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 30) {
        if (sectionRef.current === 0) setSection(1)
        if (autoCloseTimer) clearTimeout(autoCloseTimer)
      }
      if (e.deltaY < -30) {
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
    // Não fecha automaticamente - só fecha ao clicar em "Fechar"
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
            onTouchStart={(e) => {
              setTouchStartY(e.touches[0].clientY)
              setTouchStartX(e.touches[0].clientX)
            }}
            onTouchMove={(e) => {
              if (touchStartY === null) return
              const deltaY = touchStartY - e.touches[0].clientY
              const deltaX = (touchStartX ?? 0) - e.touches[0].clientX
              if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < -50) {
                setTouchStartY(null)
                setIsExpanded(true)
                setSection(1)
              } else if (deltaY > 50) {
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
                  onClick={() => { setIsExpanded(true); setSection(0) }}
                  className="mb-6 cursor-pointer group flex items-center justify-center gap-4">
                  <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight transition-all text-gray-900"
                  >
                    {renderWaveText(texts.title)}
                  </motion.h1>
                  <motion.span
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    className={`text-3xl md:text-5xl font-light select-none ${colorIndex === 0 ? 'text-gray-400' : `bg-gradient-to-r ${currentColor} bg-clip-text text-transparent`}`}
                  >
                    →
                  </motion.span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={colorIndex === 0 ? "text-2xl md:text-4xl font-bold text-gray-600 mb-8" : `text-2xl md:text-4xl font-bold bg-gradient-to-r ${currentColor} bg-clip-text text-transparent mb-8`}
                >
                  {texts.subtitle}
                </motion.h2>

                <p className="mx-auto max-w-xl text-sm md:text-base text-gray-600 mb-8">
                  {texts.description}
                </p>

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
                            href="https://wa.me/554599190438"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, color: '#000' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="text-gray-700 text-sm hover:text-gray-900 transition-colors"
                          >
                            Whatsapp
                          </motion.a>
                          <motion.a
                            href="https://instagram.com/douglasvini.dev"
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

                    {/* Botão navegação - ir para About */}
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={handleMoveDown}
                        className="flex items-center gap-2 text-gray-600 text-sm font-medium border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition-colors"
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

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 md:mb-8"
                        >
                          <p className="mb-3 font-semibold">{texts.education}</p>
                          {texts.about.split('\n\n').map((paragraph, i) => {
                            if (paragraph.includes('[[Flipple Arcade]]')) {
                              const parts = paragraph.split('[[Flipple Arcade]]')
                              return (
                                <p key={i} className="mb-3">
                                  {parts[0]}
                                  <a
                                    href="https://flipplearcade.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-purple-600 hover:text-purple-800 underline transition-colors"
                                  >
                                    Flipple Arcade
                                  </a>
                                  {parts[1]}
                                </p>
                              )
                            }
                            return <p key={i} className="mb-3">{paragraph}</p>
                          })}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="space-y-3"
                        >
                          <p className="text-sm text-gray-600 font-semibold">{texts.skillsTitle}</p>
                          <div className="flex flex-wrap gap-2">
                            {['Java', 'Kotlin', 'JavaScript', 'TypeScript', 'React', 'React Native', 'Next.js', 'Node.js', 'PostgreSQL', 'NestJS', ...texts.practices].map((tech, i) => (
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
                            src="/foto/foto2.png" 
                            alt="Douglas Vini" 
                            className="w-full h-auto block object-cover"
                          />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Botão navegação - voltar para início */}
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={handleMoveUp}
                        className="flex items-center gap-2 text-gray-600 text-sm font-medium border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition-colors"
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
