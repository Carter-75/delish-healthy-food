/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Text colors
    'text-amber-400',
    'text-orange-400',
    'text-emerald-400',
    'text-blue-400',
    'text-violet-400',
    'text-pink-400',
    'text-cyan-400',
    'text-red-400',
    // Accent backgrounds
    'bg-amber-500',
    'bg-orange-500',
    'bg-emerald-500',
    'bg-blue-500',
    'bg-violet-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-red-500',
    // Border colors
    'border-amber-500/20',
    'border-orange-500/20',
    'border-emerald-500/20',
    'border-blue-500/20',
    'border-violet-500/20',
    'border-pink-500/20',
    'border-cyan-500/20',
    'border-red-500/20',
    // Highlight fills
    'bg-amber-900/20',
    'bg-orange-900/20',
    'bg-emerald-900/20',
    'bg-blue-900/20',
    'bg-violet-900/20',
    'bg-pink-900/20',
    'bg-cyan-900/20',
    'bg-red-900/20',
    // Card gradients
    'from-amber-600/20', 'via-orange-600/20', 'to-red-600/20',
    'from-orange-600/20', 'via-amber-600/20',
    'from-emerald-600/20', 'via-green-600/20', 'to-teal-600/20',
    'from-blue-600/20', 'via-indigo-600/20', 'to-violet-600/20',
    'from-violet-600/20', 'via-purple-600/20', 'to-fuchsia-600/20',
    'from-pink-600/20', 'via-rose-600/20',
    'from-cyan-600/20', 'via-sky-600/20', 'to-blue-600/20',
    'from-red-600/20', 'via-rose-600/20', 'to-pink-600/20',
    // Shadows
    'shadow-amber-500/20',
    'shadow-orange-500/20',
    'shadow-emerald-500/20',
    'shadow-blue-500/20',
    'shadow-violet-500/20',
    'shadow-pink-500/20',
    'shadow-cyan-500/20',
    'shadow-red-500/20',
    // Hover backgrounds
    'hover:bg-amber-900/40',
    'hover:bg-orange-900/40',
    'hover:bg-emerald-900/40',
    'hover:bg-blue-900/40',
    'hover:bg-violet-900/40',
    'hover:bg-pink-900/40',
    'hover:bg-cyan-900/40',
    'hover:bg-red-900/40',
    // Background gradients (main)
    'from-amber-900', 'to-orange-900',
    'from-orange-900', 'to-amber-900',
    'from-emerald-900', 'to-green-900',
    'from-blue-900', 'to-indigo-900',
    'from-violet-900', 'to-purple-900',
    'from-pink-900', 'to-rose-900',
    'from-cyan-900', 'to-sky-900',
    'from-red-900',
    'from-slate-900', 'to-slate-950', 'via-orange-950/40', 'via-emerald-950/40', 'via-blue-950/40', 'via-violet-950/40', 'via-pink-950/40', 'via-cyan-950/40',
    // Pulse gradients
    'from-amber-500/20', 'via-amber-500/20', 'via-orange-500/20', 'to-red-500/20',
    'from-orange-500/20',
    'from-emerald-500/20', 'via-green-500/20', 'to-teal-500/20',
    'from-green-500/20', 'via-teal-500/20', 'to-blue-500/20',
    'from-blue-500/20', 'via-indigo-500/20', 'to-violet-500/20',
    'from-violet-500/20', 'via-purple-500/20', 'to-fuchsia-500/20',
    'from-pink-500/20', 'via-rose-500/20',
    'from-cyan-500/20', 'via-sky-500/20', 'to-blue-500/20',
    'from-red-500/20', 'to-pink-500/20',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617'
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideIn': 'slideIn 0.5s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
