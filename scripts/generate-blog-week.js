#!/usr/bin/env node
/**
 * ===================================================================
 * GENERATOR TYGODNI BLOGÓW - SZABLON DLA AI
 * ===================================================================
 *
 * Ten skrypt tworzy pusty szablon week-XX.json.
 * AI wypełnia tylko content (tekst) - bez HTML!
 *
 * Użycie:
 *   node scripts/generate-blog-week.js 1
 *   (tworzy week-01.json z pustym szablonem)
 *
 * ===================================================================
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Pobierz numer tygodnia z argumentów
const weekNumber = parseInt(process.argv[2]);

if (!weekNumber || isNaN(weekNumber)) {
  console.error('❌ Błąd: Podaj numer tygodnia jako argument');
  console.log('📝 Użycie: node scripts/generate-blog-week.js <numer>');
  console.log('📝 Przykład: node scripts/generate-blog-week.js 1');
  process.exit(1);
}

// Data startowa (możesz zmienić)
const START_DATE = new Date('2025-11-05');

// Oblicz daty dla tego tygodnia
let weekStartDate;

if (weekNumber <= 8) {
  // Stary system (weeks 1-8): posty co 1 dzień, weeks co 7 dni
  weekStartDate = new Date(START_DATE);
  weekStartDate.setDate(START_DATE.getDate() + (weekNumber - 1) * 7);
} else {
  // Nowy system (weeks 9+): posty co 5 dni, weeks co 35 dni
  const NEW_SYSTEM_START = new Date('2025-12-31'); // Początek week 9
  weekStartDate = new Date(NEW_SYSTEM_START);
  weekStartDate.setDate(NEW_SYSTEM_START.getDate() + (weekNumber - 9) * 35);
}

// Data końcowa = data ostatniego posta
const weekEndDate = new Date(weekStartDate);
if (weekNumber <= 8) {
  // Weeks 1-8: 7 postów co 1 dzień = ostatni post po 6 dniach
  weekEndDate.setDate(weekStartDate.getDate() + 6);
} else {
  // Weeks 9+: 7 postów co 5 dni = ostatni post po 30 dniach
  weekEndDate.setDate(weekStartDate.getDate() + 6 * 5);
}

// Format YYYY-MM-DD
const formatDate = (date) => date.toISOString().split('T')[0];

// Dostępne kategorie
const categories = [
  'poradniki',
  'ceny',
  'prawo',
  'egzaminy',
  'porady',
  'aktualnosci',
  'lokalne',
];

/**
 * Pobiera wszystkie poziome obrazy WebP z galerii
 */
async function getHorizontalImages() {
  const imagesDir = path.join(
    process.cwd(),
    'apps',
    'qursant',
    'public',
    'images'
  );
  const horizontalImages = [];

  const categoriesDir = ['boss', 'instructors', 'office', 'cars', 'course'];

  for (const category of categoriesDir) {
    const categoryPath = path.join(imagesDir, category);
    if (!fs.existsSync(categoryPath)) continue;

    const files = fs
      .readdirSync(categoryPath)
      .filter(
        (file) => file.endsWith('.webp') && file.match(/^photo-\d+\.webp$/)
      );

    for (const file of files) {
      try {
        const filePath = path.join(categoryPath, file);
        const metadata = await sharp(filePath).metadata();

        // Tylko poziome obrazy (szersze niż wysokie)
        if (metadata.width > metadata.height) {
          horizontalImages.push(`${category}/${file}`);
        }
      } catch (error) {
        // Pomijamy błędne pliki
        continue;
      }
    }
  }

  return horizontalImages;
}

/**
 * Losuje unikalne obrazy dla postów
 */
