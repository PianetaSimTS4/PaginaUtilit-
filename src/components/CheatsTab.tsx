import { useState } from 'react';
import { cheatsData } from '../data/guides';
import { Cheat } from '../types';
import { motion } from 'motion/react';
import { Copy, Check, Search, ShieldAlert, Sparkles, Filter } from 'lucide-react';

export default function CheatsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Soldi' | 'Costruzione' | 'Bisogni/Stati' | 'Carriere/Abilità' | 'Generali'>('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories: ('All' | 'Soldi' | 'Costruzione' | 'Bisogni/Stati' | 'Carriere/Abilità' | 'Generali')[] = [
    'All', 'Soldi', 'Costruzione', 'Bisogni/Stati', 'Carriere/Abilità', 'Generali'
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const filteredCheats = cheatsData.filter((cheat) => {
    const matchesSearch = 
      cheat.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cheat.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || cheat.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Intro alert */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-start gap-3 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200 leading-relaxed">
          <strong className="block text-sm font-bold text-amber-300 mb-0.5">Come usare i trucchi in gioco:</strong>
          Prima di inserire la maggior parte dei trucchi, apri la console dei comandi premendo <strong>Ctrl + Shift + C</strong> (PC/Mac) o i quattro grilletti sul controller (PlayStation/Xbox), digita <strong className="text-fluo-green font-mono">testingcheats true</strong> e premi Invio. Questo abiliterà la modalità avanzata!
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-space-card p-4 rounded-xl border border-slate-800 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cerca un trucco o comando..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:ring-2 focus:ring-fluo-green focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Categories scroll area */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-fluo-green text-black border-fluo-green font-bold shadow-[0_0_12px_rgba(38,255,94,0.35)]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              {cat === 'All' ? 'Tutti i Trucchi' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cheats list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCheats.length > 0 ? (
          filteredCheats.map((cheat) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              key={cheat.code}
              className="bg-space-card rounded-xl border border-slate-800 p-5 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between neon-shadow-blue"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-fluo-blue">
                    Categoria: {cheat.category}
                  </span>
                  {cheat.requirements && cheat.requirements !== 'Nessuno' && (
                    <span className="text-[9px] bg-fuchsia-500/10 text-fluo-fuchsia border border-fluo-fuchsia/30 px-1.5 py-0.5 rounded font-medium">
                      Richiede {cheat.requirements}
                    </span>
                  )}
                </div>

                <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg flex items-center justify-between gap-4 mb-3">
                  <code className="text-xs font-mono font-bold text-white select-all leading-normal break-all">
                    {cheat.code}
                  </code>
                  <button
                    onClick={() => handleCopy(cheat.code)}
                    className={`p-1.5 rounded-md border transition-all cursor-pointer ${
                      copiedCode === cheat.code
                        ? 'bg-fluo-green border-fluo-green text-black'
                        : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
                    }`}
                    title="Copia codice negli appunti"
                  >
                    {copiedCode === cheat.code ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {cheat.description}
                </p>
              </div>

              {copiedCode === cheat.code && (
                <div className="text-[10px] text-fluo-green font-bold mt-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-fluo-green" />
                  Codice copiato negli appunti!
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-space-card border border-slate-800 rounded-xl">
            <p className="text-slate-400 text-sm">Nessun trucco trovato corrispondente ai filtri inseriti.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 px-4 py-2 text-xs font-bold bg-fluo-green text-black rounded-lg hover:bg-emerald-400 cursor-pointer"
            >
              Azzera Filtri
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
