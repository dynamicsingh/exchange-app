import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { pocketTransactionPayload } from 'shared/utils/mockData';
import { actionTypes } from 'constants/actionTypes';
import { doPocketTransaction } from '../pocketTransactionAction';
import { AnyAction } from 'redux';

const middlewares = [reduxThunk];
const mockStore = configureMockStore(middlewares);

describe('pocket Transaction Actions', () => {
  it('creates EXCHANGE_SUCCESS after successfully fetching themes', () => {
    const expectedActions = [
      { type: actionTypes.EXCHANGE_BEGIN },
      {
        type: actionTypes.EXCHANGE_SUCCESS,
        payload: pocketTransactionPayload,
        error: null,
      },
    ];

    const store = mockStore({ pockets: {} });

    return store
      .dispatch(doPocketTransaction(pocketTransactionPayload) as AnyAction)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
