import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { conformToMask as coreConformToMask } from 'text-mask-core/dist/textMaskCore';

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
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const PHONE_MASK_WITH_DDI = [
  '+',
  /[1-9]/,
  /\d/,
  ' ',
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

export const CELL_MASK_WITH_DDI = [
  '+',
  /[1-9]/,
  /\d/,
  ' ',
  '(',
  /[1-9]/,
  /\d/,
  ')',
  ' ',
  /[1-9]/,
  /\d/,
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

export const CELL_PHONE_MASK_WITH_DDI = rawValue => {
  if (rawValue.length > 18) {
    return CELL_MASK_WITH_DDI;
  }

  return PHONE_MASK_WITH_DDI;
};

export const CPF_CNPJ_MASK = rawValue => {
  if (rawValue.length > 14) {
    return CNPJ_MASK;
  }

  return CPF_MASK;
};

export const PERCENTAGE_MASK = createNumberMask({
  prefix: '',
  suffix: ' %',
  thousandsSeparatorSymbol: '.',
  decimalSymbol: ',',
  allowDecimal: true,
});

export const YEAR_MASK = [/\d/, /\d/, /\d/, /\d/];

export const CREDIT_CARD_MASK = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const CVV_MASK = [/\d/, /\d/, /\d/];

export const MOUNTH_YEAR_MASK = [/[0-1]/, /\d/, /\d/, /\d/];

const masks = {
  cep: CEP_MASK,
  phone: PHONE_MASK,
  cell: CELL_MASK,
  cpf: CPF_MASK,
  currency: CURRENCY_MASK,
  cnpj: CNPJ_MASK,
  plate: PLATE_MASK,
  cellphone: CELL_PHONE_MASK,
  cellphonewithddi: CELL_PHONE_MASK_WITH_DDI,
  cpfcnpj: CPF_CNPJ_MASK,
  date: DATE_MASK,
  time: TIME_MASK,
  percentage: PERCENTAGE_MASK,
  year: YEAR_MASK,
  cvv: CVV_MASK,
  mounthyear: MOUNTH_YEAR_MASK,
  creditcard: CREDIT_CARD_MASK,
};

export const useMask = mask => {
  let pipe;

  if (mask === 'plate') {
    pipe = conformedValue => conformedValue.toUpperCase();
  }
  const inputMask = masks[mask] ? masks[mask] : mask;

  return [inputMask, pipe];
};
