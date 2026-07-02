import { Guide, Cheat, QuizQuestion } from '../types';

export const guidesData: Guide[] = [
  {
    id: 'guide-moveobjects',
    title: 'Guida Suprema al Cheat "MoveObjects" (bb.moveobjects)',
    description: 'Impara come posizionare liberamente gli oggetti, unire i mobili e sbloccare oggetti nascosti per creare case da sogno.',
    category: 'costruzione',
    author: 'SimmerItalia99',
    date: '28 Giugno 2026',
    readTime: '5 min',
    difficulty: 'Principiante',
    tags: ['costruzione', 'trucchi', 'bb.moveobjects', 'arredamento'],
    content: [
      'Il cheat "bb.moveobjects" è lo strumento più potente per ogni costruttore in The Sims 4. Consente di ignorare le regole di collisione della griglia, permettendo di posizionare gli oggetti l’uno dentro l’altro o all’esterno dei confini standard.',
      'Per attivarlo, premi contemporaneamente Ctrl + Shift + C su PC/Mac (o tutti e quattro i dorsali su console) per aprire la console dei comandi, digita "bb.moveobjects" e premi Invio. Riceverai la conferma che il trucco è attivo.',
      'Usa i tasti 9 e 0 (non il tastierino numerico) mentre tieni premuto un oggetto per alzarlo o abbassarlo a piacimento. Questo ti consente di posizionare piante sugli scaffali, cuscini sui divani o creare composizioni personalizzate.',
      'Tieni premuto il tasto Alt per disattivare l’ancoraggio alla griglia e ruotare gli oggetti a 360 gradi con estrema precisione.',
      'Unisci armadi o ripiani per creare strutture uniche. Combina diversi tipi di piante per creare cespugli folti ed elaborati.'
    ],
    tips: [
      'Assicurati che i Sim possano ancora interagire con gli oggetti modificati. Fai sempre un test di gameplay!',
      'Usa il trucco bb.showhiddenobjects per sbloccare oggetti di scenario gratuiti.',
      'Se gli oggetti spariscono quando li sposti vicino ai muri, tieni premuto ALT per sbloccare la collisione ravvicinata.'
    ]
  },
  {
    id: 'guide-mods-cc',
    title: 'Come Installare Mod e Materiale Personalizzato (CC) nel 2026',
    description: 'La guida definitiva e sicura per installare mod di gameplay (come MC Command Center) e vestiti/capelli personalizzati.',
    category: 'mod_cc',
    author: 'SimsGuruLuca',
    date: '15 Giugno 2026',
    readTime: '6 min',
    difficulty: 'Intermedio',
    tags: ['mod', 'cc', 'installazione', 'guida sicura'],
    content: [
      'The Sims 4 supporta ufficialmente le mod e il Materiale Personalizzato (CC). Esistono due tipi di file: i file ".package" (capelli, vestiti, mobili) e le mod di script (".ts4script", che modificano il codice di gioco, come MCCC).',
      'Trova la tua cartella "Mods". Su Windows si trova solitamente in: Documenti\\Electronic Arts\\The Sims 4\\Mods. Su Mac: Utility\\Electronic Arts\\The Sims 4\\Mods.',
      'Scarica i file di tuo interesse. Se scarichi archivi (.zip, .rar, .7z), estraili. Trascina i file ".package" e ".ts4script" direttamente dentro la cartella "Mods".',
      'ATTENZIONE: Le mod di script (.ts4script) non devono essere inserite a più di una sottocartella di profondità (es. Mods/MC_Command_Center/ va bene, ma Mods/Gameplay/MCCC/MCCC_Files/ non funzionerà).',
      'Apri il gioco, vai su Opzioni di Gioco > Altro. Spunta le caselle "Attiva il materiale personalizzato e le mod" e "Mod dello script consentite". Riavvia il gioco per applicare.'
    ],
    tips: [
      'Dopo ogni aggiornamento ufficiale del gioco di The Sims 4, le mod vengono disattivate automaticamente perché potrebbero causare crash. Controlla sempre se sono uscite versioni aggiornate dei tuoi script preferiti!',
      'Non inserire file .zip interi nella cartella Mods. Estraili sempre!',
      'Usa un programma come "The Sims 4 Mod Organizer" per mantenere pulita la cartella.'
    ]
  },
  {
    id: 'guide-occulti-vampiri',
    title: 'Guida Suprema ai Vampiri: Poteri, Debolezze e Segreti',
    description: 'Diventa il vampiro supremo dei tuoi sogni. Scopri come scalare i ranghi della notte, sbloccare poteri e sopravvivere al sole.',
    category: 'gameplay',
    author: 'ContessaSim',
    date: '02 Luglio 2026',
    readTime: '8 min',
    difficulty: 'Esperto',
    tags: ['gameplay', 'vampiri', 'poteri', 'occulti'],
    content: [
      'I vampiri introducono un gameplay oscuro e affascinante a Forgotten Hollow. Per diventare un vampiro, puoi crearlo direttamente dal menu Crea un Sim o farti mordere da un vampiro esistente (come Vladislaus Straud) dopo aver stretto amicizia.',
      'I vampiri non usano i bisogni standard. Hanno l’Energia Vampirica (che diminuisce di giorno e usando poteri) e la Sete (soddisfatta bevendo plasma da altri Sim, sacche di plasma o frutti di plasma).',
      'Facendo azioni vampiresche o leggendo i tomi di Lore Vampiresca, guadagnerai punti esperienza per salire di rango: da Novizio a Vampiro Supremo. Ogni rango ti permette di selezionare nuovi Poteri.',
      'Bilanciamento: Per ogni potere sbloccato, devi scegliere una Debolezza vampirica (es. Sonno agitato, Stomaco appassito, Sensibilità solare). Scegli saggiamente!',
      'Per sopravvivere al sole cocente, puoi sbloccare il potere "Resistenza al Sole" al livello massimo, oppure creare la pozione "Resistenza Solare Vampirica" al tavolo da mixologia se hai un’alta Lore.'
    ],
    tips: [
      'Il frutto di plasma può essere piantato per avere una scorta infinita e biologica di cibo senza spaventare i vicini.',
      'Se il tuo vampiro sta bruciando al sole, mandalo rapidamente al coperto o in una bara per ricaricare l’energia.',
      'Puoi curare il vampirismo creando la "Cura Vampirica Suprema" al bar con aglio, frutti di plasma e aconito.'
    ]
  },
  {
    id: 'guide-roofing',
    title: 'Tetti Perfetti: Come evitare errori comuni di costruzione',
    description: 'Basta tetti piatti o sporgenti che attraversano le stanze! Ecco le tecniche per creare tetti realistici e armoniosi.',
    category: 'costruzione',
    author: 'ArchitettoSim',
    date: '20 Giugno 2026',
    readTime: '7 min',
    difficulty: 'Esperto',
    tags: ['costruzione', 'tetti', 'architettura', 'consigli'],
    content: [
      'Il tetto è spesso la parte più difficile da realizzare in una casa. L’errore più comune è usare un unico grande pezzo di tetto che risulta goffo e sproporzionato.',
      'Scomponi la casa in forme più semplici. Copri ogni sezione rettangolare o quadrata con pezzi di tetto separati (tetti a due falde, a padiglione o piatti).',
      'Tieni premuto il tasto Shift mentre trascini le frecce di sporgenza del tetto. Questo ti permette di regolare la sporgenza di una sola estremità alla volta, evitando che il tetto penetri visivamente all’interno delle stanze o dei balconi adiacenti.',
      'Usa i piccoli pomelli rotondi che appaiono sul tetto selezionato per regolarne la curvatura. Puoi creare splendidi tetti in stile vittoriano o tetti spioventi asiatici.',
      'Aggiungi modanature e dettagli di finitura dal menu Costruisci > Tetti per dare un aspetto finito e professionale alle tue creazioni.'
    ],
    tips: [
      'Usa tetti in vetro per creare serre spettacolari o lucernari moderni sopra i soggiorni.',
      'I tetti sono completamente gratuiti! Sperimenta senza timore di finire i simoleon.'
    ]
  },
  {
    id: 'guide-affitti-luna',
    title: 'Guida a "Affittasi" (For Rent): Gestire appartamenti e lotti residenziali d’affitto',
    description: 'Impara a progettare condomini multifamiliari, gestire gli inquilini e massimizzare le tue entrate come proprietario.',
    category: 'espansioni',
    author: 'SimImmobiliare',
    date: '10 Giugno 2026',
    readTime: '8 min',
    difficulty: 'Intermedio',
    tags: ['espansioni', 'for rent', 'affittasi', 'case d\'affitto', 'business'],
    content: [
      'L’espansione "Affittasi" consente di suddividere un singolo lotto in un massimo di 6 unità abitative indipendenti, ospitando fino a 6 famiglie diverse nello stesso posto.',
      'Per iniziare, cambia il tipo di lotto in "Residenziale d’affitto" dal menu di costruzione. Successivamente, seleziona le stanze e assegna ciascuna a un’Unità specifica (es. Unità 1, Unità 2) o lasciale come "Spazio Comune" (es. corridoi, giardini, piscine).',
      'Come proprietario, puoi vivere in una delle unità o risiedere in un lotto completamente diverso. Puoi impostare il prezzo dell’affitto giornaliero, la durata del contratto e le regole della casa (es. niente rumori, niente animali).',
      'Gestisci gli imprevisti: tubi che scoppiano, infestazioni di insetti o muffa tossica. Risolvere tempestivamente questi problemi terrà alta la valutazione delle tue unità e felici gli inquilini.',
      'Se gli inquilini non pagano o infrangono le regole ripetutamente, puoi sfrattarli, ma fai attenzione alle ripercussioni legali e al livello di stress generale!'
    ],
    tips: [
      'Metti lavatrici e asciugatrici negli spazi comuni per far socializzare i tuoi inquilini!',
      'Un livello elevato di abilità di Manualità ti farà risparmiare migliaia di simoleon nelle riparazioni d’emergenza.',
      'Controlla periodicamente i contatori per assicurarti che gli inquilini non stiano sprecando risorse.'
    ]
  }
];

