/**
 * Skrypt do generowania 60 blogów na 60 dni do przodu
 *
 * Użycie:
 * node scripts/generate-60-blogs.js
 */

const fs = require('fs');
const path = require('path');

// Kategorie i ich częstotliwość
const categories = {
  poradniki: 20, // 20 blogów
  ceny: 8, // 8 blogów
  prawo: 8, // 8 blogów
  egzaminy: 12, // 12 blogów
  porady: 8, // 8 blogów
  aktualnosci: 2, // 2 blogi
  lokalne: 2, // 2 blogi
};

/**
 * Pobiera dostępne obrazy z galleryImages.ts (tylko horizontal dla blogów)
 * @returns {Object} Mapa kategorii -> tablice nazw plików (tylko horizontal!)
 */
function getAvailableImages() {
  const galleryPath = path.join(
    process.cwd(),
    'apps',
    'qursant',
    'src',
    'data',
    'galleryImages.ts'
  );

  if (!fs.existsSync(galleryPath)) {
    console.error('❌ Nie znaleziono pliku galleryImages.ts');
    console.log('💡 Uruchom: npm run gallery');
    process.exit(1);
  }

  // Odczytaj plik galleryImages.ts
  const fileContent = fs.readFileSync(galleryPath, 'utf-8');

  // Wyciągnij JSON z pliku (regex)
  const jsonMatch = fileContent.match(
    /export const galleryImages[^=]*=\s*(\[[\s\S]*?\]);/
  );

  if (!jsonMatch) {
    console.error('❌ Nie udało się sparsować galleryImages.ts');
    process.exit(1);
  }

  // Parse JSON (usuń trailing comma jeśli jest)
  const jsonString = jsonMatch[1].replace(/,(\s*[}\]])/g, '$1');
  let galleryData;
  try {
    galleryData = JSON.parse(jsonString);
  } catch (e) {
    console.error('❌ Błąd parsowania JSON:', e.message);
    process.exit(1);
  }

  // Grupuj po kategoriach, TYLKO horizontal (żeby się nie przycinały!)
  const availableImages = {};
  const categories = ['boss', 'cars', 'course', 'instructors', 'office'];

  categories.forEach((category) => {
    const horizontalImages = galleryData
      .filter(
        (img) => img.category === category && img.orientation === 'horizontal'
      )
      .map((img) => path.basename(img.src));

    availableImages[category] = horizontalImages;

    console.log(
      `📸 ${category}: ${horizontalImages.length} zdjęć (horizontal)`
    );
  });

  return availableImages;
}

// Przykładowe tytuły dla każdej kategorii
const titleTemplates = {
  poradniki: [
    'Jak zdać egzamin na prawo jazdy za pierwszym razem?',
    'Najczęstsze błędy na egzaminie praktycznym',
    'Parkowanie równoległe krok po kroku',
    'Jak opanować rondo? Poradnik dla kursantów',
    'Jazda w nocy - na co zwrócić uwagę?',
    'Pierwsza jazda po egzaminie - praktyczne wskazówki',
    'Jak przygotować się do jazdy w trudnych warunkach?',
    'Manewry na placu - kompletny przewodnik',
    'Jak radzić sobie ze stresem podczas nauki jazdy?',
    'Prawidłowe zajmowanie pasa ruchu',
  ],
  ceny: [
    'Ile kosztuje prawo jazdy w Bydgoszczy w 2025?',
    'Kurs podstawowy vs ekspresowy - który wybrać?',
    'Jak zaoszczędzić na kursie prawa jazdy?',
    'Dodatkowe koszty kursu - czego się spodziewać?',
    'Płatność w ratach - wszystko co musisz wiedzieć',
    'Porównanie cen szkół jazdy w Bydgoszczy',
    'Czy warto płacić więcej za kurs ekspresowy?',
    'Ukryte koszty kursu prawa jazdy',
  ],
  prawo: [
    'PKK - jak założyć profil kandydata na kierowcę?',
    'Jakie dokumenty potrzebne są do kursu prawa jazdy?',
    'Badania lekarskie do prawa jazdy - procedura',
    'Wymagania wieku dla kandydatów na kierowców',
    'Przepisy dotyczące nauki jazdy w Polsce',
    'Co to jest OSK i jakie ma wymagania?',
    'Prawo jazdy kategorii B - co obejmuje?',
    'Zmiany w przepisach ruchu drogowego 2025',
  ],
  egzaminy: [
    'Egzamin teoretyczny - jak wygląda w 2025?',
    'Pytania na egzaminie teoretycznym - jak się przygotować?',
    'Egzamin praktyczny w WORD Bydgoszcz',
    'Trasy egzaminacyjne w Bydgoszczy',
    'Co zrobić po oblaniu egzaminu?',
    'Jak przygotować się do egzaminu wewnętrznego?',
    'Najczęstsze pytania na egzaminie teoretycznym',
    'Błędy dyskwalifikujące na egzaminie praktycznym',
    'Jak wygląda dzień egzaminu praktycznego?',
    'Statystyki zdawalności w Bydgoszczy',
    'Co sprawdza egzaminator podczas jazdy?',
    'Przygotowanie techniczne pojazdu na egzamin',
  ],
  porady: [
    'Bezpieczeństwo na drodze - 10 złotych zasad',
    'Jak wybrać dobrą szkołę jazdy?',
    'Nauka jazdy zimą - co warto wiedzieć?',
    'Jazda defensywna - podstawy',
    'Pierwsza jazda z instruktorem - czego się spodziewać?',
    'Jak wybrać instruktora nauki jazdy?',
    'E-learning vs zajęcia stacjonarne',
    'Ile jazd potrzeba do zdania egzaminu?',
  ],
  aktualnosci: [
    'Nowe samochody w flocie Qursant - Opel Corsa 2024',
    'Osiągnięcia naszych kursantów w 2024 roku',
  ],
  lokalne: [
    'Nauka jazdy w Bydgoszczy - przewodnik po dzielnicach',
    'Najlepsze miejsca do ćwiczenia parkowania w Bydgoszczy',
  ],
};

