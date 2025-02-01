// src/services/mapsService.js

const HOTEL_ADDRESS = "Via Malanotte, 6, 12083 Frabosa Sottana CN";

/**
 * Genera il link per ottenere indicazioni stradali su Google Maps
 * @returns {string} URL di Google Maps con l'indirizzo dell'hotel
 */
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HOTEL_ADDRESS)}`;

/**
 * Funzione per ottenere indicazioni stradali con partenza personalizzata
 */
export const getGoogleMapsDirections = (startLocation = '') => {
  return startLocation
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(startLocation)}&destination=${encodeURIComponent(HOTEL_ADDRESS)}`
    : GOOGLE_MAPS_URL;
};

/**
 * Crea un pulsante per aprire Google Maps con le indicazioni stradali
 * @param {string} [startLocation] - Indirizzo di partenza (opzionale)
 * @returns {JSX.Element} Pulsante con link per le indicazioni
 */
export const GoogleMapsButton = ({ startLocation = '' }) => {
  const handleClick = () => {
    window.open(getGoogleMapsDirections(startLocation), '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white p-3 rounded-lg hover:opacity-90 flex items-center justify-center"
    >
      📍 Ottieni Indicazioni
    </button>
  );
};
