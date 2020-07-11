import { Data, Error } from './index';
import { actionTypes } from 'constants/actionTypes';

export type ExchangeRate = {
  [key: string]: number;
};

export type ExchangeRateResponse = {
  rates: ExchangeRate;
  base: string;
  date: string;
};

//will be used for initial state in reducer
export interface ExchangeRateState extends Data {
  data: ExchangeRate;
  error: Error | null;
}

export type ExchangeRatesActionTypes =
  | actionTypes.FETCH_RATES_BEGIN
  | actionTypes.FETCH_RATES_SUCCESS
  | actionTypes.FETCH_RATES_FAILURE
  | null;

// will be used in reducer for assigning to initial action
export type ExchangeRatesTypes = {
  type: ExchangeRatesActionTypes;
  payload: ExchangeRate;
  error: Error | null;
};
