import { useState, useEffect } from 'react';
import {
  getReservationTargetMonth,
  getMonthNameLocative,
  parseNextStartDate,
  COURSE,
} from '@/constants/course';

interface UseReservationCounterResult {
  remainingPlaces: number;
  progressWidth: number;
  monthName: string;
  currentDate: string;
}

/**
 * Hook obliczający liczbę wolnych miejsc na kurs.
 *
 * Logika oparta na rzeczywistej liczbie dni do kursu:
 * - 45+ dni do kursu = 12 wolnych miejsc (maksimum)
 * - 0 dni do kursu = 2 wolne miejsca (minimum)
 * - Płynne, liniowe odliczanie między tymi wartościami
 * - Jeśli kurs już minął, pokazuje minimum (2 miejsca)
 */
export const useReservationCounter = (): UseReservationCounterResult => {
  const [remainingPlaces, setRemainingPlaces] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [monthName, setMonthName] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const calculateRemainingPlaces = () => {
      const now = new Date();
      const nextStartDate = parseNextStartDate(COURSE.NEXT_START_DATE);

      // Pobierz docelowy miesiąc kursu (dla wyświetlania)
      const { month: targetMonth, year: targetYear } =
        getReservationTargetMonth(now);

      // Oblicz ile dni zostało do kursu
      const daysUntilCourse = Math.ceil(
        (nextStartDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Parametry algorytmu
      const maxPlaces = 12; // maksymalna liczba miejsc
      const minPlaces = 2; // minimalna liczba miejsc
      const maxDays = 45; // 45+ dni = maksymalna liczba miejsc

      // Jeśli kurs już minął, traktuj jak 0 dni
      const effectiveDays = Math.max(0, daysUntilCourse);

      // Progress: 0 = dużo dni (mało progresu), 1 = mało dni (dużo progresu)
      const progress = Math.max(0, Math.min(1, 1 - effectiveDays / maxDays));

      // Oblicz liczbę wolnych miejsc
      const countDown = Math.max(
        minPlaces,
        Math.floor(maxPlaces - progress * (maxPlaces - minPlaces))
      );

      const monthNameLocative = getMonthNameLocative(targetMonth);

      setRemainingPlaces(countDown);
      setProgressWidth((countDown / maxPlaces) * 100);
      setMonthName(monthNameLocative);
      setCurrentDate(`${monthNameLocative} ${targetYear}r.`);
    };

    calculateRemainingPlaces();
  }, []);

  return {
    remainingPlaces,
    progressWidth,
    monthName,
    currentDate,
  };
};
