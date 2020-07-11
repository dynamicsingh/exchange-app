import { actionBegin, actionSuccess, actionFailure } from '../commonActions';
import { actionTypes } from 'constants/actionTypes';
import { error, pocketData } from 'shared/utils/mockData';

describe('commonActions', () => {
  it('dispatches actionBegin', () => {
    const expectedAction = {
      type: actionTypes.FETCH_RATES_BEGIN,
    };
    expect(actionBegin(actionTypes.FETCH_RATES_BEGIN)).toEqual(expectedAction);
  });
  it('dispatches actionSuccess', () => {
    const expectedAction = {
      type: actionTypes.FETCH_RATES_SUCCESS,
      payload: pocketData.data,
      error: null,
    };
    expect(
      actionSuccess(actionTypes.FETCH_RATES_SUCCESS, pocketData.data),
    ).toEqual(expectedAction);
  });
  it('dispatches actionFailure', () => {
    const expectedAction = {
      type: actionTypes.FETCH_RATES_FAILURE,
      error: error,
    };
    expect(actionFailure(actionTypes.FETCH_RATES_FAILURE, error)).toEqual(
      expectedAction,
    );
  });
});
