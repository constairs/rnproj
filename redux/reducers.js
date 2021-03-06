import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { user } from './users/reducer';
import { issues } from './issues/reducer';

const users = persistReducer(
  { key: 'user', storage },
  user
);


export const rootReducer = combineReducers({
  users,
  issues
});
