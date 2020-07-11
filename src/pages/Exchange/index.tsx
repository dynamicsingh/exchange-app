import React, { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { Layout } from 'components/Layout';
import { Button } from 'components/Button';
import { LiveRate } from 'components/LiveRate';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import { getExchangeRates } from '../../actions/exchangeRateAction';
import {RootState} from "../../reducers";
import {ExchangeRate} from "../../models/exchangeRates";
import {calculateExchangeRate} from "../../shared/utils/exchange";

interface Props {
  text?: string;
}

const EXCHANGE_RATE_UPDATION_INTERVAL: number = 10000;
const Exchange: FC<Props> = ({ text }) => {
  const dispatch = useDispatch();

  const { exchangeRates } = useSelector(
    (state: RootState) => ({
      exchangeRates: state.exchangeRates,
    }),
    shallowEqual,
  );

  let rates: ExchangeRate = exchangeRates?.data;

  const exchangeRate: number = calculateExchangeRate(
    'EUR',
    'GBP',
    rates,
  );

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

  return (
    <Layout>
      <br />
      <br />
      <div>EXCHANGE APP</div>
      <br />
      <br />
      <LiveRate fromCurrency={'EUR'} toCurrency={'GBP'} conversionRate={exchangeRate} />
      <br />
      <br />
      <Button>Exchange</Button>
    </Layout>
  );
};
export { Exchange };
