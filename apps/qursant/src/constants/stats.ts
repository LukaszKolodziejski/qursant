// Bazowa liczba kursantów (stan na maj 2024)
const BASE_STUDENTS = 4135;

// Liczba instruktorów
export const INSTRUCTORS_COUNT = 8;

// Rok rozpoczęcia działalności
const START_YEAR = 2009;

/**
 * Oblicza aktualną liczbę kursantów
 * Dodaje 7 kursantów za każdy miesiąc od maja 2024
 */
export const getStudentsCount = (): number => {
  const baseDate = new Date(2024, 4); // maj 2024 (miesiące są 0-indexed)
  const currentDate = new Date();

  // Oblicz różnicę w miesiącach
  const monthsDiff =
    (currentDate.getFullYear() - baseDate.getFullYear()) * 12 +
    (currentDate.getMonth() - baseDate.getMonth());

  return BASE_STUDENTS + monthsDiff * 7;
};

/**
 * Oblicza lata doświadczenia
 */
export const getExperienceYears = (): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - START_YEAR;
};

// Eksportuj funkcję formatującą liczby dla lepszej czytelności
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
