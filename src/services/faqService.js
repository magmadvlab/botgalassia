import Fuse from 'fuse.js';
import faqData from '../faq/it/faqData';

// Dizionario di sinonimi e trasformazioni input
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
  'piano -1': ['sotterraneo', 'sotto', 'basement'],
  'arrivare': ['raggiungere', 'andare', 'trovare'],
  'prenotare': ['riservare', 'richiedere', 'bisogna prenotare']
};

const pluralSingular = {
  'emergenze': 'emergenza',
  'attività': 'attività',
  'servizi': 'servizio',
  'animali': 'animale'
};

const expandInput = (userInput) => {
  let expandedInput = userInput.toLowerCase();
  
  Object.entries(transformations).forEach(([key, values]) => {
    values.forEach(value => {
      if (expandedInput.includes(value.toLowerCase())) {
        expandedInput = expandedInput.replace(value.toLowerCase(), key);
      }
    });
  });

  Object.entries(pluralSingular).forEach(([plural, singular]) => {
    if (expandedInput.includes(plural)) {
      expandedInput = expandedInput.replace(plural, singular);
    }
  });
  
  return expandedInput;
};

// Configurazione della ricerca fuzzy
const fuseOptions = {
  keys: [
    { name: 'tags', weight: 9 },
    { name: 'category', weight: 2 },
    { name: 'question', weight: 1 }
  ],
  threshold: 0.2,
  includeScore: true,
  ignoreLocation: true,
  useExtendedSearch: true
};

const allQuestions = Object.values(faqData).flatMap(category =>
  Object.entries(category.questions).map(([question, data]) => ({
    question,
    answer: data.answer,
    tags: data.tags,
    category: category.title
  }))
);
console.log("📋 Tutte le FAQ caricate:", allQuestions);
console.log("📋 Domande disponibili nel chatbot:\n", allQuestions.map(q => q.question).join("\n"));

const fuse = new Fuse(allQuestions, fuseOptions);

/**
 * Trova la miglior risposta alla domanda dell'utente
 * @param {string} query - Domanda dell'utente
 * @returns {object} - Oggetto contenente risposta, domanda trovata e suggerimenti
 */
export const getFAQResponse = async (query, targetLang = 'IT') => {
  if (!query || query.trim().length === 0) {
    return {
      answer: "Non ho capito la tua domanda. Prova con parole chiave come 'piscina', 'check-in' o 'navetta'.",
      questionMatched: null,
      suggestions: []
    };
  }

  console.log("🔍 Domanda ricevuta:", query);
  console.log("🔍 Input originale:", query);
  const processedInput = expandInput(query.toLowerCase().trim());
  console.log("🔎 Input processato dopo normalizzazione:", processedInput);

  const results = fuse.search(processedInput);
  console.log("📌 Risultati trovati:", results.map(r => ({ question: r.item.question, score: r.score })));

  if (results.length > 0 && results[0].score < 0.25) {
    const bestMatch = results[0].item;
    console.log("✅ Risposta scelta (Accettata):", bestMatch.question, "->", bestMatch.answer);

    return {
      answer: bestMatch.answer,
      questionMatched: bestMatch.question,
      suggestions: []
    };
  }

  // Miglioriamo la ricerca nei TAG selezionando il miglior match possibile
  const tagMatches = allQuestions
  .map(q => ({
    question: q.question,
    answer: q.answer,
    tags: q.tags,
    score: q.tags ? q.tags.reduce((acc, tag) => acc + (processedInput.includes(tag) ? 2 : 0), 0) : 0
  }))
  .filter(q => q.score > 0)
  .sort((a, b) => b.score - a.score);

  if (tagMatches.length > 0) {
    const bestTagMatch = tagMatches[0];
    console.log("✅ Miglior risultato trovato con TAG:", bestTagMatch.question);

    return {
      answer: bestTagMatch.answer,
      questionMatched: bestTagMatch.question,
      suggestions: []
    };
  }

  console.log("❌ Nessuna corrispondenza trovata.");
  return {
    answer: "Mi dispiace, non ho trovato una risposta precisa. Prova a riformulare la domanda.",
    questionMatched: null,
    suggestions: ['piscina', 'check-in', 'colazione', 'navetta']
  };
};
