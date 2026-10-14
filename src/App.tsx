import { createElement, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bookmark, BookHeart, Coffee, Compass, House, Leaf, Search, Sparkles, Users, WandSparkles } from 'lucide-react'
import { filters, looks, moods, quests, getQuests, type Quest } from './data'
import QuestCard from './components/QuestCard'
import QuestModal from './components/QuestModal'
import Confetti from './components/Confetti'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Reveal } from './components/fx'
import { About, Contact, NotFound, Privacy, Terms } from './pages/Pages'
import { usePersisted, useStored, views, type View } from './lib'

const moodIcons = [Search, Leaf, Coffee, Users]
const readView = (): View => { const h = window.location.hash.replace(/^#\/?/, ''); if (!h) return 'home'; return (views as string[]).includes(h) ? (h as View) : 'notfound' }
const names: Record<View, string> = { home: 'Home', discover: 'Quests', journal: 'Journal', saved: 'Saved quests', about: 'About', terms: 'Terms of Service', privacy: 'Privacy Policy', contact: 'Contact', notfound: 'Page not found' }
const tabs = [{ id: 'home' as View, label: 'Home', Icon: House }, { id: 'discover' as View, label: 'Quests', Icon: Sparkles }, { id: 'journal' as View, label: 'Journal', Icon: BookHeart }, { id: 'saved' as View, label: 'Saved', Icon: Bookmark }]

export default function App() {
  const [view, setViewState] = useState<View>(readView)
  useEffect(() => { const f = () => { setViewState(readView()); window.scrollTo(0, 0) }; window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f) }, [])
  const setView = (v: View) => { window.location.hash = '/' + v }
  useEffect(() => { document.title = view === 'home' ? 'Side Quest: little adventures for ordinary days' : names[view] + ' | Side Quest' }, [view])
  const [filter, setFilter] = useState(filters[0])
  const [mood, setMood] = useState(moods[0])
  const [saved, setSaved] = usePersisted('sq-saved')
  const [done, setDone] = usePersisted('sq-done')
  const [notes, setNotes] = useStored<Record<number, { date: string; note: string }>>('sq-notes', {})
  const [active, setActive] = useState<Quest | null>(null)
  const [shift, setShift] = useState(0)
  const [party, setParty] = useState(false)
  const [shown, setShown] = useState(9)

  const sorted = getQuests({ mood, filter })
  const n = sorted.length ? shift % sorted.length : 0
  const cards = [...sorted.slice(n), ...sorted.slice(0, n)]
  const today = quests[Math.floor(Date.now() / 864e5) % quests.length]
  const week = Object.values(notes).filter(n => {
    const age = Date.now() - new Date(n.date).getTime()
    return age >= 0 && age < 7 * 864e5
  }).length
  const savedQuests = quests.filter(q => saved.includes(q.id))
  const toggleSave = (id: number) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const finish = (id: number, note: string, date: string) => {
    setNotes(o => ({ ...o, [id]: { date, note } }))
    setDone(d => d.includes(id) ? d : [...d, id])
    setActive(null)
    setView('journal')
    setParty(true)
    window.setTimeout(() => setParty(false), 5000)
  }
  const updateJournalEntry = (id: number, note: string, date: string) => {
    setNotes(o => ({ ...o, [id]: { date, note } }))
    setActive(null)
  }
  const grid = (list: Quest[]) => <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((q, i) => <Reveal key={q.id} className="h-full" delay={(i % 3) * 0.08}><QuestCard q={q} i={i} saved={saved.includes(q.id)} done={done.includes(q.id)} onSave={() => toggleSave(q.id)} onOpen={() => setActive(q)} /></Reveal>)}</div>

  return (
    <div className="mx-auto max-w-6xl px-4 pb-32 pt-6 sm:px-8">
      {party && <Confetti />}
      <button onClick={() => document.getElementById('main')?.focus()} className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-full focus:bg-sunny focus:px-4 focus:py-2 focus:font-bold">Skip to content</button>
      <header className="flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-2 font-display text-3xl font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-plum text-cream"><Compass size={22} strokeWidth={1.75} /></span>side quest
        </button>
        <span className="rounded-full bg-white px-4 py-2 text-sm font-extrabold ring-2 ring-plum/15">{done.length} completed{week > 0 && ' · ' + week + ' this week'}</span>
      </header>

      <AnimatePresence mode="wait"><motion.div id="main" tabIndex={-1} className="outline-none" key={view} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>{view === 'about' ? <About /> : view === 'terms' ? <Terms /> : view === 'privacy' ? <Privacy /> : view === 'contact' ? <Contact /> : view === 'notfound' ? <NotFound /> : view === 'home' ? <Home /> : view === 'discover' ? (
        <main>
          <div className="mt-8"><h1 className="font-display text-5xl font-bold">Find your next <span className="text-tomato">quest</span></h1><p className="mt-2 text-lg font-semibold text-plum-soft">Pick a mood, filter by the kind of day you want, or let us surprise you.</p></div>

          <Reveal className="mt-10"><button onClick={() => setActive(today)} className={'flex w-full items-center gap-4 rounded-2xl border border-plum/15 p-4 text-left shadow-pop transition hover:-translate-y-1 ' + looks[today.id].bg}><span className="text-6xl" aria-hidden>{looks[today.id].emoji}</span><span><span className="text-sm font-bold uppercase tracking-widest">quest of the day</span><span className="block font-display text-2xl font-semibold">{today.title}</span><span className="block font-semibold text-plum-soft">{today.time} · {today.cost}</span></span></button></Reveal>

          <section id="finder" className="mt-10">
            <h2 className="font-display text-3xl font-semibold">What kind of day is it?</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {moods.map((m, i) => (
                <button key={m} onClick={() => setMood(m)} aria-pressed={mood === m} className={'rounded-2xl border border-plum/15 p-4 text-center font-body text-lg font-bold shadow-pop ' + (mood === m ? 'scale-105 bg-sunny' : 'bg-white hover:bg-leaf/40')}>
                  {createElement(moodIcons[i], { className: 'mx-auto mb-2', size: 30, strokeWidth: 1.5 })}{m}
                </button>
              ))}
            </div>
          </section>

          

          <section className="mt-10">
            <h2 className="font-display text-3xl font-semibold">Hand-picked quests</h2>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {filters.map(f => <button key={f} aria-pressed={filter === f} onClick={() => { setFilter(f); setShown(9) }} className={'rounded-full border border-plum/20 px-4 py-2 text-sm font-extrabold ' + (filter === f ? 'bg-plum text-cream' : 'bg-white')}>{f}</button>)}
              <button onClick={() => setShift(s => s + 1)} className="ml-auto flex items-center gap-2 rounded-full border border-plum/20 bg-mint px-4 py-2 text-sm font-extrabold"><WandSparkles size={16} />Surprise me</button>
            </div>
            <div className="mt-6">{grid(cards.slice(0, shown))}</div>
            {cards.length > shown && <div className="mt-8 text-center"><button onClick={() => setShown(s => s + 9)} className="rounded-full border border-plum/15 bg-white px-7 py-3 font-body text-lg font-bold shadow-pop hover:bg-sunny">Show more quests</button></div>}
          </section>
        </main>
      ) : view === 'journal' ? (
        <main className="mt-8">
          <h1 className="font-display text-5xl font-bold">Your <span className="text-tomato">journal</span></h1>
          <p className="mt-2 text-lg font-semibold text-plum-soft">Every completed quest is added here. {done.length} of {quests.length} collected.</p>
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-3xl border-2 border-dashed border-plum/40 bg-white p-6 sm:grid-cols-6">
            {quests.map(q => done.includes(q.id)
              ? <button key={q.id} onClick={() => setActive(q)} aria-label={q.title} className={'grid aspect-square place-items-center rounded-full border border-plum/15 text-5xl shadow-pop ' + looks[q.id].bg}>{looks[q.id].emoji}</button>
              : <span key={q.id} className="grid aspect-square place-items-center rounded-full border-2 border-dashed border-plum/25 font-display text-2xl text-plum/25">?</span>)}
          </div>
          {done.length > 0 && <div className="mt-8 space-y-4">{quests.filter(q => done.includes(q.id)).map(q => <Reveal key={q.id} className="flex items-start gap-4 rounded-2xl border border-plum/15 bg-white p-4 shadow-pop"><span className={'grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-4xl ' + looks[q.id].bg} aria-hidden>{looks[q.id].emoji}</span><div className="min-w-0 flex-1"><h3 className="font-body text-xl font-bold">{q.title}</h3>{notes[q.id] && <p className="text-sm font-bold text-plum-soft">{new Date(notes[q.id].date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>}<p className="mt-1 whitespace-pre-wrap break-words text-plum-soft">{notes[q.id]?.note || 'No note this time.'}</p><button onClick={() => setActive(q)} className="mt-3 rounded-full border border-plum/20 bg-cream px-4 py-2 text-sm font-bold hover:bg-sunny" aria-label={'Edit journal entry for ' + q.title}>Edit journal entry</button></div></Reveal>)}</div>}
        </main>
      ) : (
        <main className="mt-8">
          <h1 className="font-display text-5xl font-bold">For a day when you need <span className="text-tomato">an idea</span></h1>
          {savedQuests.length ? <div className="mt-6">{grid(savedQuests)}</div> : <p className="mt-6 rounded-2xl border-2 border-dashed border-plum/30 bg-white p-10 text-center text-lg font-semibold text-plum-soft">Nothing saved yet. Tap the bookmark on any quest to keep it for later.</p>}
        </main>
      )}</motion.div></AnimatePresence>
      <Footer />

      <nav aria-label="Main" className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-1 rounded-full border border-plum/15 bg-white p-1.5 shadow-pop">
        {tabs.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setView(id)} aria-current={view === id} className={'flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-base font-bold ' + (view === id ? 'bg-sunny' : 'hover:bg-cream')}><Icon size={18} aria-hidden /><span className="hidden min-[400px]:inline">{label}</span><span className="sr-only min-[400px]:hidden">{label}</span></button>
        ))}
      </nav>
      <AnimatePresence>{active && <QuestModal key={active.id} q={active} done={done.includes(active.id)} initialNote={notes[active.id]?.note || ''} initialDate={notes[active.id]?.date} onClose={() => setActive(null)} onFinish={(n, d) => finish(active.id, n, d)} onSave={(n, d) => updateJournalEntry(active.id, n, d)} />}</AnimatePresence>
    </div>
  )
}
