import Fuse from 'fuse.js';
import faqData from '../faq/it/faqData';

// Configurazione delle opzioni di ricerca
const fuseOptions = {
  keys: [
    { name: 'tags', weight: 7 },
    { name: 'category', weight: 2 },
    { name: 'question', weight: 1 }
  ],
  threshold: 0.3, // Ridotto da 0.4 a 0.3 per migliorare la precisione
  includeScore: true,
  ignoreLocation: true,
  useExtendedSearch: true
};

// Dizionario di sinonimi e trasformazioni input
const transformations = {
  'wifi': ['wi-fi', 'wi fi', 'internet', 'rete'],
  'piscina': ['nuotare', 'bagno', 'vasca', 'spa', 'wellness', "dov'è la piscina", "dove si trova la piscina", "come raggiungere la piscina"],
  'check-in': ['check in', 'checkin', 'registrazione', 'arrivo'],
  'check-out': ['check out', 'checkout', 'partenza', 'uscita'],
  'navetta': ['shuttle', 'bus', 'transfer', 'trasporto', 'mezzo', 'pullman'],
  'parcheggio': ['garage', 'posto auto', 'box auto', 'sosta', 'stallo'],
  'skibox': ['ski box', 'deposito sci', 'porta sci'],
  'ristorante': ['mangiare', 'ristorazione', 'cena', 'pranzo', 'dove si mangia'],
  'animale': ['pet', 'cane', 'gatto', 'animali', 'amico a quattro zampe'],
  'arrivare': ['raggiungere', 'andare', 'trovare', 'scendere', 'giungere', 'entrare'],
  'prenotare': ['riservare', 'richiedere', 'bisogna prenotare'],
  'centro': ['piazza dodero', 'centro prato nevoso', 'paese', 'parte centrale', 'zona centrale', 'come arrivare in centro', 'come si va in centro', 'come andare in centro', 'trasporto per il centro', 'raggiungere il centro']
};

// Mappatura delle intenzioni
const intentMapping = [
  { intent: "trasporto_navetta", patterns: ["come vado in", "come si arriva a", "per andare in", "raggiungere", "come si va in"] },
  { intent: "info_piscina", patterns: ["dov'è la piscina", "dove si trova la piscina", "come raggiungere la piscina"] },
  { intent: "attivita_conca", patterns: ["cosa fare in", "quali attività ci sono in", "cosa posso fare a", "eventi in"] }
];

const detectIntent = (query) => {
  query = query.toLowerCase().trim();
  
  for (const { intent, patterns } of intentMapping) {
    for (const pattern of patterns) {
      if (query.includes(pattern)) {
        return intent;
      }
    }
  }
  
  return null;
};

const fuse = new Fuse([], fuseOptions);

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

updateFAQData();

export const getFAQResponse = async (query) => {
  if (!query || query.trim().length === 0) {
    return {
      answer: "Non ho capito la tua domanda. Prova con parole chiave come 'piscina', 'check-in' o 'navetta'.",
      questionMatched: null,
      suggestions: []
    };
  }

  console.log("🔍 Domanda ricevuta:", query);
  const processedInput = query.toLowerCase().trim();

  const detectedIntent = detectIntent(processedInput);
  console.log("📌 Intenzione rilevata:", detectedIntent);

  let targetCategory = null;
  if (detectedIntent === "trasporto_navetta") targetCategory = "Trasporti e Navetta - Hotel";
  if (detectedIntent === "info_piscina") targetCategory = "Piscina e Wellness";
  if (detectedIntent === "attivita_conca") targetCategory = "Attività e Eventi";

  if (!targetCategory) {
    console.log("❌ Nessuna intenzione chiara trovata.");
    return {
      answer: "Mi dispiace, non ho trovato una risposta precisa. Prova a riformulare la domanda.",
      questionMatched: null,
      suggestions: ['piscina', 'check-in', 'colazione', 'navetta']
    };
  }

  console.log("🎯 Categoria selezionata:", targetCategory);
  
  const filteredFAQs = fuse.getIndex().docs.filter(faq => faq.category === targetCategory);
  const categoryFuse = new Fuse(filteredFAQs, fuseOptions);
  const results = categoryFuse.search(processedInput);
  
  if (results.length > 0) {
    const bestMatch = results[0]?.item;
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

export { fuse, updateFAQData };
