import { exchangeRateReducer, initialState } from '../exchangeRateReducer';
import { actionTypes } from 'constants/actionTypes';
import { exchangeRatesData, error } from 'shared/utils/mockData';

describe('exchange rate', () => {
  it('has a default state', () => {
    expect(
      exchangeRateReducer(undefined, { type: null, payload: {}, error: null }),
    ).toEqual(initialState);
  });

  it('checks begin state', () => {
    const state = {
      ...initialState,
      loading: true,
    };
    expect(
      exchangeRateReducer(undefined, {
        type: actionTypes.FETCH_RATES_BEGIN,
        payload: {},
        error: null,
      }),
    ).toEqual(state);
  });

  it('checks success state', () => {
    const expectedState = {
      ...initialState,
      data: { ...initialState.data, ...exchangeRatesData.data.rates },
      loading: false,
      error: null,
    };
    expect(
      exchangeRateReducer(initialState, {
        type: actionTypes.FETCH_RATES_SUCCESS,
        payload: exchangeRatesData.data.rates,
        error: null,
      }),
    ).toEqual(expectedState);
  });

  it('checks failure state', () => {
    const expectedState = {
      ...initialState,
      error: error,
      loading: false,
      data: {},
    };
    expect(
      exchangeRateReducer(initialState, {
        type: actionTypes.FETCH_RATES_FAILURE,
        error: error,
        payload: {},
      }),
    ).toEqual(expectedState);
  });
});