function getRandomImages(allImages, count) {
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Główna funkcja generująca tydzień blogów
 */
async function generateWeek() {
  console.log('🔍 Szukam poziomych obrazów WebP...');
  const allImages = await getHorizontalImages();
  console.log(`✅ Znaleziono ${allImages.length} poziomych obrazów WebP`);

  if (allImages.length < 7) {
    console.error('❌ Za mało poziomych obrazów! Potrzeba minimum 7.');
    process.exit(1);
  }

  // Losuj 7 unikalnych obrazów dla tego tygodnia
  const weekImages = getRandomImages(allImages, 7);
  console.log('🎲 Wylosowano 7 unikalnych obrazów dla postów');

  // Generuj 7 postów (szablon)
  const posts = [];
  const postInterval = weekNumber <= 8 ? 1 : 5; // Weeks 1-8: co 1 dzień, Weeks 9+: co 5 dni

  for (let i = 0; i < 7; i++) {
    const postDate = new Date(weekStartDate);
    postDate.setDate(weekStartDate.getDate() + i * postInterval);
    const postDateStr = formatDate(postDate);
    const postDateTimeStr = `${postDateStr}T12:00:00`; // Publikacja o 12:00

    const post = {
      id: `${postDateStr}-SLUG`, // AI zmieni na: 2025-11-04-jak-zdac-egzamin
      slug: 'SLUG', // AI zmieni na: jak-zdac-egzamin-na-prawo-jazdy
      title: 'TYTUŁ BLOGA', // AI wypełni
      excerpt: 'Krótki opis bloga (150-200 znaków)...', // AI wypełni
      publishDate: postDateTimeStr, // Publikacja o 12:00 w południe
      author: 'Robert Langer',
      category: categories[i % categories.length], // Rotacja kategorii
      tags: ['szkoła jazdy', 'bydgoszcz', 'prawo jazdy'], // AI doda więcej
      image: weekImages[i], // Losowy, unikalny obraz!

      // AI WYPEŁNIA TYLKO TO:
      sections: [
        {
          heading: 'Wprowadzenie',
          paragraphs: ['Tekst wprowadzający...', 'Kolejny akapit...'],
        },
        {
          heading: 'Główna część',
          paragraphs: ['Tekst...'],
          list: ['Punkt 1', 'Punkt 2', 'Punkt 3'],
        },
        {
          heading: 'Podsumowanie',
          paragraphs: ['Tekst podsumowujący...'],
        },
      ],

      tips: [
        'Wskazówka 1',
        'Wskazówka 2',
        'Wskazówka 3',
        'Wskazówka 4',
        'Wskazówka 5',
      ],

      faq: [
        {
          q: 'Pytanie 1?',
          a: 'Odpowiedź 1...',
        },
        {
          q: 'Pytanie 2?',
          a: 'Odpowiedź 2...',
        },
      ],

      seo: {
        metaTitle: 'TYTUŁ BLOGA - Szkoła Jazdy Qursant Bydgoszcz',
        metaDescription:
          'Krótki opis bloga do meta description (max 160 znaków)...',
        keywords: ['keyword1', 'keyword2', 'keyword3'],
      },
    };

    posts.push(post);
  }

  // Struktura week-XX.json
  const weekData = {
    week: weekNumber,
    startDate: formatDate(weekStartDate),
    endDate: formatDate(weekEndDate),
    posts: posts,
  };

  // Zapisz plik
  const outputDir = path.join(
    process.cwd(),
    'apps',
    'qursant',
    'data',
    'blog-content'
  );
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `week-${weekNumber}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(weekData, null, 2));

  console.log('');
  console.log(`✅ Utworzono szablon: ${outputPath}`);
  console.log(
    `📅 Tydzień ${weekNumber}: ${formatDate(weekStartDate)} - ${formatDate(
      weekEndDate
    )}`
  );
  const postIntervalDesc = weekNumber <= 8 ? 'co 1 dzień' : 'co 5 dni';
  console.log(`📝 Zawiera 7 postów (${postIntervalDesc})`);
  console.log('🖼️  Losowe, unikalne obrazy WebP dla każdego posta');
  console.log('');
  console.log('📸 Wybrane obrazy:');
  weekImages.forEach((img, i) => {
    console.log(`   ${i + 1}. ${img}`);
  });
  console.log('');
  console.log('🤖 INSTRUKCJA DLA AI:');
  console.log('1. Otwórz plik week-' + weekNumber + '.json');
  console.log('2. Wypełnij dla każdego posta:');
  console.log('   - title (tytuł)');
  console.log('   - slug (url-friendly)');
  console.log('   - excerpt (krótki opis)');
  console.log('   - sections (treść artykułu - sekcje z tekstem/listami)');
  console.log('   - tips (wskazówki)');
  console.log('   - faq (pytania i odpowiedzi)');
  console.log('   - tags (dodaj więcej tagów SEO)');
  console.log('   - seo (metaTitle, metaDescription, keywords)');
  console.log('');
  console.log('⚠️  TYLKO TEKST - BEZ HTML, BEZ CSS!');
  console.log('');
}

// Uruchom generator
generateWeek().catch((error) => {
  console.error('💥 Błąd:', error.message);
  process.exit(1);
});
