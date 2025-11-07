# 📝 INSTRUKCJA TWORZENIA BLOGÓW - DLA AI

## 🎯 CEL SYSTEMU

Prosty, skalowalny system blogowy, gdzie:

- **AI generuje TYLKO tekst** (bez HTML/CSS)
- Blogi przechowywane w małych plikach JSON (7 blogów = 1 tydzień)
- Frontend renderuje strukturę (komponenty React)
- Łatwe zarządzanie i skalowanie na 1000+ blogów

---

## 📁 STRUKTURA PLIKÓW

```
/apps/qursant/data/blog-content/
  ├── week-01.json   (2025-11-04 do 2025-11-10) - 7 blogów
  ├── week-02.json   (2025-11-11 do 2025-11-17) - 7 blogów
  ├── week-03.json   (...)
  └── week-XX.json
```

**1 tydzień = 1 plik JSON = 7 blogów (jeden na każdy dzień)**

---

## 🤖 JAK AI GENERUJE NOWE BLOGI?

### KROK 1: Wygeneruj szablon

```bash
node scripts/generate-blog-week.js 1
```

To utworzy plik `week-01.json` z pustym szablonem.

### KROK 2: Wypełnij szablon TYLKO TEKSTEM

AI wypełnia **tylko te pola**:

#### **Podstawowe info:**

- `title` - tytuł bloga
- `slug` - url-friendly slug (np. `jak-zdac-egzamin-na-prawo-jazdy`)
- `excerpt` - krótki opis (150-200 znaków)
- `tags` - array tagów SEO

#### **Treść (sections):**

```json
{
  "sections": [
    {
      "heading": "Wprowadzenie",
      "paragraphs": ["Akapit 1 - tekst...", "Akapit 2 - tekst..."]
    },
    {
      "heading": "Główna część",
      "paragraphs": ["Tekst..."],
      "list": ["Punkt 1", "Punkt 2", "Punkt 3"]
    },
    {
      "heading": "Szczegóły",
      "paragraphs": ["Tekst..."],
      "numberedList": ["Krok 1", "Krok 2"],
      "quote": "Ważny cytat lub informacja",
      "important": "Ważna adnotacja dla użytkownika"
    }
  ]
}
```

#### **Wskazówki (tips):**

```json
{
  "tips": ["Wskazówka 1", "Wskazówka 2", "Wskazówka 3"]
}
```

#### **FAQ:**

```json
{
  "faq": [
    {
      "q": "Pytanie?",
      "a": "Odpowiedź..."
    }
  ]
}
```

#### **SEO:**

```json
{
  "seo": {
    "metaTitle": "Tytuł bloga - Szkoła Jazdy Qursant Bydgoszcz",
    "metaDescription": "Opis do meta (max 160 znaków)...",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  }
}
```

---

## ⚠️ WAŻNE ZASADY

### ✅ TAK:

- Używaj tylko **czystego tekstu**
- Strukturuj treść w sekcje
- Dodawaj listy punktowane/numerowane
- Używaj paragrafów dla czytelności
- Dodawaj tips i FAQ
- Optymalizuj SEO (title, description, keywords)

### ❌ NIE:

- **NIE** używaj HTML tagów (`<p>`, `<div>`, `<h2>`, itp.)
- **NIE** dodawaj CSS ani stylów
- **NIE** generuj ID postów (są automatyczne)
- **NIE** zmieniaj dat publikacji (są w szablonie)
- **NIE** zmieniaj struktury JSON (tylko wypełnij content)

---

## 📊 PRZYKŁAD KOMPLETNEGO POSTA

Zobacz: `/apps/qursant/data/blog-content/week-01.json`

Pierwszy post w tym pliku to pełny przykład prawidłowo wypełnionego bloga.

---

## 🎨 JAK FRONTEND RENDERUJE BLOGI?

**Frontend automatycznie:**

- Renderuje sekcje jako `<h2>`, `<p>`, `<ul>`, `<ol>`
- Styluje tips jako kolorowy box z ikonką
- Renderuje FAQ jako akordeon
- Dodaje CTA (Call To Action) na końcu
- Dodaje obrazek nagłówkowy
- Wyświetla tagi, autora, datę

**Ty tylko dostarczasz TEKST - reszta dzieje się automatycznie!**

---

## 🚀 WORKFLOW TWORZENIA NOWYCH BLOGÓW

