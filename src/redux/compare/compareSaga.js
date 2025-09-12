import { takeLatest, put, select, call } from "redux-saga/effects";
import * as actionTypes from "./compareActionTypes";

function* handleToggleCompare(action) {
  const product = action.payload;
  const { items } = yield select((state) => state.compare);

  const exists = items.find((item) => item.id === product.id);

  if (exists) {
    yield put({
      type: actionTypes.REMOVE_FROM_COMPARE_SUCCESS,
      payload: product.id,
    });
  } else {
    if (items.length >= 6) {
      return;
    }
    yield put({ type: actionTypes.ADD_TO_COMPARE_SUCCESS, payload: product });
  }
}

function* handleRemoveFromCompare(action) {
  const productId = action.payload;
  yield put({
    type: actionTypes.REMOVE_FROM_COMPARE_SUCCESS,
    payload: productId,
  });
}

function* handleClearCompare() {
  yield put({ type: actionTypes.CLEAR_COMPARE_SUCCESS });
}

export function* compareSaga() {
  yield takeLatest(actionTypes.TOGGLE_COMPARE_REQUEST, handleToggleCompare);
  yield takeLatest(
    actionTypes.REMOVE_FROM_COMPARE_REQUEST,
    handleRemoveFromCompare
  );
  yield takeLatest(actionTypes.CLEAR_COMPARE_REQUEST, handleClearCompare);
}
