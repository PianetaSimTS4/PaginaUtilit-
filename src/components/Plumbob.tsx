import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PlumbobProps {
  interactive?: boolean;
}

export default function Plumbob({ interactive = true }: PlumbobProps) {
  const [mood, setMood] = useState<'happy' | 'tense' | 'sad' | 'angry'>('happy');

  const moods = {
    happy: {
      color: 'from-[#2cc04c] to-[#10b981]',
      glow: 'shadow-[0_0_30px_rgba(44,192,76,0.8)]',
      glowingBg: 'bg-[#2cc04c]/20',
      textColor: 'text-[#2cc04c]',
      label: 'Felice',
      desc: 'Il tuo Sim è di ottimo umore! Tutti i bisogni sono soddisfatti.'
    },
    tense: {
      color: 'from-[#f1c40f] to-[#d4ac0d]',
      glow: 'shadow-[0_0_30px_rgba(241,196,15,0.8)]',
      glowingBg: 'bg-[#f1c40f]/20',
      textColor: 'text-[#f1c40f]',
      label: 'Teso',
      desc: 'Il tuo Sim ha bisogno di divertimento o di riposare un po\'.'
    },
    sad: {
      color: 'from-[#00adb5] to-[#0ea5e9]',
      glow: 'shadow-[0_0_30px_rgba(0,173,181,0.8)]',
      glowingBg: 'bg-[#00adb5]/20',
      textColor: 'text-[#00adb5]',
      label: 'Triste',
      desc: 'Il tuo Sim si sente giù. Fagli fare una chiacchierata consolante.'
    },
    angry: {
      color: 'from-[#e74c3c] to-[#c0392b]',
      glow: 'shadow-[0_0_30px_rgba(231,76,60,0.8)]',
      glowingBg: 'bg-[#e74c3c]/20',
      textColor: 'text-[#e74c3c]',
      label: 'Furioso',
      desc: 'Attenzione! Bisogno idraulico o fame critica. Intervieni subito!'
    }
  };

  const handlePlumbobClick = () => {
    if (!interactive) return;
    const moodKeys: ('happy' | 'tense' | 'sad' | 'angry')[] = ['happy', 'tense', 'sad', 'angry'];
    const currentIndex = moodKeys.indexOf(mood);
    const nextIndex = (currentIndex + 1) % moodKeys.length;
    setMood(moodKeys[nextIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden h-full">
      {/* Decorative Background Glow */}
      <div className={`absolute w-48 h-48 rounded-full blur-3xl transition-all duration-700 ${moods[mood].glowingBg} -z-10`} />

      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">
        Interagisci col Plumbob
      </h3>

      {/* Plumbob 3D-Like Shape container */}
      <div 
        onClick={handlePlumbobClick}
        className={`cursor-pointer float-animation select-none relative w-24 h-40 flex items-center justify-center transition-all duration-300`}
        title={interactive ? "Clicca per cambiare umore del Sim!" : undefined}
      >
        <motion.div
          className="spin-y-slow relative w-full h-full flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Double Octahedron SVG representation */}
          <svg
            viewBox="0 0 100 160"
            className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
          >
            <defs>
              <linearGradient id={`g-top-left-${mood}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mood === 'happy' ? '#a7f3d0' : mood === 'tense' ? '#fef08a' : mood === 'sad' ? '#bae6fd' : '#fca5a5'} />
                <stop offset="100%" stopColor={mood === 'happy' ? '#10b981' : mood === 'tense' ? '#f1c40f' : mood === 'sad' ? '#00adb5' : '#e74c3c'} />
              </linearGradient>
              <linearGradient id={`g-top-right-${mood}`} x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={mood === 'happy' ? '#34d399' : mood === 'tense' ? '#fde047' : mood === 'sad' ? '#38bdf8' : '#f87171'} />
                <stop offset="100%" stopColor={mood === 'happy' ? '#059669' : mood === 'tense' ? '#d4ac0d' : mood === 'sad' ? '#0284c7' : '#c0392b'} />
              </linearGradient>
              <linearGradient id={`g-bottom-left-${mood}`} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={mood === 'happy' ? '#047857' : mood === 'tense' ? '#b7950b' : mood === 'sad' ? '#0369a1' : '#962d22'} />
                <stop offset="100%" stopColor={mood === 'happy' ? '#10b981' : mood === 'tense' ? '#f1c40f' : mood === 'sad' ? '#00adb5' : '#e74c3c'} />
              </linearGradient>
              <linearGradient id={`g-bottom-right-${mood}`} x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={mood === 'happy' ? '#064e3b' : mood === 'tense' ? '#7d6608' : mood === 'sad' ? '#075985' : '#78231c'} />
                <stop offset="100%" stopColor={mood === 'happy' ? '#059669' : mood === 'tense' ? '#d4ac0d' : mood === 'sad' ? '#0284c7' : '#c0392b'} />
              </linearGradient>
            </defs>

            {/* Top Pyramid */}
            {/* Front Right Face */}
            <path d="M 50,10 L 85,80 L 50,80 Z" fill={`url(#g-top-right-${mood})`} opacity="0.95" />
            {/* Front Left Face */}
            <path d="M 50,10 L 15,80 L 50,80 Z" fill={`url(#g-top-left-${mood})`} opacity="0.85" />
            {/* Back Right Face */}
            <path d="M 50,10 L 85,80 L 50,80 Z" fill={`url(#g-top-right-${mood})`} opacity="0.6" transform="scale(-1, 1) translate(-100, 0)" />
            {/* Back Left Face */}
            <path d="M 50,10 L 15,80 L 50,80 Z" fill={`url(#g-top-left-${mood})`} opacity="0.5" transform="scale(-1, 1) translate(-100, 0)" />

            {/* Bottom Pyramid */}
            {/* Front Right Face */}
            <path d="M 50,150 L 85,80 L 50,80 Z" fill={`url(#g-bottom-right-${mood})`} opacity="0.95" />
            {/* Front Left Face */}
            <path d="M 50,150 L 15,80 L 50,80 Z" fill={`url(#g-bottom-left-${mood})`} opacity="0.85" />
            {/* Back Right Face */}
            <path d="M 50,150 L 85,80 L 50,80 Z" fill={`url(#g-bottom-right-${mood})`} opacity="0.6" transform="scale(-1, 1) translate(-100, 0)" />
            {/* Back Left Face */}
            <path d="M 50,150 L 15,80 L 50,80 Z" fill={`url(#g-bottom-left-${mood})`} opacity="0.5" transform="scale(-1, 1) translate(-100, 0)" />
          </svg>
        </motion.div>
      </div>

      <div className="text-center mt-6">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className={`inline-block w-2.5 h-2.5 rounded-full bg-current ${moods[mood].textColor}`} />
          <h4 className={`text-lg font-bold tracking-tight transition-colors duration-300 ${moods[mood].textColor}`}>
            Stato: {moods[mood].label}
          </h4>
        </div>
        <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
          {moods[mood].desc}
        </p>
      </div>

      {interactive && (
        <span className="text-[10px] text-slate-400 mt-4 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
          Clicca il Plumbob per cambiare umore
        </span>
      )}
    </div>
  );
}
