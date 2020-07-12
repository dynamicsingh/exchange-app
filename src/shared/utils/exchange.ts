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

export const getExchangeAmount = (
  toCurrency: string,
  amount: number,
  fromCurrency: string,
  exchangeRates: ExchangeRate,
): number => {
  let rate = calculateExchangeRate(fromCurrency, toCurrency, exchangeRates);
  return Number((amount * rate).toFixed(2));
};
