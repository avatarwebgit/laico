import { takeLatest, put, call } from "redux-saga/effects";
import * as actionTypes from "./productActionTypes";
import * as actions from "./productActions";
import api from "../../api/products";

function* fetchProductsSaga() {
  try {
    const products = yield call(api.getAll);
    yield put(actions.fetchProductsSuccess(products));
  } catch (error) {
    yield put(actions.fetchProductsFailure(error.message));
  }
}

function* fetchHomeProductsSaga() {
  try {
    const products = yield call(api.getHomeProducts);
    yield put(actions.fetchHomeProductsSuccess(products.data));
  } catch (error) {
    yield put(actions.fetchHomeProductsFailure(error.message));
  }
}

function* fetchProductDetailsSaga(action) {
  try {
    const product = yield call(api.getById, action.payload);
    yield put(actions.fetchProductDetailsSuccess(product));
  } catch (error) {
    yield put(actions.fetchProductDetailsFailure(error.message));
  }
}

export function* productSaga() {
  yield takeLatest(actionTypes.FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeLatest(
    actionTypes.FETCH_HOME_PRODUCTS_REQUEST,
    fetchHomeProductsSaga
  );
  yield takeLatest(
    actionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
    fetchProductDetailsSaga
  );
}
