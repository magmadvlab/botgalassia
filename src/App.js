import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Send, Globe } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import logo from './logo-galassia-prato-nevoso.png';

const languages = {
  it: {
    welcome: 'Benvenuto! Come posso aiutarti?',
    placeholder: 'Scrivi un messaggio...',
    jsError: 'È necessario abilitare JavaScript per utilizzare questa applicazione.',
    processing: 'Sto elaborando la tua richiesta...'
  },
  en: {
    welcome: 'Welcome! How can I help you?',
    placeholder: 'Type a message...',
    jsError: 'You need to enable JavaScript to run this app.',
    processing: 'Processing your request...'
  }
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('it');
  const [isJsEnabled, setIsJsEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  const checkJsEnabled = () => {
    try {
      const testKey = '__test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      setIsJsEnabled(true);
    } catch (e) {
      setIsJsEnabled(false);
    }
  };

  useEffect(() => {
    checkJsEnabled();
    setMessages([{ type: 'bot', content: languages[language].welcome }]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateFollowUp = (category) => {
    const followUps = {
      it: {
        wellness: 'Vuoi sapere di più sui nostri servizi wellness?',
        dining: 'Posso aiutarti a prenotare un tavolo al ristorante?',
        transport: 'Hai bisogno di informazioni sulla navetta?',
        ski: 'Vuoi conoscere le tariffe per lo ski pass?'
      },
      en: {
        wellness: 'Would you like to know more about our wellness services?',
        dining: 'Can I help you book a table at the restaurant?',
        transport: 'Do you need information about the shuttle service?',
        ski: 'Would you like to know the ski pass rates?'
      }
    };
    return followUps[language][category] || '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const category = input.toLowerCase().includes('wellness') ? 'wellness' : 
                      input.toLowerCase().includes('ristorante') ? 'dining' :
                      input.toLowerCase().includes('navetta') ? 'transport' : 'general';
      
      const botMessage = {
        type: 'bot',
        title: 'Info',
        content: languages[language].processing,
        followUp: generateFollowUp(category)
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const switchLanguage = () => {
    setLanguage(prev => prev === 'it' ? 'en' : 'it');
  };

  const handleFeedback = (messageIndex, isPositive) => {
    console.log(`Feedback ${isPositive ? 'positivo' : 'negativo'} per il messaggio ${messageIndex}`);
  };

  if (!isJsEnabled) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>
          {languages[language].jsError}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white p-4 border-b shadow-sm">
        <div className="flex flex-col items-center">
          <img 
            src={logo}
            alt="Hotel Galassia" 
            className="h-16 mb-2"
          />
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-[#B8860B]">Hotel Galassia</h1>
            <button 
              onClick={switchLanguage}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Switch language"
            >
              <Globe className="w-5 h-5 text-[#B8860B]" />
            </button>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-[#B8860B] text-lg">★★★</span>
          </div>
          <div className="text-[#B8860B] text-sm font-medium tracking-widest">
            PRATO NEVOSO
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user' ? 'bg-[#B8860B] text-white' : 'bg-white shadow-md'
            }`}>
              {message.title && <div className="font-bold mb-1">{message.title}</div>}
              <div>{message.content}</div>
              {message.followUp && (
                <div className="text-sm text-gray-600 mt-2 italic">
                  {message.followUp}
                </div>
              )}
              {message.type === 'bot' && (
                <div className="flex space-x-2 mt-2">
                  <button 
                    onClick={() => handleFeedback(index, true)}
                    className="text-[#B8860B] hover:opacity-75"
                  >
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleFeedback(index, false)}
                    className="text-red-500 hover:opacity-75"
                  >
                    <ThumbsDown className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="border-t bg-white p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={languages[language].placeholder}
            className="flex-1 p-4 border rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-[#B8860B] text-white p-4 rounded-lg hover:bg-[#DAA520] focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default App;