export const cheatsData: Cheat[] = [
  {
    code: 'testingcheats true',
    description: 'Attiva i trucchi avanzati di gioco. Indispensabile per far funzionare quasi tutti gli altri codici.',
    category: 'Generali',
    requirements: 'Nessuno'
  },
  {
    code: 'motherlode',
    description: 'Aggiunge immediatamente 50.000 Simoleon ai fondi della famiglia attiva.',
    category: 'Soldi',
    requirements: 'Nessuno'
  },
  {
    code: 'kaching',
    description: 'Aggiunge immediatamente 1.000 Simoleon ai fondi della famiglia.',
    category: 'Soldi',
    requirements: 'Nessuno'
  },
  {
    code: 'rosebud',
    description: 'Aggiunge immediatamente 1.000 Simoleon ai fondi (storico trucco di The Sims 1!).',
    category: 'Soldi',
    requirements: 'Nessuno'
  },
  {
    code: 'Money [cifra]',
    description: 'Imposta i fondi della famiglia all’esatta cifra indicata (es. "Money 150000").',
    category: 'Soldi',
    requirements: 'testingcheats true'
  },
  {
    code: 'bb.moveobjects',
    description: 'Rimuove la griglia di collisione, consentendo di fondere o alzare/abbassare gli oggetti.',
    category: 'Costruzione',
    requirements: 'Nessuno'
  },
  {
    code: 'bb.showhiddenobjects',
    description: 'Abilita il catalogo del Debug, sbloccando centinaia di oggetti d’ambiente non acquistabili normalmente.',
    category: 'Costruzione',
    requirements: 'Nessuno'
  },
  {
    code: 'bb.showliveeditobjects',
    description: 'Sblocca migliaia di oggetti di scenario creati dagli sviluppatori (alberi, rocce, auto decorative).',
    category: 'Costruzione',
    requirements: 'bb.showhiddenobjects attivo'
  },
  {
    code: 'bb.ignoregameplayunlocksentitlement',
    description: 'Sblocca istantaneamente tutti i premi delle carriere (mobili e vestiti bloccati dalle promozioni).',
    category: 'Costruzione',
    requirements: 'Nessuno'
  },
  {
    code: 'sims.fill_all_commodities',
    description: 'Riempie istantaneamente al massimo tutte le barre dei bisogni del Sim selezionato.',
    category: 'Bisogni/Stati',
    requirements: 'testingcheats true'
  },
  {
    code: 'stats.set_skill_level Major_HomestyleCooking 10',
    description: 'Imposta al massimo (Livello 10) l’abilità di Cucina Casalinga del Sim selezionato.',
    category: 'Carriere/Abilità',
    requirements: 'testingcheats true'
  },
  {
    code: 'stats.set_skill_level Major_Charisma 10',
    description: 'Imposta al massimo l’abilità di Carisma del Sim selezionato.',
    category: 'Carriere/Abilità',
    requirements: 'testingcheats true'
  },
  {
    code: 'careers.promote Executive',
    description: 'Promuove il Sim di un livello nella carriera Affari (ramo Dirigenziale).',
    category: 'Carriere/Abilità',
    requirements: 'testingcheats true'
  },
  {
    code: 'traits.equip_trait Trait_OccultVampire',
    description: 'Trasforma istantaneamente il Sim selezionato in un Vampiro.',
    category: 'Bisogni/Stati',
    requirements: 'testingcheats true'
  },
  {
    code: 'cas.fulleditmode',
    description: 'Sblocca la modifica completa del Sim nel CAS (puoi rimodellare corpo, cambiare tratti o età di Sim esistenti).',
    category: 'Generali',
    requirements: 'testingcheats true'
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual è il tuo modo preferito di trascorrere un sabato sera ideale?',
    options: [
      {
        text: 'Leggendo un libro di scienze o programmando un videogioco al PC.',
        traits: ['Genio', 'Solitario'],
        aspiration: 'Cervello Straordinario'
      },
      {
        text: 'Facendo un party pazzesco con decine di amici e musica a tutto volume.',
        traits: ['Estroverso', 'Incline ai party'],
        aspiration: 'Sim socievole'
      },
      {
        text: 'Dipingendo un quadro o scrivendo una nuova canzone d’ispirazione.',
        traits: ['Creativo', 'Amante dell\'arte'],
        aspiration: 'Genio Creativo'
      },
      {
        text: 'Facendo jogging all’aria aperta o scalando una montagna.',
        traits: ['Attivo', 'Amante dell\'aria aperta'],
        aspiration: 'Atleta Professionista'
      }
    ]
  },
  {
    id: 2,
    question: 'Un Sim sconosciuto bussa alla tua porta. Come reagisci?',
    options: [
      {
        text: 'Fai finta di non essere in casa e rimani nella tua stanza.',
        traits: ['Solitario', 'Incline al dubbio'],
        aspiration: 'Cervello Straordinario'
      },
      {
        text: 'Lo accogli con calore e gli offri subito qualcosa da mangiare fatto in casa.',
        traits: ['Buono', 'Ordinato'],
        aspiration: 'Grande Famiglia'
      },
      {
        text: 'Gli fai uno scherzo divertente o gli rubi con destrezza il portafoglio!',
        traits: ['Malandrino', 'Cleptomane'],
        aspiration: 'Nemico Pubblico'
      },
      {
        text: 'Inizi a parlare dei tuoi ambiziosi piani di carriera e di affari.',
        traits: ['Ambizioso', 'Materialista'],
        aspiration: 'Incredibilmente Ricco'
      }
    ]
  },
  {
    id: 3,
    question: 'Qual è l’obiettivo principale della tua vita virtuale?',
    options: [
      {
        text: 'Costruire una famiglia numerosa e unita e veder crescere i bambini.',
        traits: ['Incline ai bambini', 'Buono'],
        aspiration: 'Grande Famiglia'
      },
      {
        text: 'Accumulare milioni di Simoleon e possedere una villa enorme e lussuosa.',
        traits: ['Ambizioso', 'Snob'],
        aspiration: 'Incredibilmente Ricco'
      },
      {
        text: 'Esplorare mondi misteriosi, giungle e incontrare creature aliene o vampiri.',
        traits: ['Avventuroso', 'Amante dell\'aria aperta'],
        aspiration: 'Esploratore delle Giungle'
      },
      {
        text: 'Padroneggiare ogni singola abilità intellettuale e scrivere libri di successo.',
        traits: ['Genio', 'Perfezionista'],
        aspiration: 'Cervello Straordinario'
      }
    ]
  },
  {
    id: 4,
    question: 'Cosa fai se le tubature del bagno si rompono allagando la casa?',
    options: [
      {
        text: 'Prendi la cassetta degli attrezzi e ripari tutto da solo migliorando l’abilità manualità.',
        traits: ['Genio', 'Attivo'],
        aspiration: 'Cervello Straordinario'
      },
      {
        text: 'Chiami immediatamente un idraulico per non sporcarti le mani.',
        traits: ['Snob', 'Materialista'],
        aspiration: 'Incredibilmente Ricco'
      },
      {
        text: 'Ti arrabbi tantissimo e inizi a prendere a calci il water rotto!',
        traits: ['Irascibile', 'Malandrino'],
        aspiration: 'Nemico Pubblico'
      },
      {
        text: 'Approfitti del disastro per scherzare e bagnare gli altri Sim della famiglia.',
        traits: ['Buffo', 'Estroverso'],
        aspiration: 'Sim socievole'
      }
    ]
  }
];

