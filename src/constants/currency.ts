export const GBP = 'GBP';
export const EUR = 'EUR';
export const USD = 'USD';

export const CURRENCIES = [EUR, GBP, USD];

export const CURRENCY_SYMBOLS: { [id: string]: string } = {
  [GBP]: '£',
  [EUR]: '€',
  [USD]: '$',
};

export enum POCKET {
  SOURCE = 'SOURCE',
  DESTINATION = 'DESTINATION',
}
