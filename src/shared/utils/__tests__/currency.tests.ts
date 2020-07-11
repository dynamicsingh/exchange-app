import { getCurrencySymbol } from '../currency';

describe('currency utils', () => {
  it('getCurrencySymbol shows correct currency symbols', () => {
    expect(getCurrencySymbol('GBP')).toEqual('£');

    expect(getCurrencySymbol('USD')).toEqual('$');

    expect(getCurrencySymbol('EUR')).toEqual('€');
  });
});
