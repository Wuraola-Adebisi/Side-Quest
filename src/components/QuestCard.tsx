import { Bookmark, Clock } from 'lucide-react'
import { looks, type Quest } from '../data'

type Props = { q: Quest; i: number; saved: boolean; done: boolean; onSave: () => void; onOpen: () => void }

export default function QuestCard({ q, saved, done, onSave, onOpen }: Props) {
  const look = looks[q.id]
  return (
    <article className={'group relative flex flex-col rounded-2xl border border-plum/15 bg-white p-3 shadow-pop transition hover:-translate-y-1.5 hover:shadow-lift '}>
      <div className={'relative grid h-36 place-items-center rounded-xl ' + look.bg}>
        <span className="text-6xl" aria-hidden>{look.emoji}</span>
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-extrabold">{q.category}</span>
        <button onClick={onSave} aria-label={saved ? 'Remove from saved' : 'Save quest'} className={'absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-plum/20 ' + (saved ? 'bg-tomato text-white' : 'bg-white')}>
          <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
        </button>
        {done && <span className="absolute -bottom-3 rounded-full border border-plum/20 bg-sunny px-3 py-1 text-xs font-extrabold">Done</span>}
      </div>
      <div className="flex flex-1 flex-col gap-2 px-2 pb-1 pt-4">
        <h3 className="font-display text-2xl font-semibold leading-tight">{q.title}</h3>
        <p className="flex-1 text-[15px] leading-relaxed text-plum-soft">{q.description}</p>
        <p className="flex items-center gap-3 text-sm font-bold text-plum-soft"><span className="flex items-center gap-1"><Clock size={14} />{q.time}</span><span>{q.cost}</span></p>
        <button onClick={onOpen} className="mt-2 rounded-full border border-plum/15 bg-sunny py-3 font-body text-lg font-bold hover:bg-bubble">Take this quest</button>
      </div>
    </article>
  )
}
