const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_FILE = path.join(__dirname, '../src/data/galleryImages.ts');

// Konfiguracja kategorii i ich opisów
const CATEGORIES = {
  boss: {
    title: 'Robert Langer - Właściciel Qursant',
    descriptions: [
      'Doświadczony instruktor i właściciel szkoły nauki jazdy Qursant',
      'Profesjonalne podejście i wieloletnie doświadczenie w szkoleniu kierowców',
      'Pasjonat bezpiecznej jazdy i edukacji przyszłych kierowców',
    ],
  },
  instructors: {
    title: 'Nasi Instruktorzy',
    descriptions: [
      'Wykwalifikowana kadra instruktorska z wieloletnim doświadczeniem',
      'Profesjonalne podejście i indywidualne podejście do kursanta',
      'Cierpliwość i zaangażowanie w proces nauczania',
    ],
  },
  office: {
    title: 'Nasza Siedziba',
    descriptions: [
      'Nowoczesna siedziba w centrum Bydgoszczy',
      'Komfortowe sale wykładowe wyposażone w najnowszy sprzęt',
      'Przyjazne miejsce do nauki i rozwoju',
    ],
  },
  cars: {
    title: 'Flota Pojazdów',
    descriptions: [
      'Nowoczesne samochody szkoleniowe',
      'Pojazdy wyposażone w systemy bezpieczeństwa',
      'Komfortowe auta przystosowane do nauki jazdy',
    ],
  },
  course: {
    title: 'Szkolenia i Kursy',
    descriptions: [
      'Profesjonalne szkolenia teoretyczne i praktyczne',
      'Kursy dostosowane do indywidualnych potrzeb',
      'Przygotowanie do egzaminu w realnych warunkach',
    ],
  },
};

async function getImageMetadata(filePath) {
  const metadata = await sharp(filePath).metadata();
  const isVertical = metadata.height > metadata.width;

  return {
    width: metadata.width,
    height: metadata.height,
    orientation: isVertical ? 'vertical' : 'horizontal',
  };
}

async function generateGalleryData() {
  const imagesData = [];

  // Przejdź przez wszystkie kategorie
  for (const [category, categoryInfo] of Object.entries(CATEGORIES)) {
    const categoryPath = path.join(IMAGES_DIR, category);

    // Sprawdź czy folder istnieje
    if (!fs.existsSync(categoryPath)) {
      console.log(`Tworzę folder dla kategorii: ${category}`);
      fs.mkdirSync(categoryPath, { recursive: true });
      continue;
    }

    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => /^photo-\d+\.(jpg|jpeg|png|webp)$/i.test(file));

    // Group files by photo number to prefer .webp over .jpg
    const photoMap = new Map();
    for (const file of files) {
      const match = file.match(/^(photo-\d+)\.(jpg|jpeg|png|webp)$/i);
      if (match) {
        const photoName = match[1];
        const extension = match[2].toLowerCase();

        // Prefer WebP > PNG > JPEG/JPG
        const existing = photoMap.get(photoName);
        if (!existing) {
          photoMap.set(photoName, file);
        } else {
          const existingExt = existing.split('.').pop().toLowerCase();
          // WebP has highest priority, then PNG, then JPG
          const priority = { webp: 3, png: 2, jpg: 1, jpeg: 1 };
          if (priority[extension] > priority[existingExt]) {
            photoMap.set(photoName, file);
          }
        }
      }
    }

    // Process only the preferred version of each photo
    for (const file of photoMap.values()) {
      const filePath = path.join(categoryPath, file);
      const metadata = await getImageMetadata(filePath);

      // Losowy opis z dostępnych dla danej kategorii
      const description =
        categoryInfo.descriptions[
          Math.floor(Math.random() * categoryInfo.descriptions.length)
        ];

      imagesData.push({
        src: `/images/${category}/${file}`,
        alt: `${categoryInfo.title}`,
        category,
        width: metadata.width,
        height: metadata.height,
        orientation: metadata.orientation,
        description,
      });
    }
  }

  const tsContent = `
// Ten plik jest generowany automatycznie. Nie edytuj go ręcznie.
import { GalleryImage } from '../types/gallery';

export const galleryImages: GalleryImage[] = ${JSON.stringify(
    imagesData,
    null,
    2
  )};
`;

  fs.writeFileSync(OUTPUT_FILE, tsContent);
  console.log(
    `Wygenerowano dane dla ${imagesData.length} zdjęć w ${OUTPUT_FILE}`
  );
}

generateGalleryData().catch(console.error);