1. **Wygeneruj szablon:**

   ```bash
   node scripts/generate-blog-week.js 2
   ```

2. **Otwórz plik:**

   ```
   /apps/qursant/data/blog-content/week-02.json
   ```

3. **AI wypełnia:**

   - Tytuły, slugi, excerpty
   - Sekcje z treścią (tylko tekst!)
   - Tips, FAQ
   - SEO (meta title, description, keywords)

4. **Zapisz plik**

5. **Gotowe!** - Blog automatycznie się wyświetli na stronie

---

## 📋 KATEGORIE BLOGÓW

Dostępne kategorie:

- `poradniki` - jak zdać egzamin, jak parkować, itp.
- `ceny` - ile kosztuje, cenniki, promocje
- `prawo` - PKK, przepisy, wymagania
- `egzaminy` - wszystko o egzaminach
- `porady` - tips & tricks
- `aktualnosci` - nowości w szkole, osiągnięcia
- `lokalne` - informacje o Bydgoszczy

---

## 🖼️ OBRAZY

Dostępne obrazy (wybierz losowo):

- `instructors/photo-1.jpg` do `photo-26.jpg`
- `cars/photo-1.jpg` do `photo-82.jpg`
- `course/photo-17.jpg` do `photo-26.jpg`
- `office/photo-46.jpg` itp.
- `boss/photo-27.jpg` itp.

**Format:** `instructors/photo-7.jpg` (bez `/images/` na początku)

---

## 🎯 SZABLONY TEMATÓW (INSPIRACJE)

### Poradniki:

- Jak zdać egzamin na prawo jazdy za pierwszym razem?
- 10 błędów które popełniają kursanci
- Parkowanie równoległe krok po kroku
- Jak opanować rondo?

### Ceny:

- Ile kosztuje prawo jazdy w Bydgoszczy w 2025?
- Jak zaoszczędzić na kursie prawa jazdy?
- Porównanie cen szkół jazdy w Bydgoszczy

### Egzaminy:

- Egzamin teoretyczny - jak wygląda?
- Trasy egzaminacyjne w Bydgoszczy
- Co zrobić po oblaniu egzaminu?

### Prawo:

- PKK - jak założyć profil kandydata?
- Jakie dokumenty potrzebne są do kursu?
- Badania lekarskie do prawa jazdy

---

## 💡 WSKAZÓWKI DLA AI

1. **Długość artykułu:** 1500-2500 słów
2. **Sekcje:** 5-8 sekcji
3. **Tips:** 5-7 wskazówek
4. **FAQ:** 3-5 pytań
5. **Ton:** Przyjazny, profesjonalny, pomocny
6. **SEO:** Używaj słów kluczowych naturalnie
7. **Lokalizacja:** Zawsze wspominaj Bydgoszcz i Qursant

---

## 🔧 TESTOWANIE

Po utworzeniu nowych blogów:

1. Uruchom serwer dev:

   ```bash
   npm run dev
   ```

2. Sprawdź:
   - `/blog` - lista blogów
   - `/blog/slug-artykulu` - pojedynczy blog
   - API: `/api/blog` - czy zwraca nowe posty

---

## 📞 KONTAKT / INFORMACJE O SZKOLE

Zawsze używaj w blogach:

- **Tel:** 600 354 556
- **Adres:** ul. Ujejskiego 46a, Bydgoszcz
- **Nazwa:** Szkoła Jazdy Qursant
- **Właściciel:** Robert Langer

---

## ✅ CHECKLIST PRZED ZAPISANIEM

- [ ] Wszystkie tytuły wypełnione
- [ ] Wszystkie slugi są url-friendly
- [ ] Excerpty mają 150-200 znaków
- [ ] Sekcje zawierają tylko tekst (bez HTML)
- [ ] Tips i FAQ dodane
- [ ] SEO wypełnione (metaTitle, metaDescription, keywords)
- [ ] Tagi SEO dodane (minimum 5)
- [ ] Obrazy prawidłowe (bez `/images/` na początku)
- [ ] Plik JSON jest poprawny (sprawdź składnię!)

---

## 🎉 GOTOWE!

Teraz możesz łatwo tworzyć setki blogów w prosty sposób:

- AI generuje TYLKO tekst
- Pliki są małe i łatwe w zarządzaniu
- Frontend sam renderuje wszystko
- System jest skalowalny na 1000+ blogów

**70 blogów = 10 plików JSON = ~70KB danych zamiast 3MB!**
