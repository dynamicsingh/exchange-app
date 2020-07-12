import { combineReducers } from 'redux';
import { exchangeRateReducer } from './exchangeRateReducer';
import { pocketReducer } from './pocketReducer';

export const rootReducer = combineReducers({
  exchangeRates: exchangeRateReducer,
  pockets: pocketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
