const fuse = new Fuse(faqList, {
  keys: [
    { name: 'tags', weight: 3 },     // Dare più peso ai tags
    { name: 'category', weight: 2 },  // Poi alla categoria
    { name: 'question', weight: 1 }   // E infine alla domanda
  ],
  threshold: 0.2,                     // Rendere il matching più stringente
  includeScore: true,                 // Include i punteggi per filtraggio
  ignoreLocation: true,               // Ignora la posizione delle parole
  useExtendedSearch: true            // Abilita la ricerca estesa
});

export const getFAQResponse = async (query) => {
  console.log("🔍 Domanda ricevuta:", query);
  
  const processedInput = expandInput(query.toLowerCase().trim());
  console.log("🔎 Input processato:", processedInput);
  
  // Identifica la categoria dalla domanda
  const categoryKeywords = {
    dining: ['ristorante', 'mangiare', 'pranzo', 'cena', 'colazione', 'bar'],
    // ... altre categorie
  };

  let detectedCategory = null;
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => processedInput.includes(keyword))) {
      detectedCategory = category;
      break;
    }
  }

  const results = fuse.search(processedInput);
  console.log("📌 Risultati non filtrati:", results.map(r => ({
    question: r.item.question,
    score: r.score,
    category: r.item.category
  })));

  // Filtra i risultati per categoria se rilevata
  let filteredResults = results;
  if (detectedCategory) {
    filteredResults = results.filter(r => 
      r.item.category === detectedCategory && r.score < 0.3
    );
  }

  if (filteredResults.length > 0) {
    const bestMatch = filteredResults[0];
    console.log("✅ Risposta scelta:", bestMatch.item.question, "->", bestMatch.item.answer);
    return bestMatch.item.answer;
  }

  console.warn("⚠️ Nessuna corrispondenza trovata per:", query);
  return "Mi dispiace, non ho trovato una risposta specifica alla tua domanda. Puoi provare a riformularla?";
};
