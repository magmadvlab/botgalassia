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

// Parole chiave per identificare problemi alla viabilità
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
 * Controlla se il testo contiene avvisi di viabilità rilevanti
 * @param {string} text - Il testo da analizzare
 * @returns {boolean} - True se viene rilevato un problema
 */
const isRelevantAlert = (text) => {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return Array.from(PROBLEM_KEYWORDS).some(keyword => lowerText.includes(keyword));
};

/**
 * Recupera le notizie sulla viabilità dalla pagina della Provincia di Cuneo
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
        const pageText = doc.body.textContent || '';

        if (isRelevantAlert(pageText)) {
            return [{
                title: '⚠️ Avviso viabilità',
                description: `Potrebbero esserci problemi sulle strade locali. Consulta direttamente la fonte: [Provincia Cuneo](${VIABILITY_URL})\n⚠️ Si consiglia di guidare con prudenza e di contattare il numero di emergenza 112 per ulteriori informazioni.`
            }];
        }

        return [{
            title: '✅ Situazione strade regolare',
            description: `Non si registrano particolari disagi sulle arterie stradali, ma è buona norma contattare il 112 per aggiornamenti.`
        }];

    } catch (error) {
        console.error('Errore nel recupero della viabilità:', error);
        return [{
            title: '⚠️ Attenzione',
            description: `Non è stato possibile recuperare le informazioni sulla viabilità. Consulta direttamente la fonte: [Provincia Cuneo](${VIABILITY_URL})\n⚠️ Si consiglia di guidare con prudenza e di contattare il numero di emergenza 112 per ulteriori informazioni.`
        }];
    }
};
