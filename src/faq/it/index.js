import { wellnessFAQ_IT } from './wellness_it';
import { checkinFAQ_IT } from './checkin_it';
import { diningFAQ_IT } from './dining_it';
import { skiFAQ_IT } from './ski_it';
import { transportFAQ_IT } from './transport_it';
import { entertainmentFAQ_IT } from './entertainment_it';
import { petsFAQ_IT } from './pets_it';
import { activitiesFAQ_IT } from './activities_it';
import { emergencyFAQ_IT } from './emergency_it';
import { techServicesFAQ_IT } from './tech_services_it';
import { attractionsFAQ_IT } from './attractions_it';

// Esporta tutte le FAQ in un unico oggetto
export const ALL_FAQ_IT = {
  wellness: wellnessFAQ_IT,
  checkin: checkinFAQ_IT,
  dining: diningFAQ_IT,
  ski: skiFAQ_IT,
  transport: transportFAQ_IT,
  entertainment: entertainmentFAQ_IT,
  pets: petsFAQ_IT,
  activities: activitiesFAQ_IT,
  emergency: emergencyFAQ_IT,
  techServices: techServicesFAQ_IT,
  attractions: attractionsFAQ_IT
};

// Raccogli tutte le keywords da tutti i file
export const ALL_KEYWORDS_IT = {
  ...wellnessFAQ_IT.keywords,
  ...checkinFAQ_IT.keywords,
  ...diningFAQ_IT.keywords,
  ...skiFAQ_IT.keywords,
  ...transportFAQ_IT.keywords,
  ...entertainmentFAQ_IT.keywords,
  ...petsFAQ_IT.keywords,
  ...activitiesFAQ_IT.keywords,
  ...emergencyFAQ_IT.keywords,
  ...techServicesFAQ_IT.keywords,
  ...attractionsFAQ_IT.keywords
};
