/* eslint-disable import/no-unresolved */
import { combineReducers } from 'redux';
import { commonReducer } from 'redux/slices/common.slice';
import { userReducer } from 'redux/slices/user.slice';
import {storeReducer} from '../slices/store.slice';

const rootReducer = combineReducers({
  store: storeReducer,
  user: userReducer,
  common: commonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
