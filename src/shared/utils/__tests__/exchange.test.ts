import {
  calculateExchangeRate, getExchangeAmount,
} from '../exchange';
import { exchangeRatesData } from '../mockData';

describe('exchange utils', () => {
  it('calculateExchangeRate with all exchangeRates', () => {
    expect(
      calculateExchangeRate('GBP', 'EUR', {
        ...exchangeRatesData.data.rates,
        EUR: 1,
      }),
    ).toEqual(1.1164452383610584);
  });

  it('calculateExchangeRate with all not all exchange Rates', () => {
    expect(
      calculateExchangeRate('GBP', 'EUR', { ...exchangeRatesData.data.rates }),
    ).toEqual(-1);
  });

  it('getExchangeAmount', () => {
    expect(
      getExchangeAmount('GBP', 3000, 'EUR', {
        ...exchangeRatesData.data.rates,
        EUR: 1,
      }),
    ).toEqual(2687.1);
  });

});
