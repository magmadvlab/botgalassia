// src/services/trafficService.js

export const ROADS_OF_INTEREST = [
  'SP327', 'SS28', 'SP37', 'SP164', 'SP183', 'SP232'
];

export const VIABILITY_URL = 'https://notizie.provincia.cuneo.it';

/**
 * Parole chiave per identificare problemi alla viabilità
 */
const PROBLEM_KEYWORDS = [
  'chius', 'interruz', 'bloccat', 'lavori', 'cantier', 'neve', 'ghiaccio', 'frana', 'smottamento',
  'incidente', 'senso unico', 'semaforo', 'deviazione'
];

/**
 * Località rilevanti per Prato Nevoso
 */
const RELEVANT_LOCATIONS = [
  'prato nevoso', 'frabosa soprana', 'frabosa sottana', 'mondovì',
  'provinciale 37', 'sp 37', 'provinciale 243', 'sp 243', 'artesina', 'valle ellero'
];

/**
 * Controlla se una notizia è rilevante per la viabilità di Prato Nevoso
 */
const isRelevantAlert = (text) => {
  const lowerText = text.toLowerCase();
  return (
    RELEVANT_LOCATIONS.some(location => lowerText.includes(location)) &&
    PROBLEM_KEYWORDS.some(keyword => lowerText.includes(keyword))
  );
};

/**
 * Recupera le notizie sulla viabilità da Provincia di Cuneo
 */
export const fetchRoadNews = async () => {
  try {
    const response = await fetch(VIABILITY_URL);
    if (!response.ok) throw new Error('Errore nel caricamento della viabilità');
    
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    
    const newsItems = Array.from(doc.querySelectorAll('.feed-item'));
    
    if (newsItems.length === 0) {
      throw new Error('Struttura della pagina cambiata: impossibile trovare aggiornamenti sulla viabilità. Controlla la fonte ufficiale.');
    }
    
    const filteredAlerts = newsItems.map(item => {
      const title = item.querySelector('.feed-item-title a')?.textContent || '';
      const date = item.querySelector('.feed-item-date')?.textContent || '';
      const content = item.querySelector('.feed-item-body')?.textContent || '';
      
      return {
        title,
        date,
        content,
        isRelevant: isRelevantAlert(title + ' ' + content)
      };
    }).filter(item => item.isRelevant);
    
    return filteredAlerts.length > 0
      ? filteredAlerts.map(alert => ({
          title: alert.title,
          description: `${alert.content}\n\n🔹 Fonte: [Provincia Cuneo](https://notizie.provincia.cuneo.it)\n⚠️ Si consiglia di guidare con prudenza e di contattare il numero di emergenza 112 per ulteriori informazioni. L'Hotel Galassia non è responsabile dell'accuratezza delle informazioni.`
        }))
      : [{
          title: 'Nessun problema di viabilità rilevato.',
          description: "🔹 Fonte: [Provincia Cuneo](https://notizie.provincia.cuneo.it)\n⚠️ Si consiglia di guidare con prudenza e di contattare il numero di emergenza 112 per ulteriori informazioni. L'Hotel Galassia non è responsabile dell'accuratezza delle informazioni."
        }];
  } catch (error) {
    console.error('Errore nel recupero della viabilità:', error);
    return [{
      title: '⚠️ Attenzione',
      description: "Potrebbe esserci stato un cambiamento nella struttura del sito ufficiale. Consulta direttamente la fonte: [Provincia Cuneo](https://notizie.provincia.cuneo.it)\n⚠️ Si consiglia di guidare con prudenza e di contattare il numero di emergenza 112 per ulteriori informazioni. L'Hotel Galassia non è responsabile dell'accuratezza delle informazioni."
    }];
  }
};
