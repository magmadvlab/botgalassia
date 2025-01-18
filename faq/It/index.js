import { wellnessFAQ_IT } from './wellness_it';
// import { checkinFAQ_IT } from './checkin_it';
// import { diningFAQ_IT } from './dining_it';
// ... altre importazioni

export const FAQ_IT = {
  wellness: wellnessFAQ_IT,
  // checkin: checkinFAQ_IT,
  // dining: diningFAQ_IT,
  // ... altri moduli
};

// Esporta anche tutte le keywords insieme
export const KEYWORDS_IT = {
  ...wellnessFAQ_IT.keywords,
  // ...checkinFAQ_IT.keywords,
  // ...diningFAQ_IT.keywords,
  // ... altre keywords
};
