import Fuse from 'fuse.js';
import faqData from '../faq/it/faqData';
import { expandInput } from './textProcessingService';
import { translateTextIfNeeded } from './translationService';

// Configurazione della ricerca fuzzy
const fuseOptions = {
  keys: [
    { name: 'tags', weight: 4 },
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
  const processedInput = expandInput(query.toLowerCase().trim());
  console.log("🔎 Input processato:", processedInput);

  const results = fuse.search(processedInput);
  console.log("📌 Risultati trovati:", results.map(r => ({ question: r.item.question, score: r.score })));

  if (results.length > 0 && results[0].score < 0.3) {
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

  // Log della domanda non trovata
  fetch('/log-missing-question', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: query,
      timestamp: new Date().toISOString()
    })
  }).catch(console.error);

  console.warn("⚠️ Nessuna corrispondenza trovata per:", query);
  return {
    answer: "Mi dispiace, non ho trovato una risposta specifica. Prova a riformulare la domanda.",
    questionMatched: null,
    suggestions: ['piscina', 'check-in', 'colazione', 'navetta']
  };
};
