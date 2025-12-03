export const PRICES = {
  COURSE: {
    BASIC: 3500,
    EXPRESS: 4300,
  },
  INSTALLMENTS: [
    { step: 'I rata', amount: 700, desc: 'Zajęcia teoretyczne' },
    { step: 'II rata', amount: 700, desc: 'Przed pierwszą jazdą' },
    { step: 'III rata', amount: 700, desc: 'Po 10 godz. jazdy' },
    { step: 'IV rata', amount: 700, desc: 'Po 16 godz. jazdy' },
    { step: 'V rata', amount: 700, desc: 'Po 24 godz. jazdy' },
  ],
  ADDITIONAL: {
    MEDICAL_EXAM: 200,
    TRAINING_OWN_STUDENT: 110,
    TRAINING_EXTERNAL: 120,
  },
} as const;
