import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const PHONE_MASK = [
  '(',
  /[1-9]/,
  /\d/,
  ')',
  ' ',
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const CELL_MASK = [
  '(',
  /[1-9]/,
  /\d/,
  ')',
  ' ',
  /[1-9]/,
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const CPF_MASK = [
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

export const CNPJ_MASK = [
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

export const PLATE_MERCO_MASK = [
  /[A-Z]/i,
  /[A-Z]/i,
  /[A-Z]/i,
  /\d/,
  /[A-Z]/i,
  /\d/,
  /\d/,
];

export const PLATE_OLD_MASK = [
  /[A-Z]/i,
  /[A-Z]/i,
  /[A-Z]/i,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const DATE_MASK = [
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const TIME_MASK_1 = [
  /[0-2]/,
  /\d/,
  ':',
  /[0-5]/,
  /\d/,
  ':',
  /[0-5]/,
  /\d/,
];
export const TIME_MASK_2 = [
  /[0-2]/,
  /[0-3]/,
  ':',
  /[0-5]/,
  /\d/,
  ':',
  /[0-5]/,
  /\d/,
];

export const TIME_MASK = rawValue => {
  if (rawValue.charAt(0) === '2') {
    return TIME_MASK_2;
  }
  return TIME_MASK_1;
};

export const CURRENCY_MASK = createNumberMask({
  prefix: 'R$ ',
  suffix: '',
  thousandsSeparatorSymbol: '.',
  decimalSymbol: ',',
  allowDecimal: true,
});

export const CELL_PHONE_MASK = rawValue => {
  if (rawValue.length > 14) {
    return CELL_MASK;
  }
  return PHONE_MASK;
};

export const CPF_CNPJ_MASK = rawValue => {
  if (rawValue.length > 14) {
    return CNPJ_MASK;
  }
  return CPF_MASK;
};
