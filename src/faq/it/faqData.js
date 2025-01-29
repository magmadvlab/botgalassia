// Importa i dati FAQ in italiano
import { activitiesFAQ_IT } from './activities_it';
import { checkinFAQ_IT } from './checkin_it';
import { checkoutFAQ_IT } from './checkout_it';
import { diningFAQ_IT } from './dining_it';
import { emergencyFAQ_IT } from './emergency_it';
import { petsFAQ_IT } from './pets_it';
import { skiFAQ_IT } from './ski_it';
import { techServicesFAQ_IT } from './tech_services_it';
import { transportFAQ_IT } from './transport_it';
import { wellnessFAQ_IT } from './wellness_it';

// Oggetto che contiene tutti i dati FAQ
const faqData = {
  activities: activitiesFAQ_IT,
  checkin: checkinFAQ_IT,
  checkout: checkoutFAQ_IT,
  dining: diningFAQ_IT,
  emergency: emergencyFAQ_IT,
  pets: petsFAQ_IT,
  ski: skiFAQ_IT,
  techServices: techServicesFAQ_IT,
  transport: transportFAQ_IT,
  wellness: wellnessFAQ_IT,
};

// Debug log per verificare il contenuto
if (process.env.NODE_ENV === 'development') {
  console.log('FAQ Data:', faqData);
}

// Esporta l'oggetto faqData come default
export default faqData;
