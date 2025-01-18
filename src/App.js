import React from 'react';
import { Send, Clock, MapPin, Mountain, Book } from 'lucide-react';

const responses = {
  checkin: {
    title: "Check-in e Check-out",
    content: "📅 Check-in: dalle 10:30 (camere garantite dopo le 16:30)\n📅 Check-out: entro le 10:00\n\n🎒 Deposito bagagli disponibile in apposita sala al piano 1 (salire due rampe di scale dall'ingresso del parcheggio lato pista)\n\nSe arrivi tardi, avvisa la reception dell'orario previsto."
  },
  ristorazione: {
    title: "Ristorazione e Bar",
    content: "🍳 Colazione: 7:30-9:30 al piano 0\n🍽️ Cena: 19:30-20:30 (prenotazione obbligatoria)\n🍷 Bar: 10:00-14:00 e 16:00-23:00\n\nRistorante al piano terra (piano 0): scendi le scale o prendi l'ascensore.\nCena servita al tavolo con scelta menu e cantina vini."
  },
  piscina: {
    title: "Piscina e Wellness",
    content: "🏊‍♂️ Piano -1 (prendi l'ascensore o scendi le scale)\n⏰ Orario: 16:00-19:00\n🌡️ Temperatura acqua: circa 30°C\n\n⚠️ Obbligatori:\n- Prenotazione in reception\n- Costume\n- Cuffia\n- Accappatoio\n\n💆‍♂️ Disponibile vasca idromassaggio"
  },
  sci: {
    title: "Servizi Sci",
    content: "🎿 Accesso piste: tunnel al piano -1\n📦 Ski box: piano -1 lungo il tunnel (numerati e riscaldati)\n🚐 Navetta gratuita: 8:30-12:30 e 14:30-17:30\n\n🏂 Noleggio: Bepe Ski (0174334474) con tariffe speciali\n🌙 Sci notturno: martedì, venerdì e sabato 20:00-23:00"
  },
  wifi: {
    title: "Wi-Fi",
    content: "📶 Reti disponibili:\n- Reception/Bar: 'Wifi Galassia'\n- Piano 1 (camere 101-116): 'Wifi_Galassia 1P Dx/Sx'\n- Piano 2: 'Wifi_Galassia 2P Dx/Sx'\n\n🔑 Password sempre: Galassia2023\n\n💡 Scegli la rete con segnale più forte"
  },
  intrattenimento: {
    title: "Intrattenimento",
    content: "🎮 Sala giochi: dopo la reception, proseguire dritti\n- Biliardo e calcio balilla disponibili\n\n👶 Servizio animazione per bambini con attività e giochi organizzati"
  },
  animali: {
    title: "Animali",
    content: "🐾 Ammessi con supplemento\n⚠️ Aree non consentite:\n- Ristoranti\n- Piscina\n\nPer animali di grossa taglia: concordare in reception"
  },
  attivita: {
    title: "Attività Extra",
    content: "🛵 Motoslitte: +39 349 144 4433\n🏔️ Ciaspolate/Snowtubing: +39 0174 334 151\n\n🎡 Prato Nevoso Village raggiungibile con navetta gratuita su chiamata"
  },
  emergenze: {
    title: "Emergenze e Assistenza",
    content: "📞 Reception (24/7): +39 0174 334183\n👨‍⚕️ Guardia medica disponibile a Prato Nevoso\n💊 Farmacia in Conca a Pratonevoso\n\nPer emergenze notturne: chiamare sempre la reception"
  },
  default: {
    title: "Contatta la Reception",
    content: "Mi dispiace, non ho trovato una risposta specifica. Per assistenza immediata:\n\n📞 Reception (24/7): 0174 334183"
  }
};

const findBestResponse = (input) => {
  input = input.toLowerCase();
  
  // Check-in/out
  if (input.includes('check') || input.includes('bagagl') || input.includes('arrival') || 
      input.includes('arriv')) return responses.checkin;
  
  // Ristorazione
  if (input.includes('mangi') || input.includes('colazion') || input.includes('cena') || 
      input.includes('bar') || input.includes('ristorante') || input.includes('pranzo')) 
    return responses.ristorazione;
  
  // Piscina
  if (input.includes('piscina') || input.includes('nuot') || input.includes('wellness') || 
      input.includes('idromassaggio') || input.includes('spa')) 
    return responses.piscina;
  
  // Sci
  if (input.includes('sci') || input.includes('pista') || input.includes('skibox') || 
      input.includes('ski box') || input.includes('tunnel')) 
    return responses.sci;
  
  // WiFi
  if (input.includes('wifi') || input.includes('internet') || input.includes('password') || 
      input.includes('connessione')) 
    return responses.wifi;

  // Intrattenimento
  if (input.includes('gioch') || input.includes('biliard') || input.includes('calcio') || 
      input.includes('animazione') || input.includes('bambin')) 
    return responses.intrattenimento;

  // Animali
  if (input.includes('animal') || input.includes('cane') || input.includes('gatto')) 
    return responses.animali;

  // Attività extra
  if (input.includes('motosl') || input.includes('ciaspol') || input.includes('snow') || 
      input.includes('village')) 
    return responses.attivita;

  // Emergenze
  if (input.includes('emergenz') || input.includes('medic') || input.includes('farmac') || 
      input.includes('aiuto')) 
    return responses.emergenze;

  return responses.default;
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
