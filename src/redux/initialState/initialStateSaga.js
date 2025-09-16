import { takeLatest, put, call } from "redux-saga/effects";
import * as actionTypes from "./initialStateActionTypes";
import * as actions from "./initialStateActions";
import api from "../../api/general";

function* fetchInitialStateSaga() {
  try {
    const response = yield call(api.getSettings);
    yield put(actions.fetchInitialStateSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchInitialStateFailure(error.message));
  }
}

export function* initialStateSaga() {
  yield takeLatest(
    actionTypes.FETCH_INITIAL_STATE_REQUEST,
    fetchInitialStateSaga
  );
}