import { useState } from 'react';
import { quizQuestions, traitDescriptions, aspirationDescriptions } from '../data/guides';
import { QuizQuestion } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Smile, Heart, Trophy, Compass, ShieldCheck } from 'lucide-react';

export default function QuizTab() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<{ traits: string[]; aspiration: string }[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [result, setResult] = useState<{ trait: string; aspiration: string } | null>(null);

  const handleAnswerSelect = (option: { traits: string[]; aspiration: string }) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate final results
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (allAnswers: { traits: string[]; aspiration: string }[]) => {
    // Count traits frequency
    const traitCounts: Record<string, number> = {};
    const aspCounts: Record<string, number> = {};

    allAnswers.forEach((ans) => {
      ans.traits.forEach((t) => {
        traitCounts[t] = (traitCounts[t] || 0) + 1;
      });
      aspCounts[ans.aspiration] = (aspCounts[ans.aspiration] || 0) + 1;
    });

    // Find highest trait
    let bestTrait = 'Genio'; // fallback
    let maxTraitCount = 0;
    Object.entries(traitCounts).forEach(([trait, count]) => {
      if (count > maxTraitCount) {
        maxTraitCount = count;
        bestTrait = trait;
      }
    });

    // Find highest aspiration
    let bestAsp = 'Cervello Straordinario'; // fallback
    let maxAspCount = 0;
    Object.entries(aspCounts).forEach(([asp, count]) => {
      if (count > maxAspCount) {
        maxAspCount = count;
        bestAsp = asp;
      }
    });

    setResult({
      trait: bestTrait,
      aspiration: bestAsp
    });
    setQuizFinished(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setQuizFinished(false);
    setResult(null);
  };

  const activeQuestion = quizQuestions[currentQuestionIdx];
  const progressPercent = Math.round((currentQuestionIdx / quizQuestions.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8 max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Header info */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-plumbob-green">
                Personalità del Simmer
              </span>
              <h3 className="text-xl font-black text-slate-800">
                Test: Che Sim Sei?
              </h3>
              {/* Progress bar */}
              <div className="pt-2">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                  <span>Domanda {currentQuestionIdx + 1} di {quizQuestions.length}</span>
                  <span>{progressPercent}% completato</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-plumbob-green h-full transition-all duration-300" 
                    style={{ width: `${Math.max(10, progressPercent)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question Text */}
            <div className="py-4">
              <h4 className="text-base font-bold text-slate-800 leading-snug">
                {activeQuestion.question}
              </h4>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {activeQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(opt)}
                  className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-plumbob-green hover:bg-emerald-50/20 transition-all text-xs text-slate-700 font-semibold leading-relaxed shadow-sm hover:shadow cursor-pointer flex items-center justify-between group"
                >
                  <span>{opt.text}</span>
                  <span className="w-5 h-5 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-[10px] text-slate-400 font-extrabold group-hover:bg-plumbob-green group-hover:text-white group-hover:border-plumbob-green transition-all shrink-0 ml-3">
                    {String.fromCharCode(65 + idx)}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-4"
          >
            {/* Visual Header */}
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-emerald-50 text-plumbob-green border-2 border-emerald-100 rounded-full flex items-center justify-center mx-auto relative shadow-inner">
                <Smile className="w-10 h-10" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white p-1.5 rounded-full border border-white animate-bounce">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-800">
                Profilo Sim Pronto!
              </h3>
              <p className="text-xs text-slate-400">
                Ecco il carattere e l’aspirazione ideali basati sulle tue scelte.
              </p>
            </div>

            {/* Main Result Cards */}
            <div className="space-y-4">
              {/* Trait Card */}
              <div className="p-5 bg-gradient-to-r from-emerald-50/60 to-teal-50/40 rounded-2xl border border-emerald-100 text-left space-y-2">
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  Tratto Distintivo
                </span>
                <h4 className="text-lg font-extrabold text-slate-800">
                  {result?.trait}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {result ? traitDescriptions[result.trait] : ''}
                </p>
              </div>

              {/* Aspiration Card */}
              <div className="p-5 bg-gradient-to-r from-amber-50/60 to-orange-50/40 rounded-2xl border border-amber-100 text-left space-y-2">
                <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  Aspirazione di Vita
                </span>
                <h4 className="text-lg font-extrabold text-slate-800">
                  {result?.aspiration}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {result ? aspirationDescriptions[result.aspiration] : ''}
                </p>
              </div>
            </div>

            {/* Matches and Retry */}
            <div className="pt-4 border-t border-slate-50 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-slate-300" />
                Compatibilità al 100% con The Sims 4
              </span>
              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-plumbob-green hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm shadow-emerald-100"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Rifai il Test
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
