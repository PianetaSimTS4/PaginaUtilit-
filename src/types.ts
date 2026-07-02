export interface Guide {
  id: string;
  title: string;
  description: string;
  category: 'gameplay' | 'costruzione' | 'trucchi' | 'mod_cc' | 'espansioni';
  author: string;
  date: string;
  readTime: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Esperto';
  content: string[]; // Step-by-step or paragraph list
  tips?: string[];
  imageUrl?: string;
  tags: string[];
}

export interface Cheat {
  code: string;
  description: string;
  category: 'Soldi' | 'Costruzione' | 'Bisogni/Stati' | 'Carriere/Abilità' | 'Generali';
  requirements?: string; // e.g., "testingcheats true"
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    traits: string[]; // trait names associated with this answer
    aspiration: string;
  }[];
}

export interface SimState {
  bladder: number;
  hunger: number;
  energy: number;
  social: number;
  fun: number;
  hygiene: number;
}

export interface GuideDraft {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  summary: string;
  content: string;
  author: string;
  date: string;
}
