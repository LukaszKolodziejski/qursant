# 📝 System Blogów - Kompletna Instrukcja

## 🎯 Filozofia

**ODDZIELENIE TREŚCI OD KODU**

- **Treść** = pliki `.js` w `/scripts/blog-content/` (tylko merytoryka!)
- **Mechanika** = generator w `/scripts/` (HTML, styling, daty)

**Korzyści:**

- ✅ Łatwe dodawanie nowych artykułów
- ✅ Historia zachowana (nie nadpisujesz starych)
- ✅ Skalowalność (1000+ artykułów bez problemu)
- ✅ Czytelność (content writer vs developer)

---

## 🚀 Quick Start

### 1. Dodaj nowy artykuł

Stwórz plik w `/scripts/blog-content/`:

```bash
touch scripts/blog-content/02-twoj-nowy-artykul.js
```

### 2. Wypełnij treścią

```javascript
module.exports = {
  title: 'Parkowanie równoległe krok po kroku',
  slug: 'parkowanie-rownolegle-krok-po-kroku',
  category: 'poradniki',
  publishDate: '2025-11-05',

  excerpt: 'Nauczysię parkować równolegle w 5 prostych krokach...',

  sections: [
    {
      heading: 'Wprowadzenie',
      content: `
        <p>Twoja merytoryczna treść tutaj...</p>
        <ul>
          <li>Punkt 1</li>
          <li>Punkt 2</li>
        </ul>
      `,
    },
    // Więcej sekcji...
  ],

  tips: ['Wskazówka 1', 'Wskazówka 2'],
  faq: [{ question: '...', answer: '...' }],
  keywords: ['parkowanie', 'manewr', 'bydgoszcz'],
};
```

### 3. Dodaj do index.js

```javascript
// scripts/blog-content/index.js
module.exports = [
  require('./01-jak-zdac-egzamin'),
  require('./02-twoj-nowy-artykul'), // ← Dodaj!
];
```

### 4. Wygeneruj blogi

```bash
npm run blogs:content
```

**Gotowe!** 🎉

---

## 📁 Struktura Projektu

```
/scripts/
├── blog-content/                    ← TREŚCI (TWOJE)
│   ├── README.md                    ← Instrukcja pisania treści
│   ├── index.js                     ← Lista wszystkich artykułów
│   ├── 01-jak-zdac-egzamin.js       ← Artykuł #1
│   ├── 02-parkowanie.js             ← Artykuł #2
│   └── ...                          ← Dodawaj kolejne!
│
├── generate-blogs-from-content.js   ← GENERATOR (HTML + CSS)
├── generate-60-blogs-helpers.js     ← Funkcje pomocnicze
└── generate-60-blogs.js             ← Stary generator (legacy)

/apps/qursant/data/
└── blog-posts.json                  ← Wygenerowane blogi (AUTO)
```

---

## 🔧 Komendy

```bash
# Wygeneruj blogi Z TREŚCI (nowy sposób, rekomendowane!)
npm run blogs:content

# Wygeneruj blogi dummy (stary sposób, 60 pustych)
npm run blogs

# Uruchom serwer
npm run dev
```

---

## 📝 Format Artykułu

### Minimalne wymagania:

```javascript
module.exports = {
  title: 'Tytuł', // WYMAGANE
  category: 'poradniki', // WYMAGANE
  excerpt: 'Krótki opis...', // WYMAGANE
  sections: [
    {
      // WYMAGANE (min. 1)
      heading: 'Nagłówek',
      content: '<p>Treść HTML...</p>',
    },
  ],
};
```

### Pełna struktura:

