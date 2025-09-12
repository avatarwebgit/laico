import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/installmentCart";
import { notify } from "../../utils/helperFucntions.jsx";
import { openInstallmentCartDrawer } from "../drawer/drawerActions";
import * as actionTypes from "./installmentCartActionTypes";
import * as actions from "./installmentCartActions";

function* fetchInstallmentCartSaga() {
  try {
    const response = yield call(api.getCart);
    yield put(
      actions.fetchInstallmentCartSuccess(
        response.data || { items: [], summary: null }
      )
    );
  } catch (error) {
    yield put(actions.fetchInstallmentCartFailure(error.message));
  }
}

function* addToInstallmentCartSaga(action) {
  try {
    const promise = api.addToCart(action.payload);

    const response = yield call(() =>
      notify.promise(promise, {
        pending: "در حال افزودن به سبد اقساطی...",
        success: "محصول به سبد اقساطی اضافه شد",
        error: "خطا در افزودن به سبد اقساطی",
      })
    );

    yield put(
      actions.addToInstallmentCartSuccess(
        response.data || { items: [], summary: null }
      )
    );
    yield put(openInstallmentCartDrawer());
  } catch (error) {
    const errorMessage = error.message || "خطا در افزودن به سبد اقساطی";
    yield put(actions.addToInstallmentCartFailure(errorMessage));
  }
}

function* updateInstallmentCartItemSaga(action) {
  try {
    const { cartId, quantity } = action.payload;
    const promise = api.updateCartItem(cartId, { quantity });

    const response = yield call(() =>
      notify.promise(promise, {
        pending: "در حال بروزرسانی سبد اقساطی...",
        success: "سبد اقساطی با موفقیت بروزرسانی شد",
        error: "خطا در بروزرسانی سبد اقساطی",
      })
    );

    yield put(
      actions.updateInstallmentCartItemSuccess(
        response.data || { items: [], summary: null }
      )
    );
  } catch (error) {
    yield put(actions.updateInstallmentCartItemFailure(error.message));
  }
}

function* removeFromInstallmentCartSaga(action) {
  try {
    const promise = api.removeFromCart(action.payload);

    const response = yield call(() =>
      notify.promise(promise, {
        pending: "در حال حذف از سبد اقساطی...",
        success: "محصول از سبد اقساطی حذف شد",
        error: "خطا در حذف محصول",
      })
    );

    yield put(
      actions.removeFromInstallmentCartSuccess(
        response.data || { items: [], summary: null }
      )
    );
  } catch (error) {
    yield put(actions.removeFromInstallmentCartFailure(error.message));
  }
}

export function* installmentCartSaga() {
  yield takeLatest(
    actionTypes.FETCH_INSTALLMENT_CART_REQUEST,
    fetchInstallmentCartSaga
  );
  yield takeLatest(
    actionTypes.ADD_TO_INSTALLMENT_CART_REQUEST,
    addToInstallmentCartSaga
  );
  yield takeLatest(
    actionTypes.UPDATE_INSTALLMENT_CART_ITEM_REQUEST,
    updateInstallmentCartItemSaga
  );
  yield takeLatest(
    actionTypes.REMOVE_FROM_INSTALLMENT_CART_REQUEST,
    removeFromInstallmentCartSaga
  );
}
