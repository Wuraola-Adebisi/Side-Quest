export type Quest = { id:number; title:string; description:string; category:string; time:string; cost:string; tone:string; mark:string; steps:string[] }
export const quests: Quest[] = [
 {id:1,title:'Take the long way home',description:'Find a street you have never walked down. See what has been hiding in plain sight.',category:'Step out',time:'20 min',cost:'Free',tone:'peach',mark:'↗',steps:['Choose a familiar destination.','Take one turn you would usually skip.','Find three little details you have never noticed.','Save the best discovery in your journal.']},
 {id:2,title:'Make a tiny joy list',description:'Collect five small things that make an ordinary day feel a bit more yours.',category:'Stay in',time:'10 min',cost:'Free',tone:'lilac',mark:'✳',steps:['Grab a note or open your notes app.','Write down five small things you genuinely enjoy.','Pick one you can do today.','Keep the list for a day that needs brightening.']},
 {id:3,title:'Be a tourist in your town',description:'Visit one nearby spot with the curiosity of someone seeing it for the first time.',category:'Step out',time:'45 min',cost:'₦0–₦2k',tone:'mint',mark:'⌁',steps:['Pick a public place nearby.','Notice one detail you would normally walk past.','Take a photo or make a quick sketch.','Give this little expedition a name.']},
 {id:4,title:'Ask a better question',description:'Have a conversation with someone you like that goes one layer deeper than usual.',category:'Bring someone',time:'15 min',cost:'Free',tone:'butter',mark:'♡',steps:['Choose someone you feel comfortable with.','Ask what they have been looking forward to lately.','Listen without planning your reply.','Share your own answer, too.']},
 {id:5,title:'Rearrange one little corner',description:'Give a tiny part of your space a fresh start using only what you already own.',category:'Stay in',time:'15 min',cost:'Free',tone:'blue',mark:'⌂',steps:['Choose one small surface or corner.','Remove everything from it.','Put back only what you like or use.','Take a before-and-after photo if you fancy.']},
 {id:6,title:'Try the unfamiliar snack',description:'Pick something you have never tasted before and make a small adventure out of it.',category:'Bring someone',time:'30 min',cost:'Your budget',tone:'pink',mark:'✿',steps:['Think of a snack you have never tried.','Find a version that fits your budget.','Try it without multitasking.','Rate it out of ten and record your verdict.']}
]
export const moods = ['A little curious','Need fresh air','Cozy mode','With my people']
export const moodEmoji = ['🔍','🌿','🧸','🫶']
export const filters = ['All quests','Step out','Stay in','Bring someone']
export const moodOrder: Record<string, number[]> = {
  'A little curious': [1,3,2,6,4,5],
  'Need fresh air': [1,3,6,4,2,5],
  'Cozy mode': [2,5,4,6,1,3],
  'With my people': [4,6,3,1,2,5],
}
export const looks: Record<number,{emoji:string;bg:string}> = {
  1:{emoji:'🛤️',bg:'bg-bubble'},2:{emoji:'📝',bg:'bg-sunny'},3:{emoji:'🗺️',bg:'bg-mint'},
  4:{emoji:'💬',bg:'bg-apricot'},5:{emoji:'🪴',bg:'bg-leaf'},6:{emoji:'🍡',bg:'bg-bubble'},
}

