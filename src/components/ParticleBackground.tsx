import { useMemo, useState, useEffect, useRef } from 'react'

interface ParticleBackgroundProps {
  colorIndex?: number
  absolute?: boolean
}

const BASE_COUNT = 90
const MAX_BURST = 120

function makeParticles(count: number, c: { light: string; dark: string }, fast = false) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * (fast ? 2 : 6),
    duration: fast ? 1.5 + Math.random() * 2 : 8 + Math.random() * 10,
    size: 2 + Math.random() * (fast ? 7 : 5),
    opacity: Math.random() * 0.5 + (fast ? 0.25 : 0.1),
    color: Math.random() > 0.5 ? c.light : c.dark,
    swing: (Math.random() - 0.5) * 120,
  }))
}

export default function ParticleBackground({ colorIndex = 0, absolute = false }: ParticleBackgroundProps) {
  const [burstCount, setBurstCount] = useState(0)
  const intensityRef = useRef(0)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const lastTouchPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Partículas estáticas - sem interação com mouse/touch
  }, [])

  const palette = [
    { light: '#6B7280', dark: '#4B5563' },
    { light: '#ec4899', dark: '#be123c' },
    { light: '#a855f7', dark: '#7e22ce' },
    { light: '#6366f1', dark: '#4f46e5' },
    { light: '#dc2626', dark: '#b91c1c' },
    { light: '#eab308', dark: '#ca8a04' },
    { light: '#22c55e', dark: '#16a34a' },
    { light: '#06b6d4', dark: '#0891b2' },
    { light: '#f97316', dark: '#ea580c' },
    { light: '#3b82f6', dark: '#1d4ed8' },
    { light: '#a78bfa', dark: '#7c3aed' },
  ]
  const c = palette[colorIndex] ?? palette[0]

  // Stable per-color particle data — CSS animations continue uninterrupted across re-renders
  const base = useMemo(() => makeParticles(BASE_COUNT, c, false), [c])
  const burst = useMemo(() => makeParticles(MAX_BURST, c, true), [c])

  const pos = absolute ? 'absolute' : 'fixed'
  const z = absolute ? 'z-0' : '-z-10'

  return (
    <div className={`${pos} inset-0 ${z} pointer-events-none overflow-hidden`}>
      <style>{`
        @keyframes snow-fall {
          0%   { transform: translateY(-8vh) translateX(0px); opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 1; }
          100% { transform: translateY(108vh) translateX(var(--sw)); opacity: 0; }
        }
      `}</style>

      {/* Base snow — always falling, CSS animation not interrupted by React re-renders */}
      {base.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: p.color,
            '--sw': `${p.swing}px`,
            animation: `snow-fall ${p.duration}s ${p.delay}s infinite linear`,
          } as React.CSSProperties}
        />
      ))}

      {/* Burst snow — extra fast particles on mouse/scroll/touch */}
      {burst.slice(0, burstCount).map(p => (
        <div
          key={`b-${p.id}`}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 1.5}px ${p.color}99`,
            '--sw': `${p.swing}px`,
            animation: `snow-fall ${p.duration}s ${p.delay}s infinite linear`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
