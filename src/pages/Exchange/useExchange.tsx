import { useState } from 'react';
import { CurrencyCode, PocketContent } from 'models/pockets';
import { EUR, GBP, POCKET } from 'constants/currency';
import { getExchangeAmount } from 'shared/utils/exchange';
import { ExchangeRate } from 'models/exchangeRates';

const useExchange = ({ rates }: { rates: ExchangeRate }) => {
  const [source, setSource] = useState<PocketContent>({
    currency: EUR,
    amount: 0,
  });
  const [destination, setDestination] = useState<PocketContent>({
    currency: GBP,
    amount: 0,
  });

  const onCurrencyChange = (
    typeToUpdate: string,
    currency: CurrencyCode,
  ): void => {
    if (typeToUpdate === POCKET.SOURCE) {
      setSource((prevState) => ({ ...prevState, currency }));
      setDestination((prevState) => ({
        ...prevState,
        amount: getExchangeAmount(
          prevState.currency,
          source.amount,
          currency,
          rates,
        ),
      }));
    } else {
      setDestination({
        currency,
        amount: getExchangeAmount(
          currency,
          source.amount,
          source.currency,
          rates,
        ),
      });
    }
  };

  const onAmountChange = (typeToUpdate: string, amount: number): void => {
    if (typeToUpdate === POCKET.SOURCE) {
      setSource((prevState) => ({ ...prevState, amount }));
      setDestination((prevState) => ({
        ...prevState,
        amount: getExchangeAmount(
          prevState.currency,
          amount,
          source.currency,
          rates,
        ),
      }));
    } else {
      setDestination((prevState) => ({ ...prevState, amount }));
      setSource((prevState) => ({
        ...prevState,
        amount: getExchangeAmount(
          prevState.currency,
          amount,
          destination.currency,
          rates,
        ),
      }));
    }
  };

  const onSwitch = (): void => {
    let tempSource = { ...source };
    let tempDestination = { ...destination };
    setDestination(tempSource);
    setSource(tempDestination);
  };

  return {
    source,
    setSource,
    setDestination,
    destination,
    onAmountChange,
    onCurrencyChange,
    onSwitch,
  };
};

export { useExchange };