const moodOf: Record<number, number> = {}
export function rank(q: Quest, mood: string) {
  const o = moodOrder[mood].indexOf(q.id)
  if (o >= 0) return o
  return moodOf[q.id] === moods.indexOf(mood) ? -1 : 50 + q.id
}
const extra: [string, string, string, string, string, string, string, number, string][] = [
  ['Watch the sunset properly', 'Find a spot with a good view and watch the sky change without your phone.', 'Step out', '25 min', 'Free', '🌅', 'bg-sunny', 1, 'Pick a spot facing west.|Arrive ten minutes early.|Keep your phone away until the colours fade.'],
  ['Write a letter to future you', 'Say what today feels like, then seal it for later.', 'Stay in', '15 min', 'Free', '✉️', 'bg-bubble', 2, 'Grab paper or open a notes app.|Describe one good and one hard thing about this week.|Pick a date to read it again.'],
  ['Cook something from scratch', 'Make one simple dish with real ingredients and take your time.', 'Stay in', '45 min', '₦1k–₦5k', '🍳', 'bg-apricot', 2, 'Choose a recipe with few ingredients.|Cook without rushing.|Eat it at a table, away from screens.'],
  ['Compliment a stranger', 'Say one genuine kind thing to someone you do not know.', 'Step out', '5 min', 'Free', '💛', 'bg-sunny', 0, 'Notice something you really like about someone.|Say it simply and keep walking.|Notice how the rest of your day feels.'],
  ['Visit a local market', 'Wander through a market and talk to one seller.', 'Step out', '60 min', '₦0–₦5k', '🧺', 'bg-mint', 1, 'Pick a market near you.|Ask a seller what is in season.|Buy one small thing you have never tried.'],
  ['Build a playlist for a mood', 'Make a ten song playlist that fits exactly how today feels.', 'Stay in', '20 min', 'Free', '🎧', 'bg-leaf', 2, 'Name the mood first.|Add songs that match it.|Listen all the way through once.'],
  ['Have a picnic anywhere', 'Eat lunch on a blanket, a bench or the grass instead of at a desk.', 'Bring someone', '40 min', '₦1k–₦3k', '🥪', 'bg-leaf', 3, 'Pack something simple.|Find a spot with shade.|Stay until the last bite is gone.'],
  ['Take a photo walk', 'Pick one colour and photograph everything you find in it.', 'Step out', '30 min', 'Free', '📸', 'bg-bubble', 0, 'Pick a colour.|Walk with your eyes open.|Choose your favourite shot.'],
  ['Call someone you miss', 'Phone, not text, someone you have not spoken to in a while.', 'Bring someone', '20 min', 'Data cost', '📞', 'bg-apricot', 3, 'Pick the person who came to mind first.|Call without an agenda.|Ask what their week was like.'],
  ['Learn five words in a new language', 'Pick any language and learn five words well enough to say them out loud.', 'Stay in', '15 min', 'Free', '🗣️', 'bg-sunny', 0, 'Choose a language you are curious about.|Learn the words and how they sound.|Use each one in a sentence.'],
  ['Draw your view', 'Sketch what you can see right now, however it turns out.', 'Stay in', '15 min', 'Free', '✏️', 'bg-mint', 2, 'Sit where you are.|Draw for ten minutes without erasing.|Sign it and add the date.'],
  ['Try a new route', 'Change how you get somewhere familiar and see what is different.', 'Step out', '30 min', 'Free', '🚏', 'bg-leaf', 0, 'Look up another way to get there.|Leave a few minutes early.|Note one thing you would have missed.'],
  ['Host a tiny game night', 'Pick a simple game and invite one or two people over.', 'Bring someone', '60 min', 'Free', '🎲', 'bg-bubble', 3, 'Choose a game everyone knows.|Set out snacks.|Keep score on a napkin.'],
  ['Declutter one drawer', 'Empty one drawer, keep what you use and let the rest go.', 'Stay in', '15 min', 'Free', '🗄️', 'bg-apricot', 2, 'Empty the whole drawer.|Sort into keep, give away and bin.|Put the keepers back neatly.'],
  ['Plant something', 'Start a seed, a cutting or a small pot and give it a name.', 'Stay in', '20 min', '₦0–₦2k', '🌱', 'bg-leaf', 2, 'Find a pot and some soil.|Plant your seed or cutting.|Put it where you will see it daily.'],
  ['Make a card for a friend', 'Make a small drawing or card and give it to someone in person.', 'Bring someone', '30 min', 'Free', '🎨', 'bg-sunny', 3, 'Pick a friend.|Make something small and personal.|Hand it over in person.'],
  ['Eat somewhere new', 'Try a place you have walked past many times.', 'Bring someone', '45 min', '₦2k–₦8k', '🍜', 'bg-bubble', 3, 'Choose the place you always skip.|Order what the menu leads with.|Tell the cook what you liked.'],
  ['Stargaze for ten minutes', 'Go outside after dark and just look up.', 'Step out', '10 min', 'Free', '🌙', 'bg-apricot', 1, 'Find a spot away from bright lights.|Let your eyes adjust.|Find the brightest thing in the sky.'],
  ['Take a screen-free hour', 'Switch off notifications and do one thing slowly.', 'Stay in', '60 min', 'Free', '🌿', 'bg-mint', 2, 'Choose what to do with the hour.|Put your phone in another room.|Notice how it felt when you come back.'],
  ['Dance badly on purpose', 'Put on one song and move like nobody is watching.', 'Stay in', '5 min', 'Free', '💃', 'bg-bubble', 2, 'Choose a song you cannot sit still to.|Close the door if you like.|Keep going until the end.'],
]
extra.forEach(([title, description, category, time, cost, emoji, bg, m, steps], i) => {
  const id = 7 + i
  quests.push({ id, title, description, category, time, cost, tone: '', mark: '', steps: steps.split('|') })
  looks[id] = { emoji, bg }
  moodOf[id] = m
})

export type Preferences = { mood: string; filter: string }
// Single place where quests are chosen. Today it uses the local list.
// Later, replace the body with a call to an endpoint that asks an AI model (for example Amazon Bedrock).
export function getQuests({ mood, filter }: Preferences): Quest[] {
  return quests.filter(q => filter === filters[0] || q.category === filter).sort((a, b) => rank(a, mood) - rank(b, mood))
}
