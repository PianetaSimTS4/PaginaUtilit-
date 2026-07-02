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
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <strong className="block text-sm font-bold mb-0.5">Come usare i trucchi in gioco:</strong>
          Prima di inserire la maggior parte dei trucchi, apri la console dei comandi premendo <strong>Ctrl + Shift + C</strong> (PC/Mac) o i quattro grilletti sul controller (PlayStation/Xbox), digita <strong>testingcheats true</strong> e premi Invio. Questo abiliterà la modalità avanzata!
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cerca un trucco o comando..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-plumbob-green focus:border-transparent outline-none transition-all"
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
                  ? 'bg-plumbob-green text-white border-plumbob-green shadow-sm'
                  : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 hover:border-slate-200'
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
              className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:border-slate-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                    Categoria: {cheat.category}
                  </span>
                  {cheat.requirements && cheat.requirements !== 'Nessuno' && (
                    <span className="text-[9px] bg-red-50 text-red-600 border border-red-100 px-1.5 py-0.5 rounded font-medium">
                      Richiede {cheat.requirements}
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg flex items-center justify-between gap-4 mb-3">
                  <code className="text-xs font-mono font-bold text-slate-800 select-all leading-normal break-all">
                    {cheat.code}
                  </code>
                  <button
                    onClick={() => handleCopy(cheat.code)}
                    className={`p-1.5 rounded-md border transition-all cursor-pointer ${
                      copiedCode === cheat.code
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-500'
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

                <p className="text-xs text-slate-600 leading-relaxed">
                  {cheat.description}
                </p>
              </div>

              {copiedCode === cheat.code && (
                <div className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  Codice copiato negli appunti!
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white border border-slate-100 rounded-xl">
            <p className="text-slate-400 text-sm">Nessun trucco trovato corrispondente ai filtri inseriti.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 px-4 py-2 text-xs font-bold bg-plumbob-green text-white rounded-lg hover:bg-emerald-600 cursor-pointer"
            >
              Azzera Filtri
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
