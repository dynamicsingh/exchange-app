import { pocketReducer, initialState } from '../pocketReducer';
import { actionTypes } from 'constants/actionTypes';
import { pocketTransactionPayload, error } from 'shared/utils/mockData';

describe('pocket reducer', () => {
  it('has a default state', () => {
    expect(
      pocketReducer(undefined, {
        type: null,
        payload: pocketTransactionPayload,
        error: null,
      }),
    ).toEqual(initialState);
  });

  it('checks begin state', () => {
    const state = {
      ...initialState,
      loading: true,
      success: null,
    };
    expect(
      pocketReducer(undefined, {
        type: actionTypes.EXCHANGE_BEGIN,
        payload: pocketTransactionPayload,
        error: null,
      }),
    ).toEqual(state);
  });

  it('checks success state', () => {
    const expectedState = {
      ...initialState,
      data: { EUR: 890, GBP: 608.987, USD: 300.63 },
      loading: false,
      success: true,
      error: null,
    };
    expect(
      pocketReducer(initialState, {
        type: actionTypes.EXCHANGE_SUCCESS,
        payload: pocketTransactionPayload,
        error: null,
      }),
    ).toEqual(expectedState);
  });

  it('checks failure state', () => {
    const expectedState = {
      ...initialState,
      error: error,
      loading: false,
      success: false,
      data: {},
    };
    expect(
      pocketReducer(initialState, {
        type: actionTypes.EXCHANGE_FAILURE,
        error: error,
        payload: pocketTransactionPayload,
      }),
    ).toEqual(expectedState);
  });
});
