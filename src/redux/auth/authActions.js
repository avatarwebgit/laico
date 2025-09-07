import * as actionTypes from "./authActionTypes";

export const loginRequest = (credentials) => ({
  type: actionTypes.LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: error,
});

export const registerRequest = (userData) => ({
  type: actionTypes.REGISTER_REQUEST,
  payload: userData,
});

export const registerSuccess = (user) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: actionTypes.REGISTER_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({
  type: actionTypes.LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: actionTypes.LOGOUT_FAILURE,
  payload: error,
});

export const setToken = (token) => ({
  type: actionTypes.SET_TOKEN,
  payload: token,
});

export const removeToken = () => ({
  type: actionTypes.REMOVE_TOKEN,
});

export const sendOtpRequest = (mobile) => ({
  type: actionTypes.SEND_OTP_REQUEST,
  payload: { mobile },
});

export const sendOtpSuccess = () => ({
  type: actionTypes.SEND_OTP_SUCCESS,
});

export const sendOtpFailure = (error) => ({
  type: actionTypes.SEND_OTP_FAILURE,
  payload: error,
});

export const verifyOtpRequest = (mobile, otp) => ({
  type: actionTypes.VERIFY_OTP_REQUEST,
  payload: { mobile, otp },
});
