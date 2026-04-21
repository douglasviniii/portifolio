import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface ParticleBackgroundProps {
  colorIndex?: number
  absolute?: boolean
}

export default function ParticleBackground({ colorIndex = 0, absolute = false }: ParticleBackgroundProps) {
  const colors = [
    { light: '#6B7280', dark: '#4B5563' },      // 0: cinza (padrão)
    { light: '#ec4899', dark: '#be123c' },      // 1: pink
    { light: '#a855f7', dark: '#7e22ce' },      // 2: purple
    { light: '#6366f1', dark: '#4f46e5' },      // 3: indigo
    { light: '#dc2626', dark: '#b91c1c' },      // 4: red
    { light: '#eab308', dark: '#ca8a04' },      // 5: yellow
    { light: '#22c55e', dark: '#16a34a' },      // 6: green
    { light: '#06b6d4', dark: '#0891b2' },      // 7: cyan
    { light: '#f97316', dark: '#ea580c' },      // 8: orange
    { light: '#3b82f6', dark: '#1d4ed8' },      // 9: blue
    { light: '#a78bfa', dark: '#7c3aed' },      // 10: violet
  ]

  const currentColors = colors[colorIndex]

  // Gera partículas aleatórias com cores baseadas no colorIndex
  const particles = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 10 + Math.random() * 6,
        size: 2 + Math.random() * 6,
        opacity: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? currentColors.light : currentColors.dark,
      })),
    [currentColors]
  )

  return (
    <div className={`${absolute ? 'absolute' : 'fixed'} inset-0 ${absolute ? 'z-0' : '-z-10'} pointer-events-none overflow-hidden`}>

      {/* Falling particles - Snow effect */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size}px rgba(75, 85, 99, 0.3)`,
          }}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, Math.sin(particle.id) * 80],
            opacity: [0, particle.opacity, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Additional floating elements */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            backgroundColor: Math.random() > 0.5 ? '#4B5563' : '#3F4758',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.cos(i) * 30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
