import React, { useState } from 'react';
import { Guide } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, User, Clock, ChevronRight, Award, Copy, Check, Star, CornerDownRight } from 'lucide-react';

interface GuideCardProps {
  key?: string;
  guide: Guide;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export default function GuideCard({ guide, isBookmarked, onToggleBookmark }: GuideCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Difficulty badge colors
  const diffColors = {
    Principiante: 'bg-emerald-500/10 text-fluo-green border-fluo-green/20',
    Intermedio: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Esperto: 'bg-fuchsia-500/10 text-fluo-fuchsia border-fluo-fuchsia/20'
  };

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
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className={`bg-space-card rounded-xl border border-slate-800 p-6 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group h-full ${shadowClasses[guide.category]}`}
      >
        <div>
          {/* Tags / Badges row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[guide.category]}`}>
              {categoryLabels[guide.category]}
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${diffColors[guide.difficulty]}`}>
                {guide.difficulty}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark();
                }}
                className={`p-1.5 rounded-lg border transition-all ${
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

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 mt-auto">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" />
              {guide.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {guide.readTime}
            </span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 text-xs font-semibold text-fluo-green hover:text-emerald-300 transition-colors py-1 pl-2 group-hover:translate-x-0.5 transition-transform duration-200"
          >
            Leggi
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Detail Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-space-card rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-800 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-800 sticky top-0 bg-space-card z-10 flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${categoryColors[guide.category]}`}>
                      {categoryLabels[guide.category]}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${diffColors[guide.difficulty]}`}>
                      Difficoltà: {guide.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-400">{guide.date}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {guide.title}
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-6">
                {/* Intro summary */}
                <div className="p-4 bg-slate-900/50 border-l-4 border-fluo-green rounded-r-lg text-slate-300 text-sm leading-relaxed italic">
                  {guide.description}
                </div>

                {/* Steps/Paragraphs */}
                <div className="space-y-4">
                  {guide.content.map((paragraph, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="w-6 h-6 bg-emerald-500/10 text-fluo-green border border-fluo-green/20 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-slate-200 text-sm leading-relaxed pt-0.5">
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tips Box */}
                {guide.tips && guide.tips.length > 0 && (
                  <div className="p-5 bg-purple-500/5 border border-fluo-purple/20 rounded-xl space-y-3">
                    <h4 className="text-sm font-bold text-fluo-purple flex items-center gap-1.5">
                      <Award className="w-4.5 h-4.5 text-fluo-purple" />
                      Consigli Pro del Creatore
                    </h4>
                    <ul className="space-y-2">
                      {guide.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                          <CornerDownRight className="w-3.5 h-3.5 text-fluo-green shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-4">
                    <span>Scritto da <strong className="text-slate-200">{guide.author}</strong></span>
                    <span>Tempo di lettura: <strong className="text-slate-200">{guide.readTime}</strong></span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                    {guide.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Chiudi Guida
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
