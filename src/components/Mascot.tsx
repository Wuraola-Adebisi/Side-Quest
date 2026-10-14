import { motion, useReducedMotion } from 'framer-motion'

export default function Mascot() {
  const calm = useReducedMotion()
  return (
    <motion.svg viewBox="0 0 200 220" className="h-full w-full" role="img" aria-label="A tiny explorer blob with a backpack"
      animate={calm ? undefined : { y: [0, -8, 0], rotate: [-2, 2, -2] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}>
      <g stroke="#3B2A22" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="40" y="102" width="30" height="62" rx="14" fill="#84E3C8" />
        <ellipse cx="82" cy="188" rx="16" ry="9" fill="#FF9EC4" />
        <ellipse cx="128" cy="188" rx="16" ry="9" fill="#FF9EC4" />
        <ellipse cx="105" cy="118" rx="52" ry="64" fill="#FFD95A" />
        <path d="M60 70 Q105 6 150 70Z" fill="#FF6B5B" />
        <path d="M152 120 Q178 96 172 76" fill="none" />
        <circle cx="88" cy="112" r="5" fill="#3B2A22" stroke="none" />
        <circle cx="122" cy="112" r="5" fill="#3B2A22" stroke="none" />
        <circle cx="76" cy="128" r="8" fill="#FF9EC4" stroke="none" />
        <circle cx="134" cy="128" r="8" fill="#FF9EC4" stroke="none" />
        <path d="M94 128 Q105 142 116 128" fill="none" />
      </g>
    </motion.svg>
  )
}
