/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme base
        'bg-primary': '#0F1222',
        'bg-secondary': '#151A2E',
        'bg-card': '#1A2038',
        'border-subtle': '#252B45',
        // Accent palette
        indigo: {
          DEFAULT: '#6366F1',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        teal: {
          DEFAULT: '#2DD4BF',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
        },
        amber: {
          warm: '#F59E0B',
        },
        pink: {
          soft: '#EC4899',
        },
        // Text
        'text-primary': '#FFFFFF',
        'text-body': '#E5E7EB',
        'text-muted': '#9CA3AF',
        // Light theme
        'light-bg': '#F8F7F5',
        'light-card': '#FFFFFF',
        'light-border': '#E5E7EB',
        'light-text': '#111827',
        'light-muted': '#6B7280',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        'brand-gradient-h': 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #2DD4BF 100%)',
        'mesh-gradient': 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.12) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(45,212,191,0.08) 0%, transparent 60%)',
      },
      boxShadow: {
        'glow-indigo': '0 0 30px rgba(99,102,241,0.25)',
        'glow-violet': '0 0 30px rgba(139,92,246,0.25)',
        'glow-teal': '0 0 20px rgba(45,212,191,0.20)',
        'card': '0 4px 24px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(99,102,241,0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'blob': 'blob 7s infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(45,212,191,0.4)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(45,212,191,0.6)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
