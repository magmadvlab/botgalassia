import Fuse from 'fuse.js';
import faqData from '../faq/it/faqData';

// Dizionario di sinonimi e trasformazioni input
const transformations = {
  'wifi': ['wi-fi', 'wi fi', 'internet', 'rete'],
  'piscina': ['nuotare', 'bagno', 'vasca', 'spa', 'wellness'],
  'check-in': ['check in', 'checkin', 'registrazione', 'arrivo'],
  'check-out': ['check out', 'checkout', 'partenza', 'uscita'],
  'navetta': ['shuttle', 'bus', 'transfer', 'trasporto', 'mezzo', 'pullman'],
  'parcheggio': ['garage', 'posto auto', 'box auto', 'sosta', 'stallo'],
  'skibox': ['ski box', 'deposito sci', 'porta sci'],
  'ristorante': ['mangiare', 'ristorazione', 'cena', 'pranzo', 'dove si mangia'],
  'animale': ['pet', 'cane', 'gatto', 'animali', 'amico a quattro zampe'],
  'piano -1': ['sotterraneo', 'sotto', 'basement'],
  'arrivare': ['raggiungere', 'andare', 'trovare', 'scendere', 'giungere', 'entrare'],
  'prenotare': ['riservare', 'richiedere', 'bisogna prenotare'],
  'conca': ['prato nevoso conca', 'piazza dodero', 'bassa prato nevoso', 'come si va in conca', 'come scendere in conca'],
  'centro': ['piazza dodero', 'centro prato nevoso', 'paese', 'parte centrale', 'zona centrale'],
  'taxi': ['trasporto privato', 'ncc', 'auto con conducente']
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
  
  return expandedInput;
};

// Configurazione della ricerca fuzzy
const fuseOptions = {
  keys: [
    { name: 'tags', weight: 7 },  // 🔥 Aumentato da 5 → 7 per dare più importanza ai tag
    { name: 'category', weight: 2 },
    { name: 'question', weight: 1 }
  ],
  threshold: 0.25,  // 🔧 Abbassato per migliorare il riconoscimento delle domande simili
  includeScore: true,
  ignoreLocation: true,
  useExtendedSearch: true
};

// Caricare dinamicamente le domande
const updateFAQData = () => {
  const updatedQuestions = Object.values(faqData).flatMap(category =>
    Object.entries(category.questions).map(([question, data]) => ({
      question,
      answer: data.answer,
      tags: data.tags,
      category: category.title
    }))
  );
  fuse.setCollection(updatedQuestions);
};

const fuse = new Fuse([], fuseOptions);
updateFAQData(); // Carica inizialmente i dati

export const getFAQResponse = async (query, targetLang = 'IT') => {
  if (!query || query.trim().length === 0) {
    return {
      answer: "Non ho capito la tua domanda. Prova con parole chiave come 'piscina', 'check-in' o 'navetta'.",
      questionMatched: null,
      suggestions: []
    };
  }

  console.log("🔍 Domanda ricevuta:", query);
  const processedInput = expandInput(query.toLowerCase().trim());
  console.log("🔎 Input processato dopo normalizzazione:", processedInput);

  const results = fuse.search(processedInput);
  console.log("📌 Risultati trovati:", results.map(r => ({ question: r.item.question, score: r.score })));

  if (results.length > 0 && results[0].score < 0.25) {
    const bestMatch = results[0].item;
    console.log("✅ Risposta scelta:", bestMatch.question, "->", bestMatch.answer);
    return {
      answer: bestMatch.answer,
      questionMatched: bestMatch.question,
      suggestions: []
    };
  }

  // Ricerca basata sui tag
  const tagMatches = Object.values(faqData).flatMap(category =>
    Object.entries(category.questions).map(([question, data]) => ({
      question,
      answer: data.answer,
      tags: data.tags,
      score: data.tags 
        ? data.tags.reduce((acc, tag) => acc + (processedInput.includes(tag) ? 5 : 0), 0) // 🔥 Aumentato a 5
        : 0
    }))
  ).filter(q => q.score > 3).sort((a, b) => b.score - a.score);

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
