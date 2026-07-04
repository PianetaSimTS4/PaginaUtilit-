import { useState, useEffect } from 'react';
import { guidesData } from './data/guides';
import { Guide } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Star, 
  HelpCircle, 
  Sparkles, 
  Compass, 
  FileText, 
  PenTool, 
  Info,
  ChevronRight,
  Filter,
  Check,
  Award,
  ChevronLeft,
  Send,
  Globe,
  Flame,
  Activity,
  ExternalLink,
  MessageCircle,
  Wrench,
  AlertCircle
} from 'lucide-react';

// Components
import GuideCard from './components/GuideCard';
import CheatsTab from './components/CheatsTab';
import GuideDetail from './components/GuideDetail';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guides' | 'cheats'>('guides');
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [logoSrcIndex, setLogoSrcIndex] = useState(0);
  const logoPaths = [
    '/images/logo.png',
    '/logo.png',
    '/logo.PNG',
    '/images/logo.PNG',
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Real Local-storage state for Custom submitted guides & Bookmarks
  const [guides, setGuides] = useState<Guide[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Initialize data on load
  useEffect(() => {
    // 1. Load bookmarks
    try {
      const storedBookmarks = localStorage.getItem('pianetasim_bookmarks');
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (e) {
      console.error("Could not load bookmarks", e);
    }

    // 2. Load custom submitted guides from localstorage and merge
    try {
      const storedCustom = localStorage.getItem('pianetasim_custom_guides');
      const customList = storedCustom ? JSON.parse(storedCustom) : [];
      setGuides([...guidesData, ...customList]);
    } catch (e) {
      setGuides(guidesData);
    }
  }, []);

  const handleToggleBookmark = (guideId: string) => {
    const updated = bookmarks.includes(guideId)
      ? bookmarks.filter(id => id !== guideId)
      : [...bookmarks, guideId];
    
    setBookmarks(updated);
    localStorage.setItem('pianetasim_bookmarks', JSON.stringify(updated));
  };

  const handleAddCustomGuide = (newGuide: Guide) => {
    try {
      const storedCustom = localStorage.getItem('pianetasim_custom_guides');
      const customList = storedCustom ? JSON.parse(storedCustom) : [];
      const updatedCustom = [newGuide, ...customList];
      localStorage.setItem('pianetasim_custom_guides', JSON.stringify(updatedCustom));
      
      // Update local state instantly
      setGuides([newGuide, ...guides]);
    } catch (e) {
      console.error(e);
      // fallback to state only if localstorage is full/blocked
      setGuides([newGuide, ...guides]);
    }
  };

  // Filter guides
  const filteredGuides = guides.filter((g) => {
    const matchesSearch = 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || g.category === selectedCategory;
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(g.id);

    return matchesSearch && matchesCategory && matchesBookmark;
  });

  const getCategoryCount = (category: string) => {
    if (category === 'all') return guides.length;
    return guides.filter(g => g.category === category).length;
  };

  return (
    <div className="min-h-screen bg-space-dark text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Dynamic Cosmic Space Background Layers */}
      <div className="space-bg"></div>

      {/* 1. Header/Navbar */}
      <header className="bg-space-dark/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            {logoSrcIndex < logoPaths.length ? (
              <img 
                src={logoPaths[logoSrcIndex]} 
                alt="PianetaSim Logo" 
                onError={() => setLogoSrcIndex(prev => prev + 1)}
                className="h-11 w-auto object-contain shrink-0 float-animation"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-[#2cc04c] to-[#10b981] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(38,255,94,0.4)] float-animation shrink-0">
                <svg viewBox="0 0 100 160" className="w-5 h-8">
                  <polygon points="50,10 85,80 50,80" fill="#ffffff" opacity="0.95" />
                  <polygon points="50,10 15,80 50,80" fill="#ffffff" opacity="0.8" />
                  <polygon points="50,150 85,80 50,80" fill="#ffffff" opacity="0.9" />
                  <polygon points="50,150 15,80 50,80" fill="#ffffff" opacity="0.75" />
                </svg>
              </div>
            )}
            <div>
              <h1 className="text-xl font-black text-white tracking-tight leading-none">
                PianetaSim
              </h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex flex-wrap items-center gap-1 md:gap-2 justify-center sm:justify-start">
            <a
              href="https://pianetasimts.github.io/PianetaSim/index.html"
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700/50"
            >
              Home
            </a>
            <a
              href="https://pianetasimts.github.io/PianetaSim/mod.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700/50 flex items-center gap-1 group"
            >
              Mod & Traduzioni
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-fluo-blue transition-colors" />
            </a>
            <a
              href="https://pianetasimts.github.io/PianetaSim/mod18.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700/50 flex items-center gap-1 group"
            >
              Mod & Traduzioni 18+
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-fluo-fuchsia transition-colors" />
            </a>
            <a
              href="https://pianetasimts.github.io/PianetaSim/animazioniww18.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700/50 flex items-center gap-1 group"
            >
              Animazioni
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-fluo-purple transition-colors" />
            </a>
            <button
              onClick={() => setIsHelpOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700/50 flex items-center gap-1"
            >
              Help Sim
            </button>
            <a
              href="https://pianetasimts.github.io/PianetaSim/storie.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700/50 flex items-center gap-1 group"
            >
              Racconti
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-500 transition-colors" />
            </a>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section / Banner */}
      <section className="relative border-b border-slate-900/60 py-12 px-4 md:px-8 bg-slate-950/20">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Main Hero Headline */}
          <div className="max-w-3xl space-y-4 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-fluo-green text-xs font-bold rounded-full border border-fluo-green/20 shadow-[0_0_10px_rgba(38,255,94,0.15)]">
              <Sparkles className="w-3.5 h-3.5 fill-current text-fluo-green" />
              Sito Ufficiale PianetaSim - Sezione Guide HTML
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none md:leading-tight">
              Tutto quello che devi sapere su <span className="text-fluo-green drop-shadow-[0_0_10px_rgba(38,255,94,0.3)] whitespace-nowrap">The Sims 4</span>
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed text-center">
              Benvenuto nella sezione delle guide interattive di PianetaSim! Impara nuove tecniche di costruzione dei tetti, sblocca carriere segrete e copia trucchi con un solo click.
            </p>
            {/* Quick access bookmarks banner */}
            {bookmarks.length > 0 && (
              <div className="pt-2">
                <button
                  onClick={() => { setActiveTab('guides'); setActiveGuideId(null); setShowBookmarksOnly(true); }}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 px-3.5 py-2 rounded-lg border border-amber-500/30 hover:bg-amber-500/20 transition-colors cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                >
                  <Star className="w-4 h-4 fill-current text-amber-400" />
                  Visualizza i tuoi {bookmarks.length} Preferiti salvati
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 relative z-10">
        {/* Section Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/80 flex items-center gap-1.5 shadow-2xl backdrop-blur-md">
            <button
              onClick={() => { setActiveTab('guides'); setActiveGuideId(null); setShowBookmarksOnly(false); }}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'guides' && !showBookmarksOnly
                  ? 'bg-gradient-to-r from-fluo-purple to-purple-600 text-white shadow-[0_0_20px_rgba(176,38,255,0.4)] border border-fluo-purple/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Guide Complete
            </button>
            <button
              onClick={() => { setActiveTab('cheats'); setActiveGuideId(null); }}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'cheats'
                  ? 'bg-gradient-to-r from-fluo-green to-emerald-600 text-black shadow-[0_0_20px_rgba(38,255,94,0.4)] border border-fluo-green/30 font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Database Trucchi
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: GUIDES LIST */}
          {activeTab === 'guides' && (
            <motion.div
              key="guides"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col items-stretch"
            >
              {activeGuideId ? (
                <div className="w-full">
                  {(() => {
                    const guideToRead = guides.find(g => g.id === activeGuideId);
                    return guideToRead ? (
                      <GuideDetail
                        guide={guideToRead}
                        onBack={() => setActiveGuideId(null)}
                      />
                    ) : (
                      <div className="text-center py-20 bg-space-card rounded-2xl border border-slate-800">
                        <p className="text-slate-400">Guida non trovata.</p>
                        <button
                          onClick={() => setActiveGuideId(null)}
                          className="mt-4 px-4 py-2 bg-fluo-purple text-white text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Indietro
                        </button>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                  {/* Sidebar filter column */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* Search Bar inside sidebar */}
                    <div className="bg-space-card p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3 neon-shadow-purple">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Cerca Guida
                      </h4>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Cerca parole chiave..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-fluo-purple focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Categories filtering list */}
                    <div className="bg-space-card p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3 neon-shadow-blue">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Seleziona Categoria
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { id: 'all', label: 'Tutte' },
                          { id: 'gameplay', label: 'Gameplay' },
                          { id: 'costruzione', label: 'Costruzioni' },
                          { id: 'trucchi', label: 'Trucchi' },
                          { id: 'mod_cc', label: 'Mod & CC' },
                          { id: 'espansioni', label: 'Espansioni' }
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => { setSelectedCategory(cat.id); setShowBookmarksOnly(false); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                              selectedCategory === cat.id && !showBookmarksOnly
                                ? 'bg-fluo-blue text-black border-fluo-blue shadow-[0_0_8px_rgba(0,240,255,0.4)] font-bold'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            {cat.label} ({getCategoryCount(cat.id)})
                          </button>
                        ))}

                        {/* Bookmarks Toggle button as a pill */}
                        <button
                          onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                            showBookmarksOnly
                              ? 'bg-amber-500 text-white border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)] font-bold'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current text-white' : ''}`} />
                          Preferiti ({bookmarks.length})
                        </button>
                      </div>
                    </div>



                    {/* Info Card box */}
                    <div className="p-5 bg-space-card border border-slate-800 text-slate-200 rounded-2xl space-y-3 shadow-md relative overflow-hidden">
                      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                        <svg viewBox="0 0 100 160" className="w-24 h-40">
                          <polygon points="50,10 85,80 50,80" fill="#ffffff" />
                          <polygon points="50,150 85,80 50,80" fill="#ffffff" />
                        </svg>
                      </div>
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-fluo-green flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-fluo-green" />
                        PianetaSim Info
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Siamo la community italiana che supporta i fan di The Sims dal 2018! Esplora le nostre guide e sblocca tutto il potenziale del tuo gioco.
                      </p>
                    </div>
                  </div>

                  {/* Grid Content Column */}
                  <div className="lg:col-span-9 space-y-6">
                    {/* Heading / Info about current list */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="text-base font-extrabold text-white">
                        {showBookmarksOnly 
                          ? 'I Miei Preferiti Salvati' 
                          : selectedCategory === 'all' 
                            ? 'Tutte le Guide Disponibili' 
                            : `Guide di Categoria: ${selectedCategory.toUpperCase()}`}
                      </h3>
                      <span className="text-xs text-slate-400 font-semibold">
                        Trovate {filteredGuides.length} guide
                      </span>
                    </div>

                    {/* Real guides Grid */}
                    {filteredGuides.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredGuides.map((guide) => (
                          <GuideCard
                            key={guide.id}
                            guide={guide}
                            isBookmarked={bookmarks.includes(guide.id)}
                            onToggleBookmark={() => handleToggleBookmark(guide.id)}
                            onRead={() => setActiveGuideId(guide.id)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center bg-space-card border border-slate-800 rounded-2xl shadow-xl">
                        <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                        <h4 className="text-base font-bold text-white">Nessuna guida trovata</h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                          Prova a modificare i termini di ricerca o la categoria selezionata nel menu di sinistra.
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                            setShowBookmarksOnly(false);
                          }}
                          className="mt-4 px-4 py-2 bg-fluo-purple hover:bg-fuchsia-600 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-md shadow-fuchsia-950/50"
                        >
                          Azzera Filtri
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: COPIA-RAPIDA CHEATS */}
          {activeTab === 'cheats' && (
            <motion.div
              key="cheats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-4xl mx-auto space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Database dei Trucchi & Codici
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Cerca, seleziona e copia con facilità i codici segreti di The Sims 4 direttamente sul tuo computer.
                  </p>
                </div>
                <CheatsTab />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Footer section */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-10 px-4 md:px-8 mt-12 text-xs relative z-10">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <p className="text-sm md:text-base font-semibold text-slate-200">
            Unisciti ai nostri social ed entra a far parte della community Pianeta Sim!
          </p>
          
          <div className="flex justify-center">
            <a 
              href="https://t.me/TheSims4ItaliaPianetaSim" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg shadow-sky-950/50 cursor-pointer text-sm"
            >
              <Send className="w-5 h-5 fill-current text-white" />
              Entra nel Gruppo Telegram
            </a>
          </div>

          <div className="text-slate-500 pt-4 border-t border-slate-900/60 text-xs">
            © 2026 Pianeta Sim. Tutti i diritti riservati.
          </div>
        </div>
      </footer>

      {/* Help Sim Modal */}
      <AnimatePresence>
        {isHelpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHelpOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-space-card border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-[0_0_50px_rgba(38,255,94,0.15)] relative z-10 neon-shadow-green"
            >
              {/* Close button */}
              <button
                onClick={() => setIsHelpOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 p-2 rounded-full cursor-pointer transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-fluo-green/10 rounded-2xl text-fluo-green shadow-[0_0_15px_rgba(38,255,94,0.2)] float-animation">
                    <HelpCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white leading-tight">
                      Help Sim
                    </h3>
                    <p className="text-xs text-slate-400">
                      Supporto & Risorse per la Community di PianetaSim
                    </p>
                  </div>
                </div>

                <hr className="border-slate-800" />

                {/* Body Content */}
                <div className="space-y-4 text-slate-300 text-xs md:text-sm leading-relaxed">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5 text-fluo-green">
                      <Wrench className="w-4 h-4" />
                      Come installare Mod & Traduzioni?
                    </h4>
                    <p className="text-slate-400 text-xs">
                      Installare mod e traduzioni in The Sims 4 è facilissimo. Segui questi passi:
                    </p>
                    <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <li>Scarica i file compressi (.zip, .rar) delle traduzioni o delle mod.</li>
                      <li>Estrai i file <code className="text-fluo-blue font-mono">.package</code> e <code className="text-fluo-blue font-mono">.ts4script</code>.</li>
                      <li>Sposta i file estratti nella cartella <code className="text-amber-400 font-mono text-[10px] break-all">Documenti/Electronic Arts/The Sims 4/Mods</code>.</li>
                      <li>Apri il gioco, vai in Opzioni Gioco &gt; Altro e attiva <span className="text-white font-bold">Attiva il materiale personalizzato e le mod</span> e <span className="text-white font-bold">Mod dello script attivate</span>.</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5 text-fluo-blue">
                      <AlertCircle className="w-4 h-4" />
                      Problemi comuni (Risoluzione Problemi)
                    </h4>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                      <li><span className="text-slate-300 font-semibold">Le mod non compaiono?</span> Assicurati che non siano inserite in più di una sottocartella all'interno della cartella Mods (massimo 1 livello di profondità per file .ts4script).</li>
                      <li><span className="text-slate-300 font-semibold">Dopo un aggiornamento del gioco?</span> The Sims 4 disattiva automaticamente le mod ad ogni aggiornamento. Ricordati di riattivarle dalle opzioni e riavviare il gioco.</li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5 text-fluo-fuchsia">
                      <MessageCircle className="w-4 h-4" />
                      Hai ancora bisogno di supporto diretto?
                    </h4>
                    <p className="text-slate-400 text-xs">
                      Se hai problemi tecnici o dubbi con le mod, unisciti al nostro gruppo Telegram attivo. Ci sono centinaia di appassionati e moderatori pronti ad aiutarti in tempo reale!
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="https://t.me/TheSims4ItaliaPianetaSim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md shadow-sky-950/30 cursor-pointer text-center"
                  >
                    <Send className="w-4 h-4 fill-current text-white" />
                    Chiedi sul Gruppo Telegram
                  </a>
                  <button
                    onClick={() => setIsHelpOpen(false)}
                    className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Ho capito, grazie!
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