export const traitDescriptions: Record<string, string> = {
  'Genio': 'I Sim Geni tendono ad essere concentrati, adorano risolvere enigmi e godono di un elevato tasso di successo nelle carriere scientifiche.',
  'Solitario': 'I Sim Solitari sono felici quando sono soli, non soffrono di solitudine e hanno un bisogno sociale che scende molto più lentamente.',
  'Estroverso': 'I Sim Estroversi hanno bisogno continuo di socializzare, creano amicizie incredibilmente veloci e ottengono potenti stati d’animo positivi dalle interazioni.',
  'Incline ai party': 'Questi Sim adorano stare al centro dell’attenzione durante gli eventi sociali e sanno organizzare feste memorabili.',
  'Creativo': 'I Sim Creativi tendono ad essere ispirati molto spesso, adorano dipingere, scrivere e suonare strumenti musicali.',
  'Amante dell\'art': 'Questi Sim adorano ammirare opere d’arte e discutere di tecniche e stili artistici con gli altri Sim.',
  'Attivo': 'I Sim Attivi sono pieni di energia, adorano fare sport, si annoiano se rimangono inattivi e sanno motivare gli altri Sim.',
  'Amante dell\'aria aperta': 'Questi Sim sono felici all’esterno, possono fare campeggio, giardinaggio e ammirare il cielo stellato per ore.',
  'Buono': 'I Sim Buoni adorano aiutare gli altri, compiere azioni di beneficenza e ottengono stati d’animo felici quando sono circondati da Sim felici.',
  'Ordinato': 'I Sim Ordinati adorano pulire la casa, non sopportano lo sporco e ottengono una sferzata di energia quando puliscono.',
  'Malandrino': 'I Sim Malandrini adorano compiere scherzi, deridere gli altri e creare piccoli disagi sociali senza sentirsi in colpa.',
  'Cleptomane': 'Questi Sim adorano rubare piccoli oggetti d’arredamento quando nessuno li guarda e traggono eccitazione da questo brivido.',
  'Ambizioso': 'I Sim Ambiziosi ottengono potenti promozioni lavorative più velocemente, si stressano se non vengono promossi e sognano la gloria.',
  'Materialista': 'Questi Sim adorano acquistare oggetti costosi, vantarsi dei loro possedimenti e si innervosiscono se non comprano qualcosa di nuovo.',
  'Incline ai bambini': 'Questi Sim sono perfetti educatori, adorano giocare con neonati e bebè e le loro interazioni familiari sono sempre un successo.',
  'Snob': 'I Sim Snob adorano criticare gli oggetti di bassa qualità, amano circondarsi di lusso e si annoiano con discussioni superficiali.',
  'Avventuroso': 'Questi Sim amano il brivido dell’ignoto, l’esplorazione e la scoperta di nuovi posti misteriosi.',
  'Perfezionista': 'I Sim Perfezionisti creano oggetti di qualità superiore (scritture, dipinti, cibo), ma impiegano un po’ più di tempo a finirli.',
  'Irascibile': 'I Sim Irascibili tendono ad arrabbiarsi molto facilmente, adorano urlare o discutere animatamente e si divertono a provocare litigi.',
  'Buffo': 'I Sim Buffi adorano raccontare barzellette, far ridere gli altri Sim e hanno un tasso di successo altissimo nella carriera di Comico.'
};

