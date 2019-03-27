import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { conformToMask as coreConformToMask } from 'text-mask-core';

export const CEP_MASK = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

export function conformToMask(text, mask) {
  const result = coreConformToMask(text, mask, maskConfig);
  return result.conformedValue;
}
export const maskConfig = {
  guide: false,
  placeholderChar: '\u2000',
};
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

export const PLATE_MASK_DEF = [/[A-Z]/i, /[A-Z]/i, /[A-Z]/i, /\d/, /[0-9A-Z]/];

export const PLATE_MASK = rawValue => {
  if (rawValue.length <= 4) {
    return PLATE_MASK_DEF;
  }

  // Check if it is a old plate
  const fth = rawValue.charAt(3);
  if (fth === '-' || (rawValue.charAt(4) >= '0' && rawValue.charAt(4) <= '9')) {
    // Check if the a old plate should become a merco plate
    const sth = rawValue.length >= 6 ? rawValue.charAt(5) : null;
    if (sth != null && fth === '-' && sth.toLowerCase() !== sth.toUpperCase()) {
      // go back to merco plate
      return PLATE_MERCO_MASK;
    }

    return PLATE_OLD_MASK;
  }

  return PLATE_MERCO_MASK;
};

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
