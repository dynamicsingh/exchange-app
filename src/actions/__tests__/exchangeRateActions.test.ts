import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import moxios from 'moxios';
import { error, exchangeRatesData } from 'shared/utils/mockData';
import { actionTypes } from 'constants/actionTypes';
import { getExchangeRates } from '../exchangeRateAction';
import { AnyAction } from 'redux';

const middlewares = [reduxThunk];
const mockStore = configureMockStore(middlewares);

describe('Reviews Action', () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('creates FETCH_RATES_SUCCESS after successfully fetching exchange rates', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: exchangeRatesData.data,
      });
    });

    const expectedActions = [
      { type: actionTypes.FETCH_RATES_BEGIN },
      {
        type: actionTypes.FETCH_RATES_SUCCESS,
        payload: exchangeRatesData.data.rates,
        error: null,
      },
    ];

    const store = mockStore({ exchangeRates: {} });
    return store.dispatch(getExchangeRates() as AnyAction).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_RATES_FAILURE after failure in fetching exchange rates', () => {
    moxios.wait(() => {
      const request: any = moxios.requests.mostRecent();
      request.reject(error);
    });

    const expectedActions = [
      { type: actionTypes.FETCH_RATES_BEGIN },
      { type: actionTypes.FETCH_RATES_FAILURE, error },
    ];

    const store = mockStore({ exchangeRates: {} });

    return store.dispatch(getExchangeRates() as AnyAction).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
