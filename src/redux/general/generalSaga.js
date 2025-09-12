import { takeLatest, put, call } from "redux-saga/effects";
import * as actionTypes from "./generalActionTypes";
import * as actions from "./generalActions";
import api from "../../api/general";

function* fetchInstallmentGatewaysSaga() {
  try {
    const response = yield call(api.getInstallmentGateways);
    yield put(actions.fetchInstallmentGatewaysSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchInstallmentGatewaysFailure(error.message));
  }
}

export function* generalSaga() {
  yield takeLatest(
    actionTypes.FETCH_INSTALLMENT_GATEWAYS_REQUEST,
    fetchInstallmentGatewaysSaga
  );
}
