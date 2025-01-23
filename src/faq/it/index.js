import { wellnessFAQ_IT } from './wellness_it';
import { checkinFAQ_IT } from './checkin_it';
import { checkoutFAQ_IT } from './checkout_it'; // Nuova importazione
import { diningFAQ_IT } from './dining_it';
import { skiFAQ_IT } from './ski_it';
import { transportFAQ_IT } from './transport_it';
import { petsFAQ_IT } from './pets_it';
import { activitiesFAQ_IT } from './activities_it';
import { emergencyFAQ_IT } from './emergency_it';
import { techServicesFAQ_IT } from './tech_services_it';
import { attractionsFAQ_IT } from './attractions_it';

export const ALL_FAQ_IT = {
  wellness: wellnessFAQ_IT,
  checkin: checkinFAQ_IT,
  checkout: checkoutFAQ_IT, // Aggiunto qui
  dining: diningFAQ_IT,
  ski: skiFAQ_IT,
  transport: transportFAQ_IT,
  pets: petsFAQ_IT,
  activities: activitiesFAQ_IT,
  emergency: emergencyFAQ_IT,
  techServices: techServicesFAQ_IT,
  attractions: attractionsFAQ_IT,
};

export const ALL_KEYWORDS_IT = [
  ...new Set([
    ...wellnessFAQ_IT.keywords,
    ...checkinFAQ_IT.keywords,
    ...checkoutFAQ_IT.keywords, // Aggiunto qui
    ...diningFAQ_IT.keywords,
    ...skiFAQ_IT.keywords,
    ...transportFAQ_IT.keywords,
    ...petsFAQ_IT.keywords,
    ...activitiesFAQ_IT.keywords,
    ...emergencyFAQ_IT.keywords,
    ...techServicesFAQ_IT.keywords,
    ...attractionsFAQ_IT.keywords,
  ]),
];
