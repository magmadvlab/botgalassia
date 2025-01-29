import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';

// Constants
const ROADS_OF_INTEREST = [
  'SP327', 'SS28', 'SP37', 'SP164', 'SP183', 'SP232'
];

const RSS_URL = 'https://www.provincia.cuneo.it/aggregator/sources/4';

const TrafficInfo = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper Functions
  const categorizeUpdate = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('neve') || lowerTitle.includes('gelo')) return 'WEATHER';
    if (lowerTitle.includes('incidente')) return 'ACCIDENT';
    if (lowerTitle.includes('lavori')) return 'ROADWORK';
    if (lowerTitle.includes('chiusura') || lowerTitle.includes('interruzione')) return 'CLOSURE';
    return 'OTHER';
  };

  const findAffectedRoads = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();
    return ROADS_OF_INTEREST.filter(road => 
      text.includes(road.toLowerCase())
    );
  };

  const fetchTrafficUpdates = async () => {
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
            type: categorizeUpdate(title),
            affectedRoads: findAffectedRoads(title, description)
          });
        }
      }
      
      setUpdates(updates);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching traffic updates:', err);
      setError('Failed to fetch traffic updates');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficUpdates();
    // Refresh every 15 minutes
    const interval = setInterval(fetchTrafficUpdates, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 text-amber-700">
        <div className="animate-spin mr-2">⭐</div>
        Caricamento informazioni traffico...
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Errore</AlertTitle>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Disclaimer */}
      <Alert className="bg-amber-50 border-amber-200">
        <AlertTitle className="text-amber-800">Attenzione</AlertTitle>
        <p className="text-sm text-amber-700">
          Le informazioni sulla viabilità sono fornite dalla Provincia di Cuneo. 
          L'app non si assume responsabilità sull'accuratezza dei dati. 
          Per informazioni ufficiali e aggiornate, si prega di contattare direttamente le autorità competenti.
        </p>
      </Alert>

      {/* Traffic Updates */}
      <div className="space-y-2">
        {updates.length === 0 ? (
          <Alert>
            <p>Nessun aggiornamento sulla viabilità al momento.</p>
          </Alert>
        ) : (
          updates.map(update => (
            <Alert 
              key={update.id}
              variant={update.type === 'WEATHER' ? 'destructive' : 'default'}
              className={`
                mb-2 
                ${update.type === 'WEATHER' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}
              `}
            >
              <AlertTitle className={update.type === 'WEATHER' ? 'text-red-800' : 'text-gray-800'}>
                {update.title}
              </AlertTitle>
              <p className="text-sm mt-1">{update.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Aggiornato: {update.date.toLocaleString('it-IT')}
              </p>
            </Alert>
          ))
        )}
      </div>
    </div>
  );
};

export default TrafficInfo;
