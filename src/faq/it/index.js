import { wellnessFAQ_IT } from './wellness_it';
import { checkinFAQ_IT } from './checkin_it';
import { checkoutFAQ_IT } from './checkout_it';
import { diningFAQ_IT } from './dining_it';
import { skiFAQ_IT } from './ski_it';
import { transportFAQ_IT } from './transport_it';
import { petsFAQ_IT } from './pets_it';
import { emergencyFAQ_IT } from './emergency_it';
import { techServicesFAQ_IT } from './tech_services_it';
import { activitiesAndAttractionsFAQ_IT } from './activities_and_attractions_faq_it';

export const ALL_FAQ_IT = {
  wellness: wellnessFAQ_IT,
  checkin: checkinFAQ_IT,
  checkout: checkoutFAQ_IT,
  dining: diningFAQ_IT,
  ski: skiFAQ_IT,
  transport: transportFAQ_IT,
  pets: petsFAQ_IT,
  emergency: emergencyFAQ_IT,
  techServices: techServicesFAQ_IT,
  activitiesAndAttractions: activitiesAndAttractionsFAQ_IT
};

export const ALL_KEYWORDS_IT = [
  ...new Set([
    ...wellnessFAQ_IT.keywords,
    ...checkinFAQ_IT.keywords,
    ...checkoutFAQ_IT.keywords,
    ...diningFAQ_IT.keywords,
    ...skiFAQ_IT.keywords,
    ...transportFAQ_IT.keywords,
    ...petsFAQ_IT.keywords,
    ...emergencyFAQ_IT.keywords,
    ...techServicesFAQ_IT.keywords,
    ...activitiesAndAttractionsFAQ_IT.keywords
  ]),
];