// Generuj blogi
function generateBlogs() {
  const blogs = [];
  // Zacznij od 4 listopada 2025
  const startDate = new Date('2025-11-04');
  let dayOffset = 0;

  // Dynamicznie pobierz dostępne obrazy z folderów
  console.log('\n🔍 Skanuję foldery z obrazami...\n');
  const availableImages = getAvailableImages();
  console.log(''); // Pusta linia dla czytelności

  // Sprawdź czy są jakieś obrazy
  const totalImages = Object.values(availableImages).reduce(
    (sum, imgs) => sum + imgs.length,
    0
  );
  if (totalImages === 0) {
    console.error('❌ Błąd: Nie znaleziono żadnych zdjęć!');
    process.exit(1);
  }

  // Dla każdej kategorii
  Object.entries(categories).forEach(([category, count]) => {
    const titles = titleTemplates[category];

    for (let i = 0; i < count; i++) {
      const publishDate = new Date(startDate);
      publishDate.setDate(startDate.getDate() + dayOffset);

      const title = titles[i % titles.length];
      const slug = generateSlug(title);

      // Losujemy folder z obrazami (tylko te które mają zdjęcia)
      const imageFoldersWithImages = Object.keys(availableImages).filter(
        (folder) => availableImages[folder].length > 0
      );
      const randomCategory =
        imageFoldersWithImages[
          Math.floor(Math.random() * imageFoldersWithImages.length)
        ];

      // Losujemy ISTNIEJĄCY obraz z wybranego folderu
      const imagesInCategory = availableImages[randomCategory];
      const randomImage =
        imagesInCategory[Math.floor(Math.random() * imagesInCategory.length)];

      blogs.push({
        id: `post-${Date.now()}-${dayOffset}`,
        slug: slug,
        title: title,
        excerpt: `${title.substring(
          0,
          100
        )}... Dowiedz się więcej w tym artykule!`,
        content: generateContent(title, category),
        publishDate: publishDate.toISOString().split('T')[0],
        author: {
          name: 'Robert Langer',
          role: 'Właściciel / Instruktor',
        },
        category: category,
        tags: generateTags(category),
        image: {
          url: `/images/${randomCategory}/${randomImage}`,
          alt: title,
        },
        seo: {
          metaTitle: `${title} - Szkoła Jazdy Qursant Bydgoszcz`,
          metaDescription: `${title} ➤ Porady i informacje od Szkoły Jazdy Qursant w Bydgoszczy ✓ Sprawdź!`,
          keywords: generateKeywords(title, category),
          canonicalUrl: `https://www.qursant.com.pl/blog/${slug}`,
        },
        links: {
          internal: ['/rezerwacja', '/cennik', '/kursy'],
          external: [],
        },
        status: 'scheduled',
        featured: i < 2, // Pierwsze 2 w kategorii wyróżnione
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      dayOffset++;
    }
  });

  // Sortuj po dacie publikacji
  blogs.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));

  return blogs;
}

