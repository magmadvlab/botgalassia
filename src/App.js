import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import logo from './logo-hotel-galassia-prato-nevoso-01.png';
import faqData from './faq/faqData';

const Header = () => {
  return (
    <header className="bg-[#B8860B] p-4">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <img src={logo} alt="Hotel Galassia Logo" className="w-16 mb-2" />
        <h1 className="text-2xl font-bold text-white">Hotel Galassia</h1>
        <div className="text-white text-sm">PRATO NEVOSO ★★★</div>
      </div>
    </header>
  );
};

const transformations = {
  'wifi': ['wi-fi', 'wi fi', 'internet', 'rete'],
  'piscina': ['nuotare', 'bagno', 'vasca', 'spa', 'wellness'],
  'check-in': ['check in', 'checkin', 'registrazione', 'arrivo'],
  'check-out': ['check out', 'checkout', 'partenza', 'uscita'],
  'navetta': ['shuttle', 'bus', 'transfer', 'trasporto'],
  'parcheggio': ['garage', 'posto auto', 'box auto'],
  'skibox': ['ski box', 'deposito sci', 'porta sci'],
  'ristorante': ['mangiare', 'ristorazione', 'cena', 'pranzo'],
  'animale': ['pet', 'cane', 'gatto', 'animali'],
  'piano -1': ['sotterraneo', 'sotto', 'basement'],
  'arrivare': ['raggiungere', 'andare', 'trovare'],
  'prenotare': ['riservare', 'richiedere', 'bisogna prenotare']
};

const pluralSingular = {
  'emergenze': 'emergenza',
  'attività': 'attività',
  'servizi': 'servizio',
  'animali': 'animale'
};

const App = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Ciao, sono Lunaria ✨, l\'assistente virtuale dell\'Hotel Galassia. Sono qui per guidarti tra le stelle alpine e rispondere a tutte le tue domande sul soggiorno. Come posso aiutarti?' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const synonyms = {
    "piscina": ["vasca", "nuoto", "bagno", "wellness", "spa", "idromassaggio"],
    "check-in": ["arrivo", "registrazione", "inizio soggiorno"],
    "check-out": ["partenza", "fine soggiorno", "uscita"],
  };

  const expandInput = (userInput) => {
    let expandedInput = userInput.toLowerCase();
    
    Object.entries(transformations).forEach(([key, values]) => {
      values.forEach(value => {
        if (expandedInput.includes(value.toLowerCase())) {
          expandedInput = expandedInput.replace(value.toLowerCase(), key);
        }
      });
    });

    Object.entries(pluralSingular).forEach(([plural, singular]) => {
      if (expandedInput.includes(plural)) {
        expandedInput = expandedInput.replace(plural, singular);
      }
    });

    Object.entries(synonyms).forEach(([key, values]) => {
      values.forEach(synonym => {
        if (expandedInput.includes(synonym.toLowerCase())) {
          expandedInput = expandedInput.replace(synonym.toLowerCase(), key);
        }
      });
    });
    
    return expandedInput;
  };

  const findBestResponse = (userInput) => {
    const processedInput = expandInput(userInput.toLowerCase().trim());

    const calculateMatchScore = (input, tags) => {
      return tags.reduce((score, tag) => {
        if (input.includes(tag.toLowerCase())) {
          score += tag.length / input.length;
        }
        return score;
      }, 0);
    };

    let bestMatch = null;
    let bestScore = 0;

    for (const [category, data] of Object.entries(faqData)) {
      const allTags = [...(data.keywords || [])];
      const categoryScore = calculateMatchScore(processedInput, allTags);
      
      if (categoryScore > 0) {
        for (const [question, qData] of Object.entries(data.questions)) {
          const score = calculateMatchScore(processedInput, [...(qData.tags || []).map(tag => tag.toLowerCase()), ...allTags]);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = {
              title: data.title,
              content: qData.answer
            };
          }
        }
      }
    }

    if (bestMatch && bestScore > 0.3) {
      return [bestMatch];
    }

    fetch('/log-missing-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: userInput,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);

    return [{
      title: 'Info',
      content: 'Mi dispiace, non ho capito. Prova a chiedere usando parole chiave come "piscina", "check-in" o "navetta".'
    }];
  };

  const handleFeedback = (index, feedbackType, userInput) => {
    fetch('/save-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: userInput,
        feedback: feedbackType,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    const responses = findBestResponse(input);
    const botMessages = responses.map((res) => ({
      type: 'bot',
      title: res.title,
      content: res.content,
    }));

    setMessages((prev) => [...prev, userMessage, ...botMessages]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] p-3 rounded-lg ${
                message.type === 'user' ? 'bg-[#B8860B] text-white' : 'bg-white shadow-sm'
              }`}
            >
              {message.title && (
                <div className="font-bold text-base mb-1">{message.title}</div>
              )}
              <div className="text-sm">{message.content}</div>

              {message.type === 'bot' && (
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleFeedback(index, 'positive', message.content)}
                    className="flex items-center text-[#B8860B] hover:opacity-75"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleFeedback(index, 'negative', message.content)}
                    className="flex items-center text-red-500 hover:opacity-75"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-3">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Fai una domanda..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B8860B] text-sm"
          />
          <button
            type="submit"
            className="bg-[#B8860B] text-white p-3 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default App;