```javascript
module.exports = {
  // === PODSTAWOWE ===
  title: 'Jak zdać egzamin?',
  slug: 'jak-zdac-egzamin', // Opcjonalne (auto z title)
  category: 'poradniki', // poradniki|ceny|prawo|egzaminy|porady|aktualnosci|lokalne
  publishDate: '2025-11-04', // Opcjonalne (auto kolejna data)
  excerpt: 'Opis 150-200 znaków',

  // === TREŚĆ ===
  sections: [
    {
      heading: 'Nagłówek sekcji',
      content: `
        <p>Akapit tekstu...</p>
        <h3>Podtytuł</h3>
        <ul>
          <li>Lista</li>
        </ul>
        <strong>Pogrubienie</strong>
      `,
    },
    // ... więcej sekcji
  ],

  // === DODATKOWE (opcjonalne) ===
  tips: ['Wskazówka nr 1', 'Wskazówka nr 2'],

  faq: [
    {
      question: 'Pytanie?',
      answer: 'Odpowiedź...',
    },
  ],

  keywords: ['słowo kluczowe 1', 'fraza kluczowa 2'],
};
```

---

## 🎨 Co Generator Dodaje Automatycznie

Generator **generate-blogs-from-content.js** automatycznie dodaje:

### 1. HTML Template

```html
<div class="blog-article">
  <div class="blog-intro">...</div>
  <section class="blog-section">...</section>
  <div class="tips-box">...</div>
  <div class="faq-section">...</div>
  <div class="cta-box">...</div>
</div>
```

### 2. CSS Styling

- Kolorystyka zgodna z designem Qursant
- Responsive design
- Animacje i hover effects
- Typography

### 3. Metadane SEO

```javascript
{
  seo: {
    metaTitle: 'Tytuł - Szkoła Jazdy Qursant Bydgoszcz',
    metaDescription: excerpt,
    keywords: [...],
    canonicalUrl: 'https://www.qursant.com.pl/blog/slug'
  }
}
```

### 4. Obrazy

- Losowy obraz (tylko horizontal)
- Z folder: cars, course, instructors, office, boss

### 5. CTA Box

- Automatyczny call-to-action
- Link do rezerwacji
- Kontakt (telefon, adres)

---

## ✍️ Pisanie Wysokiej Jakości Treści

### ✅ DOBRZE:

**1. Merytoryka i konkret**

```
❌ "Nauka jazdy wymaga praktyki"
✅ "Minimum 35-40 godzin jazdy zapewnia 75% szans na zdanie za pierwszym razem"
```

**2. Lokalna specyfika**

```
❌ "Egzamin odbywa się w WORD"
✅ "Egzamin w WORD Bydgoszcz przy ul. Nakielskiej obejmuje trasę przez Rondo Bernardyńskie..."
```

**3. Doświadczenie Qursant**

```
✅ "W Szkole Jazdy Qursant w Bydgoszczy stosujemy metodę..."
✅ "Nasi instruktorzy zauważyli, że kursanci którzy..."
```

**4. Struktura i organizacja**

- Krótkie akapity (3-4 zdania)
- Listy punktowane
- Nagłówki co 200-300 słów
- Wytłuszczenia dla kluczowych informacji

### ❌ UNIKAJ:

- Kopiowania z innych stron
- Ogólników bez konkretów
- Za krótkich tekstów (<800 słów)
- Keyword stuffing
- Clickbait tytułów

---

## 📊 Długość Artykułu

| Typ             | Długość        | Przykład                                         |
| --------------- | -------------- | ------------------------------------------------ |
| Krótki poradnik | 800-1000 słów  | "5 błędów na placu manewrowym"                   |
| Standard        | 1200-1500 słów | "Jak zdać egzamin praktyczny?"                   |
| Kompleksowy     | 2000+ słów     | "Kompletny przewodnik: od zapisu do prawa jazdy" |

**Optymalne dla SEO: 1200-1500 słów**

---

## 🔄 Workflow

### Jako Content Writer:

1. **Badanie tematu** (20 min)

   - Sprawdź konkurencję
   - Znajdź unikalne informacje
   - Zbierz dane lokalne (Bydgoszcz)

2. **Pisanie** (60-90 min)

   - Stwórz plik `.js` w `/blog-content/`
   - Wypełnij wszystkie sekcje
   - Dodaj tips i FAQ

3. **Review** (15 min)

   - Sprawdź ortografię
   - Weryfikuj fakty i liczby
   - Upewnij się że są lokalne referencje

