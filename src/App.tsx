import { useState, useRef } from 'react'
import ParticleBackground from './components/ParticleBackground'
import LanguageSelector from './components/LanguageSelector'
import Hero from './components/Hero'
import Projects from './components/Projects'

function App() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt')
  const [isHeroExpanded, setIsHeroExpanded] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const openAboutMeRef = useRef<(() => void) | null>(null)

  return (
    <div className="min-h-screen overflow-x-hidden">
      {!isHeroExpanded && <LanguageSelector language={language} setLanguage={setLanguage} colorIndex={colorIndex} setColorIndex={setColorIndex} />}
      
      <main className="relative z-10">
        <ParticleBackground colorIndex={colorIndex} />
        <Hero language={language} setActiveSection={setActiveSection} onExpandedChange={setIsHeroExpanded} colorIndex={colorIndex} registerOpenAboutMe={(fn) => { openAboutMeRef.current = fn }} />
      </main>

      {/* Projects Modal */}
      {activeSection === 'projects' && (
        <Projects
          language={language}
          colorIndex={colorIndex}
          onClose={() => setActiveSection(null)}
      onAboutMe={() => { setActiveSection(null); setTimeout(() => openAboutMeRef.current?.(), 100) }}
        />
      )}
    </div>
  )
}

export default App
