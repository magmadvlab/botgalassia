import React, { useState, useEffect } from 'react';
import { fetchTrafficUpdates } from '../../services/trafficService';

const TrafficInfo = ({ addMessageToChat }) => {
  useEffect(() => {
    const fetchTraffic = async () => {
      try {
        const updates = await fetchTrafficUpdates();
        const formattedMessages = updates.map(update => `🚧 ${update.title}: ${update.description}`);
        
        formattedMessages.forEach(message => {
          addMessageToChat(prevMessages => [...prevMessages, { type: 'bot', content: message }]);
        });
      } catch (error) {
        console.error('Errore traffico:', error);
        addMessageToChat(prevMessages => [...prevMessages, { type: 'bot', content: "⚠️ Errore nel recupero della viabilità. Consulta la fonte ufficiale: [Provincia Cuneo](https://www.provincia.cuneo.it/viabilita)" }]);
      }
    };

    fetchTraffic();
  }, [addMessageToChat]);

  return null;
};

export default TrafficInfo;
