export const dining_it = {
  title: 'Ristorazione',
  keywords: [
    // Keywords specifiche per la colazione
    'colazione', 'brioche', 'cappuccino', 'caffè',
    'cornetti', 'prima colazione', 'buffet colazione',
    'yogurt', 'cereali', 'dolce mattino', 'sveglia', 
    'mattinata', 'mattina', 'alba', 'risveglio',

    // Keywords specifiche per la cena
    'cena', 'ristorante serale', 'menu serale', 
    'chef', 'cucina', 'specialità', 'menu cena',
    'vini', 'serata', 'tradizione', 'portate serali', 
    'cucina casalinga', 'sapori locali', 'cena in hotel',

    // Keywords specifiche per il pranzo
    'pranzo', 'pausa pranzo', 'mezzogiorno',
    'pranzo leggero', 'spuntino', 'pausa', 
    'pranzo veloce', 'menu pranzo',

    // Keywords specifiche per il bar
    'bar', 'aperitivo', 'cocktail', 'bevande',
    'terrazza', 'bancone', 'stuzzichini',
    'aperitivi', 'barista', 'drink',

    // Keywords generali
    'ristorante', 'mangiare', 'bere', 'buffet',
    'sala', 'piano', 'panoramica', 'vista',
    'ora', 'orario', 'quando', 'prenotazione',
    'menu', 'piatti', 'scelta', 'servizio'
  ],
  questions: {
    // SEZIONE COLAZIONE
    'Dove viene servita la colazione?': {
      answer: 'Vi aspettiamo nella nostra accogliente sala al piano terra per la colazione. La sala è luminosa con belle vetrate che si affacciano sulle montagne. Il buffet è organizzato in modo pratico: troverete l\'angolo dei cereali e yogurt, la zona del pane e dei dolci freschi, e il nostro addetto al bar che prepara caffè e cappuccini come piacciono a voi.',
      tags: ['colazione', 'prima colazione', 'mattino', 'sala colazioni', 'dove fare colazione', 'buffet mattutino', 'dove si fa colazione', 'colazione hotel', 'sala mattino', 'mattinata', 'alba']
    },
    'Quali sono gli orari della colazione?': {
      answer: 'Serviamo la colazione dalle 07:30 alle 09:30. Vi consigliamo di venire presto per iniziare con calma la vostra giornata sulla neve. Il buffet viene costantemente rifornito fino all\'orario di chiusura.',
      tags: ['colazione', 'orari colazione', 'quando colazione', 'a che ora colazione', 'orario mattino', 'colazione mattino', 'quando apre colazione', 'orari mattina']
    },
    'Cosa include il buffet della colazione?': {
      answer: 'Il nostro buffet della prima colazione offre una varietà di scelte per tutti i gusti: croissant e brioche appena sfornati, torte fatte in casa, pane fresco, yogurt con cereali e frutta fresca. Per chi preferisce il salato: affettati selezionati, formaggi locali e uova. Non mancano marmellate, miele, Nutella e burro. Le bevande includono succhi di frutta, caffè espresso, cappuccino, latte, tè e tisane.',
      tags: ['colazione', 'buffet mattino', 'menu colazione', 'cosa offre colazione', 'scelta colazione', 'prodotti colazione', 'contenuto colazione']
    },

    // SEZIONE CENA
    'Dove viene servita la cena?': {
      answer: 'La cena viene servita nella nostra sala ristorante al piano terra, che alla sera si trasforma in un ambiente piacevole e accogliente. Il nostro cuoco prepara piatti della tradizione locale e nazionale, con un menu che cambia ogni giorno e include due primi, due secondi e un dolce. La sala offre una bella vista sulle montagne e un\'atmosfera familiare.',
      tags: ['cena', 'ristorante serale', 'cucina', 'sala ristorante', 'dove cenare', 'cena hotel', 'ristorante hotel', 'sala cena', 'cena in hotel', 'serata']
    },
    'Quali sono gli orari della cena?': {
      answer: 'Il servizio cena è disponibile dalle 19:30 alle 20:30. Vi ricordiamo che è necessario prenotare entro le 16:00 presso la reception per permetterci di organizzare al meglio il servizio e garantirvi la scelta tra le diverse portate del menu.',
      tags: ['cena', 'orari cena', 'quando cena', 'a che ora cena', 'orario sera', 'cena sera', 'quando apre cena', 'orari sera']
    },
    'È necessario prenotare per la cena?': {
      answer: 'Sì, la prenotazione per la cena è obbligatoria e va effettuata entro le 16:00 alla reception. Al momento della prenotazione potrete consultare il menu del giorno che include la scelta tra due primi, due secondi e il dolce. Offriamo anche una selezione di vini locali e nazionali per accompagnare la vostra cena.',
      tags: ['cena', 'prenotazione cena', 'prenotare cena', 'prenotazione serale', 'prenotare tavolo', 'prenotazione tavolo', 'prenotare posto']
    },

    // SEZIONE PRANZO
    'Il ristorante serve anche il pranzo?': {
      answer: 'Sì, su richiesta è possibile pranzare in hotel. Offriamo un menu leggero con piatti veloci e gustosi, ideali per chi vuole fare una pausa tra le attività della giornata. Per verificare la disponibilità e conoscere il menu del giorno, vi preghiamo di rivolgervi alla reception la mattina stessa.',
      tags: ['pranzo', 'pranzo hotel', 'pausa pranzo', 'mezzogiorno', 'pranzo veloce', 'pausa pranzo', 'mangiare mezzogiorno']
    },
    'Dove posso pranzare?': {
      answer: 'Il pranzo viene servito nella nostra sala ristorante. Offriamo un servizio pratico e informale, perfetto per una pausa ristoratrice durante la giornata. La prenotazione va effettuata la mattina stessa alla reception per permetterci di organizzare al meglio il servizio.',
      tags: ['pranzo', 'dove pranzo', 'sala pranzo', 'posto pranzo', 'area pranzo', 'zona pranzo', 'ristorante pranzo', 'dove mangiare']
    },

    // SEZIONE BAR E APERITIVI
    'Quali sono gli orari del bar?': {
      answer: 'Il nostro bar è aperto con orario continuato dalle 10:00 alle 14:00 e dalle 16:00 alle 23:00. Si trova nell\'area comune di fronte alla reception, con accesso al terrazzo panoramico dove, nelle belle giornate, potrete godervi una vista spettacolare sulle piste da sci.',
      tags: ['bar', 'orari bar', 'apertura bar', 'quando bar', 'orario aperitivo', 'bar aperto', 'orario bar', 'aperitivo orario']
    },
    'Cosa posso consumare al bar?': {
      answer: 'Il nostro bar propone una selezione di bevande calde come caffè, cappuccino, cioccolata calda e tè. Per gli aperitivi offriamo vini locali, birre, cocktail classici e analcolici. Durante l\'orario dell\'aperitivo serviamo stuzzichini e snack. Nelle giornate di sole, potete accomodarvi sul terrazzo panoramico.',
      tags: ['bar', 'bevande', 'cosa bere', 'menu bar', 'cocktail', 'aperitivo', 'bibite', 'cosa offre bar']
    },
    'Il bar serve aperitivi?': {
      answer: 'Sì, il bar è il posto ideale per l\'aperitivo. Potete scegliere tra vini del territorio, birre, cocktail classici e analcolici, accompagnati da stuzzichini. Nelle belle giornate, l\'aperitivo viene servito anche sul terrazzo panoramico, dove potrete rilassarvi ammirando il panorama delle montagne.',
      tags: ['bar', 'aperitivo', 'stuzzichini', 'pre cena', 'aperitivi', 'terrazzo', 'bere aperitivo', 'fare aperitivo']
    }
  }
};
