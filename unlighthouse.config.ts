export default {
  site: 'http://localhost:3000',

  // Skanuj wszystkie strony automatycznie
  scanner: {
    sitemap: true, // Użyj sitemap.xml
    maxRoutes: 50, // Max stron do skanowania
    throttle: true, // Throttle dla lepszej wydajności
  },

  // Ustawienia Lighthouse
  lighthouseOptions: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  },

  // Opcje Chrome
  chrome: {
    useSystem: true, // Użyj systemowego Chrome
  },

  // Cache wyników
  cache: false, // Zawsze świeże wyniki

  // Generuj raport
  outputPath: '.unlighthouse',

  // Debug
  debug: false,
};
