import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/cart";
import { notify } from "../../utils/helperFucntions";
import { openCartDrawer } from "../drawer/drawerActions";
import * as actionTypes from "./cartActionTypes";
import * as actions from "./cartActions";

function* fetchCartSaga() {
  try {
    const response = yield call(api.getCart);
    if (response && response.cart) {
      yield put(actions.fetchCartSuccess(response.cart));
    } else {
      yield put(actions.fetchCartSuccess([]));
    }
  } catch (error) {
    yield put(actions.fetchCartFailure(error.message));
  }
}

function* updateCartItemSaga(action) {
  try {
    yield call(api.updateCart, action.payload);
    const response = yield call(api.getCart); 
    if (response && response.cart) {
      yield put(actions.updateCartItemSuccess(response.cart));
    } else {
      yield put(actions.updateCartItemSuccess([]));
    }
    yield put(openCartDrawer());
  } catch (error) {
    yield put(actions.updateCartItemFailure(error.message));
    notify("Failed to update cart.");
  }
}

function* removeFromCartSaga(action) {
  try {
    yield call(api.removeFromCart, action.payload);
    yield put(actions.removeFromCartSuccess(action.payload));
    notify("Item removed from cart.");
  } catch (error) {
    yield put(actions.removeFromCartFailure(error.message));
    notify("Failed to remove item.");
  }
}

export function* cartSaga() {
  yield takeLatest(actionTypes.FETCH_CART_REQUEST, fetchCartSaga);
  yield takeLatest(actionTypes.UPDATE_CART_ITEM_REQUEST, updateCartItemSaga);
  yield takeLatest(actionTypes.REMOVE_FROM_CART_REQUEST, removeFromCartSaga);
}
