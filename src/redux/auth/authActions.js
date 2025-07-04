import * as actionTypes from './authActionTypes';

export const loginRequest = credentials => ({
 type: actionTypes.LOGIN_REQUEST,
 payload: credentials,
});

export const loginSuccess = user => ({
 type: actionTypes.LOGIN_SUCCESS,
 payload: user,
});

export const loginFailure = error => ({
 type: actionTypes.LOGIN_FAILURE,
 payload: error,
});

export const registerRequest = userData => ({
 type: actionTypes.REGISTER_REQUEST,
 payload: userData,
});

export const registerSuccess = user => ({
 type: actionTypes.REGISTER_SUCCESS,
 payload: user,
});

export const registerFailure = error => ({
 type: actionTypes.REGISTER_FAILURE,
 payload: error,
});

export const logoutRequest = () => ({
 type: actionTypes.LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
 type: actionTypes.LOGOUT_SUCCESS,
});

export const logoutFailure = error => ({
 type: actionTypes.LOGOUT_FAILURE,
 payload: error,
});
