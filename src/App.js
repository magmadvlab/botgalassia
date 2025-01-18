import React, { useState, useEffect } from 'react';
import { Send, Clock, MapPin, Mountain, Book } from 'lucide-react';
import { marked } from 'marked';

const App = () => {
  const [faqData, setFaqData] = useState({});
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Benvenuto nel chatbot dell'Hotel Galassia! Come posso aiutarti?",
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = React.useRef(null);

  useEffect(() => {
    const loadFAQ = async () => {
      try {
        const response = await fetch('/hotel-galassia-info.md');
        const text = await response.text();
        const sections = parseMdToSections(text);
        setFaqData(sections);
      } catch (error) {
        console.error('Errore nel caricamento delle FAQ:', error);
      }
    };
    loadFAQ();
  }, []);

  const parseMdToSections = (markdown) => {
    const sections = {};
    const lines = markdown.split('\n');
    let currentSection = '';
    let currentQuestion = '';
    
    lines.forEach(line => {
      if (line.startsWith('## ')) {
        currentSection = line.replace('## ', '').trim();
        sections[currentSection] = {};
      } else if (line.startsWith('**') && line.includes('?')) {
        currentQuestion = line.replace(/\*\*/g, '').trim();
      } else if (line.includes('*Risposta:*') && currentQuestion) {
        const answer = line.split('*Risposta:*')[1].trim();
        if (currentSection && currentQuestion) {
          sections[currentSection][currentQuestion] = answer;
        }
      }
    });

    return sections;
  };

  const findBestResponse = (input) => {
    input = input.toLowerCase();
    let bestMatch = {
      title: "Contatta la Reception",
      content: "Mi dispiace, non ho trovato una risposta specifica. Per assistenza immediata:\n\n📞 Reception (24/7): 0174 334183"
    };

    // Cerca in tutte le sezioni
    Object.entries(faqData).forEach(([section, questions]) => {
      Object.entries(questions).forEach(([question, answer]) => {
        const questionLower = question.toLowerCase();
        const words = input.split(' ');
        
        // Cerca corrispondenze tra le parole della domanda e l'input
        words.forEach(word => {
          if (word.length > 3 && questionLower.includes(word)) {
            bestMatch = {
              title: section,
              content: `${question}\n\n${answer}`
            };
          }
        });
      });
    });

    return bestMatch;
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