export const aspirationDescriptions: Record<string, string> = {
  'Cervello Straordinario': 'Vuoi essere sia logico che manuale! Aspiri a padroneggiare la scienza, la tecnologia e la riparazione di qualsiasi macchinario.',
  'Sim socievole': 'Il tuo obiettivo è fare amicizia con tutti, organizzare le feste migliori della città e diventare il Sim più popolare di sempre!',
  'Genio Creativo': 'La tua vita è dedicata all’arte. Desideri dipingere capolavori, comporre sinfonie immortali o scrivere romanzi bestseller.',
  'Atleta Professionista': 'Desideri spingere il tuo corpo al limite assoluto, vincere medaglie d’oro e diventare una leggenda dello sport internazionale.',
  'Grande Famiglia': 'Nulla conta più della famiglia. Desideri crescere figli educati, creare un nido caldo ed essere circondato da nipoti nel tuo autunno della vita.',
  'Incredibilmente Ricco': 'Il denaro compra la felicità! Vuoi accumulare un conto in banca da capogiro e possedere le proprietà più prestigiose della città.',
  'Nemico Pubblico': 'Vuoi essere temuto e rispettato. Aspiri a scalare la carriera criminale e causare scompiglio ovunque tu vada.',
  'Esploratore delle Giungle': 'La tua vocazione è il viaggio. Desideri addentrarti in antichi templi selvaggi e svelare reliquie millenarie dimenticate.'
};
