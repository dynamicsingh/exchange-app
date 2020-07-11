import { CURRENCY_SYMBOLS } from 'constants/currency';

export const getCurrencySymbol = (currency: string): string =>
  CURRENCY_SYMBOLS[currency];
