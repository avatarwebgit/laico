import { takeLatest, put, select, call } from "redux-saga/effects";
import * as actionTypes from "./compareActionTypes";
import { notify } from "../../utils/helperFucntions";

function* handleAddToCompare(action) {
  const product = action.payload;
  const { items } = yield select((state) => state.compare);

  const exists = items.find((item) => item.id === product.id);

  if (exists) {
    yield call(notify, "محصول از قبل در لیست مقایسه وجود دارد.", "info");
    return;
  }

  if (items.length >= 6) {
    yield call(notify, "لیست مقایسه پر است. حداکثر ۶ محصول.", "error");
    return;
  }

  yield put({ type: actionTypes.ADD_TO_COMPARE_SUCCESS, payload: product });
  yield call(notify, "محصول به لیست مقایسه اضافه شد.", "success");
}

function* handleRemoveFromCompare(action) {
  const productId = action.payload;
  yield put({
    type: actionTypes.REMOVE_FROM_COMPARE_SUCCESS,
    payload: productId,
  });
  yield call(notify, "محصول از لیست مقایسه حذف شد.", "info");
}

function* handleClearCompare() {
  yield put({ type: actionTypes.CLEAR_COMPARE_SUCCESS });
}

export function* compareSaga() {
  yield takeLatest(actionTypes.ADD_TO_COMPARE_REQUEST, handleAddToCompare);
  yield takeLatest(
    actionTypes.REMOVE_FROM_COMPARE_REQUEST,
    handleRemoveFromCompare
  );
  yield takeLatest(actionTypes.CLEAR_COMPARE_REQUEST, handleClearCompare);
}
