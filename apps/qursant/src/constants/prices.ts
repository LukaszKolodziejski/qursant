/** Ustaw null, gdy kurs ekspresowy wraca do oferty. Format: DD.MM */
export const EXPRESS_COURSE_UNAVAILABLE_UNTIL: string | null = '31.08';

export const PRICES = {
  COURSE: {
    BASIC: 3900,
    EXPRESS: 4900,
  },
  INSTALLMENTS: [
    { step: 'I rata', amount: 800, desc: 'Zajęcia teoretyczne' },
    { step: 'II rata', amount: 800, desc: 'Przed pierwszą jazdą' },
    { step: 'III rata', amount: 800, desc: 'Po 10 godz. jazdy' },
    { step: 'IV rata', amount: 750, desc: 'Po 16 godz. jazdy' },
    { step: 'V rata', amount: 750, desc: 'Po 24 godz. jazdy' },
  ],
  ADDITIONAL: {
    MEDICAL_EXAM: 200,
    TRAINING_OWN_STUDENT: 120,
    TRAINING_EXTERNAL: 130,
  },
} as const;
