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
  ChevronLeft
} from 'lucide-react';

// Components
import Plumbob from './components/Plumbob';
import GuideCard from './components/GuideCard';
import CheatsTab from './components/CheatsTab';
import QuizTab from './components/QuizTab';
import SimsMoodTab from './components/SimsMoodTab';
import SubmitGuideTab from './components/SubmitGuideTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guides' | 'cheats' | 'quiz' | 'simulator' | 'submit'>('guides');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  
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
    const matchesDifficulty = selectedDifficulty === 'all' || g.difficulty === selectedDifficulty;
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(g.id);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmark;
  });

  const getCategoryCount = (category: string) => {
    if (category === 'all') return guides.length;
    return guides.filter(g => g.category === category).length;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. Header/Navbar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2cc04c] to-[#10b981] rounded-xl flex items-center justify-center shadow-md shadow-emerald-100 float-animation shrink-0">
              <svg viewBox="0 0 100 160" className="w-5 h-8">
                <polygon points="50,10 85,80 50,80" fill="#ffffff" opacity="0.95" />
                <polygon points="50,10 15,80 50,80" fill="#ffffff" opacity="0.8" />
                <polygon points="50,150 85,80 50,80" fill="#ffffff" opacity="0.9" />
                <polygon points="50,150 15,80 50,80" fill="#ffffff" opacity="0.75" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">
                PianetaSim <span className="text-plumbob-green text-sm font-bold bg-emerald-50 px-2 py-0.5 rounded-md ml-1 border border-emerald-100">GUIDE</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
                La community italiana di The Sims 4
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => { setActiveTab('guides'); setShowBookmarksOnly(false); }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'guides' && !showBookmarksOnly
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Guide Complete
            </button>
            <button
              onClick={() => { setActiveTab('cheats'); }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'cheats'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Database Trucchi
            </button>
            <button
              onClick={() => { setActiveTab('quiz'); }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Test Personalità
            </button>
            <button
              onClick={() => { setActiveTab('simulator'); }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Need Simulator
            </button>
            <button
              onClick={() => { setActiveTab('submit'); }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'submit'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Invia Guida
            </button>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section / Banner */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Hero Headline */}
          <div className="md:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-plumbob-green text-xs font-bold rounded-full border border-emerald-100">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Sito Ufficiale PianetaSim - Sezione Guide HTML
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-none md:leading-tight">
              Tutto quello che devi sapere su <span className="text-plumbob-green">The Sims 4</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Benvenuto nella sezione delle guide interattive di PianetaSim! Impara nuove tecniche di costruzione dei tetti, sblocca carriere segrete, copia trucchi con un solo click o metti alla prova il tuo carattere col quiz.
            </p>
            {/* Quick access bookmarks banner */}
            {bookmarks.length > 0 && (
              <div className="pt-2">
                <button
                  onClick={() => { setActiveTab('guides'); setShowBookmarksOnly(true); }}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 px-3.5 py-2 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <Star className="w-4 h-4 fill-current" />
                  Visualizza i tuoi {bookmarks.length} Preferiti salvati
                </button>
              </div>
            )}
          </div>

          {/* Plumbob widget loader */}
          <div className="md:col-span-4">
            <Plumbob />
          </div>
        </div>
      </section>

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* TAB 1: GUIDES LIST */}
          {activeTab === 'guides' && (
            <motion.div
              key="guides"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Sidebar filter column */}
              <div className="lg:col-span-3 space-y-6">
                {/* Search Bar inside sidebar */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Cerca Guida
                  </h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cerca parole chiave..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-plumbob-green focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Categories filtering list */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Seleziona Categoria
                  </h4>
                  <div className="space-y-1.5">
                    {[
                      { id: 'all', label: 'Tutte le Guide' },
                      { id: 'gameplay', label: 'Gameplay & Carriere' },
                      { id: 'costruzione', label: 'Costruzioni & Tetti' },
                      { id: 'trucchi', label: 'Trucchi & Comandi' },
                      { id: 'mod_cc', label: 'Mod & Materiale CC' },
                      { id: 'espansioni', label: 'Espansioni & DLC' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { setSelectedCategory(cat.id); setShowBookmarksOnly(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          selectedCategory === cat.id && !showBookmarksOnly
                            ? 'bg-emerald-50 text-plumbob-green'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedCategory === cat.id && !showBookmarksOnly
                            ? 'bg-plumbob-green text-white font-bold'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {getCategoryCount(cat.id)}
                        </span>
                      </button>
                    ))}

                    {/* Bookmarks Toggle button */}
                    <button
                      onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all mt-4 border cursor-pointer ${
                        showBookmarksOnly
                          ? 'bg-amber-50 text-amber-600 border-amber-200 font-bold'
                          : 'text-slate-500 hover:bg-slate-50 border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Star className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
                        I Miei Preferiti
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        showBookmarksOnly ? 'bg-amber-500 text-white' : 'bg-slate-100'
                      }`}>
                        {bookmarks.length}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Difficulty tag filters */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Livello di Difficoltà
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', 'Principiante', 'Intermedio', 'Esperto'].map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                          selectedDifficulty === diff
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                        }`}
                      >
                        {diff === 'all' ? 'Tutti' : diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Card box */}
                <div className="p-5 bg-[#1e293b] text-slate-200 rounded-2xl space-y-3 shadow-md relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 160" className="w-24 h-40">
                      <polygon points="50,10 85,80 50,80" fill="#ffffff" />
                      <polygon points="50,150 85,80 50,80" fill="#ffffff" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    PianetaSim Info
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Siamo la community italiana che supporta i fan di The Sims dal 2018! Collabora scrivendo nuove guide tramite l'apposita scheda in alto.
                  </p>
                </div>
              </div>

              {/* Grid Content Column */}
              <div className="lg:col-span-9 space-y-6">
                {/* Heading / Info about current list */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-slate-800">
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
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-slate-700">Nessuna guida trovata</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                      Prova a modificare i termini di ricerca o la categoria selezionata nel menu di sinistra.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSelectedDifficulty('all');
                        setShowBookmarksOnly(false);
                      }}
                      className="mt-4 px-4 py-2 bg-plumbob-green hover:bg-emerald-600 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                    >
                      Azzera Filtri
                    </button>
                  </div>
                )}
              </div>
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
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">
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

          {/* TAB 3: QUIZ TEST */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-6">
                <div className="text-center max-w-md mx-auto space-y-1.5">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                    Trova la tua Natura Sim
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Rispondi a 4 divertenti domande di vita quotidiana e scopri quali sarebbero i tuoi tratti distintivi e la tua aspirazione ideale all’interno del gioco!
                  </p>
                </div>
                <QuizTab />
              </div>
            </motion.div>
          )}

          {/* TAB 4: REAL-TIME SIMULATOR */}
          {activeTab === 'simulator' && (
            <motion.div
              key="simulator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-4xl mx-auto space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                    Simulatore di Bisogni & Stati d'Animo
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Gestisci le barre vitali di un Sim virtuale. Clicca le azioni in tempo reale per soddisfare la fame, l'igiene o l'energia ed evita stati critici!
                  </p>
                </div>
                <SimsMoodTab />
              </div>
            </motion.div>
          )}

          {/* TAB 5: SUBMIT GUIDE DRAFT */}
          {activeTab === 'submit' && (
            <motion.div
              key="submit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SubmitGuideTab onAddGuide={handleAddCustomGuide} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Footer section */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-4 md:px-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-plumbob-green" />
              PianetaSim Community
            </h4>
            <p className="leading-relaxed">
              PianetaSim è un portale amatoriale italiano dedicato interamente alla serie di videogiochi The Sims. Non è affiliato in alcun modo con Electronic Arts Inc. o Maxis. Tutti i marchi appartengono ai rispettivi proprietari.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Funzioni Utili</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setActiveTab('guides'); setShowBookmarksOnly(false); }} className="hover:text-white transition-colors cursor-pointer text-left">
                  Tutte le Guide Complete
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cheats')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Trucchi motherlode & moveobjects
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Quiz Personalità
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('simulator')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Simulatore di Bisogni interattivo
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Codice & Sviluppo</h4>
            <p className="leading-relaxed">
              Creato interamente in HTML, React, TypeScript e Tailwind CSS per garantire elevate prestazioni, caricamenti immediati e compatibilità con PC, Mac e smartphone.
            </p>
            <div className="pt-2 text-[10px] text-slate-500">
              © 2026 PianetaSim Italia • Licenza Apache-2.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
