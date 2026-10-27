/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './politique-confidentialite.html',
    './mentions-legales.html',
    './cookie-consent.js',
  ],
  theme: {
    extend: {
      colors: {
        night: '#0F172A',
        mist: '#F8FAFC',
        // DEFAULT = bg-emerald / text-emerald (identité marque)
        emerald: {
          DEFAULT: '#10B981',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 40px -16px rgba(15, 23, 42, 0.18)',
      },
    },
  },
  plugins: [],
};
