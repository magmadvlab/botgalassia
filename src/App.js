import React, { useState, useRef, useEffect } from 'react';
import { Send, Clock, MapPin, Mountain, Book } from 'lucide-react';

// Database delle FAQ
const FAQ_DATA = {
  'Wellness e Relax': {
    'Dove si trova la piscina?': 'Al Piano -1 (prendere ascensore o scendere per le scale).',
    'Quali sono gli orari della piscina?': 'Dalle 16:00 alle 19:00. Prenotazione obbligatoria in reception. È obbligatorio indossare costume, cuffia e accappatoio.',
    'La piscina è riscaldata?': 'Sì, la temperatura dell\'acqua è di circa 30°C.',
    'È incluso l\'accesso alla piscina?': 'Sì, è incluso nel prezzo della camera.',
    'C\'è un\'area wellness?': 'Sì, c\'è una vasca idromassaggio annessa alla piscina.'
  },
  'Check-in/Check-out': {
    'Qual è l\'orario del check-in?': 'Dalle 10:30, con consegna camere garantita dopo le 16:30.',
    'Qual è l\'orario del check-out?': 'Entro le 10:00. Possibilità di lasciare bagagli in custodia.',
    'Dove posso lasciare i bagagli?': 'In reception al piano uno è disponibile una sala dedicata.'
  },
  'Servizi Sci': {
    'Come si raggiungono le piste?': 'Dal piano -1, attraverso un tunnel che porta direttamente alla pista blu nr. 1 "Pista del Prel".',
    'Dove sono gli ski box?': 'Al piano -1, lungo il tunnel. Ogni box è numerato.',
    'Come funziona la navetta?': 'Servizio gratuito dalle 08:30 alle 12:30 e dalle 14:30 alle 17:30. Prenotazione necessaria.'
  },
  'Ristorazione': {
    'Dove viene servita la colazione?': 'Nel ristorante al piano terra (piano 0), raggiungibile con scale o ascensore.',
    'Quali sono gli orari?': 'Colazione: 7:30-9:30\nCena: 19:30-20:30',
    'È necessario prenotare la cena?': 'Sì, prenotazione obbligatoria in reception con scelta del menu.'
  }
};

// Keywords per la ricerca
const KEYWORDS = {
  'piscina': ['piscina', 'nuotare', 'bagno', 'wellness', 'spa', 'idromassaggio'],
  'check': ['check', 'bagagli', 'arrivo', 'partenza'],
  'sci': ['sci', 'pista', 'skibox', 'ski box', 'tunnel', 'neve'],
  'ristorazione': ['mangiare', 'colazione', 'cena', 'pranzo', 'ristorante', 'bar']
};

const App = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Benvenuto nel chatbot dell'Hotel Galassia! Come posso aiutarti?",
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // Cerca corrispondenze nelle keywords
    let category = null;
    
    // Cerca nelle keywords
    for (const [cat, words] of Object.entries(KEYWORDS)) {
      if (words.some(word => input.includes(word))) {
        category = cat;
        break;
      }
    }

    // Mappa le categorie di keywords alle sezioni FAQ
    const categoryMapping = {
      'piscina': 'Wellness e Relax',
      'check': 'Check-in/Check-out',
      'sci': 'Servizi Sci',
      'ristorazione': 'Ristorazione'
    };

    if (category && categoryMapping[category]) {
      const section = categoryMapping[category];
      const questions = FAQ_DATA[section];
      
      // Costruisci una risposta con tutte le informazioni rilevanti
      let content = '';
      for (const [question, answer] of Object.entries(questions)) {
        content += `${answer}\n\n`;
      }

      return {
        title: section,
        content: content.trim()
      };
    }

    // Risposta di default
    return {
      title: "Contatta la Reception",
      content: "Mi dispiace, non ho trovato una risposta specifica. Per assistenza immediata:\n\n📞 Reception (24/7): 0174 334183"
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    const response = findBestResponse(input);
    const botMessage = {
      type: 'bot',
      title: response.title,
      content: response.content
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-96 flex flex-col bg-white rounded-lg shadow-lg">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Hotel Galassia - Assistente Virtuale</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.title && (
                <div className="font-bold mb-1">{message.title}</div>
              )}
              <div className="whitespace-pre-line">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Fai una domanda..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="p-4 bg-gray-50 rounded-b-lg flex space-x-2 overflow-x-auto">
        <QuickButton icon={<Clock />} text="Check-in/out" onClick={() => setInput('Orari check-in')} />
        <QuickButton icon={<Mountain />} text="Info Sci" onClick={() => setInput('Come arrivo alle piste?')} />
        <QuickButton icon={<MapPin />} text="Piscina" onClick={() => setInput('Dove è la piscina?')} />
        <QuickButton icon={<Book />} text="Servizi" onClick={() => setInput('Quali servizi offrite?')} />
      </div>
    </div>
  );
};

const QuickButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {icon}
    <span>{text}</span>
  </button>
);

export default App;