// Helper: Generuj slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź|ż/g, 'z')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper: Generuj treść
function generateContent(title, category) {
  return `
<div class="blog-content">
  <h2>Wprowadzenie</h2>
  <p>
    Witaj w kolejnym artykule na blogu Szkoły Jazdy Qursant w Bydgoszczy! 
    Dzisiaj opowiemy Ci o: <strong>${title}</strong>
  </p>

  <h2>Kluczowe informacje</h2>
  <p>
    Jako jedna z najlepszych szkół jazdy w Bydgoszczy, Qursant ma wieloletnie 
    doświadczenie w kształceniu przyszłych kierowców. W tym artykule znajdziesz 
    praktyczne wskazówki i informacje, które pomogą Ci w nauce jazdy.
  </p>

  <h3>Dlaczego to ważne?</h3>
  <ul>
    <li>Zwiększysz swoje szanse na zdanie egzaminu</li>
    <li>Nauczysz się bezpiecznej jazdy</li>
    <li>Zaoszczędzisz czas i pieniądze</li>
  </ul>

  <h2>Praktyczne wskazówki</h2>
  <p>
    W Szkole Jazdy Qursant stawiamy na profesjonalizm i indywidualne podejście 
    do każdego kursanta. Nasi doświadczeni instruktorzy pomogą Ci przygotować 
    się do egzaminu państwowego w WORD Bydgoszcz.
  </p>

  <h3>Co warto wiedzieć?</h3>
  <p>
    Nauka jazdy w Bydgoszczy z Qursant to gwarancja wysokiej jakości szkoleń. 
    Oferujemy nowoczesne samochody Opel Corsa z 2024 roku oraz elastyczne 
    terminy zajęć.
  </p>

  <h2>Podsumowanie</h2>
  <p>
    Mamy nadzieję, że ten artykuł był pomocny! Jeśli masz pytania, skontaktuj 
    się z nami telefonicznie pod numerem <strong>600 354 556</strong> lub 
    odwiedź naszą siedzibę przy ul. Ujejskiego 46a w Bydgoszczy.
  </p>

  <div class="cta-box">
    <h3>Gotowy na rozpoczęcie kursu?</h3>
    <p>Zapisz się już dziś i dołącz do grona zadowolonych kursantów!</p>
    <a href="/rezerwacja" class="btn-primary">Zarezerwuj miejsce</a>
  </div>
</div>

<style>
  .blog-content h2 { margin-top: 2rem; color: #fff; }
  .blog-content h3 { margin-top: 1.5rem; color: #93c5fd; }
  .blog-content p { line-height: 1.8; color: #bfdbfe; }
  .blog-content ul { list-style: disc; padding-left: 2rem; }
  .blog-content li { margin: 0.5rem 0; color: #bfdbfe; }
  .cta-box { 
    background: linear-gradient(135deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2));
    padding: 2rem; 
    border-radius: 1rem; 
    margin-top: 2rem;
    border: 1px solid rgba(59,130,246,0.3);
  }
  .cta-box h3 { margin-top: 0; color: #fff; }
  .btn-primary {
    display: inline-block;
    padding: 1rem 2rem;
    background: linear-gradient(to right, #fbbf24, #f97316);
    color: white;
    font-weight: bold;
    border-radius: 9999px;
    text-decoration: none;
    margin-top: 1rem;
  }
</style>
`;
}

// Helper: Generuj tagi
function generateTags(category) {
  const commonTags = ['szkoła jazdy', 'bydgoszcz', 'prawo jazdy', 'qursant'];
  const categoryTags = {
    poradniki: ['poradnik', 'nauka jazdy', 'jak zdać egzamin'],
    ceny: ['ceny', 'cennik', 'koszty', 'ile kosztuje'],
    prawo: ['pkk', 'przepisy', 'dokumenty', 'wymagania'],
    egzaminy: ['egzamin', 'word bydgoszcz', 'zdawalność'],
    porady: ['porady', 'wskazówki', 'tips'],
    aktualnosci: ['aktualności', 'nowości', 'wydarzenia'],
    lokalne: ['bydgoszcz', 'lokalne', 'dzielnice'],
  };

  return [...commonTags, ...categoryTags[category]];
}

// Helper: Generuj keywords
function generateKeywords(title, category) {
  const titleWords = title.toLowerCase().split(' ').slice(0, 5);
  return [
    ...titleWords,
    'szkoła jazdy bydgoszcz',
    'prawo jazdy',
    `${category} bydgoszcz`,
  ];
}

// Main
function main() {
  console.log('🚀 Generowanie 60 blogów...\n');

  const blogs = generateBlogs();

  // Zapisz do pliku w apps/qursant/data
  // Generator uruchamia się z roota, więc musimy wskazać apps/qursant/data
  const dataDir = path.join(process.cwd(), 'apps', 'qursant', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const filePath = path.join(dataDir, 'blog-posts.json');
  fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));

  console.log(`✅ Dodano ${blogs.length} blogów!`);
  console.log(`📅 Od dnia: ${blogs[0].publishDate}`);
  console.log(`📅 Do dnia: ${blogs[blogs.length - 1].publishDate}`);
  console.log(`📁 Zapisano w: ${filePath}\n`);

  // Statystyki
  console.log('📊 Statystyki:');
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} blogów`);
  });

  console.log('\n🎉 Gotowe! Uruchom serwer i sprawdź /blog');
}

main();
