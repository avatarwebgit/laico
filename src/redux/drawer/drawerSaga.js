import { takeLatest } from "redux-saga/effects";
import * as actionTypes from "./drawerActionTypes";

// Sagas for drawer actions are straightforward as they are synchronous.
// They are included for consistency in handling all actions through sagas.
function* handleOpenCartDrawer() {
  // You could add side effects here if needed, e.g., logging.
}

function* handleCloseCartDrawer() {}

function* handleOpenInstallmentCartDrawer() {}

function* handleCloseInstallmentCartDrawer() {}

function* handleOpenFavoritesDrawer() {}

function* handleCloseFavoritesDrawer() {}

export function* drawerSaga() {
  yield takeLatest(actionTypes.OPEN_CART_DRAWER, handleOpenCartDrawer);
  yield takeLatest(actionTypes.CLOSE_CART_DRAWER, handleCloseCartDrawer);
  yield takeLatest(
    actionTypes.OPEN_INSTALLMENT_CART_DRAWER,
    handleOpenInstallmentCartDrawer
  );
  yield takeLatest(
    actionTypes.CLOSE_INSTALLMENT_CART_DRAWER,
    handleCloseInstallmentCartDrawer
  );
  yield takeLatest(
    actionTypes.OPEN_FAVORITES_DRAWER,
    handleOpenFavoritesDrawer
  );
  yield takeLatest(
    actionTypes.CLOSE_FAVORITES_DRAWER,
    handleCloseFavoritesDrawer
  );
}
