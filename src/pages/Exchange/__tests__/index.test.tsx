import React from 'react';
import { fireEvent, act, screen } from '@testing-library/react';
import { Exchange } from '../index';
import { render } from 'shared/utils/testUtil';
import user from '@testing-library/user-event';

describe('Exchange Screen', () => {
  it('can render with redux with defaults', () => {
    const { getByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    expect(sourceInput).toHaveAttribute('value', '');
    expect(destinationInput).toHaveAttribute('value', '');
  });

  it('user updates in source and according destination currency value is update with respect to rate', () => {
    const { getByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    user.type(sourceInput, '10');
    expect(destinationInput).toHaveAttribute('value', '8.96');
  });

  it('user updates in destination and according source currency value is update with respect to rate', () => {
    const { getByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    user.type(destinationInput, '10');
    expect(sourceInput).toHaveAttribute('value', '11.16');
  });

  it('user types a big number in destination currency and accordingly source currency value is updated wrt rate with exceeds balance msg', async () => {
    const { getByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    user.type(destinationInput, '10000');
    expect(sourceInput).toHaveAttribute('value', '11164.45');
    const exceedsBalance = getByTestId(/source-exchange-item-exceeds/i);
    expect(exceedsBalance).toHaveTextContent('exceeds balance');
  });

  it('change in source currency, shows the respective balance and rate', () => {
    const { getByTestId, getAllByTestId } = render(<Exchange />);

    const sourceCurrSelect = getAllByTestId(/select-text/i);
    const sourceBalance = getByTestId(/source-exchange-item-amount/i);
    expect(sourceCurrSelect[0]).toHaveTextContent('EUR');
    expect(sourceBalance).toHaveTextContent('900.00 €');

    const sourceRateVal = getByTestId(/from-currency-amount/i);
    const destinationRateVal = getByTestId(/to-currency-amount/i);

    expect(sourceRateVal).toHaveTextContent('1 €');
    expect(destinationRateVal).toHaveTextContent('0.8957 £');

    const sourceCurrOption1 = getAllByTestId(/option2/i);
    fireEvent.click(sourceCurrOption1[0]);
    expect(sourceCurrSelect[0]).toHaveTextContent('USD');
    expect(sourceBalance).toHaveTextContent('300.63 $');

    expect(sourceRateVal).toHaveTextContent('1 $');
    expect(destinationRateVal).toHaveTextContent('0.7943 £');
  });

  it('change in source currency, changes the destination curr val', () => {
    const { getByTestId, getAllByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    user.type(sourceInput, '10');
    expect(destinationInput).toHaveAttribute('value', '8.96');

    const sourceCurrSelect = getAllByTestId(/select-text/i);
    const sourceCurrOption1 = getAllByTestId(/option2/i);
    fireEvent.click(sourceCurrOption1[0]);
    expect(sourceCurrSelect[0]).toHaveTextContent('USD');
    expect(destinationInput).toHaveAttribute('value', '7.94');
  });

  it('change in destination currency, changes the destination curr val', () => {
    const { getByTestId, getAllByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    user.type(sourceInput, '10');
    expect(destinationInput).toHaveAttribute('value', '8.96');

    const destinationCurrSelect = getAllByTestId(/select-text/i);
    const sourceCurrOption1 = getAllByTestId(/option2/i);
    fireEvent.click(sourceCurrOption1[1]);
    expect(destinationCurrSelect[1]).toHaveTextContent('USD');
    expect(destinationInput).toHaveAttribute('value', '11.28');
  });

  it('change in destination currency, shows the respective balance and rate', () => {
    const { getByTestId, getAllByTestId } = render(<Exchange />);

    const destinationCurrSelect = getAllByTestId(/select-text/i);
    const destinationBalance = getByTestId(/destination-exchange-item-amount/i);
    expect(destinationCurrSelect[1]).toHaveTextContent('GBP');
    expect(destinationBalance).toHaveTextContent('600.03 £');

    const sourceRateVal = getByTestId(/from-currency-amount/i);
    const destinationRateVal = getByTestId(/to-currency-amount/i);

    expect(sourceRateVal).toHaveTextContent('1 €');
    expect(destinationRateVal).toHaveTextContent('0.8957 £');

    const destinationCurrOption1 = getAllByTestId(/option2/i);
    fireEvent.click(destinationCurrOption1[1]);
    expect(destinationCurrSelect[1]).toHaveTextContent('USD');
    expect(destinationBalance).toHaveTextContent('300.63 $');

    expect(sourceRateVal).toHaveTextContent('1 €');
    expect(destinationRateVal).toHaveTextContent('1.1276 $');
  });

  it('user updates source and later interchanges the currency with destination', () => {
    const { getByTestId, getAllByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    const selectCurr = getAllByTestId(/select-text/i);
    const selectedSourceCurr = selectCurr[0];
    const selectedDestinationCurr = selectCurr[1];
    user.type(sourceInput, '10');
    expect(destinationInput).toHaveAttribute('value', '8.96');
    expect(selectedSourceCurr).toHaveTextContent('EUR');
    expect(selectedDestinationCurr).toHaveTextContent('GBP');

    const interchangeSwitch = getByTestId(/exchange-switch/i);
    fireEvent.click(interchangeSwitch);
    expect(destinationInput).toHaveAttribute('value', '10');
    expect(sourceInput).toHaveAttribute('value', '8.96');
    expect(selectedSourceCurr).toHaveTextContent('GBP');
    expect(selectedDestinationCurr).toHaveTextContent('EUR');
  });

  it('user does a transaction, amount is added and deducted from respective pockets', async () => {
    const { getByTestId } = render(<Exchange />);

    const sourceBalance = getByTestId(/source-exchange-item-amount/i);
    const destinationBalance = getByTestId(/destination-exchange-item-amount/i);
    expect(sourceBalance).toHaveTextContent('900.00 €');
    expect(destinationBalance).toHaveTextContent('600.03 £');

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    user.type(sourceInput, '10');

    const submitBtn = getByTestId(/submit-btn/i);
    act(() => {
      fireEvent.click(submitBtn);
    });
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
    expect(sourceBalance).toHaveTextContent('890.00 €');
    expect(destinationBalance).toHaveTextContent('608.99 £');
  });

  it('change in source currency when destination currency is same, exchange btn is disabled', () => {
    const { getByTestId, getAllByTestId } = render(<Exchange />);

    const sourceCurrSelect = getAllByTestId(/select-text/i);
    const sourceCurrOption1 = getAllByTestId(/option1/i);
    fireEvent.click(sourceCurrOption1[0]);
    expect(sourceCurrSelect[0]).toHaveTextContent('GBP');
    const submitBtn = getByTestId(/submit-btn/i);
    expect(submitBtn).toBeDisabled();
  });
});
