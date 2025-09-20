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

function* fetchCartCheckoutSaga() {
  try {
    const response = yield call(api.getCartCheckoutDetails);
    yield put(
      actions.fetchCartCheckoutSuccess(
        response.data || { items: [], summary: null }
      )
    );
  } catch (error) {
    yield put(actions.fetchCartCheckoutFailure(error.message));
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

    const promise = api.addToCart(cartData);

    const response = yield call(() =>
      notify.promise(promise, {
        pending: "در حال افزودن به سبد خرید...",
        success: "محصول به سبد خرید اضافه شد",
        error: "خطا در افزودن به سبد خرید",
      })
    );

    if (!isAuthenticated && response.data && response.data.cart_token) {
      const existingCartToken = localStorage.getItem("cartToken");
      if (!existingCartToken) {
        localStorage.setItem("cartToken", response.data.cart_token);
      }
    }

    yield put(
      actions.fetchCartSuccess(response.data || { items: [], summary: null })
    );
    yield put(openCartDrawer());
  } catch (error) {
    const errorMessage = error.message || "خطا در افزودن به سبد خرید";
    yield put(actions.addToCartFailure(errorMessage));
  }
}

function* updateCartItemSaga(action) {
  try {
    const { cartId, quantity } = action.payload;
    const promise = api.updateCartItem(cartId, { quantity });

    const response = yield call(() =>
      notify.promise(promise, {
        pending: "در حال بروزرسانی سبد خرید...",
        success: "سبد خرید با موفقیت بروزرسانی شد",
        error: "خطا در بروزرسانی سبد خرید",
      })
    );

    yield put(
      actions.updateCartItemSuccess(
        response.data || { items: [], summary: null }
      )
    );
  } catch (error) {
    yield put(actions.updateCartItemFailure(error.message));
  }
}

function* removeFromCartSaga(action) {
  try {
    const promise = api.removeFromCart(action.payload);

    const response = yield call(() =>
      notify.promise(promise, {
        pending: "در حال حذف از سبد خرید...",
        success: "محصول از سبد خرید حذف شد",
        error: "خطا در حذف محصول",
      })
    );

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
  yield takeLatest(
    actionTypes.FETCH_CART_CHECKOUT_REQUEST,
    fetchCartCheckoutSaga
  );
  yield takeLatest(actionTypes.ADD_TO_CART_REQUEST, addToCartSaga);
  yield takeLatest(actionTypes.UPDATE_CART_ITEM_REQUEST, updateCartItemSaga);
  yield takeLatest(actionTypes.REMOVE_FROM_CART_REQUEST, removeFromCartSaga);
}
