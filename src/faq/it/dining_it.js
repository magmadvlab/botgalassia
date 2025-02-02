export const dining_it = {
  title: 'Ristorazione',
  keywords: [
    // Keywords specifiche per la colazione
    'colazione', 'brioche', 'cappuccino', 'caffè',
    'cornetti', 'prima colazione', 'buffet colazione',
    'yogurt', 'cereali', 'dolce mattino', 'sveglia', 
    'mattinata', 'mattina', 'alba', 'risveglio', 'breakfast',

    // Keywords specifiche per la cena
    'cena', 'ristorante cena', 'menu serale', 'cena hotel',
    'chef', 'cucina serale', 'specialità cena', 'menu cena',
    'vini', 'serata', 'tradizione', 'portate serali', 
    'cucina casalinga', 'sapori locali', 'cena in hotel', 'dinner',

    // Keywords specifiche per il pranzo
    'pranzo', 'pausa pranzo', 'mezzogiorno',
    'pranzo leggero', 'spuntino', 'pausa', 
    'pranzo veloce', 'menu pranzo', 'lunch',

    // Keywords specifiche per il bar
    'bar', 'aperitivo', 'cocktail', 'bevande',
    'terrazza', 'bancone', 'stuzzichini',
    'aperitivi', 'barista', 'drink', 'happy hour',

    // Keywords generali (evitare confusione con sezioni specifiche)
    'ristorante generale', 'mangiare hotel', 'bere hotel', 'buffet generale',
    'sala ristorante', 'ristorazione hotel', 'cucina hotel'
  ],
  questions: {
    // SEZIONE COLAZIONE
    'Dove viene servita la colazione?': {
      answer: 'Vi aspettiamo nella nostra accogliente sala al piano terra per la colazione. La sala è luminosa con belle vetrate che si affacciano sulle montagne. Il buffet è organizzato in modo pratico: troverete l\'angolo dei cereali e yogurt, la zona del pane e dei dolci freschi, e il nostro addetto al bar che prepara caffè e cappuccini come piacciono a voi.',
      tags: ['colazione', 'prima colazione', 'buffet colazione', 'sala colazioni', 'colazione hotel', 'breakfast', 'dove si fa colazione']
    },
    'Quali sono gli orari della colazione?': {
      answer: 'Serviamo la colazione dalle 07:30 alle 09:30. Vi consigliamo di venire presto per iniziare con calma la vostra giornata sulla neve. Il buffet viene costantemente rifornito fino all\'orario di chiusura.',
      tags: ['colazione', 'orari colazione', 'orario breakfast', 'colazione mattino', 'quando colazione', 'orario colazione hotel']
    },

    // SEZIONE CENA
    'Dove viene servita la cena?': {
      answer: 'La cena viene servita nella nostra sala ristorante al piano terra, che alla sera si trasforma in un ambiente piacevole e accogliente. Il nostro cuoco prepara piatti della tradizione locale e nazionale, con un menu che cambia ogni giorno e include due primi, due secondi e un dolce.',
      tags: ['cena', 'ristorante cena', 'cena hotel', 'menu cena', 'dinner', 'sala cena', 'orario cena']
    },
    'Quali sono gli orari della cena?': {
      answer: 'Il servizio cena è disponibile dalle 19:30 alle 20:30. Vi ricordiamo che è necessario prenotare entro le 16:00 presso la reception.',
      tags: ['cena', 'orari cena', 'orario cena hotel', 'quando cena', 'orario dinner']
    },

    // SEZIONE PRANZO
    'Il ristorante serve anche il pranzo?': {
      answer: 'Sì, su richiesta è possibile pranzare in hotel. Offriamo un menu leggero con piatti veloci e gustosi, ideali per chi vuole fare una pausa tra le attività della giornata.',
      tags: ['pranzo', 'ristorante pranzo', 'pranzo hotel', 'lunch', 'orari pranzo', 'menu pranzo']
    },
    'Dove posso pranzare?': {
      answer: 'Il pranzo viene servito nella nostra sala ristorante. Offriamo un servizio pratico e informale, perfetto per una pausa ristoratrice durante la giornata.',
      tags: ['pranzo', 'ristorante pranzo', 'orario pranzo', 'dove pranzare', 'menu lunch']
    },

    // SEZIONE BAR E APERITIVI
    'Quali sono gli orari del bar?': {
      answer: 'Il nostro bar è aperto con orario continuato dalle 10:00 alle 14:00 e dalle 16:00 alle 23:00.',
      tags: ['bar', 'orari bar', 'bar hotel', 'orario aperitivo', 'orari drink']
    },
    'Cosa posso consumare al bar?': {
      answer: 'Il nostro bar propone una selezione di bevande calde come caffè, cappuccino, cioccolata calda e tè. Per gli aperitivi offriamo vini locali, birre, cocktail classici e analcolici.',
      tags: ['bar', 'bevande', 'drink', 'menu bar', 'cocktail bar', 'happy hour']
    }
  }
};
