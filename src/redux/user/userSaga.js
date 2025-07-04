import { takeLatest, put, call } from 'redux-saga/effects';
import * as actionTypes from './userActionTypes';
import * as actions from './userActions';
import api from '../../api/user';

function* fetchUserProfileSaga(action) {
 try {
  const profile = yield call(api.fetchUserProfile, action.payload);
  yield put(actions.fetchUserProfileSuccess(profile));
 } catch (error) {
  yield put(actions.fetchUserProfileFailure(error.message));
 }
}

function* updateUserProfileSaga(action) {
 try {
  const { userId, profileData } = action.payload;
  const updatedProfile = yield call(api.updateUserProfile, userId, profileData);
  yield put(actions.updateUserProfileSuccess(updatedProfile));
 } catch (error) {
  yield put(actions.updateUserProfileFailure(error.message));
 }
}

export function* userSaga() {
 yield takeLatest(actionTypes.FETCH_USER_PROFILE_REQUEST, fetchUserProfileSaga);
 yield takeLatest(
  actionTypes.UPDATE_USER_PROFILE_REQUEST,
  updateUserProfileSaga,
 );
}
