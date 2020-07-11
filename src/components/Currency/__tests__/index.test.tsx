import React from 'react';
import { Currency } from '../index';
import { render } from '@testing-library/react';

describe('<Currency/>', () => {
  it('renders with currency with symbol', () => {
    const { getByTestId } = render(<Currency currency={'GBP'} amount={1000} />);
    const loaderContainer = getByTestId(/currency-amount/i);
    expect(loaderContainer).toHaveTextContent('1000.00 £');
  });

  it('renders with currency with symbol with default precision', () => {
    const { getByTestId } = render(
      <Currency currency={'GBP'} amount={3242.326} />,
    );
    const loaderContainer = getByTestId(/currency-amount/i);
    expect(loaderContainer).toHaveTextContent('3242.33 £');
  });

  it('renders with currency with symbol with custom precision', () => {
    const { getByTestId } = render(
      <Currency currency={'GBP'} amount={3242.32639} precision={4} />,
    );
    const loaderContainer = getByTestId(/currency-amount/i);
    expect(loaderContainer).toHaveTextContent('3242.3264 £');
  });
});
