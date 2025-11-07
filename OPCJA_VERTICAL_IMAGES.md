# 📸 OPCJA 2: Obsługa VERTICAL obrazów w blogach

## Problem

Obecnie używamy tylko `horizontal` zdjęć, ale mamy też `vertical` które nie są wykorzystywane.

## Rozwiązanie: Dostosuj CSS

### 1. **Zmień generator na wszystkie orientacje**

W `scripts/generate-60-blogs.js`:

```javascript
// OPCJA A: Tylko horizontal (OBECNE - działa dobrze)
const horizontalImages = galleryData.filter((img) => img.category === category && img.orientation === 'horizontal').map((img) => path.basename(img.src));

// OPCJA B: Wszystkie orientacje (wymagane dodatkowe pola w JSON)
const allImages = galleryData
  .filter((img) => img.category === category)
  .map((img) => ({
    filename: path.basename(img.src),
    orientation: img.orientation, // ← Dodaj orientację!
  }));
```

### 2. **Zapisz orientację w blog-posts.json**

W `generateBlogs()`:

```javascript
image: {
  url: `/images/${randomCategory}/${randomImage.filename}`,
  alt: title,
  orientation: randomImage.orientation,  // ← NOWE!
},
```

### 3. **Dodaj typ do BlogPost**

W `/apps/qursant/src/types/blog.ts`:

```typescript
export interface BlogPost {
  // ... inne pola
  image: {
    url: string;
    alt: string;
    orientation?: 'horizontal' | 'vertical'; // ← NOWE!
  };
  // ...
}
```

### 4. **Dostosuj CSS w komponencie bloga**

W `/apps/qursant/src/app/blog/[slug]/page.tsx`:

```tsx
{/* Hero z obrazkiem - PRZED */}
<section className="relative h-[60vh] overflow-hidden">
  {post.image && (
    <Image
      src={post.image.url}
      alt={post.image.alt}
      fill
      className="object-cover"  {/* ← Przycina vertical! */}
      priority
    />
  )}
</section>

{/* Hero z obrazkiem - PO */}
<section className={`relative overflow-hidden ${
  post.image.orientation === 'vertical' ? 'h-[80vh]' : 'h-[60vh]'
}`}>
  {post.image && (
    <Image
      src={post.image.url}
      alt={post.image.alt}
      fill
      className={
        post.image.orientation === 'vertical'
          ? 'object-contain bg-gradient-to-b from-blue-950 to-indigo-950'  // Vertical = contain
          : 'object-cover'  // Horizontal = cover
      }
      priority
    />
  )}
</section>
```

### 5. **Dostosuj miniaturki na liście blogów**

W `/apps/qursant/src/components/home/NewsSection.tsx`:

```tsx
<div className={`relative w-full ${post.image.orientation === 'vertical' ? 'h-96' : 'h-64'} rounded-lg overflow-hidden`}>
  <Image src={post.image.url} alt={post.image.alt} fill className={post.image.orientation === 'vertical' ? 'object-contain bg-blue-900/20' : 'object-cover'} />
</div>
```

---

## 📊 PORÓWNANIE

| Aspekt                  | OPCJA 1: Tylko Horizontal | OPCJA 2: Wszystkie                |
| ----------------------- | ------------------------- | --------------------------------- |
| **Prostota**            | ✅ Bardzo proste          | ⚠️ Wymaga zmian CSS               |
| **Wykorzystanie zdjęć** | ~50% zdjęć                | ✅ 100% zdjęć                     |
| **Wygląd**              | ✅ Zawsze idealny         | ⚠️ Vertical może wyglądać inaczej |
| **Maintenance**         | ✅ Łatwe                  | ⚠️ Więcej kodu do utrzymania      |
| **Wydajność**           | ✅ Identyczna             | ✅ Identyczna                     |

---

## 🎯 REKOMENDACJA

**ZOSTAŃ przy OPCJI 1** (tylko horizontal) jeśli:

- ✅ Masz wystarczająco horizontal zdjęć (60+ to wystarczy!)
- ✅ Chcesz prosty kod
- ✅ Chcesz konsystentny wygląd

**Użyj OPCJI 2** (wszystkie) jeśli:

- Masz mało horizontal zdjęć
- Vertical zdjęcia są bardzo ważne dla treści
- Nie przeszkadza Ci dodatkowa kompleksowość

---

## 🚀 OBECNY STAN

✅ OPCJA 1 (tylko horizontal) jest już zaimplementowana!

Jeśli chcesz OPCJĘ 2 - daj znać, zaimplementuję całość! 🎨
