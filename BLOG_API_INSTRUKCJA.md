# 📝 INSTRUKCJA API BLOGÓW - Qursant

## 🎯 Jak działa system

System blogów automatycznie publikuje artykuły na podstawie daty. Możesz dodać 60 blogów z datami na przyszłość, a system sam będzie je publikował każdego dnia.

---

## 🏗️ ARCHITEKTURA

### Pliki systemu:

```
apps/qursant/src/
├── types/blog.ts              # Typy TypeScript
├── lib/blog-storage.ts        # Logika przechowywania (JSON file)
├── app/api/blog/
│   ├── route.ts               # GET /api/blog, POST /api/blog
│   └── [id]/route.ts          # GET/PUT/DELETE /api/blog/[id]
├── app/blog/
│   ├── page.tsx               # Lista blogów
│   ├── layout.tsx             # SEO dla bloga
│   └── [slug]/page.tsx        # Pojedynczy blog
└── components/home/
    └── NewsSection.tsx        # Sekcja "Aktualności" na stronie głównej

data/
└── blog-posts.json            # Magazyn danych (auto-generowany)
```

---

## 📊 STRUKTURA DANYCH BLOGA

```typescript
{
  "id": "post-1234567890-abc123",
  "slug": "ile-kosztuje-prawo-jazdy-w-bydgoszczy-2025",
  "title": "Ile kosztuje prawo jazdy w Bydgoszczy w 2025?",
  "excerpt": "Sprawdź aktualne ceny kursów prawa jazdy...",
  "content": "<p>Pełna treść artykułu w HTML lub markdown...</p>",
  "publishDate": "2025-01-15",  // Format: YYYY-MM-DD
  "author": {
    "name": "Robert Langer",
    "role": "Właściciel / Instruktor"
  },
  "category": "ceny",  // poradniki, ceny, prawo, egzaminy, porady, aktualnosci, lokalne
  "tags": ["prawo jazdy", "ceny", "bydgoszcz", "kurs"],
  "image": {
    "url": "/images/blog/koszt-prawa-jazdy.jpg",
    "alt": "Ile kosztuje prawo jazdy w Bydgoszczy"
  },
  "seo": {
    "metaTitle": "Ile kosztuje prawo jazdy w Bydgoszczy? [Ceny 2025]",
    "metaDescription": "Sprawdź aktualne ceny...",
    "keywords": ["ile kosztuje prawo jazdy", "cena kursu"],
    "canonicalUrl": "https://www.qursant.com.pl/blog/ile-kosztuje-prawo-jazdy"
  },
  "links": {
    "internal": ["/cennik", "/kursy", "/rezerwacja"],
    "external": [
      { "url": "https://word.bydgoszcz.pl", "title": "WORD Bydgoszcz" }
    ]
  },
  "status": "scheduled",  // draft, scheduled, published
  "featured": false,
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T10:00:00.000Z"
}
```

---

## 🔧 JAK UŻYWAĆ API

### 1. Pobierz wszystkie opublikowane blogi

```bash
GET /api/blog?limit=10&page=1
```

**Parametry:**

- `limit` - ile blogów (domyślnie: 10)
- `page` - strona (domyślnie: 1)
- `category` - filtruj po kategorii (np. "ceny", "poradniki")
- `tag` - filtruj po tagu
- `featured` - tylko wyróżnione (true/false)
- `publishedOnly` - tylko opublikowane (domyślnie: true)

**Odpowiedź:**

```json
{
  "success": true,
  "data": {
    "posts": [...],
    "filters": {...}
  }
}
```

---

### 2. Dodaj nowy blog

```bash
POST /api/blog
Content-Type: application/json

{
  "title": "Tytuł bloga",
  "excerpt": "Krótki opis...",
  "content": "<p>Treść...</p>",
  "publishDate": "2025-01-20",
  "category": "poradniki",
  "tags": ["tag1", "tag2"],
  "image": {
    "url": "/images/blog/image.jpg",
    "alt": "Alt text"
  },
  "author": {
    "name": "Robert Langer",
    "role": "Instruktor"
  },
  "status": "scheduled",
  "seo": {
    "metaTitle": "SEO title",
    "metaDescription": "SEO description",
    "keywords": ["keyword1", "keyword2"]
  }
}
```

**Odpowiedź:**

```json
{
  "success": true,
  "data": {...},
  "message": "Blog został dodany pomyślnie"
}
```

---

### 3. Pobierz pojedynczy blog

```bash
GET /api/blog/[slug-lub-id]
```

**Przykład:**

```bash
GET /api/blog/ile-kosztuje-prawo-jazdy-w-bydgoszczy-2025
```

---

### 4. Aktualizuj blog

```bash
PUT /api/blog/[id]
Content-Type: application/json

{
  "title": "Nowy tytuł",
  "content": "Zaktualizowana treść"
}
```

---

### 5. Usuń blog

```bash
DELETE /api/blog/[id]
```

---

## 📅 JAK DZIAŁA AUTOMATYCZNA PUBLIKACJA?

