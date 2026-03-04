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
 * Logika:
 * - Licznik zawsze odlicza do miesiąca następnego kursu (NEXT_START_DATE)
 * - Jeśli NEXT_START_DATE już minął, odlicza do następnego miesiąca
 * - Liczba wolnych miejsc zmniejsza się z upływem dni w bieżącym miesiącu
 * - Nowy miesiąc = reset licznika do 8 miejsc
 */
export const useReservationCounter = (): UseReservationCounterResult => {
  const [remainingPlaces, setRemainingPlaces] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [monthName, setMonthName] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const calculateRemainingPlaces = () => {
      const now = new Date();
      const dayOfMonth = now.getDate();

      // Pobierz docelowy miesiąc kursu (zsynchronizowany z NEXT_START_DATE)
      const { month: targetMonth, year: targetYear } =
        getReservationTargetMonth(now);

      // Oblicz ile dni minęło od startu "okresu rezerwacji"
      // Jeśli jesteśmy w tym samym miesiącu co kurs - liczymy od 1 dnia miesiąca
      // Jeśli kurs jest w następnym miesiącu - liczymy od 1 dnia bieżącego miesiąca
      const nextStartDate = parseNextStartDate(COURSE.NEXT_START_DATE);

      let daysProgress: number;

      if (
        nextStartDate > now &&
        nextStartDate.getMonth() === now.getMonth() &&
        nextStartDate.getFullYear() === now.getFullYear()
      ) {
        // Kurs jest w tym miesiącu i jeszcze nie minął - liczymy od 1 do daty kursu
        // Dzień przed kursem = 100% progresu (2 wolne miejsca)
        const totalDaysInPeriod = nextStartDate.getDate();
        daysProgress = Math.min(1, dayOfMonth / (totalDaysInPeriod - 1 || 1));
      } else {
        // Kurs jest w przyszłym miesiącu lub data już minęła - standardowe odliczanie przez miesiąc
        const daysInMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate();
        daysProgress = dayOfMonth / daysInMonth;
      }

      // Liczba wolnych miejsc: od 8 na początku okresu do 2 na końcu
      const maxPlaces = 9;
      const minPlaces = 2;
      const countDown = Math.max(
        minPlaces,
        Math.floor(maxPlaces - daysProgress * (maxPlaces - minPlaces))
      );

      const monthNameLocative = getMonthNameLocative(targetMonth);

      setRemainingPlaces(countDown);
      setMonthName(monthNameLocative);
      setCurrentDate(`${monthNameLocative} ${targetYear}r.`);

      // Animacja paska postępu
      let width = 0;
      const interval = setInterval(() => {
        if (width >= countDown) {
          clearInterval(interval);
        } else {
          width += 0.05;
          setProgressWidth(Math.min(width * 4.5, countDown * 4.5));
        }
      }, 10);

      return () => clearInterval(interval);
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
