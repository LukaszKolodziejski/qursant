# 🔍 **PROFESJONALNE AUDYTY SEO + PERFORMANCE**

---

## 📋 **DOSTĘPNE NARZĘDZIA:**

### **1. 🚀 Szybki Audit SEO** (własny skrypt)

```bash
npm run seo
```

**Co mierzy:**

- ✅ Struktura plików (layout, pages, robots.txt, sitemap)
- ✅ Metadata (wszystkie strony)
- ✅ Schema.org JSON-LD (26 typów)
- ✅ Obrazy (WebP, rozmiary)
- ✅ Sitemap & Robots
- ✅ Content (blog, metadata)
- ✅ Performance (lazy loading, Image component)
- ✅ Accessibility (alt tags)
- ✅ Mobile-First (viewport, responsive)
- ✅ Security (HTTPS)

**Wynik:** `143/148 punktów (96.6%) - Ocena A+` 🏆

**Zalety:**

- ⚡ Błyskawiczny (1-2 sekundy)
- 📄 Audytuje pliki (nie wymaga uruchomionej strony)
- 💾 Generuje `seo-audit-report.json`

---

### **2. 🏆 Pełny Audit Lighthouse** (Google official)

#### **A) Localhost (development):**

```bash
# 1. Uruchom dev server w osobnym terminalu:
npm run dev

# 2. W drugim terminalu uruchom audit:
npm run lighthouse
```

#### **B) Produkcja (live):**

```bash
npm run lighthouse:prod
```

**Co mierzy:**

- ⚡ **Performance** (100 pkt)
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
  - TTI (Time to Interactive)
  - TBT (Total Blocking Time)
  - FCP (First Contentful Paint)
  - Speed Index
- 🔍 **SEO** (100 pkt)
  - Meta tags
  - Structured data
  - Mobile-friendly
  - Crawlability
  - Links
- ♿ **Accessibility** (100 pkt)
  - ARIA
  - Color contrast
  - Alt texts
  - Focus management
- ✅ **Best Practices** (100 pkt)
  - HTTPS
  - Console errors
  - Deprecated APIs
  - Security

**Wynik:** Piękny raport HTML z wizualizacjami!

**Zalety:**

- 🎯 Oficjalne narzędzie Google
- 📊 Dokładne metryki wydajności
- 🌐 Skanuje CAŁĄ stronę (wszystkie URL z sitemap)
- 📈 Porównuje strony między sobą
- 🖼️ Generuje raport HTML

**Gdzie raport:**

```
.unlighthouse/
├── index.html          ← OTWÓRZ TO W PRZEGLĄDARCE!
├── overview.html       ← Podsumowanie wszystkich stron
└── reports/            ← Raporty dla każdej strony
    ├── index.html
    ├── blog.html
    ├── kursy.html
    └── ...
```

---

## 🎯 **SZYBKI START:**

### **Krok 1: Podstawowy audit (2 sekundy)**

```bash
npm run seo
```

### **Krok 2: Pełny audit Performance + SEO (2-5 minut)**

```bash
# W terminalu 1:
npm run dev

# W terminalu 2:
npm run lighthouse
```

### **Krok 3: Otwórz raport**

```bash
# Linux:
xdg-open .unlighthouse/index.html

# Lub ręcznie otwórz plik:
# .unlighthouse/index.html
```

---

## 📊 **INTERPRETACJA WYNIKÓW:**

### **SEO Audit (npm run seo):**

- **90-100%** = A+ (TOP 1%)
- **80-89%** = A (Bardzo dobry)
- **70-79%** = B (Dobry)
- **60-69%** = C (Wymaga poprawy)
- **<60%** = D (Krytyczne problemy)

### **Lighthouse (npm run lighthouse):**

- **90-100** = Zielony (Doskonały)
- **50-89** = Pomarańczowy (Wymaga poprawy)
- **0-49** = Czerwony (Krytyczny)

---

## 🔄 **KIEDY UŻYWAĆ:**

### **`npm run seo`** - Używaj:

- ✅ Podczas developmentu (szybki feedback)
- ✅ Przed commitem (sprawdź czy nic się nie zepsuło)
- ✅ Po dodaniu nowej strony (sprawdź metadata)
- ✅ W CI/CD pipeline

### **`npm run lighthouse`** - Używaj:

- ✅ Przed deployment'em (sprawdź performance)
- ✅ Po optymalizacjach (zmierz efekt)
- ✅ Raz w tygodniu (monitoring)
- ✅ Po dużych zmianach w kodzie

### **`npm run lighthouse:prod`** - Używaj:

- ✅ Po deployment'ie (sprawdź live)
- ✅ Do raportowania dla klienta
- ✅ Porównanie dev vs produkcja

---

## 💡 **PORADY:**

1. **Performance Budget:**

   - LCP < 2.5s (idealnie < 1.5s)
   - FID < 100ms (idealnie < 50ms)
   - CLS < 0.1 (idealnie < 0.05)
   - Total Size < 1 MB

2. **SEO Budget:**

   - Wszystkie strony: 90+ SEO score
   - Blog: 100 SEO score (krytyczne!)
   - Homepage: 95+ (najważniejsza)

3. **Najczęstsze problemy:**
   - ❌ Brak WebP → Konwertuj obrazy
   - ❌ Wolny LCP → Lazy loading, preload
   - ❌ Brak metadata → Dodaj generateMetadata
   - ❌ Brak alt → Dodaj alt do wszystkich <Image>

---

## 📝 **WSZYSTKIE KOMENDY:**

```bash
# SEO
npm run seo              # Szybki audit SEO
npm run seo:help         # Pomoc

# Lighthouse
npm run lighthouse       # Pełny audit (localhost)
npm run lighthouse:prod  # Pełny audit (produkcja)

# Wszystkie audyty
npm run audit            # Pokaż dostępne audyty
```

---

## 🎯 **TWÓJ OBECNY WYNIK:**

### **SEO Audit:**

```
🎯 WYNIK: 143/148 punktów (96.6%)
📊 OCENA: A+
🏆 Doskonały wynik! TOP 1% stron!
```

### **Co dalej:**

1. Uruchom `npm run lighthouse` żeby zobaczyć pełne metryki Performance
2. Sprawdź LCP, FID, CLS (Core Web Vitals)
3. Porównaj localhost vs produkcja

---

## 🚀 **GOTOWE DO UŻYCIA!**

Uruchom teraz:

```bash
npm run audit
```

Żeby zobaczyć wszystkie dostępne opcje! 🎉
