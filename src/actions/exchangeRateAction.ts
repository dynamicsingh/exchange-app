import {
  actionBegin,
  actionSuccess,
  actionFailure,
} from 'actions/commonActions';
import axios from 'axios';
import { API_ENDPOINT } from 'constants/urls';
import { actionTypes } from 'constants/actionTypes';
import { AppThunk, Dispatch } from './types';

export const getExchangeRates = (): AppThunk => async (
  dispatch: Dispatch,
): Promise<void> => {
  dispatch(actionBegin(actionTypes.FETCH_RATES_BEGIN));
  try {
    const { data } = await axios.get(`${API_ENDPOINT}/latest?symbols=USD,GBP`);
    dispatch(actionSuccess(actionTypes.FETCH_RATES_SUCCESS, data?.rates));
  } catch (error) {
    dispatch(actionFailure(actionTypes.FETCH_RATES_FAILURE, error));
  }
};
