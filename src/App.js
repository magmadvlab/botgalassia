import React from 'react';
import { Send, Clock, MapPin, Mountain, Book } from 'lucide-react';

const responses = {
  checkin: {
    title: "Check-in e Check-out",
    content: "📅 Check-in: dalle 10:30 (camere garantite dopo le 16:30)\n📅 Check-out: entro le 10:00\n\n🎒 Bagagli: possibilità di depositarli in apposita sala alla reception (piano 1)\n\n📞 Per arrivi tardivi: contattare la reception al 0174334183"
  },
  ristorazione: {
    title: "Ristorazione e Bar",
    content: "🍳 Colazione: 7:30-9:30 al piano 0\n🍽️ Cena: 19:30-20:30\n🍷 Bar: 10:00-14:00 e 16:00-23:00\n\n⚡ Prenotazione cena obbligatoria in reception con scelta menu\n🍷 Disponibile fornita cantina vini e birre"
  },
  ski: {
    title: "Informazioni Sci",
    content: "🎿 Accesso piste: tunnel al piano -1 (prendere ascensore)\n🚐 Navetta gratuita:\n- Mattino: 8:30-12:30\n- Pomeriggio: 14:30-17:30\n\n🌙 Sci notturno: martedì, venerdì e sabato 20:00-23:00\n\n📞 Noleggio: Bepe Ski (0174334474) con tariffe speciali"
  },
  piscina: {
    title: "Piscina e Wellness",
    content: "🏊‍♂️ Ubicazione: Piano -1 (ascensore)\n⏰ Orario: 16:00-19:00\n🌡️ Temperatura: circa 30°C\n\n⚠️ Obbligatori:\n- Prenotazione in reception\n- Costume\n- Cuffia\n- Accappatoio\n\n💆‍♂️ Disponibile vasca idromassaggio"
  },
  wifi: {
    title: "Wi-Fi",
    content: "📶 Rete e password per zone:\n- Reception/Bar: 'Wifi Galassia'\n- Piano 1 (camere 101-116): 'Wifi_Galassia 1P Dx/Sx'\n- Piano 2: 'Wifi_Galassia 2P Dx/Sx'\n\n🔑 Password sempre: Galassia2023\n\n💡 Scegliere la rete con segnale più forte"
  },
  animali: {
    title: "Animali",
    content: "🐾 Animali ammessi con supplemento\n⚠️ Aree non consentite:\n- Ristoranti\n- Piscina\n\n📞 Per animali di grossa taglia: contattare la reception"
  },
  servizi: {
    title: "Servizi e Attività",
    content: "🎮 Sala giochi con biliardo e calcio balilla\n👶 Animazione per bambini\n🚌 Navetta gratuita per il centro\n🅿️ Parcheggio: esterno gratuito o interno (€15/giorno)\n📶 Wi-Fi gratuito in tutto l'hotel"
  }
};

const App = () => {
  const [messages, setMessages] = React.useState([
    {
      type: 'bot',
      content: "Benvenuto nel chatbot dell'Hotel Galassia! Come posso aiutarti?",
    }
  ]);
  const [input, setInput] = React.useState('');
  const chatEndRef = React.useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (input) => {
    input = input.toLowerCase();
    
    if (input.includes('check')) return responses.checkin;
    if (input.includes('colazione') || input.includes('cena') || input.includes('mangiare') || input.includes('ristorante')) return responses.ristorazione;
    if (input.includes('sci') || input.includes('pista') || input.includes('neve')) return responses.ski;
    if (input.includes('piscina') || input.includes('nuotare')) return responses.piscina;
    if (input.includes('wifi') || input.includes('internet') || input.includes('password')) return responses.wifi;
    if (input.includes('animal') || input.includes('cane') || input.includes('gatto')) return responses.animali;
    if (input.includes('servizi') || input.includes('giochi') || input.includes('animazione')) return responses.servizi;
    
    return {
      title: "Contatta la Reception",
      content: "Mi dispiace, non ho trovato una risposta specifica alla tua domanda. Per assistenza immediata:\n\n📞 Chiama la reception: 0174 334183\n\nSaremo lieti di aiutarti personalmente!"
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
