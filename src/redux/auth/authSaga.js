import { takeLatest, put, call } from 'redux-saga/effects';
import * as actionTypes from './authActionTypes';
import * as actions from './authActions';
import api from '../../api/auth';

function* loginSaga(action) {
 try {
  const user = yield call(api.login, action.payload);
  yield put(actions.loginSuccess(user));
 } catch (error) {
  yield put(actions.loginFailure(error.message));
 }
}

function* registerSaga(action) {
 try {
  const user = yield call(api.register, action.payload);
  yield put(actions.registerSuccess(user));
 } catch (error) {
  yield put(actions.registerFailure(error.message));
 }
}

function* logoutSaga() {
 try {
  yield call(api.logout);
  yield put(actions.logoutSuccess());
 } catch (error) {
  yield put(actions.logoutFailure(error.message));
 }
}

export function* authSaga() {
 yield takeLatest(actionTypes.LOGIN_REQUEST, loginSaga);
 yield takeLatest(actionTypes.REGISTER_REQUEST, registerSaga);
 yield takeLatest(actionTypes.LOGOUT_REQUEST, logoutSaga);
}
