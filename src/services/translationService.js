// src/services/translationService.js

const DEEPL_CONFIG = {
  API_KEY: process.env.DEEPL_API_KEY,
  BASE_URL: 'https://api-free.deepl.com/v2',
  SUPPORTED_LANGUAGES: ['IT', 'EN', 'FR', 'DE', 'ES', 'PT', 'RO']
};

/**
 * Rileva la lingua dell'utente dal browser
 * @returns {string} Codice lingua (IT, EN, etc.)
 */
export const detectUserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  const lang = browserLang.split('-')[0].toUpperCase();
  return DEEPL_CONFIG.SUPPORTED_LANGUAGES.includes(lang) ? lang : 'IT';
};

/**
 * Controlla se serve la traduzione
 * @param {string} currentLang - Lingua del testo
 * @param {string} targetLang - Lingua desiderata
 * @returns {boolean} True se la traduzione è necessaria
 */
export const needsTranslation = (currentLang, targetLang) => {
  return currentLang.toUpperCase() !== targetLang.toUpperCase();
};

/**
 * Traduci un testo con DeepL SOLO SE NECESSARIO
 * @param {string} text - Testo da tradurre
 * @param {string} targetLang - Lingua di destinazione
 * @returns {Promise<string>} Testo tradotto
 */
export const translateTextIfNeeded = async (text, targetLang) => {
  if (!text || targetLang === 'IT') return text;
  
  try {
    const response = await fetch(`${DEEPL_CONFIG.BASE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_CONFIG.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: targetLang,
        preserve_formatting: true
      })
    });

    if (!response.ok) {
      console.error(`Errore DeepL: ${response.status} ${response.statusText}`);
      return text;
    }

    const data = await response.json();
    return data.translations[0]?.text || text;
  } catch (error) {
    console.error('Errore di traduzione:', error);
    return text;
  }
};

/**
 * Traduce array di testi in batch
 * @param {string[]} texts - Array di testi da tradurre
 * @param {string} targetLang - Lingua di destinazione
 * @returns {Promise<string[]>} Array di testi tradotti
 */
export const translateBatch = async (texts, targetLang) => {
  if (!texts?.length || targetLang === 'IT') return texts;

  try {
    const response = await fetch(`${DEEPL_CONFIG.BASE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_CONFIG.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: texts,
        target_lang: targetLang,
        preserve_formatting: true
      })
    });

    if (!response.ok) {
      console.error(`Errore DeepL batch: ${response.status} ${response.statusText}`);
      return texts;
    }

    const data = await response.json();
    return data.translations.map(t => t.text);
  } catch (error) {
    console.error('Errore traduzione batch:', error);
    return texts;
  }
};
