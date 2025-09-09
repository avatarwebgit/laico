import { call, put, takeLatest, select } from "redux-saga/effects";
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

    const isAuthenticated = yield select((state) => state.auth.isAuthenticated);

    notify("در حال افزودن به سبد خرید...", "info");

    const response = yield call(api.addToCart, cartData);

    if (!isAuthenticated && response.data && response.data.cart_token) {
      const existingCartToken = localStorage.getItem("cartToken");
      if (!existingCartToken) {
        localStorage.setItem("cartToken", response.data.cart_token);
      }
    }

    const updatedCart = yield call(api.getCart);
    yield put(
      actions.fetchCartSuccess(updatedCart.data || { items: [], summary: null })
    );
    yield put(openCartDrawer());
    notify("محصول به سبد خرید اضافه شد", "success");
  } catch (error) {
    const errorMessage = error.message || "خطا در افزودن به سبد خرید";
    yield put(actions.addToCartFailure(errorMessage));
    notify(errorMessage, "error");
  }
}

function* updateCartItemSaga(action) {
  try {
    const { cartId, quantity } = action.payload;
    const promise = api.updateCartItem(cartId, { quantity });
    yield call(() =>
      notify.promise(promise, {
        pending: "در حال بروزرسانی سبد خرید...",
        success: "سبد خرید با موفقیت بروزرسانی شد",
        error: "خطا در بروزرسانی سبد خرید",
      })
    );

    const response = yield call(api.getCart);
    yield put(
      actions.updateCartItemSuccess(response || { items: [], summary: null })
    );
  } catch (error) {
    yield put(actions.updateCartItemFailure(error.message));
  }
}

function* removeFromCartSaga(action) {
  try {
    const promise = api.removeFromCart(action.payload);
    yield call(() =>
      notify.promise(promise, {
        pending: "در حال حذف از سبد خرید...",
        success: "محصول از سبد خرید حذف شد",
        error: "خطا در حذف محصول",
      })
    );
    const response = yield call(api.getCart);
    yield put(
      actions.removeFromCartSuccess(
        response.data || { items: [], summary: null }
      )
    );
  } catch (error) {
    yield put(actions.removeFromCartFailure(error.message));
  }
}

export function* cartSaga() {
  yield takeLatest(actionTypes.FETCH_CART_REQUEST, fetchCartSaga);
  yield takeLatest(actionTypes.ADD_TO_CART_REQUEST, addToCartSaga);
  yield takeLatest(actionTypes.UPDATE_CART_ITEM_REQUEST, updateCartItemSaga);
  yield takeLatest(actionTypes.REMOVE_FROM_CART_REQUEST, removeFromCartSaga);
}
