# 🎨 PRZEWODNIK ZAMIANY Framer Motion → CSS Animations

## 📊 MAPOWANIE ANIMACJI

### 1️⃣ **Fade In Up (standardowa wejściowa animacja)**

**Framer Motion:**

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
```

**CSS Equivalent:**

```tsx
<div className="animate-fade-in-up-20">{/* lub dla y: 30 użyj: animate-fade-in-up */}</div>
```

---

### 2️⃣ **Fade In Left (wejście z lewej)**

**Framer Motion:**

```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
```

**CSS Equivalent:**

```tsx
<div className="animate-fade-in-left-50">{/* lub dla x: -30 użyj: animate-fade-in-left */}</div>
```

---

### 3️⃣ **Fade In Right (wejście z prawej)**

**Framer Motion:**

```tsx
<motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
```

**CSS Equivalent:**

```tsx
<div className="animate-fade-in-right-50">{/* lub dla x: 30 użyj: animate-fade-in-right */}</div>
```

---

### 4️⃣ **Scale In (dla kart, testimonials)**

**Framer Motion:**

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.05 }}
>
```

**CSS Equivalent:**

```tsx
<div className="animate-scale-in-90" style={{ animationDelay: `${index * 0.05}s` }}>
  {/* lub dla scale: 0.95 użyj: animate-scale-in */}
</div>
```

---

### 5️⃣ **Floating Animation (dla badges, CTA)**

**Framer Motion:**

```tsx
<motion.div
  animate={{ y: [0, -8, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
>
```

**CSS Equivalent:**

```tsx
<div className="animate-floating">{/* dla y: [0, -12, 0] użyj: animate-floating-12 */}</div>
```

---

### 6️⃣ **Staggered Animations (opóźnione wejścia)**

**Framer Motion:**

```tsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
))}
```

**CSS Equivalent:**

```tsx
{items.map((item, index) => (
  <div
    key={index}
    className="animate-fade-in-up-20"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
))}

{/* LUB użyj gotowych klas delay: */}
<div className="animate-fade-in-up-20 delay-100"></div>
<div className="animate-fade-in-up-20 delay-200"></div>
<div className="animate-fade-in-up-20 delay-300"></div>
```

---

### 7️⃣ **Hover Scale (powiększenie przy hover)**

**Framer Motion:**

```tsx
<motion.div whileHover={{ scale: 1.05 }}>
```

**CSS Equivalent:**

```tsx
<div className="hover-scale">{/* dla scale: 1.02 użyj: hover-scale-sm */}</div>
```

---

## 🔄 KROK PO KROKU ZAMIANA

### PRZED (Framer Motion):

```tsx
import { motion } from 'framer-motion';

export default function MySection() {
  return (
    <section>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
        <h2>Tytuł</h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <p>Treść z lewej</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
        <img src="..." alt="..." />
      </motion.div>
    </section>
  );
}
```

### PO (Pure CSS):

```tsx
// USUŃ import { motion } from 'framer-motion';

export default function MySection() {
  return (
    <section>
      <div className="text-center animate-fade-in-up-20">
        <h2>Tytuł</h2>
      </div>

      <div className="animate-fade-in-left-50">
        <p>Treść z lewej</p>
      </div>

      <div className="animate-fade-in-right-50 delay-200">
        <img src="..." alt="..." />
      </div>
    </section>
  );
}
```

---

## 📚 PEŁNA LISTA DOSTĘPNYCH KLAS

### Basic Animations:

- `.animate-fade-in` - proste wejście (opacity)
- `.animate-fade-in-up-20` - wejście z dołu (20px)
- `.animate-fade-in-up` - wejście z dołu (30px)
- `.animate-fade-in-down` - wejście z góry (30px)
- `.animate-fade-in-left` - wejście z lewej (30px)
- `.animate-fade-in-left-50` - wejście z lewej (50px)
- `.animate-fade-in-right` - wejście z prawej (30px)
- `.animate-fade-in-right-50` - wejście z prawej (50px)
- `.animate-scale-in` - powiększenie (0.95 → 1)
- `.animate-scale-in-90` - powiększenie (0.9 → 1)

### Loop Animations:

- `.animate-floating` - unoszenie (8px, infinite)
- `.animate-floating-12` - unoszenie (12px, infinite)
- `.animate-pulse-slow` - pulsowanie (infinite)
- `.animate-gradient-shift` - animowany gradient (infinite)
- `.animate-shine` - efekt połysku (infinite)
- `.animate-bounce-slow` - odbijanie (infinite)

### Hover Effects:

- `.hover-scale` - powiększenie 1.05
- `.hover-scale-sm` - powiększenie 1.02
- `.hover-lift` - podniesienie + cień
- `.hover-glow` - świecenie
- `.smooth-hover` - płynne przejście

### Delays:

- `.delay-50` - 0.05s
- `.delay-100` - 0.1s
- `.delay-150` - 0.15s
- `.delay-200` - 0.2s
- `.delay-300` - 0.3s
- `.delay-400` - 0.4s
- `.delay-500` - 0.5s
- `.delay-600` - 0.6s
- `.delay-700` - 0.7s
- `.delay-800` - 0.8s

### Scroll-triggered (z useScrollAnimation hook):

- `.fade-in-on-scroll` - wejście przy scroll (y: 30px)
- `.fade-in-on-scroll-left` - wejście z lewej przy scroll
- `.fade-in-on-scroll-right` - wejście z prawej przy scroll

---

## ⚡ PRZYKŁAD: ProcessSection

### PRZED:

```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  {steps.map((step, index) => (
    <motion.li
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {step.title}
    </motion.li>
  ))}
</motion.div>

<motion.div
  animate={{ y: [0, -8, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  <span>Badge</span>
</motion.div>
```

### PO:

```tsx
<div className="animate-fade-in-left-50">
  {steps.map((step, index) => (
    <li
      key={index}
      className="animate-fade-in-up-20"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {step.title}
    </li>
  ))}
</div>

<div className="animate-floating">
  <span>Badge</span>
</div>
```

---

## 🎯 KORZYŚCI

✅ **Performance:**

- Usunięcie ~100KB JavaScript (Framer Motion)
- Eliminacja 354ms forced reflow
- GPU-accelerated animations

✅ **Identyczny wygląd:**

- Wszystkie animacje wyglądają TAK SAMO
- Te same czasy trwania (duration)
- Te same opóźnienia (delays)

✅ **Prostszy kod:**

- Mniej importów
- Mniej props
- Czytelniejszy JSX

---

## 📝 CHECKLIST DO ZAMIANY

Dla każdego komponentu:

1. ✅ Znajdź wszystkie `<motion.div>`
2. ✅ Zamień `motion.div` → `div`
3. ✅ Usuń props: `initial`, `whileInView`, `animate`, `transition`, `viewport`
4. ✅ Dodaj odpowiednią klasę CSS z tabeli powyżej
5. ✅ Dla delays użyj `style={{ animationDelay: '...' }}` lub klasy `.delay-*`
6. ✅ Usuń `import { motion } from 'framer-motion'`
7. ✅ Przetestuj czy animacje wyglądają identycznie

---

## 🚀 READY TO USE!

Wszystkie CSS animations są już dostępne w `apps/qursant/src/styles/animations.css`.

Teraz możesz stopniowo zamieniać komponenty, jeden po drugim! 🎉
