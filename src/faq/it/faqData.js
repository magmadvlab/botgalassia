// Importazione dei dati FAQ dall'italiano
import { activities_it } from './activities_it';
import { checkin_it } from './checkin_it';
import { checkout_it } from './checkout_it';
import { dining_it } from './dining_it';
import { emergency_it } from './emergency_it';
import { pets_it } from './pets_it';
import { ski_it } from './ski_it';
import { tech_services_it } from './tech_services_it';
import { transport_it } from './transport_it';
import { wellness_it } from './wellness_it';

// Configurazione dei dati FAQ come oggetto per categorie
const faqData = {
    activities: activities_it,
    checkin: checkin_it,
    checkout: checkout_it,
    dining: dining_it,
    emergency: emergency_it,
    pets: pets_it,
    ski: ski_it,
    techServices: tech_services_it,
    transport: transport_it,
    wellness: wellness_it
};

// 🔹 Converte `faqData` in un array compatibile con Fuse.js
const faqList = Object.entries(faqData).flatMap(([category, questions]) =>
  Object.entries(questions.questions).map(([question, data]) => ({
    question,   // La domanda originale
    answer: data.answer,  // La risposta corrispondente
    tags: data.tags, // Parole chiave per la ricerca fuzzy
    category    // Assegna la categoria (es. "dining", "checkin", ecc.)
  }))
);

export default faqList;
