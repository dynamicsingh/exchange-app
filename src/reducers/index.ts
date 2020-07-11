import { combineReducers } from 'redux';
import {exchangeRateReducer} from "./exchangeRateReducer";

export const rootReducer = combineReducers({
    exchangeRates: exchangeRateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
