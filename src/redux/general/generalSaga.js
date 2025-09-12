import { takeLatest, put, call } from "redux-saga/effects";
import * as actionTypes from "./generalActionTypes";
import * as actions from "./generalActions";
import api from "../../api/general";
import productsApi from "../../api/products";

function* fetchInstallmentGatewaysSaga() {
  try {
    const response = yield call(api.getInstallmentGateways);
    yield put(actions.fetchInstallmentGatewaysSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchInstallmentGatewaysFailure(error.message));
  }
}

function* fetchHeaderMenusSaga(action) {
  try {
    const response = yield call(api.getHeaderMenus, action.payload);
    yield put(actions.fetchHeaderMenusSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchHeaderMenusFailure(error.message));
  }
}

function* fetchCountriesSaga() {
  try {
    const response = yield call(api.getAllCountries);
    yield put(actions.fetchCountriesSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchCountriesFailure(error.message));
  }
}

function* fetchSearchSaga(action) {
  try {
    const response = yield call(productsApi.search, action.payload);
    yield put(actions.fetchSearchSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchSearchFailure(error.message));
  }
}

export function* generalSaga() {
  yield takeLatest(
    actionTypes.FETCH_INSTALLMENT_GATEWAYS_REQUEST,
    fetchInstallmentGatewaysSaga
  );
  yield takeLatest(
    actionTypes.FETCH_HEADER_MENUS_REQUEST,
    fetchHeaderMenusSaga
  );
  yield takeLatest(actionTypes.FETCH_COUNTRIES_REQUEST, fetchCountriesSaga);
  yield takeLatest(actionTypes.FETCH_SEARCH_REQUEST, fetchSearchSaga);
}
