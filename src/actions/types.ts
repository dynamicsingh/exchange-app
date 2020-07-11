import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';
import { Action } from 'redux';

export type AppThunk = Action | ThunkAction<void, RootState, void, Action>;
export type Dispatch = ThunkDispatch<{}, {}, Action>;
