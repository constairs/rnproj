import { spawn } from 'redux-saga/effects';
import { userSagas } from './users/sagas';
import { issuesSagas } from './issues/sagas';

export function* rootSaga() {
  yield spawn(userSagas);
  yield spawn(issuesSagas);
}
