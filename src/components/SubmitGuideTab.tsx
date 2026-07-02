import { useState, FormEvent } from 'react';
import { GuideDraft } from '../types';
import { motion } from 'motion/react';
import { PenTool, CheckCircle, HelpCircle, FileText, Plus, User, FilePlus, ChevronRight } from 'lucide-react';

interface SubmitGuideTabProps {
  onAddGuide: (newGuide: any) => void;
}

export default function SubmitGuideTab({ onAddGuide }: SubmitGuideTabProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'gameplay' | 'costruzione' | 'trucchi' | 'mod_cc' | 'espansioni'>('gameplay');
  const [difficulty, setDifficulty] = useState<'Principiante' | 'Intermedio' | 'Esperto'>('Principiante');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [steps, setSteps] = useState<string[]>(['', '']); // Start with 2 empty steps
  const [tagsInput, setTagsInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleStepChange = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const addStepField = () => {
    setSteps([...steps, '']);
  };

  const removeStepField = (index: number) => {
    if (steps.length <= 1) return;
    const updated = steps.filter((_, idx) => idx !== index);
    setSteps(updated);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description || !author) {
      alert('Per favore compila tutti i campi obbligatori (Titolo, Descrizione, Nome Autore).');
      return;
    }

    // Filter out empty steps
    const filteredSteps = steps.filter(s => s.trim() !== '');
    if (filteredSteps.length === 0) {
      alert('Per favore compila almeno un paragrafo/passaggio di contenuto per la guida.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t !== '');

    const newGuide = {
      id: `custom-guide-${Date.now()}`,
      title,
      description,
      category,
      author,
      date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: `${Math.max(2, Math.ceil(filteredSteps.join(' ').split(' ').length / 100))} min`,
      difficulty,
      content: filteredSteps,
      tips: ['Assicurati di testare i passaggi prima di condividerli con gli altri!'],
      tags: tags.length > 0 ? tags : [category, 'community']
    };

    onAddGuide(newGuide);
    setSubmitted(true);

    // Reset form states
    setTimeout(() => {
      setTitle('');
      setCategory('gameplay');
      setDifficulty('Principiante');
      setDescription('');
      setAuthor('');
      setSteps(['', '']);
      setTagsInput('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-2xl mx-auto">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 space-y-4"
        >
          <div className="w-16 h-16 bg-emerald-50 text-plumbob-green rounded-full border border-emerald-100 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-800">Guida inviata con successo!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Grazie per aver contribuito alla community di PianetaSim! La tua guida è stata caricata live ed è consultabile nell'elenco principale delle guide.
            </p>
          </div>
          <span className="text-[10px] text-slate-400 block bg-slate-50 px-3 py-1.5 rounded-lg border w-fit mx-auto animate-pulse">
            Preparazione di un nuovo modulo in corso...
          </span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-plumbob-green">
              Scrivi per PianetaSim
            </span>
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-1.5">
              <PenTool className="w-5 h-5 text-plumbob-green" />
              Proponi una Nuova Guida
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Inserisci i dettagli e i passaggi della tua guida. Sarà salvata nei dati di questa sessione e visualizzata immediatamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Titolo Guida *</label>
              <input
                type="text"
                required
                placeholder="Es. Come guadagnare col giardinaggio in Cottage Living"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-plumbob-green focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Category selection */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Categoria *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:ring-2 focus:ring-plumbob-green focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="gameplay">Gameplay & Carriere</option>
                <option value="costruzione">Costruzioni & Tetti</option>
                <option value="trucchi">Trucchi & Comandi</option>
                <option value="mod_cc">Mod & Materiale Personalizzato (CC)</option>
                <option value="espansioni">Guide per Espansioni</option>
              </select>
            </div>

            {/* Difficulty selection */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Difficoltà *</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:ring-2 focus:ring-plumbob-green focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Esperto">Esperto</option>
              </select>
            </div>

            {/* Author Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Nome Autore / Simmer *</label>
              <input
                type="text"
                required
                placeholder="Es. SimmerSuperstar"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-plumbob-green focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Tags (comma separated) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tag (separati da virgole)</label>
              <input
                type="text"
                placeholder="Es. cottage living, giardinaggio, guadagno"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-plumbob-green focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Description Summary */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Sintesi Guida (Descrizione Breve) *</label>
            <textarea
              required
              rows={2}
              maxLength={220}
              placeholder="Fornisci un breve riassunto di 1-2 righe che descriva lo scopo principale della guida..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-plumbob-green focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          {/* Step list creator */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <FileText className="w-4 h-4 text-plumbob-green" />
                Paragrafi / Passaggi di Contenuto *
              </label>
              <button
                type="button"
                onClick={addStepField}
                className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-plumbob-green text-[10px] font-bold rounded-lg border border-emerald-100 hover:bg-emerald-100/60 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Aggiungi Paragrafo
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="w-5 h-5 bg-slate-100 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-2.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <textarea
                      rows={2}
                      required={idx === 0}
                      placeholder={idx === 0 ? "Scrivi il primo passaggio fondamentale o l'introduzione dettagliata della guida..." : "Scrivi il passaggio o blocco di informazioni successivo..."}
                      value={step}
                      onChange={(e) => handleStepChange(idx, e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-plumbob-green focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStepField(idx)}
                      className="p-1.5 hover:bg-rose-50 text-slate-300 hover:text-rose-500 rounded-lg transition-colors mt-2"
                      title="Rimuovi questo paragrafo"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-plumbob-green hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-100/50 flex items-center justify-center gap-2"
          >
            <FilePlus className="w-4 h-4" />
            Pubblica Guida Live
          </button>
        </form>
      )}
    </div>
  );
}
