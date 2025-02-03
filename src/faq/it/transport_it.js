export const transport_it = {
  title: 'Trasporti e Navetta',
  keywords: [
    // Sinonimi per "navetta" e trasporti
    'navetta', 'shuttle', 'bus', 'pulmino', 'trasporto', 'transfer', 'mezzi', 'mezzo',
    'collegamento', 'spostarsi', 'muoversi', 'come arrivo', 'come posso arrivare', 'come andare',
    'come si arriva', 'come raggiungere', 'come spostarsi', 'come faccio ad arrivare',
    'bus navetta', 'navetta hotel', 'navetta gratuita', 'dove prendo la navetta', 'quando passa la navetta',

    // Espansione per "arrivare in Conca" e "arrivare in centro"
    'conca', 'prato nevoso', 'centro', 'centro paese', 'paese', 'città', 'come arrivo in conca',
    'come arrivo giù in conca', 'come arrivo in centro', 'come raggiungo la conca', 'come vado in conca',
    'come vado in centro', 'come si arriva in centro', 'come raggiungere il centro', 'per andare in centro',
    'per raggiungere la conca', 'per arrivare al centro', 'voglio andare in conca', 'come vado giù al centro',
    'come posso scendere in conca', 'dove prendo il bus per la conca', 'navetta per il centro', 'navetta per la conca',
    'scendere giù', 'come scendere in conca', 'come scendere al centro', 'come scendo giù', 'come arrivo giù in conca',
    'come scendo a prato nevoso', 'giù a prato nevoso', 'giù al centro', 'giù in conca', 'scendere a prato nevoso',
    'scendere alle piste', 'come scendo agli impianti',

    // Sinonimi per "parcheggio"
    'parcheggio', 'auto', 'sosta', 'posto auto', 'box', 'garage', 'parcheggio coperto', 'garage auto',
    'parcheggio hotel', 'dove parcheggiare', 'dove lasciare l\'auto', 'posto auto', 'parcheggio riservato',
    'parcheggio gratuito', 'costo parcheggio', 'esiste un garage', 'garage disponibile', 'dove metto la macchina',

    // Destinazioni
    'stazione', 'aeroporto', 'monte', 'piste', 'impianti di risalita', 'come andare alle piste', 
    'come arrivo agli impianti',

    // Sinonimi per "orari" e costi
    'orari', 'a che ora', 'quando parte', 'quando arriva', 'orario servizio', 'orari trasporto', 'costo trasporto',
    'quanto costa', 'tariffe', 'prezzo biglietto', 'biglietto bus', 'prenotazione navetta', 'devo prenotare la navetta'
  ],
  questions: {
    'Come arrivo in conca?': {
      answer: '🚐 **Navetta gratuita per la Conca di Prato Nevoso!**\n' +
        '- **Mattino**: 08:30 - 12:30\n' +
        '- **Pomeriggio**: 14:30 - 17:30\n' +
        '📍 La navetta collega l\'hotel alla Conca.\n' +
        '📞 **Prenota in reception al +39 0174 334183.**',
      tags: ['conca', 'come arrivo in conca', 'navetta conca', 'bus per conca', 'come vado in conca',
             'come raggiungo la conca', 'dove prendo la navetta per la conca', 'quando parte la navetta per la conca',
             'come arrivo giù in conca', 'come scendo in conca', 'voglio scendere in conca', 'scendere giù']
    },
    'Come arrivo in centro?': {
      answer: '🏙 **Vuoi andare in centro?**\n' +
        '🚐 **Navetta gratuita disponibile:**\n' +
        '- **Mattino**: 08:30 - 12:30\n' +
        '- **Pomeriggio**: 14:30 - 17:30\n' +
        '📞 **Per prenotare la navetta, contatta la reception al +39 0174 334183.**',
      tags: ['centro', 'come arrivo in centro', 'bus per il centro', 'come vado in centro', 
             'come raggiungere il centro', 'per andare in centro', 'voglio andare in centro', 
             'come posso scendere in centro', 'navetta per il centro', 'scendere in centro', 
             'giù in centro', 'come arrivo giù in centro', 'scendere giù in paese']
    },
    'Come funziona la navetta?': {
      answer: '🚐 **La navetta è gratuita** per gli ospiti dell\'hotel e collega l\'hotel con la conca di Prato Nevoso.\n' +
        '🕒 **Orari**:\n' +
        '- **08:30 - 12:30**\n' +
        '- **14:30 - 17:30**\n' +
        '📞 **Prenotazioni presso la reception al +39 0174 334183**.',
      tags: ['navetta', 'come funziona', 'servizio navetta', 'trasporto', 'orari', 'prenotazione', 
             'shuttle', 'orario navetta', 'quando parte la navetta', 'quando c\'è la navetta']
    },
    'Dove posso parcheggiare?': {
      answer: '🚗 **Parcheggi disponibili:**\n' +
        '- **Parcheggio esterno gratuito**\n' +
        '- **Parcheggio coperto a pagamento** (15€ al giorno)\n' +
        '📞 **Prenotazioni in reception.**',
      tags: ['parcheggio', 'auto', 'dove lasciare l\'auto', 'dove parcheggiare', 'posto auto', 
             'garage', 'parcheggio gratuito', 'c\'è parcheggio coperto']
    },
    'Come raggiungere l\'hotel in auto?': {
      answer: '🚗 **Indicazioni Stradali:**\n' +
        '- **Da Torino**: Autostrada A6 Torino-Savona, uscita Mondovì, seguire indicazioni per Prato Nevoso.\n' +
        '- **Da Genova**: A10, poi A6 verso Torino, uscita Mondovì, seguire per Prato Nevoso.',
      tags: ['auto', 'strada', 'come arrivare in macchina', 'come si arriva all\'hotel in auto', 
             'indicazioni hotel', 'direzione Prato Nevoso']
    },
    'Posso prenotare un taxi?': {
      answer: '🚕 **Sì! La reception può prenotare un taxi per te.**\n📞 **Chiamaci al +39 0174 334183.**',
      tags: ['taxi', 'trasporto', 'prenotare taxi', 'c\'è un servizio taxi', 'come chiamo un taxi', 
             'posso avere un taxi', 'taxi hotel']
    }
  }
};
