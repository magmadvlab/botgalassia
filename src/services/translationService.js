const DEEPL_CONFIG = {
  API_KEY: 'your-deepl-api-key', // Sostituisci con la tua API key
  BASE_URL: 'https://api-free.deepl.com/v2',
  SUPPORTED_LANGUAGES: ['IT', 'EN', 'FR', 'DE', 'ES', 'PT', 'RO']
};

/**
 * Rileva la lingua dell'utente dal browser
 * @returns {string} Codice lingua (IT, EN, etc.)
 */
export const detectUserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage; // Rileva lingua del browser
  const lang = browserLang.split('-')[0].toUpperCase(); // Es. "it-IT" diventa "IT"

  return DEEPL_CONFIG.SUPPORTED_LANGUAGES.includes(lang) ? lang : 'EN'; // Default a EN
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
  if (targetLang === 'IT') {
    return text; // Se l'utente usa già ITALIANO, niente traduzione
  }

  try {
    const response = await fetch(`${DEEPL_CONFIG.BASE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_CONFIG.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: targetLang
      })
    });

    if (!response.ok) {
      throw new Error(`Errore nella traduzione: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Errore di traduzione:', error);
    return text; // In caso di errore, restituisce il testo originale
  }
};
