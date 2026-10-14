const items = ['tiny adventures', 'small plans', 'good stories', 'go outside', 'be a tourist']
const links = [['About', 'about'], ['Terms of Service', 'terms'], ['Privacy Policy', 'privacy'], ['Contact', 'contact']]

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="overflow-hidden rounded-full border border-plum/15 bg-sunny py-2">
        <div className="flex w-max animate-marquee font-body text-lg font-bold">{[...items, ...items].map((t, i) => <span key={i} className="mr-8">{t} ·</span>)}</div>
      </div>
      <div className="mt-6 grid gap-6 rounded-3xl bg-bubble/40 p-8 sm:grid-cols-2">
        <div>
          <p className="font-display text-3xl font-bold">side quest</p>
          <p className="mt-2 max-w-xs font-semibold text-plum-soft">Little adventures for your very ordinary days. One tiny quest at a time.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap content-start gap-x-6 gap-y-2 font-body text-lg font-bold sm:justify-end">
          {links.map(([label, id]) => <a key={id} href={'#/' + id} className="underline decoration-tomato decoration-4 underline-offset-4 hover:text-tomato">{label}</a>)}
        </nav>
        <p className="text-sm font-bold text-plum-soft sm:col-span-2">© 2026 Side Quest. Made for the beautifully ordinary.</p>
      </div>
    </footer>
  )
}
