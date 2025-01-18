import React, { useState, useRef, useEffect } from 'react';
import { Send, Clock, MapPin, Mountain, Book, Globe } from 'lucide-react';

// Lingue supportate
const SUPPORTED_LANGUAGES = {
  'it': 'Italiano',
  'en': 'English',
  'fr': 'Français',
  'de': 'Deutsch',
  'ro': 'Română'
};

// Interfaccia UI in più lingue
const UI_STRINGS = {
  'it': {
    welcome: "Benvenuto nel chatbot dell'Hotel Galassia! Come posso aiutarti?",
    placeholder: "Fai una domanda...",
    checkInButton: "Check-in/out",
    skiButton: "Info Sci",
    poolButton: "Piscina",
    servicesButton: "Servizi",
    defaultResponse: "Mi dispiace, non ho trovato una risposta specifica. Per assistenza immediata:\n\n📞 Reception (24/7): 0174 334183"
  },
  'en': {
    welcome: "Welcome to Hotel Galassia chatbot! How can I help you?",
    placeholder: "Ask a question...",
    checkInButton: "Check-in/out",
    skiButton: "Ski Info",
    poolButton: "Pool",
    servicesButton: "Services",
    defaultResponse: "I'm sorry, I couldn't find a specific answer. For immediate assistance:\n\n📞 Reception (24/7): +39 0174 334183"
  },
  // Aggiungere altre lingue...
};

// Database FAQ multilingua
const FAQ_DATA_MULTILANG = {
  'it': {
    'Wellness e Relax': {
      'Dove si trova la piscina?': 'Al Piano -1 (prendere ascensore o scendere per le scale).',
      'Quali sono gli orari della piscina?': 'Dalle 16:00 alle 19:00. Prenotazione obbligatoria in reception. È obbligatorio indossare costume, cuffia e accappatoio.',
      'La piscina è riscaldata?': 'Sì, la temperatura dell\'acqua è di circa 30°C.'
    }
  },
  'en': {
    'Wellness and Relax': {
      'Where is the pool?': 'On Floor -1 (take elevator or stairs).',
      'What are the pool hours?': 'From 16:00 to 19:00. Booking required at reception. Swimsuit, cap, and bathrobe are mandatory.',
      'Is the pool heated?': 'Yes, water temperature is around 30°C.'
    }
  }
  // Aggiungere altre lingue...
};

// Keywords per lingua
const KEYWORDS_MULTILANG = {
  'it': {
    'piscina': ['piscina', 'nuotare', 'bagno', 'wellness', 'spa'],
    'check': ['check', 'bagagli', 'arrivo', 'partenza'],
    'sci': ['sci', 'pista', 'skibox', 'neve'],
    'ristorazione': ['mangiare', 'colazione', 'cena', 'pranzo']
  },
  'en': {
    'pool': ['pool', 'swim', 'swimming', 'wellness', 'spa'],
    'check': ['check', 'luggage', 'arrival', 'departure'],
    'ski': ['ski', 'slope', 'skibox', 'snow'],
    'food': ['eat', 'breakfast', 'dinner', 'lunch']
  }
  // Aggiungere altre lingue...
};

const App = () => {
  // Rileva la lingua del browser
  const detectLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return SUPPORTED_LANGUAGES[browserLang] ? browserLang : 'en';
  };

  const [currentLang, setCurrentLang] = useState(detectLanguage());
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: UI_STRINGS[currentLang].welcome,
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  // ... resto del codice esistente ...

  // Aggiunge il selettore della lingua
  const LanguageSelector = () => (
    <div className="absolute top-4 right-4">
      <select 
        value={currentLang}
        onChange={(e) => setCurrentLang(e.target.value)}
        className="bg-transparent text-white border-white border rounded p-1"
      >
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
          <option key={code} value={code} className="text-black">
            {name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto h-96 flex flex-col bg-white rounded-lg shadow-lg">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg relative">
        <h2 className="text-xl font-bold">Hotel Galassia - Assistente Virtuale</h2>
        <LanguageSelector />
      </div>

      {/* ... resto del componente ... */}
    </div>
  );
};

export default App;
