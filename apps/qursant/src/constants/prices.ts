export const PRICES = {
  COURSE: {
    BASIC: 3700,
    EXPRESS: 4700,
  },
  INSTALLMENTS: [
    { step: 'I rata', amount: 800, desc: 'Zajęcia teoretyczne' },
    { step: 'II rata', amount: 800, desc: 'Przed pierwszą jazdą' },
    { step: 'III rata', amount: 700, desc: 'Po 10 godz. jazdy' },
    { step: 'IV rata', amount: 700, desc: 'Po 16 godz. jazdy' },
    { step: 'V rata', amount: 700, desc: 'Po 24 godz. jazdy' },
  ],
  ADDITIONAL: {
    MEDICAL_EXAM: 200,
    TRAINING_OWN_STUDENT: 115,
    TRAINING_EXTERNAL: 125,
  },
} as const;