4. **Publikacja** (5 min)

   ```bash
   # Dodaj do index.js
   # Uruchom generator
   npm run blogs:content

   # Sprawdź lokalnie
   npm run dev
   # http://localhost:3000/blog
   ```

### Jako Developer:

Generator robi wszystko automatycznie:

- ✅ Konwersja treści do HTML
- ✅ Dodanie stylingów
- ✅ SEO metadata
- ✅ Losowanie obrazów
- ✅ Merge z istniejącymi blogami

---

## 🎯 Plan Na 60 Blogów

### Faza 1: Pierwsze 20 (TY teraz)

**Skupienie: Najważniejsze tematy**

**Poradniki (10):**

1. ✅ Jak zdać egzamin za pierwszym razem?
2. Parkowanie równoległe krok po kroku
3. Najczęstsze błędy na egzaminie praktycznym
4. Manewry na placu - kompletny przewodnik
5. Jak opanować rondo?
6. Pierwsze 10 jazd - czego się spodziewać?
7. Jazda w nocy - praktyczne wskazówki
8. Jak radzić sobie ze stresem podczas nauki?
9. Egzamin teoretyczny - sprawdzone metody nauki
10. Parkowanie prostopadłe - technika mistrzowska

**Ceny (3):** 11. Ile kosztuje prawo jazdy w Bydgoszczy 2025? 12. Kurs podstawowy vs ekspresowy - który wybrać? 13. Jak zaoszczędzić na kursie prawa jazdy?

**Prawo (3):** 14. PKK - wszystko co musisz wiedzieć 15. Okres próbny - obowiązki młodego kierowcy 16. Zmiany w przepisach ruchu drogowego 2025

**Egzaminy (2):** 17. Co robi egzaminator podczas jazdy? 18. Punkty karne na egzaminie - ile możesz dostać?

**Lokalne (2):** 19. Nauka jazdy w Bydgoszczy - przewodnik po dzielnicach 20. WORD Bydgoszcz - przygotowanie do egzaminu

### Faza 2: Kolejne 20 (później)

**Skupienie: Pogłębione tematy**

### Faza 3: Ostatnie 20 (później)

**Skupienie: Niszowe i seasonowe tematy**

---

## 📈 SEO - Best Practices

### Keywords w treści:

- **Główne frazy**: "szkoła jazdy bydgoszcz", "prawo jazdy bydgoszcz"
- **Long-tail**: "jak zdać egzamin praktyczny za pierwszym razem"
- **Lokalne**: "WORD Bydgoszcz", "nauka jazdy Fordońska", "kurs prawa jazdy Bydgoszcz"

### Gęstość keywords:

- **1-2%** dla głównej frazy
- Naturalnie wplecione w tekst
- W nagłówkach H2/H3
- W pierwszych 100 słowach

### Internal linking:

Generator automatycznie dodaje linki do:

- `/rezerwacja` (CTA)
- `/cennik`
- `/kursy`

Możesz dodać własne w treści.

---

## 🐛 Troubleshooting

### "Błąd parsowania galleryImages.ts"

```bash
# Wygeneruj ponownie gallery
npm run gallery
```

### "Nie znaleziono modułu"

```bash
# Sprawdź czy plik istnieje
ls scripts/blog-content/01-*.js

# Sprawdź czy jest w index.js
cat scripts/blog-content/index.js
```

### "Duplikaty slugów"

Generator automatycznie pomija duplikaty - sprawdź console output.

### "Zdjęcia się nie ładują"

Sprawdź czy używasz tylko horizontal obrazów (generator filtruje automatycznie).

---

## 🎉 Gotowe!

**Teraz możesz:**

1. Skupić się TYLKO na treści (content writer)
2. Łatwo dodawać nowe artykuły
3. Zachować historię wszystkich blogów
4. Skalować do 100+ artykułów

**Workflow:**

```bash
# 1. Napisz artykuł
vim scripts/blog-content/21-nowy-temat.js

# 2. Dodaj do index
# 3. Wygeneruj
npm run blogs:content

# 4. Sprawdź
npm run dev
```

**To wszystko!** 🚀


