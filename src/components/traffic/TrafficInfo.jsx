import React, { useState, useEffect } from 'react';
import { fetchTrafficUpdates } from '../../services/trafficService';

const TrafficInfo = ({ addMessageToChat }) => {
  useEffect(() => {
    const fetchTraffic = async () => {
      try {
        const updates = await fetchTrafficUpdates();
        if (updates.length === 0) {
          addMessageToChat(prevMessages => [...prevMessages, { type: 'bot', content: "🚦 Nessun aggiornamento sulla viabilità al momento." }]);
          return;
        }

        const formattedUpdates = updates.map(update =>
          `🚧 **${update.title}**\n📅 ${update.date.toLocaleDateString()}\n🛣️ Strade interessate: ${update.affectedRoads.join(', ')}`
        ).join("\n\n");

        addMessageToChat(prevMessages => [...prevMessages, { type: 'bot', content: formattedUpdates }]);
      } catch (error) {
        console.error('Errore viabilità:', error);
        addMessageToChat(prevMessages => [...prevMessages, { type: 'bot', content: "⚠️ Errore nel recupero della viabilità. Consulta la fonte ufficiale: [Provincia Cuneo](https://www.provincia.cuneo.it/viabilita)" }]);
      }
    };

    fetchTraffic();
    // Aggiorna ogni 15 minuti
    const interval = setInterval(fetchTraffic, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [addMessageToChat]);

  return null; // 📌 Non mostra nulla, i messaggi vengono gestiti nella chat
};

export default TrafficInfo;
