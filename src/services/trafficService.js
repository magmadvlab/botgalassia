// src/services/trafficService.js

// Costanti per il rate limiting e timeout
const REQUEST_TIMEOUT = 10000; // 10 secondi
const CACHE_DURATION = 5 * 60 * 1000; // 5 minuti
let cachedNews = null;
let lastFetchTime = 0;

export const ROADS_OF_INTEREST = [
    'SP327', 'SS28', 'SP37', 'SP164', 'SP183', 'SP232'
];

export const VIABILITY_URL = 'https://notizie.provincia.cuneo.it';

// Ottimizzazione: Utilizzo di Set per ricerche O(1) invece di array
const PROBLEM_KEYWORDS = new Set([
    'chius', 'interruz', 'bloccat', 'lavori', 'cantier', 
    'neve', 'ghiaccio', 'frana', 'smottamento', 'incidente', 
    'senso unico', 'semaforo', 'deviazione'
]);

const RELEVANT_LOCATIONS = new Set([
    'prato nevoso', 'frabosa soprana', 'frabosa sottana', 'mondovì',
    'provinciale 37', 'sp 37', 'provinciale 243', 'sp 243', 
    'artesina', 'valle ellero'
]);

/**
 * Controlla se una notizia è rilevante per la viabilità di Prato Nevoso
 * @param {string} text - Il testo da analizzare
 * @returns {boolean} - True se la notizia è rilevante
 */
const isRelevantAlert = (text) => {
    if (!text) return false;
    
    const lowerText = text.toLowerCase();
    
    // Ottimizzazione: prima controlla le location che sono meno frequenti
    const hasRelevantLocation = Array.from(RELEVANT_LOCATIONS).some(location => 
        lowerText.includes(location)
    );
    
    if (!hasRelevantLocation) return false;
    
    // Solo se la location è rilevante, controlla le keywords
    return Array.from(PROBLEM_KEYWORDS).some(keyword => 
        lowerText.includes(keyword)
    );
};

/**
 * Estrae il testo da un elemento del DOM in modo sicuro
 * @param {Element} parent - Elemento DOM padre
 * @param {string} selector - Selettore CSS
 * @returns {string} - Testo estratto o stringa vuota
 */
const safeQuerySelector = (parent, selector) => {
    try {
        return parent.querySelector(selector)?.textContent?.trim() || '';
    } catch {
        return '';
    }
};

/**
 * Crea un oggetto notizia standard
 * @param {Object} params - Parametri della notizia
 * @returns {Object} - Oggetto notizia formattato
 */
const createNewsItem = ({ title, content }) => ({
    title,
    description: `${content}\n\n🔹 Fonte: [Provincia Cuneo](${VIABILITY_URL})\n⚠️ Si consiglia di guidare con prudenza e di contattare il numero di emergenza 112 per ulteriori informazioni. L'Hotel Galassia non è responsabile dell'accuratezza delle informazioni.`
});

/**
 * Recupera le notizie sulla viabilità da Provincia di Cuneo
 * @returns {Promise<Array>} Array di notizie filtrate
 */
export const fetchRoadNews = async () => {
    try {
        // Controllo cache
        const now = Date.now();
        if (cachedNews && (now - lastFetchTime) < CACHE_DURATION) {
            return cachedNews;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        const response = await fetch(VIABILITY_URL, {
            signal: controller.signal,
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Mozilla/5.0 (compatible; RoadNewsBot/1.0)'
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const newsItems = Array.from(doc.querySelectorAll('.feed-item'));

        if (!newsItems.length) {
            throw new Error('Struttura della pagina cambiata');
        }

        const filteredAlerts = newsItems
            .map(item => ({
                title: safeQuerySelector(item, '.feed-item-title a'),
                date: safeQuerySelector(item, '.feed-item-date'),
                content: safeQuerySelector(item, '.feed-item-body')
            }))
            .filter(item => isRelevantAlert(`${item.title} ${item.content}`))
            .map(createNewsItem);

        const result = filteredAlerts.length > 0 
            ? filteredAlerts
            : [{
                title: 'Nessun problema di viabilità rilevato.',
                description: `🔹 Fonte: [Provincia Cuneo](${VIABILITY_URL})\n⚠️ Si consiglia di guidare con prudenza e di contattare il numero di emergenza 112 per ulteriori informazioni. L'Hotel Galassia non è responsabile dell'accuratezza delle informazioni.`
            }];

        // Aggiorna la cache
        cachedNews = result;
        lastFetchTime = now;

        return result;

    } catch (error) {
        console.error('Errore nel recupero della viabilità:', error);
        
        return [{
            title: '⚠️ Attenzione',
            description: `Potrebbe esserci stato un cambiamento nella struttura del sito ufficiale. Consulta direttamente la fonte: [Provincia Cuneo](${VIABILITY_URL})\n⚠️ Si consiglia di guidare con prudenza e di contattare il numero di emergenza 112 per ulteriori informazioni. L'Hotel Galassia non è responsabile dell'accuratezza delle informazioni.`
        }];
    }
};
