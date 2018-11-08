import { assoc, assocPath, pipe, values, keys, set, over, lensProp } from 'ramda';
import * as TYPES from './types';
import { createReducer } from '../utils/reducerUtils';

export const initState = {
  userFetching: false,
  email: '',
  photoURL: '',
  displayName: '',
  username: '',
  logged: false,
  users: []
};

const usersLens = lensProp('users');

const fetchUsersRequest = () => assoc('userFetching', true);
const fetchUsersSuccessed = fetchResponse => pipe(
  assoc('userFetching', false),
  set(usersLens, keys(fetchResponse)),
);
const fetchUsersFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error)
);

const userLoginRequest = () => assoc('userFetching', true);
const userLoginSuccessed = loginResponse => pipe(
  assoc('userFetching', false),
  assoc('logged', true),
  assoc('email', loginResponse.user.email),
);
const userLoginFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error)
);

userLogoutRequest = () => assoc('userFetching', true);
userLogoutSuccessed = () => pipe(
  assoc('userFetching', false),
  assoc('logged', false),
  assoc('email', ''),
);
userLogoutFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error)
);

const userCreateRequest = () => assoc('userFetching', true);
const userCreateSuccessed = createResponse => pipe(
  assoc('userFetching', false),
  assoc('logged', true),
  assoc('email', createResponse.user.email)
);
const userCreateFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error)
);

const userDeleteRequest = () => assoc('userFetching', true);
const userDeleteSuccessed = deleteResponse => pipe(
  assoc('userFetching', false),
  assoc('logged', false),
  assoc('email', '')
);
const userDeleteFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error)
);

const userUpdateRequest = () => assoc('userFetching', true);
const userUpdateSuccessed = updateResponse => pipe(
  assoc('userFetching', false),
  assoc('displayName', updateResponse.profileName),
  assoc('photoURL', updateResponse.profileImg),
);
const userUpdateFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error)
);

const updateEmailRequest = () => assoc('userFetching', true);
const updateEmailSuccessed = updateResponse => pipe(
  assoc('userFetching', false),
  assoc('email', updateResponse)
);
const updateEmailFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error)
);

const updatePasswordRequest = () => assoc('userFetching', true);
const updatePasswordSuccessed = updateResponse => pipe(
  assoc('userFetching', false),
);
const updatePasswordFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error)
);

const resetPasswordRequest = () => assoc('userFetching', true);
const resetPasswordSuccessed = resetResponse => pipe(
  assoc('userFetching', false),
);
const resetPasswordFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error)
);

const handlers = {
  [TYPES.FETCH_USERS_REQUEST]: fetchUsersRequest,
  [TYPES.FETCH_USERS_SUCCESSED]: fetchUsersSuccessed,
  [TYPES.FETCH_USERS_FAILED]: fetchUsersFailed,

  [TYPES.USER_LOGIN_REQUEST]: userLoginRequest,
  [TYPES.USER_LOGIN_SUCCESSED]: userLoginSuccessed,
  [TYPES.USER_LOGIN_FAILED]: userLoginFailed,

  [TYPES.USER_LOGOUT_REQUEST]: userLogoutRequest,
  [TYPES.USER_LOGOUT_SUCCESSED]: userLogoutSuccessed,
  [TYPES.USER_LOGOUT_FAILED]: userLogoutFailed,

  [TYPES.USER_CREATE_REQUEST]: userCreateRequest,
  [TYPES.USER_CREATE_SUCCESSED]: userCreateSuccessed,
  [TYPES.USER_CREATE_FAILED]: userCreateFailed,

  [TYPES.USER_UPDATE_REQUEST]: userUpdateRequest,
  [TYPES.USER_UPDATE_SUCCESSED]: userUpdateSuccessed,
  [TYPES.USER_UPDATE_FAILED]: userUpdateFailed,

  [TYPES.USER_DELETE_REQUEST]: userDeleteRequest,
  [TYPES.USER_DELETE_SUCCESSED]: userDeleteSuccessed,
  [TYPES.USER_DELETE_FAILED]: userDeleteFailed,

  [TYPES.UPDATE_EMAIL_REQUEST]: updateEmailRequest,
  [TYPES.UPDATE_EMAIL_SUCCESSED]: updateEmailSuccessed,
  [TYPES.UPDATE_EMAIL_FAILED]: updateEmailFailed,

  [TYPES.UPDATE_PASSWORD_REQUEST]: updatePasswordRequest,
  [TYPES.UPDATE_PASSWORD_SUCCESSED]: updatePasswordSuccessed,
  [TYPES.UPDATE_PASSWORD_FAILED]: updatePasswordFailed,

  [TYPES.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [TYPES.RESET_PASSWORD_SUCCESSED]: resetPasswordSuccessed,
  [TYPES.RESET_PASSWORD_FAILED]: resetPasswordFailed
};

export const user = createReducer(initState, handlers);
