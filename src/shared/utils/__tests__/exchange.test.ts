import {
  calculateExchangeRate,
  getExchangeAmount,
  isValidPocketConversion,
} from '../exchange';
import { exchangeRatesData, pocketContent, pocketData } from '../mockData';

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

  it('isValidPocketConversion with amount more than in pocket', () => {
    expect(
      isValidPocketConversion(
        { currency: 'GBP', amount: 1000 },
        pocketContent,
        pocketData.data,
        { ...exchangeRatesData.data.rates, EUR: 1 },
      ),
    ).toEqual(false);
  });

  it('isValidPocketConversion with lesser than pocket amount for conversion', () => {
    expect(
      isValidPocketConversion(
        { currency: 'GBP', amount: 10 },
        pocketContent,
        pocketData.data,
        { ...exchangeRatesData.data.rates, EUR: 1 },
      ),
    ).toEqual(true);
  });

  it('isValidPocketConversion with source and destination currency same', () => {
    expect(
      isValidPocketConversion(pocketContent, pocketContent, pocketData.data, {
        ...exchangeRatesData.data.rates,
        EUR: 1,
      }),
    ).toEqual(false);
  });

  it('isValidPocketConversion with no amount for conversion', () => {
    expect(
      isValidPocketConversion(
        { currency: 'GBP', amount: 0 },
        pocketContent,
        pocketData.data,
        { ...exchangeRatesData.data.rates, EUR: 1 },
      ),
    ).toEqual(false);
  });
});
