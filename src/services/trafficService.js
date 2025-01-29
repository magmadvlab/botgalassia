// src/services/trafficService.js

const ROADS_OF_INTEREST = [
  'SP327', 'SS28', 'SP37', 'SP164', 'SP183', 'SP232'
];

const RSS_URL = 'https://www.provincia.cuneo.it/aggregator/sources/4';

/**
 * Fetches and parses traffic updates from Provincia di Cuneo RSS feed
 * @returns {Promise<Array>} Array of traffic updates
 */
export const fetchTrafficUpdates = async () => {
  try {
    const response = await fetch(RSS_URL);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const items = xmlDoc.getElementsByTagName("item");
    
    const updates = [];
    
    for(let i = 0; i < items.length; i++) {
      const title = items[i].getElementsByTagName("title")[0].textContent;
      const description = items[i].getElementsByTagName("description")[0].textContent;
      const pubDate = items[i].getElementsByTagName("pubDate")[0].textContent;
      
      // Filter only relevant roads
      if (ROADS_OF_INTEREST.some(road => title.includes(road) || description.includes(road))) {
        updates.push({
          id: i,
          title,
          description,
          date: new Date(pubDate),
          // Categorize update type
          type: categorizeUpdate(title.toLowerCase()),
          affectedRoads: findAffectedRoads(title, description)
        });
      }
    }
    
    return updates;
  } catch (error) {
    console.error('Error fetching traffic updates:', error);
    throw new Error('Failed to fetch traffic updates');
  }
};

/**
 * Categorizes the type of traffic update
 * @param {string} title 
 * @returns {string} Update category
 */
const categorizeUpdate = (title) => {
  if (title.includes('neve') || title.includes('gelo')) return 'WEATHER';
  if (title.includes('incidente')) return 'ACCIDENT';
  if (title.includes('lavori')) return 'ROADWORK';
  if (title.includes('chiusura') || title.includes('interruzione')) return 'CLOSURE';
  return 'OTHER';
};

/**
 * Finds affected roads mentioned in update
 * @param {string} title 
 * @param {string} description 
 * @returns {Array} List of affected roads
 */
const findAffectedRoads = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();
  return ROADS_OF_INTEREST.filter(road => 
    text.includes(road.toLowerCase())
  );
};

export default {
  fetchTrafficUpdates
};
