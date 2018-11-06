import { spawn } from 'redux-saga/effects';
import { userSagas } from './users/sagas';

export function* rootSaga() {
  yield spawn(userSagas);
}