### Mechanizm:

1. Dodajesz blog z `publishDate: "2025-01-20"` i `status: "scheduled"`
2. Do dnia 19.01.2025 - blog jest NIEWIDOCZNY
3. Od 20.01.2025 - blog automatycznie staje się WIDOCZNY
4. System sprawdza datę przy każdym żądaniu

### Status blogów:

- **`draft`** - szkic, nie pokazuje się nigdzie
- **`scheduled`** - zaplanowany, czeka na datę publikacji
- **`published`** - opublikowany natychmiast (ignoruje datę)

---

## 🚀 DODAJ 60 BLOGÓW NA RAZ

### Opcja 1: Przez API (cURL)

Utwórz plik `add-blogs.sh`:

```bash
#!/bin/bash

for i in {1..60}; do
  date=$(date -d "+$i days" +%Y-%m-%d)

  curl -X POST http://localhost:4200/api/blog \
    -H "Content-Type: application/json" \
    -d '{
      "title": "Blog dzień '$i': Tytuł artykułu",
      "excerpt": "Krótki opis artykułu...",
      "content": "<p>Treść artykułu dzień '$i'</p>",
      "publishDate": "'$date'",
      "category": "poradniki",
      "tags": ["nauka jazdy", "bydgoszcz"],
      "image": {
        "url": "/images/blog/default.jpg",
        "alt": "Blog Qursant"
      },
      "author": {
        "name": "Robert Langer",
        "role": "Instruktor"
      },
      "status": "scheduled",
      "seo": {
        "metaTitle": "Blog dzień '$i'",
        "metaDescription": "Opis...",
        "keywords": ["szkoła jazdy", "bydgoszcz"]
      }
    }'

  echo "Dodano blog na dzień: $date"
  sleep 0.5
done
```

Uruchom:

```bash
chmod +x add-blogs.sh
./add-blogs.sh
```

---

### Opcja 2: JavaScript/Node.js

Utwórz plik `scripts/add-60-blogs.js`:

```javascript
const fs = require('fs');
const path = require('path');

const blogs = [];
const today = new Date();

for (let i = 1; i <= 60; i++) {
  const publishDate = new Date(today);
  publishDate.setDate(today.getDate() + i);

  blogs.push({
    id: `post-${Date.now()}-${i}`,
    slug: `blog-dzien-${i}-${publishDate.toISOString().split('T')[0]}`,
    title: `Blog dzień ${i}: Tytuł artykułu`,
    excerpt: `Krótki opis artykułu dla dnia ${i}...`,
    content: `<p>Treść artykułu dla dnia ${i}. Tutaj uzupełnisz pełną treść.</p>`,
    publishDate: publishDate.toISOString().split('T')[0],
    author: {
      name: 'Robert Langer',
      role: 'Instruktor',
    },
    category: i % 7 === 0 ? 'ceny' : i % 5 === 0 ? 'egzaminy' : 'poradniki',
    tags: ['nauka jazdy', 'bydgoszcz', 'prawo jazdy'],
    image: {
      url: '/images/blog/default.jpg',
      alt: 'Szkoła Jazdy Qursant Bydgoszcz',
    },
    seo: {
      metaTitle: `Blog dzień ${i} - Szkoła Jazdy Qursant`,
      metaDescription: `Opis dla artykułu ${i}...`,
      keywords: ['szkoła jazdy', 'bydgoszcz', 'prawo jazdy'],
    },
    status: 'scheduled',
    featured: i <= 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

// Zapisz do pliku
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'blog-posts.json'), JSON.stringify(blogs, null, 2));

console.log(`✅ Dodano ${blogs.length} blogów!`);
console.log(`📅 Od dnia: ${blogs[0].publishDate}`);
console.log(`📅 Do dnia: ${blogs[blogs.length - 1].publishDate}`);
```

Uruchom:

```bash
node scripts/add-60-blogs.js
```

---

### Opcja 3: Ręcznie w JSON

Otwórz `data/blog-posts.json` i dodaj:

```json
[
  {
    "id": "post-1",
    "slug": "blog-1",
    "title": "Tytuł bloga 1",
    "publishDate": "2025-01-15",
    "status": "scheduled",
    ...
  },
  {
    "id": "post-2",
    "slug": "blog-2",
    "title": "Tytuł bloga 2",
    "publishDate": "2025-01-16",
    "status": "scheduled",
    ...
  }
  // ... dalsze 58 blogów
]
```

---

## 📝 KATEGORYZACJA BLOGÓW

**7 kategorii:**

1. **`poradniki`** - Jak zdać egzamin, jak parkować, tips & tricks
2. **`ceny`** - Ile kosztuje prawo jazdy, cenniki, promocje
3. **`prawo`** - PKK, przepisy, wymagania prawne
4. **`egzaminy`** - Wszystko o egzaminach (teoretyczny, praktyczny, trasy)
5. **`porady`** - Porady dla kursantów, bezpieczeństwo
6. **`aktualnosci`** - Nowości w szkole, osiągnięcia, wydarzenia
7. **`lokalne`** - Informacje lokalne o Bydgoszczy

