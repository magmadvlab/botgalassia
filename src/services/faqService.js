import { translateTextIfNeeded } from './translationService';
import faqData from '../faq/faqData'; // Importiamo le FAQ in italiano

/**
 * Recupera la risposta alle FAQ e la traduce solo se necessario
 * @param {string} query - Domanda dell'utente
 * @param {string} userLang - Lingua dell'utente
 * @returns {Promise<string>} - Risposta nella lingua dell'utente
 */
export const getFAQResponse = async (query, userLang) => {
  // Normalizziamo la domanda per evitare problemi con maiuscole/minuscole/spazi
  const normalizedQuery = query.trim().toLowerCase();

  // Cerchiamo la risposta nella FAQ
  const response = faqData[normalizedQuery] || "Mi dispiace, non ho una risposta a questa domanda.";

  // Se la lingua dell'utente è già italiano, restituiamo direttamente la risposta
  if (userLang === 'IT') {
    return response;
  }

  // Altrimenti traduciamo la risposta nella lingua dell'utente
  return await translateTextIfNeeded(response, userLang);
};
