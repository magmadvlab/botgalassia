// src/services/textProcessingService.js

/**
 * Espande sinonimi e normalizza l'input dell'utente per la ricerca FAQ.
 * @param {string} input - Testo inserito dall'utente.
 * @returns {string} - Testo normalizzato con sinonimi espansi.
 */
export const expandInput = (input) => {
  const transformations = {
    'wifi': ['wi-fi', 'wi fi', 'internet', 'rete'],
    'piscina': ['nuotare', 'bagno', 'vasca', 'spa', 'wellness'],
    'check-in': ['check in', 'checkin', 'registrazione', 'arrivo'],
    'check-out': ['check out', 'checkout', 'partenza', 'uscita'],
    'navetta': ['shuttle', 'bus', 'transfer', 'trasporto'],
    'parcheggio': ['garage', 'posto auto', 'box auto'],
    'skibox': ['ski box', 'deposito sci', 'porta sci'],
    'ristorante': ['mangiare', 'ristorazione', 'cena', 'pranzo'],
    'animale': ['pet', 'cane', 'gatto', 'animali'],
    'prenotare': ['riservare', 'richiedere', 'bisogna prenotare']
  };

  let expandedInput = input.toLowerCase();
  
  Object.entries(transformations).forEach(([key, values]) => {
    values.forEach(value => {
      if (expandedInput.includes(value.toLowerCase())) {
        expandedInput = expandedInput.replace(value.toLowerCase(), key);
      }
    });
  });

  return expandedInput;
};
