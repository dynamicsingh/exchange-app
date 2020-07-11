import { ExchangeRate } from 'models/exchangeRates';
import { PocketInput } from 'models/pockets';
import { actionTypes } from 'constants/actionTypes';
import { Error } from 'models';

type Payload = ExchangeRate | PocketInput | null;
type ErrorType = Error | null;

interface Action {
  type: actionTypes;
  payload?: Payload;
  error?: ErrorType;
}

const actionBegin = (type: actionTypes): Action => ({
  type,
});

const actionSuccess = (type: actionTypes, data: Payload): Action => ({
  type,
  payload: data,
  error: null,
});

const actionFailure = (type: actionTypes, error: ErrorType): Action => {
  return {
    type,
    error: error,
  };
};

export { actionBegin, actionSuccess, actionFailure };
