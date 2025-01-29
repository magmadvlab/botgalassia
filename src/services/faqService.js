// src/services/faqService.js

import faqData from '../components/faq/faqData';
import { translateTextIfNeeded } from './translationService';

const findBestMatch = (userQuery) => {
  // Normalizza la query dell'utente
  const query = userQuery.toLowerCase().trim();

  // Cerca in tutte le categorie di FAQ
  for (const [category, data] of Object.entries(faqData)) {
    // Prima controlla se la query contiene parole chiave della categoria
    if (data.keywords?.some(keyword => query.includes(keyword.toLowerCase()))) {
      // Cerca tra le domande di questa categoria
      for (const [question, qData] of Object.entries(data.questions)) {
        // Controlla se la query corrisponde ai tag o alla domanda
        if (qData.tags?.some(tag => query.includes(tag.toLowerCase())) ||
            query.includes(question.toLowerCase())) {
          return qData.answer;
        }
      }
    }
  }

  // Se non trova corrispondenze esatte, cerca in tutti i tag
  for (const [category, data] of Object.entries(faqData)) {
    for (const [question, qData] of Object.entries(data.questions)) {
      if (qData.tags?.some(tag => query.includes(tag.toLowerCase()))) {
        return qData.answer;
      }
    }
  }

  return 'Mi dispiace, non ho trovato una risposta specifica alla tua domanda. Puoi provare a riformularla o chiedermi di argomenti come check-in, servizi, o attività.';
};

export const getFAQResponse = async (query, targetLang = 'IT') => {
  try {
    // Trova la risposta in italiano
    const response = findBestMatch(query);
    
    // Se necessario, traduci la risposta
    if (targetLang !== 'IT') {
      return await translateTextIfNeeded(response, targetLang);
    }
    
    return response;
  } catch (error) {
    console.error('Errore nella ricerca FAQ:', error);
    return 'Mi scuso, ma al momento non riesco a processare la tua richiesta. Puoi riprovare?';
  }
};
