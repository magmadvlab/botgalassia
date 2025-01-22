const findBestResponse = (userInput) => {
  const processedInput = userInput.toLowerCase().trim();
  
  // Aggiungi sinonimi comuni per la ricerca
  const synonyms = {
    'come arrivo': ['dove si trova', 'dove è', 'come raggiungere'],
    'piscina': ['vasca', 'nuoto', 'bagno']
  };
  
  // Espandi la query con i sinonimi
  let expandedQuery = processedInput;
  Object.entries(synonyms).forEach(([word, alternatives]) => {
    alternatives.forEach(alt => {
      if (processedInput.includes(alt)) {
        expandedQuery = expandedQuery.replace(alt, word);
      }
    });
  });

  const faqArray = Object.entries(ALL_FAQ_IT).flatMap(([categoryKey, category]) =>
    Object.entries(category.questions).map(([questionKey, data]) => ({
      category: category.title,
      question: questionKey,
      answer: data.answer,
      tags: [...(data.tags || []), ...(category.keywords || [])]
    }))
  );

  const fuse = new Fuse(faqArray, {
    keys: [
      { name: 'tags', weight: 0.4 },
      { name: 'question', weight: 0.6 }
    ],
    threshold: 0.3,
    minMatchCharLength: 2,
    ignoreLocation: true
  });

  const results = fuse.search(expandedQuery);
  
  if (results.length > 0) {
    return results.slice(0, 1).map(result => ({
      title: result.item.category,
      content: result.item.answer
    }));
  }

  return [{
    title: 'Info',
    content: 'Mi dispiace, non ho capito. Potresti riformulare la domanda?'
  }];
};
