import { ExchangeRate } from 'models/exchangeRates';

export const calculateExchangeRate = (
  fromCurrency: string,
  toCurrency: string,
  exchangeRates: ExchangeRate,
): number => {
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];
  if (!fromRate || !toRate) return -1;
  return toRate / fromRate;
};
