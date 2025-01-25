import { activities_it } from './it/activities_it';
import { checkinFAQ_IT as checkin_IT } from './it/checkin_it';
import { checkoutFAQ_IT as checkout_IT } from './it/checkout_it';
import { diningFAQ_IT as dining_IT } from './it/dining_it';
import { emergencyFAQ_IT as emergency_IT } from './it/emergency_it';
import { petsFAQ_IT as pets_IT } from './it/pets_it';
import { skiFAQ_IT as ski_IT } from './it/ski_it';
import { techServicesFAQ_IT as techServices_IT } from './it/tech_services_it';
import { transportFAQ_IT as transport_IT } from './it/transport_it';
import { wellnessFAQ_IT as wellness_IT } from './it/wellness_it';

const faqData = {
 activities: activities_it, // Cambiato il nome della chiave
 checkin: checkin_IT,
 checkout: checkout_IT,
 dining: dining_IT,
 emergency: emergency_IT,
 pets: pets_IT,
 ski: ski_IT,
 techServices: techServices_IT,
 transport: transport_IT,
 wellness: wellness_IT
};

export default faqData;
