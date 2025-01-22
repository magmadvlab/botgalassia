const findBestResponse = (userInput) => {
  const processedInput = userInput.toLowerCase().trim();

  // Verifica preliminare per categorie specifiche
  const keywordCategoryMap = {
    wellness: wellnessFAQ_IT.keywords,
    transport: transportFAQ_IT.keywords,
    ski: skiFAQ_IT.keywords,
    // Aggiungi altre categorie se necessario
  };

  for (const [categoryKey, keywords] of Object.entries(keywordCategoryMap)) {
    if (keywords.some((keyword) => processedInput.includes(keyword))) {
      const categoryFAQ = ALL_FAQ_IT[categoryKey];
      const faqArray = Object.entries(categoryFAQ.questions).map(([questionKey, data]) => ({
        category: categoryFAQ.title,
        question: questionKey,
        answer: data.answer,
        tags: data.tags,
      }));

      // Usa Fuse.js per fare il matching solo su questa categoria
      const fuse = new Fuse(faqArray, {
        keys: ['question', 'tags'],
        threshold: 0.4,
      });

      const results = fuse.search(processedInput);

      if (results.length > 0) {
        const bestMatch = results[0].item;
        return {
          title: bestMatch.category,
          content: bestMatch.answer,
        };
      }
    }
  }

  // Matching generico come fallback
  const faqArray = Object.entries(ALL_FAQ_IT).flatMap(([categoryKey, category]) =>
    Object.entries(category.questions).map(([questionKey, data]) => ({
      category: category.title,
      question: questionKey,
      answer: data.answer,
      tags: data.tags,
    }))
  );

  const fuse = new Fuse(faqArray, {
    keys: ['question', 'tags'],
    threshold: 0.4,
  });

  const results = fuse.search(processedInput);

  if (results.length > 0) {
    const bestMatch = results[0].item;
    return {
      title: bestMatch.category,
      content: bestMatch.answer,
    };
  }

  return {
    title: 'Info',
    content: 'Mi dispiace, non ho capito. Potresti riformulare la domanda?',
  };
};
