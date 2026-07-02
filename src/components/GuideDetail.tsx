import React from 'react';
import { Guide } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, Award, CornerDownRight } from 'lucide-react';

interface GuideDetailProps {
  guide: Guide;
  onBack: () => void;
}

export default function GuideDetail({ guide, onBack }: GuideDetailProps) {
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* Back navigation */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-fluo-green bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna alle guide
        </button>
      </div>

      {/* Main post page card */}
      <div className={`bg-space-card rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl ${shadowClasses[guide.category]}`}>
        {/* Header tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${categoryColors[guide.category]}`}>
            {categoryLabels[guide.category]}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
          {guide.title}
        </h1>

        {/* Divider */}
        <div className="border-b border-slate-800/80 my-6"></div>

        {/* Intro description */}
        <div className="p-4 bg-slate-900/50 border-l-4 border-fluo-green rounded-r-lg text-slate-300 text-sm md:text-base leading-relaxed italic mb-8">
          {guide.description}
        </div>

        {/* Content list / Steps */}
        <div className="space-y-6 mb-8">
          {guide.content.map((paragraph, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-7 h-7 bg-emerald-500/10 text-fluo-green border border-fluo-green/20 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 shadow-[0_0_8px_rgba(38,255,94,0.1)]">
                {index + 1}
              </div>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed pt-0.5">
                {paragraph}
              </p>
            </div>
          ))}
        </div>

        {/* Tips box */}
        {guide.tips && guide.tips.length > 0 && (
          <div className="p-5 md:p-6 bg-purple-500/5 border border-fluo-purple/20 rounded-2xl space-y-3 mb-8">
            <h4 className="text-sm md:text-base font-bold text-fluo-purple flex items-center gap-1.5">
              <Award className="w-5 h-5 text-fluo-purple" />
              Consigli Pro del Creatore
            </h4>
            <ul className="space-y-2.5">
              {guide.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-300 leading-relaxed">
                  <CornerDownRight className="w-4 h-4 text-fluo-green shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer tag pill row (No author/time per instructions) */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap gap-1.5">
          {guide.tags.map((tag, idx) => (
            <span key={idx} className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
