import { takeLatest, put, call } from 'redux-saga/effects';
import * as actionTypes from './authActionTypes';
import * as actions from './authActions';
import api from '../../api/auth';

function* loginSaga(action) {
 try {
  const response = yield call(api.login, action.payload);
  // Assuming response contains user and token
  yield put(actions.loginSuccess(response));
  localStorage.setItem('authToken', response.token);
 } catch (error) {
  yield put(actions.loginFailure(error.message));
 }
}

function* registerSaga(action) {
 try {
  const response = yield call(api.register, action.payload);
  // Assuming response contains user and token
  yield put(actions.registerSuccess(response));
  localStorage.setItem('authToken', response.token);
 } catch (error) {
  yield put(actions.registerFailure(error.message));
 }
}

function* logoutSaga() {
 try {
  yield call(api.logout);
  yield put(actions.logoutSuccess());
  localStorage.removeItem('authToken');
 } catch (error) {
  yield put(actions.logoutFailure(error.message));
 }
}

export function* authSaga() {
 yield takeLatest(actionTypes.LOGIN_REQUEST, loginSaga);
 yield takeLatest(actionTypes.REGISTER_REQUEST, registerSaga);
 yield takeLatest(actionTypes.LOGOUT_REQUEST, logoutSaga);
}
