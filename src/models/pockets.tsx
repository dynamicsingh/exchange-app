import { Data, Error } from './index';
import { actionTypes } from 'constants/actionTypes';

export type Pocket = {
  [key: string]: number;
};

export type CurrencyCode = 'GBP' | 'EUR' | 'USD';

//will be used for initial state in reducer
export interface PocketState extends Data {
  data: Pocket;
  success: boolean | null;
  error: Error | null;
}

export type PocketActionTypes =
  | actionTypes.EXCHANGE_BEGIN
  | actionTypes.EXCHANGE_SUCCESS
  | actionTypes.EXCHANGE_FAILURE
  | null;

export type PocketContent = {
  currency: CurrencyCode;
  amount: number;
};

export type PocketInput = {
  sourceCurrency: PocketContent;
  destinationCurrency: PocketContent;
  rate: number;
};

// will be used in reducer for assigning to initial action
export type PocketTypes = {
  type: PocketActionTypes;
  payload: PocketInput;
  error: Error | null;
};
