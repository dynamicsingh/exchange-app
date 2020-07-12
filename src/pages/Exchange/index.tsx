import React, { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Layout } from 'components/Layout';
import { LiveRate } from 'components/LiveRate';
import { POCKET } from 'constants/currency';
import { Button } from 'components/Button';
import { ExchangeItem } from 'components/ExchangeItem';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getExchangeRates } from 'actions/exchangeRateAction';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  calculateExchangeRate,
  isValidPocketConversion,
} from 'shared/utils/exchange';
import { Icon as ExchangeIcon } from 'shared/icons/exchange';
import { doPocketTransaction } from 'actions/pocketTransactionAction';
import { RootState } from 'reducers';
import { CurrencyCode, Pocket } from 'models/pockets';
import { ExchangeRate } from 'models/exchangeRates';
import { useExchange } from './useExchange';

const EXCHANGE_RATE_UPDATION_INTERVAL: number = 10000;

const Exchange: FC = () => {
  const dispatch = useDispatch();

  const [isPerformingConversion, setIsPerformingConversion] = useState<boolean>(
    false,
  );

  const { exchangeRates, pockets } = useSelector(
    (state: RootState) => ({
      exchangeRates: state.exchangeRates,
      pockets: state.pockets,
    }),
    shallowEqual,
  );

  let rates: ExchangeRate = exchangeRates?.data;

  const {
    source,
    setSource,
    setDestination,
    destination,
    onAmountChange,
    onCurrencyChange,
    onSwitch,
  } = useExchange({ rates });

  const exchangeRate: number = calculateExchangeRate(
    source.currency,
    destination.currency,
    rates,
  );

  const currencyPockets: Pocket = pockets?.data;
  const pocketConversionSuccess: boolean | null = pockets?.success;

  //fetching the live rates every EXCHANGE_RATE_UPDATION_INTERVAL interval
  useEffect(() => {
    dispatch(getExchangeRates());

    const intervalId = setInterval(() => {
      dispatch(getExchangeRates());
    }, EXCHANGE_RATE_UPDATION_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (pocketConversionSuccess && isPerformingConversion) {
      setIsPerformingConversion(false);
      setSource((prevState) => ({ ...prevState, amount: 0 }));
      setDestination((prevState) => ({ ...prevState, amount: 0 }));
    }
  }, [
    pocketConversionSuccess,
    setIsPerformingConversion,
    setSource,
    setDestination,
    isPerformingConversion,
  ]);

  const performExchange = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    setIsPerformingConversion(true);
    dispatch(
      doPocketTransaction({
        sourceCurrency: source,
        destinationCurrency: destination,
        rate: exchangeRate,
      }),
    );
  };

  const isValidConversion = isValidPocketConversion(
    source,
    destination,
    currencyPockets,
    rates,
  );

  return (
    <Layout>
      <form onSubmit={performExchange}>
        <div className={styles.widgetContainer}>
          <ToastContainer
            className={styles.toastContainer}
            transition={Flip}
            limit={1}
          />
          <div className={styles.header}>
            <h4>Exchange</h4>
          </div>
          <ExchangeItem
            onCurrencyChange={(currency: CurrencyCode) =>
              onCurrencyChange(POCKET.SOURCE, currency)
            }
            onAmountChange={(amount) => onAmountChange(POCKET.SOURCE, amount)}
            amount={source.amount}
            currency={source.currency}
            pocket={currencyPockets}
          />
          <div className={styles.liveRateContainer}>
            <div
              onClick={onSwitch}
              className={styles.iconContainer}
              data-testid="exchange-switch"
            >
              <ExchangeIcon className={styles.icon} />
            </div>
            <LiveRate
              fromCurrency={source.currency}
              toCurrency={destination.currency}
              conversionRate={exchangeRate}
            />
          </div>
          <ExchangeItem
            type={POCKET.DESTINATION}
            onCurrencyChange={(currency: CurrencyCode) =>
              onCurrencyChange(POCKET.DESTINATION, currency)
            }
            onAmountChange={(amount) =>
              onAmountChange(POCKET.DESTINATION, amount)
            }
            amount={destination.amount}
            currency={destination.currency}
            pocket={currencyPockets}
          />
        </div>
        <div className={styles.footer}>
          <Button
            type="submit"
            disabled={!isValidConversion || isPerformingConversion}
            className={styles.btn}
            qaIdPrefix="submit"
          >
            Exchange
          </Button>
        </div>
      </form>
    </Layout>
  );
};
export { Exchange };
