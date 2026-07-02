import { Guide, Cheat, QuizQuestion } from '../types';

export const guidesData: Guide[] = [
  {
    id: 'guide-moveobjects',
    title: 'Lorem Ipsum Dolor Sit Amet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum, lorem a scelerisque dictum, arcu nunc.',
    category: 'costruzione',
    author: 'SimmerItalia99',
    date: '28 Giugno 2026',
    readTime: '5 min',
    difficulty: 'Principiante',
    tags: ['lorem', 'ipsum', 'dolor', 'sit'],
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo, nec finibus mi. Phasellus hendrerit vulputate dolor, sed convallis ex congue eget. Aliquam lorem nulla, pretium nec elit non, aliquet tristique lacus.',
      'Aenean lobortis diam at interdum eleifend. Ut gravida rhoncus dolor, ac convallis enim hendrerit a. Proin congue, eros id dictum sodales, est ipsum lacinia ligula, sit amet rhoncus nunc felis non est.',
      'Praesent at nunc a lectus eleifend elementum sit amet tristique mi. Sed vitae interdum erat, nec bibendum tellus. Curabitur sed nisl ut ligula cursus accumsan id sed velit. Ut egestas sapien elementum, eleifend est vel.',
      'Vivamus vestibulum ligula sed nulla pharetra, vitae facilisis ex volutpat. Quisque hendrerit molestie magna. Pellentesque non justo a nibh finibus feugiat sed non nisl. Cras vulputate metus sem, et tempus lorem interdum ac.',
      'Nam eleifend hendrerit massa, vitae congue tortor feugiat sed. Aliquam erat volutpat. Proin efficitur elit in purus rutrum molestie. In rhoncus, nulla varius eleifend lobortis, urna nibh convallis ex, sed tempor ex magna eu ex.'
    ],
    tips: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Ut gravida rhoncus dolor, ac convallis enim hendrerit a.',
      'Sed vitae interdum erat, nec bibendum tellus.'
    ]
  },
  {
    id: 'guide-mods-cc',
    title: 'Consectetur Adipiscing Elit',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    category: 'mod_cc',
    author: 'SimsGuruLuca',
    date: '15 Giugno 2026',
    readTime: '6 min',
    difficulty: 'Intermedio',
    tags: ['consectetur', 'adipiscing', 'elit', 'lorem'],
    content: [
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Mauris dictum tincidunt nisl, nec maximus libero consequat quis. Aliquam interdum urna sit amet massa pharetra, non vulputate libero tristique. Curabitur vel leo id erat auctor gravida in eget nulla.',
      'Nullam hendrerit mi eu finibus feugiat. Vestibulum pretium scelerisque elit, id maximus diam feugiat ac. Curabitur accumsan, justo nec feugiat porttitor, ipsum diam facilisis nulla, sit amet rhoncus ante nisl vel tellus.',
      'Quisque sodales scelerisque turpis, id condimentum dolor imperdiet vitae. Duis feugiat, elit quis aliquet varius, massa eros mattis ex, sed dictum nisl leo a mi. Aliquam gravida eleifend nibh rhoncus dictum.',
      'Sed rhoncus lectus magna, quis facilisis leo tincidunt vitae. Nunc at pretium ante. Etiam quis egestas tellus. Curabitur lobortis mi sit amet mi iaculis, vel scelerisque magna congue. Cras eget tempor enim.'
    ],
    tips: [
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      'Aliquam interdum urna sit amet massa pharetra, non vulputate.',
      'Curabitur vel leo id erat auctor gravida in eget nulla.'
    ]
  },
  {
    id: 'guide-occulti-vampiri',
    title: 'Nullam Hendrerit Mi Eu Finibus',
    description: 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.',
    category: 'gameplay',
    author: 'ContessaSim',
    date: '02 Luglio 2026',
    readTime: '8 min',
    difficulty: 'Esperto',
    tags: ['nullam', 'hendrerit', 'finibus', 'lorem'],
    content: [
      'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.',
      'Aliquam sollicitudin, arcu a laoreet tempor, risus neque pretium ipsum, sed convallis risus ligula a tellus. Cras iaculis ultricies nulla. Donec quis dui at sem tempor varius. Ut nonummy convallis risus.',
      'Morbi leo mi, nonummy eget, tristique non, rhoncus non, leo. Nullam tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Vestibulum sapien.',
      'Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue a odio. Nam nec ante. Sed lacinia, urna non volutpat tempor, tempor erat vehicula aliquet, nulla.',
      'Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend.'
    ],
    tips: [
      'Morbi leo mi, nonummy eget, tristique non, rhoncus non, leo.',
      'Quisque cursus, metus vitae pharetra auctor, sem massa mattis.',
      'Donec laoreet nonummy augue. Suspendisse dui purus.'
    ]
  },
  {
    id: 'guide-roofing',
    title: 'Nemo Enim Ipsam Voluptatem',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    category: 'costruzione',
    author: 'ArchitettoSim',
    date: '20 Giugno 2026',
    readTime: '7 min',
    difficulty: 'Esperto',
    tags: ['nemo', 'enim', 'ipsam', 'lorem'],
    content: [
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
      'Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Temporibus autem quibusdam et aut officiis.',
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.'
    ],
    tips: [
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.',
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit.',
      'Consectetur, adipisci velit, sed quia non numquam eius modi.'
    ]
  },
  {
    id: 'guide-affitti-luna',
    title: 'Quis Autem Vel Eum Iure',
    description: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
    category: 'espansioni',
    author: 'SimImmobiliare',
    date: '10 Giugno 2026',
    readTime: '8 min',
    difficulty: 'Intermedio',
    tags: ['quis', 'autem', 'eum', 'lorem'],
    content: [
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio.',
      'Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecat cupiditate non provident, similique sunt in culpa qui officia deserunt.',
      'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.',
      'Omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic.',
      'Tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    ],
    tips: [
      'Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.',
      'Et harum quidem rerum facilis est et expedita distinctio.',
      'Omnis dolor repellendus. Temporibus autem quibusdam et aut.'
    ]
  }
];

