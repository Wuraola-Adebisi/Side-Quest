import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay }}>{children}</motion.div>
}

const spots = [['⭐', 'left-[4%] top-[18%]', 5], ['🌼', 'right-[5%] top-[30%]', 6], ['🍃', 'right-[8%] top-[72%]', 5.5], ['🌈', 'left-[46%] top-[88%]', 7]] as const

export function Doodles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden text-4xl opacity-40 md:block" aria-hidden>
      {spots.map(([e, pos, d]) => <motion.span key={e} className={'absolute ' + pos} animate={{ y: [0, -16, 0], rotate: [-10, 10, -10] }} transition={{ duration: d, repeat: Infinity, ease: 'easeInOut' }}>{e}</motion.span>)}
    </div>
  )
}
