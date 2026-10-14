import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { looks, type Quest } from '../data'

type Props = { q: Quest; done: boolean; onClose: () => void; onFinish: (note: string) => void }

export default function QuestModal({ q, done, onClose, onFinish }: Props) {
  const [ticked, setTicked] = useState<number[]>([])
  const [note, setNote] = useState('')
  const look = looks[q.id]
  return (
    <motion.div className="fixed inset-0 z-40 flex items-end justify-center bg-plum/50 p-3 backdrop-blur-sm sm:items-center" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.section role="dialog" aria-modal="true" aria-labelledby="quest-title" onClick={e => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-plum/15 bg-cream p-5"
        initial={{ y: 80, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ type: 'spring', damping: 18 }}>
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-plum/20 bg-white"><X size={18} /></button>
        <div className={'grid h-36 place-items-center rounded-2xl text-6xl ' + look.bg} aria-hidden>{look.emoji}</div>
        <h2 id="quest-title" className="mt-4 font-display text-3xl font-semibold">{q.title}</h2>
        <p className="mt-1 text-plum-soft">{q.description}</p>
        <p className="mt-3 flex gap-2 text-sm font-extrabold">{[q.time, q.category, q.cost].map(t => <span key={t} className="rounded-full bg-white px-3 py-1 ring-2 ring-plum/20">{t}</span>)}</p>
        <h3 className="mt-5 text-sm font-bold uppercase tracking-widest text-tomato">The little plan</h3>
        <ol className="mt-1 space-y-2">
          {q.steps.map((s, i) => (
            <li key={s}>
              <button onClick={() => setTicked(t => t.includes(i) ? t.filter(x => x !== i) : [...t, i])} className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left font-semibold">
                <span className={'grid h-8 w-8 shrink-0 place-items-center rounded-full border border-plum/20 ' + (ticked.includes(i) ? 'bg-mint' : 'bg-cream')}>{ticked.includes(i) ? <Check size={16} /> : i + 1}</span>
                <span className={ticked.includes(i) ? 'text-plum-soft line-through' : ''}>{s}</span>
              </button>
            </li>
          ))}
        </ol>
        {!done && <label className="mt-4 block text-sm font-bold uppercase tracking-widest text-plum">Add a note for your journal<textarea value={note} onChange={e => setNote(e.target.value)} rows={2} maxLength={200} placeholder="What did you notice?" className="mt-1 w-full rounded-2xl border-2 border-plum/30 bg-white p-3 font-body text-base text-plum outline-none focus:border-plum" /></label>}
        <button onClick={() => onFinish(note)} className="mt-5 w-full rounded-full border border-plum/15 bg-bubble py-3.5 font-body text-xl font-bold hover:bg-sunny">{done ? 'Already in your journal' : 'Mark as done'}</button>
      </motion.section>
    </motion.div>
  )
}
