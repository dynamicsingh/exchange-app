import { createStore, applyMiddleware, AnyAction } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { rootReducer, RootState } from 'reducers';
import { initialState as exchangeInitialState } from 'reducers/exchangeRateReducer';
import { initialState as pocketInitialState } from 'reducers/pocketReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export type DispatchFunctionType = ThunkDispatch<
  RootState,
  undefined,
  AnyAction
>;

const initialState = {
  exchangeRates: exchangeInitialState,
  pockets: pocketInitialState,
};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware<DispatchFunctionType, RootState>(thunkMiddleware),
  ),
);
