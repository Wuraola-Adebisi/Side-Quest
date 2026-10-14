import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const colors = ['#F2B8C6', '#F2CF7E', '#A5D8C4', '#EFBB91', '#C3D99B', '#D4503F']

export default function Confetti() {
  const calm = useReducedMotion()
  const bits = useMemo(() => {
    const w = window.innerWidth, h = window.innerHeight
    return Array.from({ length: 140 }, (_, i) => ({
      id: i, dx: (Math.random() - 0.5) * w * 1.1, peak: -(h * (0.25 + Math.random() * 0.4)), fall: h * 0.5 + 120,
      r: Math.random() * 900 - 450, d: 2.4 + Math.random() * 1.4, delay: i % 2 ? 0.2 : 0, c: colors[i % colors.length], w: 6 + Math.random() * 8, round: i % 3 === 0,
    }))
  }, [])
  if (calm) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {bits.map(b => (
        <motion.span key={b.id} className={'absolute left-1/2 top-[60%] ' + (b.round ? 'rounded-full' : 'rounded-[2px]')} style={{ width: b.w, height: b.round ? b.w : b.w * 0.5, background: b.c }}
          initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: [0, b.dx * 0.8, b.dx], y: [0, b.peak, b.fall], rotate: b.r, opacity: [1, 1, 0] }}
          transition={{ duration: b.d, delay: b.delay, times: [0, 0.35, 1], ease: ['easeOut', 'easeIn'] }} />
      ))}
    </div>
  )
}
