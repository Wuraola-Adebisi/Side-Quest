import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { looks, type Quest } from '../data'

type Props = {
  q: Quest
  done: boolean
  initialNote: string
  initialDate?: string
  onClose: () => void
  onFinish: (note: string, date: string) => void
  onSave: (note: string, date: string) => void
}

function toDateInput(value?: string) {
  const date = value ? new Date(value) : new Date()
  if (Number.isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return year + '-' + month + '-' + day
}

function toStoredDate(value: string) {
  return new Date(value + 'T12:00:00').toISOString()
}

export default function QuestModal({ q, done, initialNote, initialDate, onClose, onFinish, onSave }: Props) {
  const [ticked, setTicked] = useState<number[]>(() => done ? q.steps.map((_, i) => i) : [])
  const [note, setNote] = useState(initialNote)
  const [date, setDate] = useState(() => toDateInput(initialDate))
  const panelRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const closeHandlerRef = useRef(onClose)
  closeHandlerRef.current = onClose
  const look = looks[q.id]
  const allStepsDone = ticked.length === q.steps.length

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeHandlerRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )).filter(element => element.getAttribute('aria-hidden') !== 'true')
      if (focusable.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  const save = () => {
    if (!date) return
    const storedDate = toStoredDate(date)
    if (done) onSave(note.trim(), storedDate)
    else onFinish(note.trim(), storedDate)
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-end justify-center bg-plum/50 p-3 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-title"
        aria-describedby="quest-description"
        tabIndex={-1}
        onClick={event => event.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-plum/15 bg-cream p-5"
        initial={{ y: 80, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 18 }}
      >
        <button ref={closeRef} onClick={onClose} aria-label="Close quest details" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-plum/20 bg-white">
          <X size={18} />
        </button>
        <div className={'grid h-36 place-items-center rounded-2xl text-6xl ' + look.bg} aria-hidden>{look.emoji}</div>
        <h2 id="quest-title" className="mt-4 pr-10 font-display text-3xl font-semibold">{q.title}</h2>
        <p id="quest-description" className="mt-1 text-plum-soft">{q.description}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm font-extrabold">
          {[q.time, q.category, q.cost].map(t => <span key={t} className="rounded-full bg-white px-3 py-1 ring-2 ring-plum/20">{t}</span>)}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-tomato">The little plan</h3>
          <span className="text-xs font-bold text-plum-soft">{ticked.length} of {q.steps.length} steps</span>
        </div>
        <ol className="mt-2 space-y-2">
          {q.steps.map((step, i) => {
            const checked = ticked.includes(i)
            return (
              <li key={step}>
                <button
                  type="button"
                  disabled={done}
                  aria-pressed={checked}
                  onClick={() => setTicked(current => current.includes(i) ? current.filter(index => index !== i) : [...current, i])}
                  className={'flex w-full items-center gap-3 rounded-2xl p-3 text-left font-semibold ' + (done ? 'cursor-default bg-white' : 'bg-white hover:bg-sunny')}
                >
                  <span className={'grid h-8 w-8 shrink-0 place-items-center rounded-full border border-plum/20 ' + (checked ? 'bg-mint' : 'bg-cream')}>{checked ? <Check size={16} /> : i + 1}</span>
                  <span className={checked ? 'text-plum-soft line-through' : ''}>{step}</span>
                </button>
              </li>
            )
          })}
        </ol>

        <label className="mt-4 block text-sm font-bold uppercase tracking-widest text-plum">
          Journal date
          <input type="date" value={date} onChange={event => setDate(event.target.value)} required className="mt-1 w-full rounded-2xl border-2 border-plum/30 bg-white p-3 font-body text-base font-normal text-plum outline-none focus:border-plum" />
        </label>
        <label className="mt-4 block text-sm font-bold uppercase tracking-widest text-plum">
          {done ? 'Your journal note' : 'Add a note for your journal'}
          <textarea value={note} onChange={event => setNote(event.target.value)} rows={3} maxLength={500} placeholder="What did you notice? What do you want to remember?" className="mt-1 w-full resize-y rounded-2xl border-2 border-plum/30 bg-white p-3 font-body text-base font-normal text-plum outline-none focus:border-plum" />
          <span className="mt-1 block text-right text-xs font-semibold normal-case tracking-normal text-plum-soft">{note.length}/500</span>
        </label>

        {!done && !allStepsDone && <p className="mt-3 text-sm font-semibold text-plum-soft">Tick off every step to complete this quest.</p>}
        <button
          type="button"
          onClick={save}
          disabled={!date || (!done && !allStepsDone)}
          className="mt-5 w-full rounded-full border border-plum/15 bg-bubble py-3.5 font-body text-xl font-bold hover:bg-sunny disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-bubble"
        >
          {done ? 'Save journal entry' : allStepsDone ? 'Mark as done' : 'Complete the little plan first'}
        </button>
      </motion.section>
    </motion.div>
  )
}
