/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 3% 25%, #002853 0, #040c18 25%)',
        'gradient-text':'var(--gradient-text)'
      },
      colors:{
        'color-bg':'var(--color-bg)',
        'color-footer':'var(--color-footer)',
        'color-blog':'var(--color-blog)',
        'color-text':'var(--color-text)',
        'color-subtext':'var(--color-subtext)',
        'gradient-text':'var(--gradient-text)'
      }
    },
  },
  plugins: [],
}

