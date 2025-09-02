import { takeLatest, put, select } from 'redux-saga/effects';
import * as actionTypes from './cartActionTypes';
import * as actions from './cartActions';

// This saga demonstrates how you could add logic before updating the state,
// for example, checking if an item already exists.
function* addToCartSaga(action) {
 try {
  const { items } = yield select(state => state.cart);
  const existingItemIndex = items.findIndex(
   item => item.id === action.payload.id,
  );

  if (existingItemIndex > -1) {
   // Item exists, update quantity
   const updatedItem = {
    ...items[existingItemIndex],
    quantity: items[existingItemIndex].quantity + action.payload.quantity,
   };
   yield put(actions.updateCartItemSuccess(updatedItem));
  } else {
   // New item, add to cart
   yield put(actions.addToCartSuccess(action.payload));
  }
 } catch (error) {
  yield put(actions.addToCartFailure(error.message));
 }
}

function* removeFromCartSaga(action) {
 try {
  // In a real app, you might call an API here.
  yield put(actions.removeFromCartSuccess(action.payload));
 } catch (error) {
  yield put(actions.removeFromCartFailure(error.message));
 }
}

function* updateCartItemSaga(action) {
 try {
  // In a real app, you might call an API here.
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
