import * as actionTypes from "./authActionTypes";

export const loginRequest = (credentials) => ({
  type: actionTypes.LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (token) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: token,
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

export const sendOtpRequest = (cellphone) => ({
  type: actionTypes.SEND_OTP_REQUEST,
  payload: { cellphone },
});

export const sendOtpSuccess = (data) => ({
  type: actionTypes.SEND_OTP_SUCCESS,
  payload: data,
});

export const sendOtpFailure = (error) => ({
  type: actionTypes.SEND_OTP_FAILURE,
  payload: error,
});

export const verifyOtpRequest = (cellphone, otp) => ({
  type: actionTypes.VERIFY_OTP_REQUEST,
  payload: { cellphone, otp },
});
