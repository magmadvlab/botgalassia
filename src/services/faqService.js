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

const categoryPriorityMap = {
  'Trasporti e Navetta - Hotel': ['arrivare', 'trasporti', 'spostarsi', 'raggiungere', 'navetta', 'bus', 'conca', 'centro', 'taxi'],
  'Piscina e Wellness': ['piscina', 'spa', 'benessere', 'wellness'],
  'Parcheggio e Auto': ['parcheggio', 'garage', 'auto', 'posto auto', 'sosta'],
  'Attività e Eventi': ['sciare', 'attività', 'eventi', 'cose da fare']
};

const getCategoryScore = (query, category) => {
  let score = 0;
  if (categoryPriorityMap[category]) {
    categoryPriorityMap[category].forEach(keyword => {
      if (query.includes(keyword)) {
        score += 5; // 🔥 Aumentiamo il punteggio se il termine chiave è nella categoria giusta
      }
    });
  }
  return score;
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

const fuseOptions = {
  keys: [
    { name: 'tags', weight: 7 },  // 🔥 Aumentato per dare più importanza ai tag
    { name: 'category', weight: 2 },
    { name: 'question', weight: 1 }
  ],
  threshold: 0.25,  // 🔧 Abbassato per migliorare il riconoscimento delle domande simili
  includeScore: true,
  ignoreLocation: true,
  useExtendedSearch: true
};

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
updateFAQData();

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
  console.log("📌 Risultati trovati:", results.map(r => ({ question: r.item.question, category: r.item.category, score: r.score })));

  if (results.length > 0) {
    let bestResults = results.filter(r => r.score < 0.3);

    bestResults = bestResults.map(result => ({
      ...result,
      categoryScore: getCategoryScore(processedInput, result.item.category)
    }));

    bestResults.sort((a, b) => (b.categoryScore - a.categoryScore) || (a.score - b.score));

    const bestMatch = bestResults[0].item;
    console.log("✅ Risposta scelta:", bestMatch.question, "dalla categoria", bestMatch.category);

    return {
      answer: bestMatch.answer,
      questionMatched: bestMatch.question,
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
