export const COURSE = {
  COURSE_NAME: 'Kurs Feryjny',
  PROMO_TEXT: 'Teoria w 10 dni!',
  NEXT_START_DATE: '2 lutego 2026',
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
