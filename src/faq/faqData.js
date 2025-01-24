export const FAQData = {
  checkin: {
    title: 'Check-in',
    keywords: ['check-in', 'checkin', 'arrivo', 'entrata', 'inizio soggiorno'],
    questions: {
      orario: {
        tags: ['orario', 'quando', 'ora'],
        answer: 'Il check-in è disponibile dalle 14:00 alle 22:00. Se arrivate dopo le 22:00, vi preghiamo di informare la reception in anticipo.'
      },
      documenti: {
        tags: ['documenti', 'carta identità', 'passaporto'],
        answer: 'Per il check-in è necessario presentare un documento d\'identità valido per ogni ospite.'
      }
    }
  },
  checkout: {
    title: 'Check-out',
    keywords: ['check-out', 'checkout', 'partenza', 'uscita', 'fine soggiorno'],
    questions: {
      orario: {
        tags: ['orario', 'quando', 'ora'],
        answer: 'La camera deve essere liberata entro le 10:00 del giorno di partenza. Se avete necessità di tenere i bagagli più a lungo, la reception offre un servizio gratuito di deposito.'
      }
    }
  },
  ski: {
    title: 'Sci e Sport Invernali',
    keywords: ['sci', 'snow', 'piste', 'skipass', 'snowboard'],
    questions: {
      skipass: {
        tags: ['skipass', 'biglietti', 'pass'],
        answer: 'Gli skipass possono essere acquistati direttamente alla reception. Offriamo tariffe speciali per i nostri ospiti.'
      },
      noleggio: {
        tags: ['noleggio', 'attrezzatura', 'materiale'],
        answer: 'Il noleggio attrezzatura è disponibile presso il nostro ski shop interno, aperto dalle 8:00 alle 17:00.'
      }
    }
  },
  wellness: {
    title: 'Benessere',
    keywords: ['spa', 'massaggi', 'piscina', 'sauna', 'benessere'],
    questions: {
      orari: {
        tags: ['orario', 'quando', 'ora'],
        answer: 'L\'area wellness è aperta dalle 10:00 alle 20:00. I massaggi sono disponibili su prenotazione.'
      },
      servizi: {
        tags: ['servizi', 'trattamenti'],
        answer: 'L\'area wellness include sauna, bagno turco, piscina riscaldata e zona relax. Massaggi e trattamenti sono disponibili su prenotazione.'
      }
    }
  }
};
