export const PRICES = {
  COURSE: {
    BASIC: 3350,
    EXPRESS: 4000,
  },
  INSTALLMENTS: [
    { step: 'I rata', amount: 650, desc: 'Zajęcia teoretyczne' },
    { step: 'II rata', amount: 650, desc: 'Przed pierwszą jazdą' },
    { step: 'III rata', amount: 650, desc: 'Po 10 godz. jazdy' },
    { step: 'IV rata', amount: 700, desc: 'Po 16 godz. jazdy' },
    { step: 'V rata', amount: 700, desc: 'Po 24 godz. jazdy' },
  ],
  ADDITIONAL: {
    MEDICAL_EXAM: 200,
    TRAINING_OWN_STUDENT: 110,
    TRAINING_EXTERNAL: 110,
  },
} as const;
