// src/services/faqService.js

import faqData from '../components/faq/faqData';
import { translateTextIfNeeded } from './translationService';

const findBestMatch = (userQuery) => {
  // Normalizza la query dell'utente
  const query = userQuery.toLowerCase().trim();

  // Cerca in tutte le categorie di FAQ
  for (const [category, data] of Object.entries(faqData)) {
    // Cerca tra tutte le questions nella categoria
    for (const qa of data.questions) {
      // Controlla le parole chiave o il testo della domanda
      if (qa.tags?.some(tag => query.includes(tag.toLowerCase())) || 
          query.includes(qa.q.toLowerCase())) {
        return qa.a;
      }
    }
  }

  return 'Mi dispiace, non ho trovato una risposta specifica alla tua domanda. Puoi provare a riformularla o chiedermi di un argomento specifico come check-in, servizi, o attività.';
};

export const getFAQResponse = async (query, targetLang = 'IT') => {
  // Trova la risposta in italiano
  const response = findBestMatch(query);
  
  // Se necessario, traduci la risposta
  if (targetLang !== 'IT') {
    return await translateTextIfNeeded(response, targetLang);
  }
  
  return response;
};
