export const checkinFAQ_IT = {
  title: 'Check-in e Check-out',
  keywords: [
    // Termini base
    'check-in', 'check-out', 'checkout', 'checkin',
    // Orari e tempo
    'orario', 'ora', 'quando', 'presto', 'tardi', 'tempo',
    // Bagagli e oggetti
    'bagagli', 'valigie', 'borse', 'deposito', 'oggetti',
    // Azioni
    'arrivo', 'partenza', 'lasciare', 'ritirare', 'depositare',
    // Luoghi
    'camera', 'stanza', 'reception', 'hall', 'deposito',
    // Domande comuni
    'dove', 'come', 'quale', 'quanto', 'possibile',
    // Situazioni
    'prima', 'dopo', 'anticipato', 'ritardo', 'tardi'
  ],
  questions: {
    // SEZIONE ORARI BASE
    'Qual è l\'orario del check-in?': {
      answer: 'Il check-in è possibile dalle 10:30, con consegna delle camere garantita dopo le 16:30. La reception è sempre disponibile per custodire i vostri bagagli se arrivate prima.',
      tags: ['check-in', 'orari', 'arrivo']
    },
    'A che ora posso fare il check-in?': {
      answer: 'Il check-in è possibile dalle 10:30, con consegna delle camere garantita dopo le 16:30. La reception è sempre disponibile per custodire i vostri bagagli se arrivate prima.',
      tags: ['check-in', 'orari', 'arrivo']
    },
    'Quando posso entrare in camera?': {
      answer: 'La consegna delle camere è garantita dopo le 16:30. Potete comunque effettuare il check-in dalle 10:30 e lasciare i bagagli in custodia gratuita.',
      tags: ['camera', 'orari', 'entrata']
    },

    // SEZIONE CHECK-OUT
    'Qual è l\'orario del check-out?': {
      answer: 'Il check-out deve essere effettuato entro le 10:00. Offriamo gratuitamente il servizio di deposito bagagli se avete necessità di lasciare i bagagli o l\'auto dopo il check-out.',
      tags: ['check-out', 'orari', 'partenza']
    },
    'A che ora devo lasciare la stanza?': {
      answer: 'La camera deve essere liberata entro le 10:00 del giorno di partenza. Se avete necessità di tenere i bagagli più a lungo, la reception offre un servizio gratuito di deposito.',
      tags: ['check-out', 'camera', 'orari']
    },
    'Posso tenere la camera più a lungo?': {
      answer: 'Il check-out standard è alle 10:00. Per late check-out, verificate la disponibilità con la reception - potrebbe essere applicato un supplemento.',
      tags: ['check-out', 'ritardo', 'supplemento']
    },

    // SEZIONE ARRIVI ANTICIPATI/TARDIVI
    'Posso arrivare prima del check-in?': {
      answer: 'Sì, potete arrivare prima! La reception è al piano uno (due rampe di scale dall\'ingresso del parcheggio lato pista). Potrete registrarvi e lasciare i bagagli gratuitamente in un\'area dedicata fino alla consegna della camera.',
      tags: ['arrivo', 'anticipato', 'bagagli']
    },
    'Cosa devo fare se arrivo tardi?': {
      answer: 'Non c\'è problema! Basta informare la reception del vostro orario di arrivo previsto. La reception è sempre aperta e sarà lieta di accogliervi anche in orario serale.',
      tags: ['arrivo', 'tardi', 'ritardo']
    },
    'Dove posso lasciare i bagagli?': {
      answer: 'La reception al piano uno (due rampe di scale dall\'ingresso del parcheggio lato pista) offre un servizio gratuito di deposito bagagli. Il servizio è disponibile sia prima del check-in che dopo il check-out.',
      tags: ['bagagli', 'deposito', 'custodia']
    },

    // SEZIONE PROCEDURE E SERVIZI
    'Cosa serve per il check-in?': {
      answer: 'Per il check-in è necessario presentare un documento d\'identità valido per ogni ospite e la conferma della prenotazione. Accettiamo carte di credito, bancomat e contanti per eventuali pagamenti.',
      tags: ['check-in', 'documenti', 'procedure']
    },
    'Posso lasciare l\'auto dopo il check-out?': {
      answer: 'Sì, potete lasciare l\'auto nel parcheggio anche dopo il check-out. Basta comunicarlo alla reception che vi fornirà un pass speciale.',
      tags: ['check-out', 'auto', 'parcheggio']
    },
    'La reception è sempre aperta?': {
      answer: 'Sì, la nostra reception è operativa 24 ore su 24, 7 giorni su 7, per garantirvi assistenza in qualsiasi momento.',
      tags: ['reception', 'orari', 'assistenza']
    }
  }
};
