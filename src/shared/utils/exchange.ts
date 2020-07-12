import { ExchangeRate } from 'models/exchangeRates';
import { Pocket, PocketContent } from 'models/pockets';

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

export const isValidPocketConversion = (
  source: PocketContent,
  destination: PocketContent,
  pockets: Pocket,
  exchangeRates: ExchangeRate,
): boolean => {
  if (!source.amount) return false;
  if (source.currency === destination.currency) return false;
  if (!exchangeRates[source.currency] || !exchangeRates[destination.currency])
    return false;
  return source.amount <= pockets[source.currency];
};
