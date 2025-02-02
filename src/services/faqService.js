import Fuse from 'fuse.js';
import faqData from '../faq/it/faqData';
import { expandInput } from './textProcessingService'; // Gestione sinonimi
import { translateTextIfNeeded } from './translationService';

// Configurazione della ricerca fuzzy
const fuseOptions = {
  keys: [
    { name: 'tags', weight: 4 },     // Maggiore peso ai tag
    { name: 'category', weight: 2 }, // Poi alla categoria
    { name: 'question', weight: 1 }  // Infine alla domanda
  ],
  threshold: 0.2,  // Maggiore precisione riducendo il range di errore
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
  
  const processedInput = expandInput(query.toLowerCase().trim()); // Normalizzazione input
  console.log("🔎 Input processato:", processedInput);

  // Ricerca fuzzy nei tag e nelle domande
  const results = fuse.search(processedInput);
  console.log("📌 Risultati trovati:", results.map(r => ({ question: r.item.question, score: r.score })));

  if (results.length > 0 && results[0].score < 0.3) { // Controllo con soglia precisa
    const bestMatch = results[0].item;
    console.log("✅ Risposta scelta:", bestMatch.question, "->", bestMatch.answer);

    const translatedAnswer = targetLang !== 'IT' ? await translateTextIfNeeded(bestMatch.answer, targetLang) : bestMatch.answer;
    return {
      answer: translatedAnswer,
      questionMatched: bestMatch.question,
      suggestions: []
    };
  }

  // Se nessun risultato preciso, cerca nelle domande direttamente
  const fallbackMatch = allQuestions.find(q => q.question.toLowerCase().includes(processedInput));
  if (fallbackMatch) {
    const translatedAnswer = targetLang !== 'IT' ? await translateTextIfNeeded(fallbackMatch.answer, targetLang) : fallbackMatch.answer;
    return {
      answer: translatedAnswer,
      questionMatched: fallbackMatch.question,
      suggestions: []
    };
  }

  // Nessuna corrispondenza trovata, suggerisce parole chiave utili
  console.warn("⚠️ Nessuna corrispondenza trovata per:", query);
  return {
    answer: "Mi dispiace, non ho trovato una risposta specifica. Prova a riformulare la domanda.",
    questionMatched: null,
    suggestions: ['piscina', 'check-in', 'colazione', 'navetta']
  };
};
