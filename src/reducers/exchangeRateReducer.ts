import { actionTypes } from 'constants/actionTypes';
import { ExchangeRatesTypes, ExchangeRateState } from 'models/exchangeRates';

export const initialState: ExchangeRateState = {
  data: { EUR: 1 },
  loading: false,
  error: null,
};

const exchangeRateReducer = (
  state = initialState,
  action: ExchangeRatesTypes,
): ExchangeRateState => {
  switch (action?.type) {
    case actionTypes.FETCH_RATES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_RATES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, ...action.payload },
      };
    case actionTypes.FETCH_RATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: {},
      };

    default:
      return state;
  }
};

export { exchangeRateReducer };
