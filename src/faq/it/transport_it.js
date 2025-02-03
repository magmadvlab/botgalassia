export const transport_it = {
  title: 'Trasporti e Navetta',
  keywords: [
    // Sinonimi per "navetta" e trasporti
    'navetta', 'shuttle', 'bus', 'pulmino', 'trasporto', 'transfer', 'mezzi', 'mezzo', 
    'collegamento', 'spostarsi', 'muoversi', 'come arrivo', 'come posso arrivare', 'come andare', 
    'come si arriva', 'come raggiungere', 'come spostarsi', 'come faccio a arrivare', 
    'bus navetta', 'navetta hotel', 'navetta gratuita', 'dove prendo la navetta', 'quando passa la navetta',
    
    // Sinonimi per "parcheggio"
    'parcheggio', 'auto', 'sosta', 'posto auto', 'box', 'garage', 'parcheggio coperto', 'garage auto', 
    'parcheggio hotel', 'dove parcheggiare', 'dove lasciare l\'auto', 'posto auto', 'parcheggio riservato',
    'parcheggio gratuito', 'costo parcheggio', 'esiste un garage', 'garage disponibile', 'dove metto la macchina',

    // Destinazioni
    'conca', 'prato nevoso', 'centro', 'centro paese', 'paese', 'città', 'stazione', 'aeroporto', 
    'monte', 'piste', 'impianti di risalita', 'come arrivo alla conca', 'come arrivo al centro', 
    'come andare alle piste', 'come arrivo agli impianti',

    // Sinonimi per "orari" e costi
    'orari', 'a che ora', 'quando parte', 'quando arriva', 'orario servizio', 'orari trasporto', 'costo trasporto', 
    'quanto costa', 'tariffe', 'prezzo biglietto', 'biglietto bus', 'prenotazione navetta', 'devo prenotare la navetta'
  ],
  questions: {
    'Come arrivo in centro?': {
      answer: 'L\'hotel offre un **servizio navetta gratuito** da e per la **conca di Prato Nevoso**. Il servizio è attivo tutti i giorni:\n' +
        '- **Mattino**: 08:30 - 12:30\n' +
        '- **Pomeriggio**: 14:30 - 17:30\n' +
        '📞 **Per prenotare, contatta la reception al +39 0174 334183**.',
      tags: ['centro', 'conca', 'navetta', 'bus', 'shuttle', 'trasporto', 'muoversi', 'navetta centro', 
             'dove prendo la navetta', 'orari navetta', 'navetta per il paese', 'andare al centro']
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
    'Quali sono gli orari della navetta?': {
      answer: '🚌 **Orari Navetta:**\n' +
        '- **Mattino**: 08:30 - 12:30\n' +
        '- **Pomeriggio**: 14:30 - 17:30\n' +
        '📞 **Per prenotazioni, contatta la reception al +39 0174 334183**.',
      tags: ['orari navetta', 'quando parte', 'quando arriva', 'a che ora c\'è la navetta', 
             'quando posso prendere la navetta', 'orario trasporto']
    },
    'La navetta è gratuita?': {
      answer: '✅ **Sì, il servizio navetta è gratuito** per tutti gli ospiti dell\'hotel.',
      tags: ['navetta', 'costi', 'gratuito', 'quanto costa la navetta', 'c\'è un costo per la navetta', 
             'devo pagare la navetta', 'navetta gratuita', 'prezzo navetta']
    },
    'Dove posso parcheggiare?': {
      answer: '🚗 **Parcheggi disponibili:**\n' +
        '- **Parcheggio esterno gratuito**\n' +
        '- **Parcheggio coperto a pagamento** (15€ al giorno)\n' +
        '📞 **Prenotazioni in reception.**',
      tags: ['parcheggio', 'auto', 'dove lasciare l\'auto', 'dove parcheggiare', 'posto auto', 
             'garage', 'parcheggio gratuito', 'c\'è parcheggio coperto']
    },
    'Esiste un garage?': {
      answer: '🏠 **Sì, abbiamo un garage coperto** disponibile a **15€ al giorno**. Protegge l\'auto da neve e gelo.',
      tags: ['garage', 'parcheggio coperto', 'dove posso mettere la macchina', 'garage hotel', 
             'esiste un garage', 'prezzo garage']
    },
    'Come raggiungere l\'hotel in auto?': {
      answer: '🚗 **Indicazioni Stradali:**\n' +
        '- **Da Torino**: Autostrada A6 Torino-Savona, uscita Mondovì, seguire indicazioni per Prato Nevoso.\n' +
        '- **Da Genova**: A10, poi A6 verso Torino, uscita Mondovì, seguire per Prato Nevoso.',
      tags: ['auto', 'strada', 'come arrivare in macchina', 'come si arriva all\'hotel in auto', 
             'indicazioni hotel', 'direzione Prato Nevoso']
    },
    'Ci sono mezzi pubblici per arrivare in hotel?': {
      answer: '🚆 **Trasporti pubblici:**\n' +
        '- **Treno** fino a Mondovì 🚆\n' +
        '- **Bus di linea** per Prato Nevoso 🚌\n' +
        '📞 **Orari aggiornati disponibili in reception.**',
      tags: ['mezzi pubblici', 'treno', 'bus', 'trasporto pubblico', 'c\'è un bus per l\'hotel', 
             'come arrivare con i mezzi', 'autobus per Prato Nevoso']
    },
    'Esiste un servizio transfer dall’aeroporto?': {
      answer: '🚖 **No, non offriamo un transfer diretto.**\n📞 **Possiamo suggerire taxi o servizi alternativi.**',
      tags: ['transfer', 'aeroporto', 'navetta aeroporto', 'come arrivare dall\'aeroporto', 
             'taxi per l\'hotel', 'come raggiungere l\'hotel dall\'aeroporto']
    },
    'Posso prenotare un taxi?': {
      answer: '🚕 **Sì! La reception può prenotare un taxi per te.**\n📞 **Chiamaci al +39 0174 334183.**',
      tags: ['taxi', 'trasporto', 'prenotare taxi', 'c\'è un servizio taxi', 'come chiamo un taxi', 
             'posso avere un taxi', 'taxi hotel']
    }
  }
};
