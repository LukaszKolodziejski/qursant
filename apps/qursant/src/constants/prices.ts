/** Ustaw null, gdy kurs ekspresowy wraca do oferty. Format: DD.MM */
export const EXPRESS_COURSE_UNAVAILABLE_UNTIL: string | null = '31.08';

export const PRICES = {
  COURSE: {
    BASIC: 4250,
    EXPRESS: 5250,
  },
  INSTALLMENTS: [
    { step: 'I rata', amount: 850, desc: 'Zajęcia teoretyczne' },
    { step: 'II rata', amount: 850, desc: 'Przed pierwszą jazdą' },
    { step: 'III rata', amount: 850, desc: 'Po 10 godz. jazdy' },
    { step: 'IV rata', amount: 850, desc: 'Po 16 godz. jazdy' },
    { step: 'V rata', amount: 850, desc: 'Po 24 godz. jazdy' },
  ],
  ADDITIONAL: {
    MEDICAL_EXAM: 200,
    TRAINING_OWN_STUDENT: 130,
    TRAINING_EXTERNAL: 140,
  },
} as const;
