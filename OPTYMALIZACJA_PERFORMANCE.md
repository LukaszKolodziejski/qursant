# 🚀 OPTYMALIZACJA PERFORMANCE

## Problem

Strona długo się ładuje - muszę poczekać chwilę na załadowanie blogu.

## Przyczyny

1. **Client-side rendering** - Blog jest client component (`'use client'`)
2. **Brak cache** - API czyta plik JSON przy każdym żądaniu
3. **Duże obrazy** - Brak optymalizacji zdjęć

---

## ✅ NATYCHMIASTOWE ROZWIĄZANIA

### 1. **Dodaj Revalidation do API (5 min)**

W `/apps/qursant/src/app/api/blog/route.ts` dodaj caching:

```typescript
export const revalidate = 3600; // Cache na 1 godzinę

export async function GET(request: NextRequest) {
  // ... reszta kodu
}
```

To sprawi że API będzie cache'owane przez 1h zamiast czytać plik co request!

### 2. **Optymalizuj obrazy (10 min)**

Użyj `sharp` (już jest w package.json!):

```bash
# W terminalu:
cd apps/qursant/public/images/cars
mogrify -resize 1200x900 -quality 80 *.jpg
```

Powtórz dla innych folderów: course/, instructors/, office/, boss/

### 3. **Loading Skeleton (15 min)**

Dodaj lepszy loading w `/apps/qursant/src/app/blog/[slug]/page.tsx`:

```tsx
if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-gray-900 animate-pulse">
      <div className="h-[60vh] bg-blue-800/20"></div>
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="h-8 bg-blue-800/20 rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-blue-800/20 rounded mb-2 w-full"></div>
        <div className="h-4 bg-blue-800/20 rounded mb-2 w-5/6"></div>
      </div>
    </div>
  );
}
```

---

## 🚀 ZAAWANSOWANE (opcjonalne, dla przyszłości)

### 1. **Migracja do Server Components**

Zamień `/blog/[slug]/page.tsx` na Server Component:

- Szybsze ładowanie (SSR)
- Lepsze SEO (treść od razu w HTML)
- Mniejszy bundle JS

### 2. **ISR (Incremental Static Regeneration)**

W `page.tsx` dodaj:

```typescript
export const revalidate = 86400; // Regeneruj co 24h
```

### 3. **Cache w Redis/Vercel KV**

Zamiast czytać plik - użyj cache:

```typescript
import { kv } from '@vercel/kv';

async function getPosts() {
  const cached = await kv.get('blog-posts');
  if (cached) return cached;

  const posts = readFromFile();
  await kv.set('blog-posts', posts, { ex: 3600 });
  return posts;
}
```

### 4. **CDN dla obrazów**

Upload zdjęć do:

- **Cloudinary** (darmowe 25GB)
- **Vercel Blob Storage**
- **AWS S3 + CloudFront**

---

## 📊 OCZEKIWANE REZULTATY

| Optymalizacja           | Czas ładowania | Trudność      |
| ----------------------- | -------------- | ------------- |
| Przed                   | ~3-5s          | -             |
| + API cache             | ~1-2s          | ⭐ Łatwe      |
| + Optymalizacja obrazów | ~0.8-1.5s      | ⭐ Łatwe      |
| + Server Components     | ~0.3-0.8s      | ⭐⭐ Średnie  |
| + ISR + CDN             | ~0.1-0.3s      | ⭐⭐⭐ Trudne |

---

## 🎯 REKOMENDACJA

**TERAZ (5 min):**

1. Dodaj `export const revalidate = 3600;` do API
2. Zrestartuj serwer

**PÓŹNIEJ (kiedy masz czas):** 3. Optymalizuj obrazy (zmniejsz rozmiar) 4. Dodaj lepszy loading skeleton

**PRZYSZŁOŚĆ:** 5. Migracja do Server Components 6. Użyj CDN dla obrazów
