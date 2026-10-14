# Side Quest

Little adventures for your very ordinary days. Pick a mood, take a tiny quest, tick off the steps and collect a sticker in your journal.

## Features
- 26 starter quests with mood sorting, category filters and a quest of the day
- Journal with a sticker book, dated entries and optional notes
- Saved quests, a weekly counter and confetti on completion
- About, Terms of Service, Privacy Policy, Contact and 404 pages (hash routing)
- Progress is stored in the browser (localStorage); there is no backend yet

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
Import the GitHub repo. Vercel detects Vite: build command `npm run build`, output directory `dist`. Hash routing needs no rewrites.

## Before launch
- Set `CONTACT_EMAIL` in `src/lib.ts`
- In `index.html`, change the `og:image` content to the full URL of your deployed `/og.png`
- Have the Terms and Privacy text reviewed by a qualified person

## Adding AI later
`getQuests` in `src/data.ts` is the single place quests are chosen. Replace its body with a call to an endpoint that invokes an AI model (for example Amazon Bedrock behind API Gateway and Lambda). When AI ships, update the Privacy page to say that preference inputs are sent to an AI provider.
