import { takeLatest, put, select } from 'redux-saga/effects';
import * as actionTypes from './cartActionTypes';
import * as actions from './cartActions';

function* addToCartSaga(action) {
 try {
  const { items } = yield select(state => state.cart);
  const existingItem = items.find(item => item.id === action.payload.id);

  if (existingItem) {
   yield put(
    actions.updateCartItemSuccess({
     ...existingItem,
     quantity: existingItem.quantity + 1,
    }),
   );
  } else {
   yield put(actions.addToCartSuccess(action.payload));
  }
 } catch (error) {
  yield put(actions.addToCartFailure(error.message));
 }
}

function* removeFromCartSaga(action) {
 try {
  yield put(actions.removeFromCartSuccess(action.payload));
 } catch (error) {
  yield put(actions.removeFromCartFailure(error.message));
 }
}

function* updateCartItemSaga(action) {
 try {
  yield put(actions.updateCartItemSuccess(action.payload));
 } catch (error) {
  yield put(actions.updateCartItemFailure(error.message));
 }
}

export function* cartSaga() {
 yield takeLatest(actionTypes.ADD_TO_CART_REQUEST, addToCartSaga);
 yield takeLatest(actionTypes.REMOVE_FROM_CART_REQUEST, removeFromCartSaga);
 yield takeLatest(actionTypes.UPDATE_CART_ITEM_REQUEST, updateCartItemSaga);
}
