// src/services/faqService.js

import Fuse from 'fuse.js';
import faqData from '../faq/it/faqData';

// Sinonimi e trasformazioni per migliorare la ricerca
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
  
  return expandedInput;
};

const prepareFAQList = () => {
  const faqs = [];
  for (const [category, data] of Object.entries(faqData)) {
    for (const [question, qData] of Object.entries(data.questions)) {
      faqs.push({
        question,
        answer: qData.answer,
        tags: qData.tags || [],
        category,
      });
    }
  }
  return faqs;
};

const faqList = prepareFAQList();
const fuse = new Fuse(faqList, {
  keys: ['question', 'tags'],
  threshold: 0.3,
});

export const getFAQResponse = async (query) => {
  console.log("🔍 Domanda ricevuta:", query);
  
  const processedInput = expandInput(query.toLowerCase().trim());
  console.log("🔎 Input processato:", processedInput);

  const result = fuse.search(processedInput);

 console.log("📋 FAQ disponibili:", faqList.map(f => f.question));
console.log("📌 Risultati trovati:", result.map(r => r.item.question));


  if (result.length > 0) {
    console.log("✅ Risposta scelta:", result[0].item.question, "->", result[0].item.answer);
    return result[0].item.answer;
  }

  console.warn("⚠️ Nessuna corrispondenza trovata per:", query);
  return "Mi dispiace, non ho trovato una risposta specifica alla tua domanda. Puoi provare a riformularla?";
};
