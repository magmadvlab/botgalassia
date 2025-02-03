export const transport_it = {
  title: 'Trasporti e Navetta',
  keywords: [
    'navetta', 'shuttle', 'bus', 'pulmino', 'trasporto', 'transfer', 'mezzi', 'mezzo',
    'collegamento', 'spostarsi', 'muoversi', 'come arrivo', 'come posso arrivare', 'come andare',
    'come si arriva', 'come raggiungere', 'come spostarsi', 'come faccio ad arrivare',
    'bus navetta', 'navetta hotel', 'navetta gratuita', 'dove prendo la navetta', 'quando passa la navetta',

    'conca', 'prato nevoso', 'centro', 'centro paese', 'paese', 'città', 
    'come arrivo in conca', 'come arrivo giù in conca', 'come arrivo in centro', 
    'come raggiungo la conca', 'come vado in conca', 'come vado in centro', 
    'come si arriva in centro', 'come raggiungere il centro', 'per andare in centro',
    'per raggiungere la conca', 'per arrivare al centro', 'voglio andare in conca', 
    'come vado giù al centro', 'come posso scendere in conca', 'dove prendo il bus per la conca', 
    'navetta per il centro', 'navetta per la conca', 'scendere giù', 'come scendere in conca', 
    'come scendere al centro', 'come scendo giù', 'come arrivo giù in conca',
    'come scendo a prato nevoso', 'giù a prato nevoso', 'giù al centro', 'giù in conca', 
    'scendere a prato nevoso', 'scendere alle piste', 'come scendo agli impianti',
    'arrivare in conca', 'arrivare al centro', 'andare in conca', 'andare al centro',
    'raggiungere la conca', 'raggiungere il centro', 'spostarsi in conca', 'spostarsi in centro',
    'conca prato nevoso', 'centro prato nevoso', 'prato nevoso conca', 'prato nevoso centro',

    'parcheggio', 'auto', 'sosta', 'posto auto', 'box', 'garage', 'parcheggio coperto', 'garage auto',
    'parcheggio hotel', 'dove parcheggiare', 'dove lasciare l\'auto', 'posto auto', 'parcheggio riservato',
    'parcheggio gratuito', 'costo parcheggio', 'esiste un garage', 'garage disponibile', 'dove metto la macchina',
    'parcheggiare a prato nevoso', 'parcheggio conca', 'parcheggio centro', 'parcheggio vicino',

    'stazione', 'aeroporto', 'monte', 'piste', 'impianti di risalita', 'come andare alle piste', 
    'come arrivo agli impianti', 'raggiungere le piste', 'andare agli impianti', 'impianti prato nevoso',
    'funivia', 'seggiovia',

    'orari', 'a che ora', 'quando parte', 'quando arriva', 'orario servizio', 'orari trasporto', 'costo trasporto',
    'quanto costa', 'tariffe', 'prezzo biglietto', 'biglietto bus', 'prenotazione navetta', 'devo prenotare la navetta',
    'orari navetta conca', 'orari navetta centro', 'costo navetta', 'navetta gratuita o a pagamento',

    'mappa', 'indicazioni', 'informazioni', 'contatti', 'telefono', 'email', 'sito web', 'aiuto', 'assistenza',
    'come arrivare a prato nevoso', 'trasporti prato nevoso', 'navette prato nevoso', 'bus prato nevoso',
    'taxi prato nevoso', 'parcheggi prato nevoso', 'orari prato nevoso', 'costi prato nevoso'
  ],
  questions: {
    'Come arrivo alle piste?': {
      answer: '⛷️ **Raggiungi le piste facilmente!**\n' +
        ' **Funivia e seggiovie** ti portano in quota.\n' +
        ' **Partenza** vicino alla Conca e al Villaggio.\n' +
        'ℹ️ **Biglietti e info** alle casse impianti.',
      tags: ['piste', 'impianti', 'funivia', 'seggiovia', 'come arrivare alle piste', 'raggiungere le piste',
        'andare alle piste', 'impianti prato nevoso', 'come scendo alle piste', 'come salgo alle piste']
    },
    'C\'è un servizio di taxi?': {  // Template literal (backticks)
      answer: ' **Certo!**\n' +
        ' **La reception può chiamare un taxi per te:** +39 0174 334183.',
      tags: ['taxi', 'servizio taxi', 'prenotare taxi', 'chiamare taxi', 'taxi prato nevoso', 'come prendere un taxi']
    },
    'Dove posso trovare una mappa di Prato Nevoso?': {
      answer: '️ **Trova la mappa!**\n' +
        ' **Ufficio turistico** in centro.\n' +
        'ℹ️ **Oppure online:** [link a una mappa online]',
      tags: ['mappa', 'prato nevoso mappa', 'cartina prato nevoso', 'dove trovare la mappa', 'informazioni prato nevoso']
    },
    'Quali sono i contatti dell\'ufficio turistico?': { // Template literal (backticks)
      answer: 'ℹ️ **Contatti Ufficio Turistico:**\n' +
        ' **Telefono:** [numero di telefono]\n' +
        ' **Sito web:** [indirizzo sito web]',
      tags: ['ufficio turistico', 'contatti ufficio turistico', 'telefono ufficio turistico', 'informazioni turistiche']
    },
    'Come arrivo a Prato Nevoso da [città]?': {
      answer: ' **Da [città] a Prato Nevoso:**\n' +
        '• **In auto:** [indicazioni stradali dettagliate]\n' +
        '• **In treno + bus:** [informazioni su treni e autobus]\n' +
        '• **Altre opzioni:** [taxi, transfer, ecc.]',
      tags: ['come arrivare a prato nevoso', 'prato nevoso da [città]', 'trasporti prato nevoso', 'collegamenti prato nevoso']
    },
    'Quanto costa il parcheggio?': {
      answer: '🅿️ **Costi Parcheggio:**\n' +
        '• **Esterno gratuito**\n' +
        '• **Coperto a pagamento:** 15€ al giorno\n' +
        'ℹ️ **Prenotazioni in reception.**',
      tags: ['parcheggio costo', 'parcheggio tariffe', 'quanto costa parcheggiare', 'prezzo parcheggio', 'parcheggio prato nevoso costo']
    },
    'A che ora parte la prima navetta per la Conca?': {
      answer: '⏰ **Prima Navetta per la Conca:**\n' +
        '• **Mattina:** 08:30',
      tags: ['navetta orari', 'orario navetta conca', 'prima navetta', 'quando parte la navetta', 'a che ora parte la navetta']
    },
    'Come posso raggiungere la stazione degli autobus?': {
      answer: ' **La stazione degli autobus è facilmente raggiungibile dal centro.**\n' +
        'Puoi prendere la navetta gratuita o un taxi.',
      tags: ['stazione autobus', 'bus station', 'come arrivare alla stazione', 'raggiungere la stazione', 'navetta stazione', 'taxi stazione']
    },
    'C\'è un bus che collega Prato Nevoso con l\'aeroporto di Cuneo?': { // Template literal (backticks)
      answer: ` **No, al momento non esiste un collegamento diretto in autobus tra Prato Nevoso e l'aeroporto di Cuneo.**\n` +
        `Tuttavia, puoi raggiungere la stazione di Mondovì con la navetta e da lì prendere un autobus per l'aeroporto.`,
      tags: ['bus aeroporto cuneo', 'collegamento aeroporto', 'navetta aeroporto', 'trasporto aeroporto cuneo'] // Added relevant tags
    }
  }
};
