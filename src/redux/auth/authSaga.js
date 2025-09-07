import { takeLatest, put, call } from "redux-saga/effects";
import * as actionTypes from "./authActionTypes";
import * as actions from "./authActions";
import api from "../../api/auth";

function* loginSaga(action) {
  try {
    const response = yield call(api.login, action.payload);
    yield put(actions.loginSuccess(response));
    localStorage.setItem("authToken", JSON.stringify(response.token));
  } catch (error) {
    yield put(actions.loginFailure(error.message));
  }
}

function* registerSaga(action) {
  try {
    const response = yield call(api.register, action.payload);
    yield put(actions.registerSuccess(response));
    localStorage.setItem("authToken", JSON.stringify(response.token));
  } catch (error) {
    yield put(actions.registerFailure(error.message));
  }
}

function* logoutSaga() {
  try {
    yield call(api.logout);
    yield put(actions.logoutSuccess());
    localStorage.removeItem("authToken");
  } catch (error) {
    yield put(actions.logoutFailure(error.message));
  }
}

function* sendOtpSaga(action) {
  try {
    yield call(api.sendOtp, action.payload.mobile);
    yield put(actions.sendOtpSuccess());
  } catch (error) {
    yield put(actions.sendOtpFailure(error.message));
  }
}

function* verifyOtpSaga(action) {
  try {
    const { cellphone, otp } = action.payload;
    const response = yield call(api.verifyOtp, cellphone, otp);
    console.log("OTP Verification Response:", response);
    yield put(actions.loginSuccess(response));
    localStorage.setItem("authToken", JSON.stringify(response.token));
  } catch (error) {
    yield put(actions.loginFailure(error.message || "Invalid OTP"));
  }
}

export function* authSaga() {
  yield takeLatest(actionTypes.LOGIN_REQUEST, loginSaga);
  yield takeLatest(actionTypes.REGISTER_REQUEST, registerSaga);
  yield takeLatest(actionTypes.LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(actionTypes.SEND_OTP_REQUEST, sendOtpSaga);
  yield takeLatest(actionTypes.VERIFY_OTP_REQUEST, verifyOtpSaga);
}