export const cheatsData: Cheat[] = [
  {
    code: 'testingcheats true',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo, nec finibus mi.',
    category: 'Generali',
    requirements: 'LOREM'
  },
  {
    code: 'motherlode',
    description: 'Aenean lobortis diam at interdum eleifend. Ut gravida rhoncus dolor, ac convallis enim hendrerit a.',
    category: 'Soldi',
    requirements: 'LOREM'
  },
  {
    code: 'kaching',
    description: 'Praesent at nunc a lectus eleifend elementum sit amet tristique mi. Sed vitae interdum erat.',
    category: 'Soldi',
    requirements: 'LOREM'
  },
  {
    code: 'rosebud',
    description: 'Vivamus vestibulum ligula sed nulla pharetra, vitae facilisis ex volutpat. Quisque hendrerit.',
    category: 'Soldi',
    requirements: 'LOREM'
  },
  {
    code: 'Money [cifra]',
    description: 'Nam eleifend hendrerit massa, vitae congue tortor feugiat sed. Aliquam erat volutpat.',
    category: 'Soldi',
    requirements: 'LOREM_TEST'
  },
  {
    code: 'bb.moveobjects',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    category: 'Costruzione',
    requirements: 'LOREM'
  },
  {
    code: 'bb.showhiddenobjects',
    description: 'Mauris dictum tincidunt nisl, nec maximus libero consequat quis. Aliquam interdum urna sit amet.',
    category: 'Costruzione',
    requirements: 'LOREM'
  },
  {
    code: 'bb.showliveeditobjects',
    description: 'Nullam hendrerit mi eu finibus feugiat. Vestibulum pretium scelerisque elit, id maximus diam feugiat ac.',
    category: 'Costruzione',
    requirements: 'LOREM_SHOW'
  },
  {
    code: 'bb.ignoregameplayunlocksentitlement',
    description: 'Quisque sodales scelerisque turpis, id condimentum dolor imperdiet vitae. Duis feugiat, elit quis aliquet.',
    category: 'Costruzione',
    requirements: 'LOREM'
  },
  {
    code: 'sims.fill_all_commodities',
    description: 'Sed rhoncus lectus magna, quis facilisis leo tincidunt vitae. Nunc at pretium ante. Etiam quis.',
    category: 'Bisogni/Stati',
    requirements: 'LOREM_TEST'
  },
  {
    code: 'stats.set_skill_level Major_HomestyleCooking 10',
    description: 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo.',
    category: 'Carriere/Abilità',
    requirements: 'LOREM_TEST'
  },
  {
    code: 'stats.set_skill_level Major_Charisma 10',
    description: 'Aliquam sollicitudin, arcu a laoreet tempor, risus neque pretium ipsum, sed convallis risus ligula.',
    category: 'Carriere/Abilità',
    requirements: 'LOREM_TEST'
  },
  {
    code: 'careers.promote Executive',
    description: 'Morbi leo mi, nonummy eget, tristique non, rhoncus non, leo. Nullam tempor. Class aptent taciti.',
    category: 'Carriere/Abilità',
    requirements: 'LOREM_TEST'
  },
  {
    code: 'traits.equip_trait Trait_OccultVampire',
    description: 'Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue a odio.',
    category: 'Bisogni/Stati',
    requirements: 'LOREM_TEST'
  },
  {
    code: 'cas.fulleditmode',
    description: 'Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at.',
    category: 'Generali',
    requirements: 'LOREM_TEST'
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
