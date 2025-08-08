import { useState, useEffect } from 'react';

interface UseReservationCounterResult {
  remainingPlaces: number;
  progressWidth: number;
  monthName: string;
  currentDate: string;
}

export const useReservationCounter = (): UseReservationCounterResult => {
  const [remainingPlaces, setRemainingPlaces] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [monthName, setMonthName] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const d = new Date();
    const countDown = 8 - Math.floor(d.getDate() / 5.3);
    const month = d.getMonth();
    const year = d.getFullYear();

    const arrayOfMonths = [
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
    ];

    setRemainingPlaces(countDown);
    setMonthName(arrayOfMonths[month]);
    setCurrentDate(`${arrayOfMonths[month]} ${year}r.`);

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

    // Cleanup function for useEffect
    return () => clearInterval(interval);
  }, []);

  return {
    remainingPlaces,
    progressWidth,
    monthName,
    currentDate,
  };
};
