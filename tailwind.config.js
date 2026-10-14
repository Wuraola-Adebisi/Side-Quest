export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { cream: '#FBF6EE', plum: { DEFAULT: '#3B2A22', soft: '#7A6254' }, bubble: '#F2B8C6', sunny: '#F2CF7E', mint: '#A5D8C4', apricot: '#EFBB91', leaf: '#C3D99B', tomato: '#D4503F' },
      fontFamily: { display: ['Fraunces', 'Georgia', 'serif'], body: ['"DM Sans"', 'sans-serif'], hand: ['Caveat', 'cursive'] },
      boxShadow: { pop: '0 12px 28px -14px rgba(59,42,34,.28)', lift: '0 18px 36px -16px rgba(59,42,34,.35)' },
      keyframes: { marquee: { to: { transform: 'translateX(-50%)' } }, wiggle: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } } },
      animation: { wiggle: 'wiggle .5s ease-in-out', marquee: 'marquee 28s linear infinite' },
    },
  },
  plugins: [],
}
