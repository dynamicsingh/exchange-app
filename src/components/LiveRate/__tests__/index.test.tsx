import React from 'react';
import { LiveRate } from '../index';
import { render } from '@testing-library/react';

describe('<LiveRate/>', () => {
  it('renders LiveRate with from and to currency with currency signs', () => {
    const { getByTestId } = render(
      <LiveRate
        toCurrency={'GBP'}
        fromCurrency={'EUR'}
        conversionRate={1.03}
      />,
    );
    let fromCurr = getByTestId(/from-currency/i);
    expect(fromCurr).toHaveTextContent('1 €');
    let toCurr = getByTestId(/to-currency/i);
    expect(toCurr).toHaveTextContent('1.0300 £');
  });
});