---

## 🎨 GDZIE SIĘ WYŚWIETLAJĄ BLOGI?

### 1. Strona główna (`/`)

- **Sekcja "Aktualności"** - pokazuje 5 ostatnich blogów
- Pierwszy blog (wyróżniony) - duży box
- 4 kolejne - małe boxy

### 2. Lista blogów (`/blog`)

- Wszystkie opublikowane blogi
- Filtrowanie po kategorii
- Paginacja

### 3. Pojedynczy blog (`/blog/[slug]`)

- Pełna treść artykułu
- Powiązane posty (3)
- CTA do rezerwacji

---

## 🔍 MONITOROWANIE

### Sprawdź statystyki:

```bash
GET /api/blog?includeStats=true
```

**Odpowiedź:**

```json
{
  "success": true,
  "data": {
    "posts": [...],
    "stats": {
      "total": 60,
      "published": 10,      // Opublikowane (data <= dziś)
      "scheduled": 50,      // Zaplanowane (data > dziś)
      "draft": 0            // Szkice
    }
  }
}
```

---

## ⚡ QUICK START - DODAJ PIERWSZY BLOG

### Test w terminalu:

```bash
curl -X POST http://localhost:4200/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Ile kosztuje prawo jazdy w Bydgoszczy w 2025?",
    "excerpt": "Sprawdź aktualne ceny kursów prawa jazdy w Bydgoszczy. Kurs podstawowy, ekspresowy, dodatkowe koszty.",
    "content": "<h2>Koszty kursu</h2><p>Kurs podstawowy w Szkole Jazdy Qursant kosztuje 2999 zł...</p>",
    "publishDate": "2025-01-10",
    "category": "ceny",
    "tags": ["prawo jazdy", "ceny", "bydgoszcz", "kurs 2025"],
    "image": {
      "url": "/images/blog/koszt-prawa-jazdy.jpg",
      "alt": "Ile kosztuje prawo jazdy w Bydgoszczy"
    },
    "author": {
      "name": "Robert Langer",
      "role": "Właściciel / Instruktor"
    },
    "status": "scheduled",
    "seo": {
      "metaTitle": "Ile kosztuje prawo jazdy w Bydgoszczy? [Ceny 2025]",
      "metaDescription": "Sprawdź aktualne ceny kursów prawa jazdy w Bydgoszczy. Kurs podstawowy 2999 zł. Możliwość płatności w ratach.",
      "keywords": ["ile kosztuje prawo jazdy", "cena kursu prawa jazdy bydgoszcz", "koszt prawa jazdy 2025"]
    }
  }'
```

---

## 🎯 BEST PRACTICES

### 1. Daty publikacji:

- Zawsze używaj formatu `YYYY-MM-DD`
- Rozkładaj równomiernie (1 blog/dzień)
- Ustaw `status: "scheduled"` dla przyszłych dat

### 2. Treść:

- Minimum 800 słów dla SEO
- Używaj fraz kluczowych naturalnie
- Dodaj linki wewnętrzne (`/cennik`, `/rezerwacja`)
- Dodaj 1-2 linki zewnętrzne (WORD, gov.pl)

### 3. SEO:

- Unikalny `metaTitle` dla każdego bloga
- `metaDescription` 150-160 znaków
- 5-10 keywords
- Alt text dla obrazów

### 4. Obrazy:

- Format: .jpg lub .webp
- Rozmiar: 1200x630px (OG image)
- Nazwa: `koszt-prawa-jazdy-bydgoszcz-2025.jpg`
- Kompresja: 80-85%

---

## 🚨 TROUBLESHOOTING

### Blog się nie pokazuje?

1. Sprawdź datę: `publishDate` musi być <= dzisiaj
2. Sprawdź status: `status` = "scheduled" lub "published"
3. Sprawdź API: `GET /api/blog?publishedOnly=false`

### Błąd "Blog nie został znaleziony"?

- Upewnij się że `slug` jest poprawny (bez polskich znaków)
- Sprawdź czy blog jest opublikowany

### Jak edytować istniejący blog?

```bash
PUT /api/blog/[id]
```

---

## 📊 METRYKI SEO

**Cel na 60 dni:**

- 60 blogów = 60 nowych stron w Google
- Każdy blog targetuje 3-5 fraz kluczowych
- = ~300 nowych fraz w indeksie
- = Potencjalnie 200-500% wzrost ruchu organicznego

**Monitoring:**

- Google Search Console - sprawdzaj co tydzień
- Które blogi mają najwięcej wyświetleń?
- Które frazy rankują najlepiej?
- Optymalizuj najlepiej działające

---

## 🎉 GOTOWE!

Masz teraz kompletny system blogów z automatyczną publikacją!

**Następne kroki:**

1. Dodaj 60 blogów z datami do przodu
2. Uzupełnij treści (możesz AI: ChatGPT, Claude)
3. Dodaj obrazy do `/public/images/blog/`
4. Monitoruj w Google Search Console
5. Profit! 🚀
