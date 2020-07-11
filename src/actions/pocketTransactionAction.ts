import {
  actionBegin,
  actionSuccess,
  actionFailure,
} from 'actions/commonActions';
import { actionTypes } from 'constants/actionTypes';
import { toast } from 'react-toastify';
import { getCurrencySymbol } from 'shared/utils/currency';
import { PocketInput } from 'models/pockets';
import { AppThunk, Dispatch } from './types';

export const doPocketTransaction = (
  exchangePayLoad: PocketInput,
): AppThunk => async (dispatch: Dispatch): Promise<void> => {
  dispatch(actionBegin(actionTypes.EXCHANGE_BEGIN));
  try {
    const { sourceCurrency, destinationCurrency } = exchangePayLoad;
    dispatch(actionSuccess(actionTypes.EXCHANGE_SUCCESS, exchangePayLoad));

    toast.success(
      `Conversion of ${sourceCurrency.amount} ${getCurrencySymbol(
        sourceCurrency.currency,
      )} to ${destinationCurrency.amount}  ${getCurrencySymbol(
        destinationCurrency.currency,
      )} successful!`,
      {
        hideProgressBar: true,
        position: toast.POSITION.TOP_CENTER,
      },
    );
  } catch (error) {
    dispatch(actionFailure(actionTypes.EXCHANGE_FAILURE, error));
    toast.error(`Conversion failed!`, {
      hideProgressBar: true,
      position: toast.POSITION.TOP_CENTER,
    });
  }
};
