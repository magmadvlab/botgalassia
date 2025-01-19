import { wellnessFAQ_IT } from './wellness_it';
import { checkinFAQ_IT } from './checkin_it';
import { diningFAQ_IT } from './dining_it';
import { skiFAQ_IT } from './ski_it';
import { transportFAQ_IT } from './transport_it';
import { entertainmentFAQ_IT } from './entertainment_it';
import { petsFAQ_IT } from './pets_it';
import { activitiesFAQ_IT } from './activities_it';
import { emergencyFAQ_IT } from './emergency_it';

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
  emergency: emergencyFAQ_IT
};

// Raccoglie tutte le keywords in un unico oggetto
export const ALL_KEYWORDS_IT = {
  ...wellnessFAQ_IT.keywords,
  ...checkinFAQ_IT.keywords,
  ...diningFAQ_IT.keywords,
  ...skiFAQ_IT.keywords,
  ...transportFAQ_IT.keywords,
  ...entertainmentFAQ_IT.keywords,
  ...petsFAQ_IT.keywords,
  ...activitiesFAQ_IT.keywords,
  ...emergencyFAQ_IT.keywords
};

// Esporta anche le singole FAQ per uso individuale
export {
  wellnessFAQ_IT,
  checkinFAQ_IT,
  diningFAQ_IT,
  skiFAQ_IT,
  transportFAQ_IT,
  entertainmentFAQ_IT,
  petsFAQ_IT,
  activitiesFAQ_IT,
  emergencyFAQ_IT
};
