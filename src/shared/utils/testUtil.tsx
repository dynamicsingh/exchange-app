import { applyMiddleware, createStore } from 'redux';
import { rootReducer, RootState } from 'reducers';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { completeState } from './mockData';
import { ExchangeRateState } from 'models/exchangeRates';
import { PocketState } from 'models/pockets';
import { DispatchFunctionType } from 'config/store';

const sendInitialState = (
  reducerName: ExchangeRateState | PocketState,
  initialState: ExchangeRateState | PocketState,
) => {
  let newState: RootState = { ...completeState };
  // @ts-ignore
  newState[reducerName] = initialState;
  return newState;
};

//make this util so other component can use it.
const render = (
  ui: ReactElement,
  initialState: RootState = completeState,
  options = {},
) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware<DispatchFunctionType, RootState>(thunkMiddleware),
  );
  const Providers = ({ children }: { children: ReactElement }) => (
    <Provider store={store}>{children}</Provider>
  );
  // @ts-ignore
  return rtlRender(ui, { wrapper: Providers, ...options }, store);
};

export { sendInitialState, render };
