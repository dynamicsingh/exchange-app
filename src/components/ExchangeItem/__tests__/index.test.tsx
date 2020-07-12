import React from 'react';
import { ExchangeItem } from '../index';
import { fireEvent, render } from '@testing-library/react';
import { GBP, POCKET } from 'constants/currency';
import { pocketData } from 'shared/utils/mockData';
import user from '@testing-library/user-event';

describe('<ExchangeItem/>', () => {
  it('renders with ExchangeItem with select currency, balance and entered value', () => {
    const onAmountChange = jest.fn();
    const onCurrencyChange = jest.fn();
    const { getByTestId } = render(
      <ExchangeItem
        onAmountChange={onAmountChange}
        onCurrencyChange={onCurrencyChange}
        currency={GBP}
        amount={302}
        type={POCKET.SOURCE}
        pocket={pocketData.data}
      />,
    );
    let select = getByTestId(/select-text/i);
    expect(select).toHaveTextContent('GBP');
    let input = getByTestId(/input/i);
    expect(input).toHaveAttribute('value', '302');
    let balance = getByTestId(/exchange-item-balance/i);
    expect(balance).toHaveTextContent('600.03');
  });

  it('renders ExchangeItem and calls function amount change and currency change', () => {
    const onAmountChange = jest.fn();
    const onCurrencyChange = jest.fn();
    const { getByTestId } = render(
      <ExchangeItem
        onAmountChange={onAmountChange}
        onCurrencyChange={onCurrencyChange}
        currency={GBP}
        amount={302}
        type={POCKET.SOURCE}
        pocket={pocketData.data}
      />,
    );
    let select = getByTestId(/select-text/i);
    let option1 = getByTestId(/option0/i);
    fireEvent.click(option1);
    expect(select).toHaveTextContent('EUR');
    let input = getByTestId(/input/i);
    user.type(input, '10');
    expect(onAmountChange).toHaveBeenCalled();
    let balance = getByTestId(/exchange-item-balance/i);
    expect(balance).toHaveTextContent('900.00 £');
  });
});
