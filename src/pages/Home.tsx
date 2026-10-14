import { Compass } from 'lucide-react'
import { Reveal } from '../components/fx'
import { quests } from '../data'

const steps = [
  ['Pick your mood', 'Tell Side Quest how your day feels.'],
  ['Choose a quest', 'Browse small ideas that fit your time and budget.'],
  ['Follow the little plan', 'Every quest comes with a few simple steps.'],
  ['Keep the memory', 'Finish it, add a note and collect it in your journal.'],
]
const features = [
  ['A quest for today', 'A fresh suggestion every day when you do not know where to start.'],
  [quests.length + ' hand-picked quests', 'Small adventures that take minutes, cost little and need no planning.'],
  ['A journal that remembers', 'Completed quests become dated entries with your own notes.'],
  ['Saved for later', 'Bookmark the ideas you like and come back when the day is right.'],
]
const card = 'rounded-2xl border border-plum/15 bg-white p-5 shadow-pop'

export default function Home() {
  return (
    <main>
      <section className="relative mt-6 grid items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-apricot/40 to-sunny/30 p-6 sm:p-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-tomato">little adventures for ordinary days</p>
              <h1 className="mt-2 font-display text-5xl font-bold leading-[1.05] sm:text-6xl">Make today a little less <span className="rounded-xl bg-sunny/60 px-3">ordinary</span></h1>
              <p className="mt-4 max-w-md text-lg font-semibold text-plum-soft">Tiny quests for your real life. No grand plans, no pressure.</p>
              <a href="#/discover" className="mt-6 rounded-full border border-plum/15 bg-tomato px-7 py-3.5 font-body text-xl font-bold text-white shadow-pop hover:bg-bubble hover:text-plum inline-block">Start exploring</a>
            </div>
            <div className="relative mx-auto grid h-64 w-64 place-items-center sm:h-72 sm:w-72">
              <span className="absolute inset-0 rounded-full bg-sunny/40" />
              <span className="absolute inset-8 rounded-full bg-bubble/40" />
              <span className="absolute inset-16 grid place-items-center rounded-full bg-white shadow-pop"><Compass size={56} strokeWidth={1.25} /></span>
              {[['20 min', 'left-0 top-10'], ['Free', 'right-0 top-24'], ['Close by', 'bottom-6 left-6']].map(([t, pos]) => <span key={t} className={'absolute rounded-full bg-white px-3 py-1 text-sm font-bold shadow-pop ' + pos}>{t}</span>)}
            </div>
          </section>

      <section className="mt-16" aria-labelledby="how">
        <h2 id="how" className="font-display text-4xl font-bold">How it works</h2>
        <p className="mt-2 max-w-xl text-lg font-semibold text-plum-soft">Side Quest turns an ordinary day into a small story, in four steps.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className={card + ' h-full'}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sunny/60 font-bold">{i + 1}</span>
              <h3 className="mt-3 font-body text-xl font-bold">{t}</h3>
              <p className="mt-1 text-plum-soft">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="inside">
        <h2 id="inside" className="font-display text-4xl font-bold">What is inside</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {features.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 0.08} className={card}>
              <h3 className="font-body text-xl font-bold">{t}</h3>
              <p className="mt-1 text-plum-soft">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mt-10"><section aria-labelledby="ai-title" className="relative rounded-3xl border border-plum/15 bg-white p-6 shadow-pop">
            <span className="absolute right-5 top-5 rounded-full bg-sunny/60 px-3 py-1 text-xs font-bold uppercase tracking-widest">Coming soon</span>
            <p className="text-sm font-bold uppercase tracking-widest text-tomato">AI quests</p>
            <h2 id="ai-title" className="mt-1 font-display text-3xl font-semibold">Quests made for you</h2>
            <p className="mt-1 max-w-xl text-plum-soft">Describe your day and an AI model will suggest quests that fit. We are building it now.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input disabled aria-label="Describe your day" placeholder="Describe your day, for example: free afternoon, low budget" className="flex-1 rounded-full border border-plum/15 bg-cream px-5 py-3 placeholder:text-plum-soft/70" />
              <button disabled className="cursor-not-allowed rounded-full bg-plum/30 px-6 py-3 font-body font-bold text-white">Suggest quests</button>
            </div>
          </section></Reveal>

      <Reveal className="mt-16 rounded-3xl bg-gradient-to-br from-sunny/40 to-bubble/30 p-10 text-center">
        <Compass className="mx-auto" size={40} strokeWidth={1.25} />
        <h2 className="mt-3 font-display text-4xl font-bold">Ready for your first quest?</h2>
        <p className="mx-auto mt-2 max-w-md text-lg font-semibold text-plum-soft">Pick a mood and find something small to do today.</p>
        <a href="#/discover" className="mt-6 rounded-full border border-plum/15 bg-tomato px-7 py-3.5 font-body text-xl font-bold text-white shadow-pop hover:bg-bubble hover:text-plum inline-block">Browse quests</a>
      </Reveal>
    </main>
  )
}
