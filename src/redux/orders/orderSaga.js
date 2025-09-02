import { takeLatest, put, select, call } from 'redux-saga/effects';
import * as actionTypes from './orderActionTypes';
import * as actions from './orderActions';
import api from '../../api/orders';

function* createOrderSaga(action) {
 try {
  const userId = yield select(state => state.auth.user.id);
  const order = yield call(api.createOrder, userId, action.payload);
  yield put(actions.createOrderSuccess(order));
 } catch (error) {
  yield put(actions.createOrderFailure(error.message));
 }
}

function* fetchOrdersSaga(action) {
 try {
  const orders = yield call(api.getOrders, action.payload);
  yield put(actions.fetchOrdersSuccess(orders));
 } catch (error) {
  yield put(actions.fetchOrdersFailure(error.message));
 }
}

function* cancelOrderSaga(action) {
 try {
  const userId = yield select(state => state.auth.user.id);
  // Assuming a cancelOrder API exists
  // yield call(api.cancelOrder, userId, action.payload);
  yield put(actions.cancelOrderSuccess(action.payload));
 } catch (error) {
  yield put(actions.cancelOrderFailure(error.message));
 }
}

export function* orderSaga() {
 yield takeLatest(actionTypes.CREATE_ORDER_REQUEST, createOrderSaga);
 yield takeLatest(actionTypes.FETCH_ORDERS_REQUEST, fetchOrdersSaga);
 yield takeLatest(actionTypes.CANCEL_ORDER_REQUEST, cancelOrderSaga);
}
