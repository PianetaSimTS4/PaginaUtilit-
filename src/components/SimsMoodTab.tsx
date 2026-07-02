import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  Moon, 
  Flame, 
  Users, 
  Smile, 
  Droplet, 
  Bath, 
  Trash2, 
  Coffee, 
  Gamepad2, 
  Play, 
  Pause, 
  Clock, 
  VolumeX, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function SimsMoodTab() {
  const [needs, setNeeds] = useState({
    hunger: 80,
    energy: 70,
    hygiene: 90,
    fun: 65,
    social: 75,
    bladder: 85
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [logMessages, setLogMessages] = useState<string[]>(['Il Sim è sveglio e pronto a iniziare la giornata!']);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Slowly drain needs over time
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setNeeds((prev) => {
          const drain = {
            hunger: prev.hunger > 0 ? prev.hunger - 1.5 : 0,
            energy: prev.energy > 0 ? prev.energy - 1 : 0,
            hygiene: prev.hygiene > 0 ? prev.hygiene - 1.2 : 0,
            fun: prev.fun > 0 ? prev.fun - 1.3 : 0,
            social: prev.social > 0 ? prev.social - 0.8 : 0,
            bladder: prev.bladder > 0 ? prev.bladder - 1.4 : 0
          };

          // Trigger warnings in logs
          if (prev.hunger > 15 && drain.hunger <= 15) {
            addLog('⚠️ Il tuo Sim sta morendo di fame! Prepara qualcosa da mangiare!');
          }
          if (prev.energy > 15 && drain.energy <= 15) {
            addLog('💤 Il tuo Sim ha un sonno tremendo, rischia di svenire a terra!');
          }
          if (prev.bladder > 15 && drain.bladder <= 15) {
            addLog('🚽 Urgenza idraulica imminente! Corri in bagno!');
          }

          return {
            hunger: Math.max(0, parseFloat(drain.hunger.toFixed(1))),
            energy: Math.max(0, parseFloat(drain.energy.toFixed(1))),
            hygiene: Math.max(0, parseFloat(drain.hygiene.toFixed(1))),
            fun: Math.max(0, parseFloat(drain.fun.toFixed(1))),
            social: Math.max(0, parseFloat(drain.social.toFixed(1))),
            bladder: Math.max(0, parseFloat(drain.bladder.toFixed(1)))
          };
        });
      }, 1500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const addLog = (message: string) => {
    setLogMessages((prev) => [message, ...prev.slice(0, 4)]);
  };

  // Actions
  const handleAction = (actionType: 'eat' | 'sleep' | 'shower' | 'play' | 'chat' | 'bathroom') => {
    setNeeds((prev) => {
      let updated = { ...prev };
      switch (actionType) {
        case 'eat':
          updated.hunger = Math.min(100, prev.hunger + 45);
          updated.hygiene = Math.max(0, prev.hygiene - 5);
          updated.bladder = Math.max(0, prev.bladder - 10);
          addLog('🥪 Il tuo Sim ha preparato e gustato un delizioso panino al formaggio!');
          break;
        case 'sleep':
          updated.energy = Math.min(100, prev.energy + 55);
          updated.hunger = Math.max(0, prev.hunger - 10);
          addLog('🛌 Il tuo Sim ha fatto un pisolino rigenerante nel letto comodo.');
          break;
        case 'shower':
          updated.hygiene = Math.min(100, prev.hygiene + 60);
          updated.energy = Math.max(0, prev.energy - 5);
          updated.fun = Math.min(100, prev.fun + 5);
          addLog('🚿 Doccia rinfrescante completata. Sentore di pulito!');
          break;
        case 'play':
          updated.fun = Math.min(100, prev.fun + 50);
          updated.energy = Math.max(0, prev.energy - 12);
          updated.social = Math.max(0, prev.social - 5);
          addLog('🎮 Il tuo Sim ha giocato a "The Sims 4" al PC guadagnando divertimento!');
          break;
        case 'chat':
          updated.social = Math.min(100, prev.social + 45);
          updated.fun = Math.min(100, prev.fun + 10);
          updated.energy = Math.max(0, prev.energy - 8);
          addLog('📞 Chiacchierata al telefono con un amico d\'infanzia.');
          break;
        case 'bathroom':
          updated.bladder = Math.min(100, prev.bladder + 75);
          updated.hygiene = Math.max(0, prev.hygiene - 8);
          addLog('🚽 Sospiro di sollievo! Il bagno ha fatto il suo dovere.');
          break;
      }
      return updated;
    });
  };

  const cheatFillNeeds = () => {
    setNeeds({
      hunger: 100,
      energy: 100,
      hygiene: 100,
      fun: 100,
      social: 100,
      bladder: 100
    });
    addLog('✨ CHEAT ATTIVATO: "sims.fill_all_commodities"! Bisogni al massimo!');
  };

  // Calculate mood based on average of all needs
  const avgNeeds = (needs.hunger + needs.energy + needs.hygiene + needs.fun + needs.social + needs.bladder) / 6;

  let moodState = {
    label: 'Felice',
    color: 'text-plumbob-green',
    bg: 'bg-emerald-500',
    border: 'border-emerald-200',
    glowing: 'shadow-emerald-200/50',
    plumbobColor: 'bg-plumbob-green'
  };

  if (needs.hunger < 15 || needs.energy < 15 || needs.bladder < 15) {
    moodState = {
      label: 'URGENTE / DISASTRO',
      color: 'text-plumbob-red font-black animate-pulse',
      bg: 'bg-rose-600',
      border: 'border-rose-300',
      glowing: 'shadow-rose-400/50',
      plumbobColor: 'bg-plumbob-red'
    };
  } else if (avgNeeds < 40) {
    moodState = {
      label: 'Molto Triste',
      color: 'text-indigo-600 font-bold',
      bg: 'bg-indigo-500',
      border: 'border-indigo-200',
      glowing: 'shadow-indigo-200/50',
      plumbobColor: 'bg-[#00adb5]'
    };
  } else if (avgNeeds < 70) {
    moodState = {
      label: 'Teso / Stressato',
      color: 'text-amber-600 font-semibold',
      bg: 'bg-amber-500',
      border: 'border-amber-200',
      glowing: 'shadow-amber-200/50',
      plumbobColor: 'bg-plumbob-yellow'
    };
  }

  // Bar progress colors
  const getBarColor = (value: number) => {
    if (value <= 20) return 'bg-plumbob-red';
    if (value <= 50) return 'bg-plumbob-yellow';
    return 'bg-plumbob-green';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left side: Need bars & State */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">
              Simulatore in Tempo Reale
            </span>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-1.5">
              Bisogni del Sim
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isPlaying 
                  ? 'bg-amber-50 border-amber-200 text-amber-600'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-600'
              }`}
              title={isPlaying ? "Metti in pausa il tempo" : "Avvia il tempo"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={cheatFillNeeds}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
              title="Attiva cheat codice"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
              Fill Needs
            </button>
          </div>
        </div>

        {/* The Grid of Needs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hunger */}
          <div className="p-3.5 rounded-xl border border-slate-50 bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Utensils className="w-3.5 h-3.5 text-slate-400" />
                Fame (Hunger)
              </span>
              <span className="text-slate-500">{Math.round(needs.hunger)}%</span>
            </div>
            <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${getBarColor(needs.hunger)}`}
                style={{ width: `${needs.hunger}%` }}
              />
            </div>
          </div>

          {/* Energy */}
          <div className="p-3.5 rounded-xl border border-slate-50 bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Moon className="w-3.5 h-3.5 text-slate-400" />
                Energia (Energy)
              </span>
              <span className="text-slate-500">{Math.round(needs.energy)}%</span>
            </div>
            <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${getBarColor(needs.energy)}`}
                style={{ width: `${needs.energy}%` }}
              />
            </div>
          </div>

          {/* Hygiene */}
          <div className="p-3.5 rounded-xl border border-slate-50 bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Bath className="w-3.5 h-3.5 text-slate-400" />
                Igiene (Hygiene)
              </span>
              <span className="text-slate-500">{Math.round(needs.hygiene)}%</span>
            </div>
            <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${getBarColor(needs.hygiene)}`}
                style={{ width: `${needs.hygiene}%` }}
              />
            </div>
          </div>

          {/* Fun */}
          <div className="p-3.5 rounded-xl border border-slate-50 bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Gamepad2 className="w-3.5 h-3.5 text-slate-400" />
                Divertimento (Fun)
              </span>
              <span className="text-slate-500">{Math.round(needs.fun)}%</span>
            </div>
            <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${getBarColor(needs.fun)}`}
                style={{ width: `${needs.fun}%` }}
              />
            </div>
          </div>

          {/* Social */}
          <div className="p-3.5 rounded-xl border border-slate-50 bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                Socialità (Social)
              </span>
              <span className="text-slate-500">{Math.round(needs.social)}%</span>
            </div>
            <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${getBarColor(needs.social)}`}
                style={{ width: `${needs.social}%` }}
              />
            </div>
          </div>

          {/* Bladder */}
          <div className="p-3.5 rounded-xl border border-slate-50 bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Droplet className="w-3.5 h-3.5 text-slate-400" />
                Vescica (Bladder)
              </span>
              <span className="text-slate-500">{Math.round(needs.bladder)}%</span>
            </div>
            <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${getBarColor(needs.bladder)}`}
                style={{ width: `${needs.bladder}%` }}
              />
            </div>
          </div>
        </div>

        {/* Live log Console */}
        <div className="border border-slate-100 bg-slate-900 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-emerald-400 space-y-1.5 shadow-inner">
          <div className="flex justify-between border-b border-slate-800 pb-1.5 text-slate-500 text-[10px] uppercase font-bold">
            <span>Log Attività del Sim</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {isPlaying ? 'tempo che scorre' : 'pausa'}
            </span>
          </div>
          <div className="space-y-1 h-24 overflow-y-auto">
            {logMessages.map((msg, index) => (
              <div key={index} className={index === 0 ? 'text-white font-bold' : 'opacity-60'}>
                &gt; {msg}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Plumbob visualizer & Interactive actions */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Dynamic Plumbob preview */}
        <div className={`p-6 border rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden bg-slate-50/50 ${moodState.border} transition-all duration-500`}>
          {/* Glowing floating plumbob marker */}
          <div className="relative w-16 h-28 flex items-center justify-center float-animation">
            <div className={`absolute w-24 h-24 rounded-full blur-3xl opacity-30 ${moodState.bg} -z-10`} />
            
            {/* Spinning Diamond */}
            <div className="spin-y-slow w-12 h-20 relative">
              <svg viewBox="0 0 100 160" className={`w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}>
                <polygon points="50,10 85,80 50,80" fill={moodState.plumbobColor} opacity="0.95" />
                <polygon points="50,10 15,80 50,80" fill={moodState.plumbobColor} opacity="0.8" />
                <polygon points="50,150 85,80 50,80" fill={moodState.plumbobColor} opacity="0.9" />
                <polygon points="50,150 15,80 50,80" fill={moodState.plumbobColor} opacity="0.75" />
              </svg>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Umore Generale</span>
            <h4 className={`text-xl font-black ${moodState.color} uppercase tracking-tight transition-colors duration-500`}>
              {moodState.label}
            </h4>
          </div>
        </div>

        {/* Actions Button Panel */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
            Soddisfa i bisogni:
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleAction('eat')}
              className="flex items-center gap-2 p-2.5 bg-white border border-slate-100 hover:border-plumbob-green rounded-xl text-xs font-semibold text-slate-700 hover:text-plumbob-green transition-all shadow-sm cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-orange-400" />
              Fai un panino
            </button>

            <button
              onClick={() => handleAction('sleep')}
              className="flex items-center gap-2 p-2.5 bg-white border border-slate-100 hover:border-plumbob-green rounded-xl text-xs font-semibold text-slate-700 hover:text-plumbob-green transition-all shadow-sm cursor-pointer"
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              Fai un pisolino
            </button>

            <button
              onClick={() => handleAction('shower')}
              className="flex items-center gap-2 p-2.5 bg-white border border-slate-100 hover:border-plumbob-green rounded-xl text-xs font-semibold text-slate-700 hover:text-plumbob-green transition-all shadow-sm cursor-pointer"
            >
              <Bath className="w-4 h-4 text-sky-400" />
              Fai una doccia
            </button>

            <button
              onClick={() => handleAction('play')}
              className="flex items-center gap-2 p-2.5 bg-white border border-slate-100 hover:border-plumbob-green rounded-xl text-xs font-semibold text-slate-700 hover:text-plumbob-green transition-all shadow-sm cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4 text-purple-400" />
              Gioca al PC
            </button>

            <button
              onClick={() => handleAction('chat')}
              className="flex items-center gap-2 p-2.5 bg-white border border-slate-100 hover:border-plumbob-green rounded-xl text-xs font-semibold text-slate-700 hover:text-plumbob-green transition-all shadow-sm cursor-pointer"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              Parla al cell
            </button>

            <button
              onClick={() => handleAction('bathroom')}
              className="flex items-center gap-2 p-2.5 bg-white border border-slate-100 hover:border-plumbob-green rounded-xl text-xs font-semibold text-slate-700 hover:text-plumbob-green transition-all shadow-sm cursor-pointer"
            >
              <Droplet className="w-4 h-4 text-blue-400" />
              Usa il bagno
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
