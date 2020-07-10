import { createStore, applyMiddleware, AnyAction } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { rootReducer, RootState } from 'reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export type DispatchFunctionType = ThunkDispatch<
  RootState,
  undefined,
  AnyAction
>;

const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware<DispatchFunctionType, RootState>(thunkMiddleware),
  ),
);
