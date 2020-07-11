import { ExchangeRateResponse } from 'models/exchangeRates';
import { Pocket, PocketContent, PocketInput } from 'models/pockets';
import { RootState } from 'reducers';

export const exchangeRatesData: { data: ExchangeRateResponse } = {
  data: {
    rates: { USD: 1.1276, GBP: 0.8957 },
    base: 'EUR',
    date: '2020-07-10',
  },
};

export let pocketTransactionPayload: PocketInput = {
  sourceCurrency: { currency: 'EUR', amount: 10 },
  destinationCurrency: { currency: 'GBP', amount: 8.96 },
  rate: 0.8957,
};

export const pocketData: { data: Pocket } = {
  data: {
    EUR: 900,
    GBP: 600.03,
    USD: 300.63,
  },
};

export const pocketContent: PocketContent = {
  currency: 'EUR',
  amount: 2323,
};

export const error = {
  code: 403,
  message: 'Forbidden',
};

export const completeState: RootState = {
  exchangeRates: {
    loading: false,
    error: null,
    data: { ...exchangeRatesData.data.rates, EUR: 1 },
  },
};
