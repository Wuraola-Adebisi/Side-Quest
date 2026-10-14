import type { ReactNode } from 'react'
import { Reveal } from '../components/fx'
import { CONTACT_EMAIL } from '../lib'
import { Compass } from 'lucide-react'

type Sec = [string, string]
function Doc({ kicker, title, intro, secs, children }: { kicker: string; title: string; intro: string; secs: Sec[]; children?: ReactNode }) {
  return (
    <main className="mx-auto mt-8 max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-widest text-tomato">{kicker}</p>
      <h1 className="font-display text-5xl font-bold">{title}</h1>
      <p className="mt-3 text-lg font-semibold text-plum-soft">{intro}</p>
      <div className="mt-8 space-y-4">
        {secs.map(([h, t], i) => (
          <Reveal key={h} delay={i * 0.04} className="rounded-2xl border border-plum/15 bg-white p-6 shadow-pop">
            <h2 className="font-display text-2xl font-semibold">{h}</h2>
            <p className="mt-2 leading-relaxed text-plum-soft">{t}</p>
          </Reveal>
        ))}
      </div>
      {children}
    </main>
  )
}

export const About = () => <Doc kicker="hello there" title="About Side Quest" intro="Side Quest turns an ordinary day into a small story." secs={[
  ['The idea', 'Most days have room for one small adventure. Side Quest suggests quests that take minutes, cost little and need no planning, like walking a different street or asking a friend a better question.'],
  ['How it works', 'Pick the mood you are in, choose a quest, follow the little plan and tick off each step. When you finish, the quest becomes a sticker in your journal.'],
  ['Where things stand', 'Side Quest is an early version. The quests are a hand-picked starter set, and more are on the way.'],
  ['What is next', 'AI-powered quest suggestions are coming. They will take the kind of day you are having and suggest quests that fit. Until then, every quest here is hand-picked.'],
]} />

export const Terms = () => <Doc kicker="the grown-up bit" title="Terms of Service" intro="Last updated October 14, 2026. By using Side Quest you agree to these terms." secs={[
  ['Using Side Quest', 'Side Quest is free to use for personal, non-commercial purposes. Please use it kindly and lawfully, and do not try to disrupt or copy the service.'],
  ['Your safety comes first', 'Quests are light suggestions. You are responsible for judging whether an activity is safe and suitable for you, your surroundings and your budget. Stay aware of your surroundings, respect other people and their property, and skip any quest that feels unsafe.'],
  ['Suggestions, not advice', 'Quest ideas are offered for fun and inspiration. We make no promise that a quest will suit you, be available where you live or have any particular result.'],
  ['Your journal and saved quests', 'Your saved quests and journal belong to you. They are stored on your own device, so clearing your browser data removes them.'],
  ['Changes and availability', 'We may update the service or these terms as Side Quest grows. When we change the terms, we update the date at the top of this page. Continuing to use Side Quest means you accept the updated terms.'],
  ['Questions', 'Write to ' + CONTACT_EMAIL + ' and we will get back to you.'],
]} />

export const Privacy = () => <Doc kicker="your stuff stays yours" title="Privacy Policy" intro="Last updated October 14, 2026. This page explains what Side Quest does with your information." secs={[
  ['What we collect', 'We do not ask you to create an account and we do not collect your name, email address or location.'],
  ['What stays on your device', 'Your saved quests and completed quests are stored in your browser using local storage. They are not sent to us. You can remove them at any time by clearing your site data in your browser settings.'],
  ['Cookies and tracking', 'Side Quest does not use advertising cookies or analytics at the moment. If that changes, we will update this page first.'],
  ['Third parties', 'The site loads its fonts from Google Fonts, which can see your IP address when your browser requests them. Our hosting provider may also keep standard server logs.'],
  ['Children', 'Side Quest is a general audience site and does not knowingly collect personal information from anyone, including children.'],
  ['Changes and contact', 'We will update the date above when this policy changes. Questions are welcome at ' + CONTACT_EMAIL + '.'],
]} />

export const Contact = () => <Doc kicker="say hi" title="Contact" intro="Questions, ideas for new quests or something that looks broken? We would love to hear it." secs={[
  ['Email us', 'Send a note to ' + CONTACT_EMAIL + '. Tell us what you were doing and which device you were on if something went wrong.'],
]}>
  <a href={'mailto:' + CONTACT_EMAIL} className="mt-6 inline-block rounded-full border border-plum/15 bg-sunny px-7 py-3.5 font-body text-xl font-bold shadow-pop hover:bg-bubble">Write to us</a>
</Doc>

export const NotFound = () => (
  <main className="mx-auto mt-10 max-w-md text-center">
    <Compass className="mx-auto" size={72} strokeWidth={1.25} />
    <h1 className="font-display text-5xl font-bold">Page not found</h1>
    <p className="mt-3 text-lg font-semibold text-plum-soft">That link does not lead anywhere. The home page has plenty of good quests to start with.</p>
    <a href="#/discover" className="mt-6 inline-block rounded-full border border-plum/15 bg-sunny px-7 py-3.5 font-body text-xl font-bold shadow-pop hover:bg-bubble">Back to the quests</a>
  </main>
)
