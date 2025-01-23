const findBestResponse = (userInput) => {
  const processedInput = userInput.toLowerCase().trim();
  const synonyms = {
    'come arrivo': ['dove si trova', 'dove è', 'come raggiungere', 'come arrivare', 'dove trovo'],
    'piscina': ['vasca', 'nuoto', 'bagno', 'wellness', 'spa', 'idromassaggio'],
    'check-in': ['arrivo', 'checkin', 'inizio soggiorno', 'entrata'],
    'check-out': ['partenza', 'checkout', 'fine soggiorno', 'uscita'],
  };

  // Espandi la query con i sinonimi
  let expandedQuery = processedInput;
  Object.entries(synonyms).forEach(([word, alternatives]) => {
    alternatives.forEach((alt) => {
      if (processedInput.includes(alt)) {
        expandedQuery = expandedQuery.replace(alt, word);
      }
    });
  });

  console.log('Input utente:', userInput);
  console.log('Query espansa con sinonimi:', expandedQuery);

  const faqArray = Object.entries(ALL_FAQ_IT).flatMap(([categoryKey, category]) =>
    Object.entries(category.questions).map(([questionKey, data]) => ({
      category: category.title,
      question: questionKey,
      answer: data.answer,
      tags: [...(data.tags || []), ...(category.keywords || [])],
      originalCategoryKey: categoryKey, // Per identificare la categoria originale
    }))
  );

  const fuse = new Fuse(faqArray, {
    keys: [
      { name: 'tags', weight: 0.7 },
      { name: 'question', weight: 0.3 },
    ],
    threshold: 0.2,
    minMatchCharLength: 2,
    ignoreLocation: true,
  });

  const results = fuse.search(expandedQuery);

  console.log('Risultati Fuse.js:', results);

  // Log per verificare i risultati per check-in e check-out
  const checkInResults = results.filter((result) => result.item.originalCategoryKey === 'checkin');
  const checkOutResults = results.filter((result) => result.item.originalCategoryKey === 'checkout');

  console.log('Risultati Check-in:', checkInResults);
  console.log('Risultati Check-out:', checkOutResults);

  // Filtra i risultati per categoria se è specificata nell'input
  if (results.length > 0) {
    if (processedInput.includes('check-in')) {
      if (checkInResults.length > 0) {
        return [
          {
            title: checkInResults[0].item.category,
            content: checkInResults[0].item.answer,
          },
        ];
      }
    } else if (processedInput.includes('check-out')) {
      if (checkOutResults.length > 0) {
        return [
          {
            title: checkOutResults[0].item.category,
            content: checkOutResults[0].item.answer,
          },
        ];
      }
    }

    // Restituisce il miglior risultato generico
    return results.slice(0, 1).map((result) => ({
      title: result.item.category,
      content: result.item.answer,
    }));
  }

  // Log domande senza risposta
  fetch('/log-missing-question', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: userInput,
      timestamp: new Date().toISOString(),
    }),
  });

  return [
    {
      title: 'Info',
      content: 'Mi dispiace, non ho capito. Potresti riformulare la domanda?',
    },
  ];
};
