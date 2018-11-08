import * as TYPES from './types';

export const fetchUsersRequest = () => ({
  type: TYPES.FETCH_USERS_REQUEST
});
export const fetchUsersSuccessed = fetchResponse => ({
  type: TYPES.FETCH_USERS_SUCCESSED,
  payload: fetchResponse
});
export const fetchUsersFailed = error => ({
  type: TYPES.FETCH_USERS_FAILED,
  payload: error
});

export const userLoginRequest = userData => ({
  type: TYPES.USER_LOGIN_REQUEST,
  payload: userData
});
export const userLoginSuccessed = loginResponse => ({
  type: TYPES.USER_LOGIN_SUCCESSED,
  payload: loginResponse
});
export const userLoginFailed = error => ({
  type: TYPES.USER_LOGIN_FAILED,
  payload: error
});

export const userLogoutRequest = () => ({
  type: TYPES.USER_LOGOUT_REQUEST
});
export const userLogoutSuccessed = logoutResponse => ({
  type: TYPES.USER_LOGOUT_SUCCESSED,
  payload: logoutResponse
});
export const userLogoutFailed = error => ({
  type: TYPES.USER_LOGOUT_FAILED,
  payload: error
});

export const userCreateRequest = userData => ({
  type: TYPES.USER_CREATE_REQUEST,
  payload: userData
});
export const userCreateSuccessed = createResponse => ({
  type: TYPES.USER_CREATE_SUCCESSED,
  payload: createResponse
});
export const userCreateFailed = error => ({
  type: TYPES.USER_CREATE_FAILED,
  payload: error
});

export const userDeleteRequest = () => ({
  type: TYPES.USER_DELETE_REQUEST
});
export const userDeleteSuccessed = deleteResponse => ({
  type: TYPES.USER_DELETE_SUCCESSED,
  payload: deleteResponse
});
export const userDeleteFailed = error => ({
  type: TYPES.USER_DELETE_FAILED,
  payload: error
});

export const userUpdateRequest = updateUserData => ({
  type: TYPES.USER_UPDATE_REQUEST,
  payload: updateUserData
});
export const userUpdateSuccessed = logoutResponse => ({
  type: TYPES.USER_UPDATE_SUCCESSED,
  payload: logoutResponse
});
export const userUpdateFailed = error => ({
  type: TYPES.USER_UPDATE_FAILED,
  payload: error
});

export const updateEmailRequest = newEmail => ({
  type: TYPES.UPDATE_EMAIL_REQUEST,
  payload: newEmail
});
export const updateEmailSuccessed = updateResponse => ({
  type: TYPES.UPDATE_EMAIL_SUCCESSED,
  payload: updateResponse
});
export const updateEmailFailed = error => ({
  type: TYPES.UPDATE_EMAIL_FAILED,
  payload: error
});

export const updatePasswordRequest = newPassword => ({
  type: TYPES.UPDATE_PASSWORD_REQUEST,
  payload: newPassword
});
export const updatePasswordSuccessed = deleteResponse => ({
  type: TYPES.UPDATE_PASSWORD_SUCCESSED,
  payload: deleteResponse
});
export const updatePasswordFailed = error => ({
  type: TYPES.UPDATE_PASSWORD_FAILED,
  payload: error
});

export const resetPaswordRequest = email => ({
  type: TYPES.RESET_PASSWORD_REQUEST,
  payload: email
});
export const resetPaswordSuccessed = resetResponse => ({
  type: TYPES.RESET_PASSWORD_SUCCESSED,
  payload: resetResponse
});
export const resetPaswordFailed = error => ({
  type: TYPES.RESET_PASSWORD_FAILED,
  payload: error
});