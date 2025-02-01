import Fuse from 'fuse.js';
import faqData from '../faq/it/faqData';
import { expandInput } from './textProcessingService'; // Opzionale per sinonimi
import { translateTextIfNeeded } from './translationService';

// Configurazione della ricerca fuzzy
const fuseOptions = {
  keys: [
    { name: 'tags', weight: 3 },     // Maggiore peso ai tag
    { name: 'category', weight: 2 }, // Poi alla categoria
    { name: 'question', weight: 1 }  // Infine alla domanda
  ],
  threshold: 0.25,  // Sensibilità della ricerca (più basso = più preciso)
  includeScore: true,
  ignoreLocation: true,
  useExtendedSearch: true
};

// Creazione dell'oggetto Fuse con tutte le FAQ combinate
const allQuestions = Object.values(faqData).flatMap(category =>
  Object.entries(category.questions).map(([question, data]) => ({
    question,
    answer: data.answer,
    tags: data.tags,
    category: category.title
  }))
);

const fuse = new Fuse(allQuestions, fuseOptions);

/**
 * Trova la miglior risposta alla domanda dell'utente
 * @param {string} query - Domanda dell'utente
 * @returns {string} - Risposta trovata
 */
export const getFAQResponse = async (query, targetLang = 'IT') => {
  if (!query || query.trim().length === 0) {
    return "Non ho capito la tua domanda. Prova con parole chiave come 'piscina', 'check-in' o 'navetta'.";
  }

  console.log("🔍 Domanda ricevuta:", query);
  
  const processedInput = expandInput(query.toLowerCase().trim()); // Normalizzazione input (opzionale)
  console.log("🔎 Input processato:", processedInput);

  // Nuova logica: cerca sia nei tags che nella domanda stessa
  const results = fuse.search(processedInput);
  console.log("📌 Risultati trovati:", results.map(r => ({ question: r.item.question, score: r.score })));

  if (results.length > 0 && results[0].score < 0.4) { // Aumento leggero del threshold
    const bestMatch = results[0].item;
    console.log("✅ Risposta scelta:", bestMatch.question, "->", bestMatch.answer);

    // Traduzione se necessario
    return targetLang !== 'IT' ? await translateTextIfNeeded(bestMatch.answer, targetLang) : bestMatch.answer;
  }

  // Se nessun risultato preciso, cerca nelle domande direttamente
  const fallbackMatch = allQuestions.find(q => q.question.toLowerCase().includes(processedInput));
  if (fallbackMatch) {
    return targetLang !== 'IT' ? await translateTextIfNeeded(fallbackMatch.answer, targetLang) : fallbackMatch.answer;
  }

  console.warn("⚠️ Nessuna corrispondenza trovata per:", query);
  return "Mi dispiace, non ho trovato una risposta specifica. Prova a riformulare la domanda.";
};
