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
    const response = yield call(api.getById, action.payload);
    console.log(action, response);
    if (response.status) {
      yield put(actions.fetchProductDetailsSuccess(response.data));
    } else {
      yield put(
        actions.fetchProductDetailsFailure(
          response.message || "Failed to fetch product details"
        )
      );
    }
  } catch (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error.message || "An unknown error occurred";
    yield put(actions.fetchProductDetailsFailure(errorMessage));
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
