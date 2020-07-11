import { Pocket} from 'models/pockets';
import {ExchangeRateResponse} from "models/exchangeRates";

export const exchangeRatesData: { data: ExchangeRateResponse } = {
  data: {
    rates: { USD: 1.1276, GBP: 0.8957 },
    base: 'EUR',
    date: '2020-07-10',
  },
};

export const pocketData: { data: Pocket } = {
  data: {
    EUR: 900,
    GBP: 600.03,
    USD: 300.63,
  },
};
export const error = {
  code: 403,
  message: 'Forbidden',
};

