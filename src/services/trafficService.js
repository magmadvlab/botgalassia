// Constants
export const ROADS_OF_INTEREST = [
  'SP327', 'SS28', 'SP37', 'SP164', 'SP183', 'SP232'
];

export const RSS_URL = 'https://www.provincia.cuneo.it/aggregator/sources/4';

/**
 * Categorizes the type of traffic update
 */
export const categorizeUpdate = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('neve') || lowerTitle.includes('gelo')) return 'WEATHER';
  if (lowerTitle.includes('incidente')) return 'ACCIDENT';
  if (lowerTitle.includes('lavori')) return 'ROADWORK';
  if (lowerTitle.includes('chiusura') || lowerTitle.includes('interruzione')) return 'CLOSURE';
  return 'OTHER';
};

/**
 * Finds affected roads in update text
 */
export const findAffectedRoads = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();
  return ROADS_OF_INTEREST.filter(road => 
    text.includes(road.toLowerCase())
  );
};

/**
 * Fetches and parses traffic updates
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
      
      if (ROADS_OF_INTEREST.some(road => title.includes(road) || description.includes(road))) {
        updates.push({
          id: i,
          title,
          description,
          date: new Date(pubDate),
          type: categorizeUpdate(title),
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
