export const COURSE = {
  COURSE_NAME: 'Kurs Prawa Jazdy',
  PROMO_TEXT: '', // Zostaw puste jeśli brak promocji. Wypełnij np. 'Teoria w 10 dni!' dla kursów specjalnych
  NEXT_START_DATE: '04.05.2026', // Format: DD.MM.YYYY - automatycznie formatowany na stronach
  START_TIME: '17:00',
  DURATION: {
    THEORY: {
      HOURS: 30,
      WEEKS: '2-3',
    },
    PRACTICE: {
      HOURS: 30,
      WEEKS: '3-5',
    },
  },
  SCHEDULE: {
    WEEKDAY: {
      DAYS: 'Poniedziałek-Piątek',
      TIME: '17:00',
    },
    WEEKEND: {
      INFO: 'Elastyczne godziny (do uzgodnienia)',
    },
  },
} as const;

// Nazwy miesięcy w języku polskim
const MONTH_NAMES = [
  'stycznia',
  'lutego',
  'marca',
  'kwietnia',
  'maja',
  'czerwca',
  'lipca',
  'sierpnia',
  'września',
  'października',
  'listopada',
  'grudnia',
] as const;

const MONTH_NAMES_LOCATIVE = [
  'Styczniu',
  'Lutym',
  'Marcu',
  'Kwietniu',
  'Maju',
  'Czerwcu',
  'Lipcu',
  'Sierpniu',
  'Wrześniu',
  'Październiku',
  'Listopadzie',
  'Grudniu',
] as const;

/**
 * Parsuje datę z formatu DD.MM.YYYY na obiekt Date
 */
export function parseNextStartDate(dateString: string): Date {
  const [day, month, year] = dateString.split('.').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Formatuje datę na czytelny format: "7 kwietnia 2026"
 */
export function formatDateReadable(dateString: string): string {
  const date = parseNextStartDate(dateString);
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Zwraca nazwę miesiąca w miejscowniku (np. "Kwietniu") dla podanego miesiąca (0-11)
 */
export function getMonthNameLocative(monthIndex: number): string {
  return MONTH_NAMES_LOCATIVE[monthIndex];
}

/**
 * Oblicza docelowy miesiąc dla licznika rezerwacji na podstawie:
 * - Aktualnej daty
 * - Daty startu następnego kursu (NEXT_START_DATE)
 *
 * Logika:
 * - Jeśli NEXT_START_DATE jest w przyszłości - odliczamy na miesiąc startu kursu
 * - Jeśli NEXT_START_DATE już minął - odliczamy na następny miesiąc (kurs dopiero będzie ustalony)
 */
export function getReservationTargetMonth(now: Date = new Date()): {
  month: number;
  year: number;
} {
  const nextStartDate = parseNextStartDate(COURSE.NEXT_START_DATE);

  // Jeśli data startu kursu jest w przyszłości lub dziś
  if (nextStartDate >= now) {
    return {
      month: nextStartDate.getMonth(),
      year: nextStartDate.getFullYear(),
    };
  }

  // Jeśli data startu kursu już minęła - odliczamy na następny miesiąc
  let nextMonth = now.getMonth() + 1;
  let nextYear = now.getFullYear();

  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear += 1;
  }

  return {
    month: nextMonth,
    year: nextYear,
  };
}
