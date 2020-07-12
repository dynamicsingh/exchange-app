import { useExchange } from '../useExchange';
import { renderHook, act } from '@testing-library/react-hooks';
import { exchangeRatesData } from 'shared/utils/mockData';
import { POCKET } from 'constants/currency';

describe('Exchange Hook', () => {
  it('get initIal source and destination pockets', () => {
    const { result } = renderHook(useExchange, {
      initialProps: { rates: exchangeRatesData.data.rates },
    });
    let { source, destination } = result.current;
    expect(source).toEqual({ currency: 'EUR', amount: 0 });
    expect(destination).toEqual({ currency: 'GBP', amount: 0 });
  });

  it('allows to set values of source and destination pockets', () => {
    const { result } = renderHook(useExchange, {
      initialProps: { rates: exchangeRatesData.data.rates },
    });
    let { setDestination, setSource } = result.current;
    act(() => setDestination({ currency: 'GBP', amount: 10 }));
    act(() => setSource({ currency: 'USD', amount: 100 }));
    expect(result.current.destination).toEqual({ currency: 'GBP', amount: 10 });
    expect(result.current.source).toEqual({ currency: 'USD', amount: 100 });
  });

  it('interchange the source and destination transaction', () => {
    const { result } = renderHook(useExchange, {
      initialProps: { rates: exchangeRatesData.data.rates },
    });
    let { setDestination, setSource } = result.current;
    act(() => setDestination({ currency: 'GBP', amount: 10 }));
    act(() => setSource({ currency: 'USD', amount: 100 }));
    act(() => result.current.onSwitch());
    expect(result.current.destination).toEqual({
      currency: 'USD',
      amount: 100,
    });
    expect(result.current.source).toEqual({ currency: 'GBP', amount: 10 });
  });

  it('onAmount change in source and destination pocket', () => {
    const { result } = renderHook(useExchange, {
      initialProps: { rates: exchangeRatesData.data.rates },
    });
    const { onAmountChange } = result.current;
    act(() => onAmountChange(POCKET.SOURCE, 150));
    expect(result.current.destination).toEqual({
      currency: 'GBP',
      amount: -150,
    });
    expect(result.current.source).toEqual({ currency: 'EUR', amount: 150 });
    act(() => onAmountChange(POCKET.DESTINATION, 300));
    expect(result.current.destination).toEqual({
      currency: 'GBP',
      amount: 300,
    });
    expect(result.current.source).toEqual({ currency: 'EUR', amount: -300 });
  });

  it('onCurrencyChange in source pocket', () => {
    const { result } = renderHook(useExchange, {
      initialProps: { rates: exchangeRatesData.data.rates },
    });
    const { onCurrencyChange, setSource } = result.current;
    act(() => setSource({ currency: 'USD', amount: 100 }));
    act(() => onCurrencyChange(POCKET.SOURCE, 'USD'));
    expect(result.current.source).toEqual({ currency: 'USD', amount: 100 });
    act(() => onCurrencyChange(POCKET.DESTINATION, 'EUR'));
    expect(result.current.destination).toEqual({ currency: 'EUR', amount: 0 });
  });
});
