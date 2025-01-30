// src/services/faqService.js

import Fuse from 'fuse.js';
import faqData from '../faq/it/faqData';  // Percorso corretto
import { translateTextIfNeeded } from './translationService';

// Controlliamo se i dati delle FAQ sono stati caricati correttamente
console.log("Dati FAQ caricati:", faqData);

// Prepara la lista di domande e tag
const prepareFAQList = () => {
  const faqs = [];

  for (const [category, data] of Object.entries(faqData)) {
    for (const [question, qData] of Object.entries(data.questions)) {
      faqs.push({
        question,
        answer: qData.answer,
        tags: qData.tags || [],
        category,
      });
    }
  }
  return faqs;
};

// Configurazione di Fuse.js per la ricerca fuzzy
const faqList = prepareFAQList();
const fuse = new Fuse(faqList, {
  keys: ['question', 'tags'],
  threshold: 0.3, // Più basso = più preciso, più alto = più tollerante
});

export const getFAQResponse = async (query, targetLang = 'IT') => {
  try {
    console.log("🔍 Domanda ricevuta:", query);

    // Normalizziamo la query
    const normalizedQuery = query.toLowerCase().trim();

    // Cerchiamo una corrispondenza con Fuse.js
    const result = fuse.search(normalizedQuery);

    // Stampiamo tutte le risposte trovate per il debug
    console.log("📌 Risultati trovati:", result.map(r => r.item.question));

    if (result.length > 0) {
      const bestMatch = result[0].item.answer;
      console.log("✅ Risposta selezionata:", bestMatch);

      // Se la lingua richiesta è diversa dall'italiano, traduciamo
      if (targetLang !== 'IT') {
        return await translateTextIfNeeded(bestMatch, targetLang);
      }
      return bestMatch;
    }

    console.warn("⚠️ Nessuna corrispondenza trovata per:", query);
    return "Mi dispiace, non ho trovato una risposta specifica alla tua domanda. Puoi provare a riformularla?";
  } catch (error) {
    console.error('❌ Errore nella ricerca FAQ:', error);
    return 'Mi scuso, ma al momento non riesco a processare la tua richiesta. Puoi riprovare?';
  }
};
