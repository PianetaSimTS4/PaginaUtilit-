import React from 'react';
import { Guide } from '../types';
import { motion } from 'motion/react';
import { ChevronRight, Star } from 'lucide-react';

interface GuideCardProps {
  key?: string;
  guide: Guide;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onRead: () => void;
}

export default function GuideCard({ guide, isBookmarked, onToggleBookmark, onRead }: GuideCardProps) {
  const categoryLabels = {
    gameplay: 'Gameplay',
    costruzione: 'Costruzioni',
    trucchi: 'Trucchi',
    mod_cc: 'Mod & CC',
    espansioni: 'Espansioni'
  };

  const categoryColors = {
    gameplay: 'bg-purple-500/10 text-fluo-purple border-fluo-purple/30',
    costruzione: 'bg-emerald-500/10 text-fluo-green border-fluo-green/30',
    trucchi: 'bg-fuchsia-500/10 text-fluo-fuchsia border-fluo-fuchsia/30',
    mod_cc: 'bg-cyan-500/10 text-fluo-blue border-fluo-blue/30',
    espansioni: 'bg-purple-500/10 text-fluo-purple border-fluo-purple/30'
  };

  const shadowClasses = {
    gameplay: 'neon-shadow-purple',
    costruzione: 'neon-shadow-green',
    trucchi: 'neon-shadow-fuchsia',
    mod_cc: 'neon-shadow-blue',
    espansioni: 'neon-shadow-purple'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className={`bg-space-card rounded-xl border border-slate-800 p-6 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group h-full cursor-pointer ${shadowClasses[guide.category]}`}
      onClick={onRead}
    >
      <div>
        {/* Tags / Badges row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[guide.category]}`}>
            {categoryLabels[guide.category]}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark();
              }}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title={isBookmarked ? "Rimuovi dai Preferiti" : "Salva nei Preferiti"}
            >
              <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-fluo-green transition-colors duration-200 mb-2">
          {guide.title}
        </h3>

        <p className="text-sm text-slate-300 line-clamp-3 mb-4 leading-relaxed">
          {guide.description}
        </p>

        {/* Tags in cards */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {guide.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] text-slate-400 bg-slate-900/50 border border-slate-800 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
          {guide.tags.length > 3 && (
            <span className="text-[10px] text-slate-400 bg-slate-900/50 border border-slate-800 px-1.5 py-0.5 rounded">
              +{guide.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer info (Author & Time removed per user instructions) */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-end text-xs text-slate-400 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRead();
          }}
          className="flex items-center gap-1 text-xs font-semibold text-fluo-green hover:text-emerald-300 transition-colors py-1 pl-2 group-hover:translate-x-0.5 transition-transform duration-200"
        >
          Leggi Guida
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

