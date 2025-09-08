import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/cart";
import { notify } from "../../utils/helperFucntions";
import { openCartDrawer } from "../drawer/drawerActions";
import * as actionTypes from "./cartActionTypes";
import * as actions from "./cartActions";

function* fetchCartSaga() {
  try {
    const response = yield call(api.getCart);
    yield put(
      actions.fetchCartSuccess(response.data || { items: [], summary: null })
    );
  } catch (error) {
    yield put(actions.fetchCartFailure(error.message));
  }
}

function* addToCartSaga(action) {
  try {
    const { product_id, quantity, variation_id } = action.payload;
    const cartData = { product_id, quantity };
    if (variation_id) {
      cartData.variation_id = variation_id;
    }
    yield call(api.updateCart, cartData);
    const response = yield call(api.getCart);
    yield put(
      actions.fetchCartSuccess(response.data || { items: [], summary: null })
    );
    yield put(openCartDrawer());
    notify("محصول به سبد خرید اضافه شد", "success");
  } catch (error) {
    yield put(actions.addToCartFailure(error.message));
    notify("خطا در افزودن به سبد خرید", "error");
  }
}

function* updateCartItemSaga(action) {
  try {
    const { cartId, quantity } = action.payload;
    yield call(api.updateCartItem, cartId, { quantity });
    const response = yield call(api.getCart);
    yield put(
      actions.updateCartItemSuccess(
        response.data || { items: [], summary: null }
      )
    );
    notify("سبد خرید با موفقیت بروزرسانی شد", "success");
  } catch (error) {
    yield put(actions.updateCartItemFailure(error.message));
    notify("خطا در بروزرسانی سبد خرید", "error");
  }
}

function* removeFromCartSaga(action) {
  try {
    yield call(api.removeFromCart, action.payload);
    const response = yield call(api.getCart);
    yield put(
      actions.removeFromCartSuccess(
        response.data || { items: [], summary: null }
      )
    );
    notify("محصول از سبد خرید حذف شد.", "success");
  } catch (error) {
    yield put(actions.removeFromCartFailure(error.message));
    notify("خطا در حذف محصول.", "error");
  }
}

export function* cartSaga() {
  yield takeLatest(actionTypes.FETCH_CART_REQUEST, fetchCartSaga);
  yield takeLatest(actionTypes.ADD_TO_CART_REQUEST, addToCartSaga);
  yield takeLatest(actionTypes.UPDATE_CART_ITEM_REQUEST, updateCartItemSaga);
  yield takeLatest(actionTypes.REMOVE_FROM_CART_REQUEST, removeFromCartSaga);
}
