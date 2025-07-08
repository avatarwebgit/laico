// src/store/drawer/saga.js
import { takeLatest, put } from 'redux-saga/effects';
import {
 OPEN_CART_DRAWER,
 CLOSE_CART_DRAWER,
 OPEN_FAVORITES_DRAWER,
 CLOSE_FAVORITES_DRAWER,
} from './actionTypes';

// Example: could add side effects here, e.g., logging or async work
function* openCartDrawerSaga() {
 yield put({ type: OPEN_CART_DRAWER });
}

function* closeCartDrawerSaga() {
 yield put({ type: CLOSE_CART_DRAWER });
}

function* openFavoritesDrawerSaga() {
 yield put({ type: OPEN_FAVORITES_DRAWER });
}

function* closeFavoritesDrawerSaga() {
 yield put({ type: CLOSE_FAVORITES_DRAWER });
}

export function* drawerSaga() {
 yield takeLatest(OPEN_CART_DRAWER, openCartDrawerSaga);
 yield takeLatest(CLOSE_CART_DRAWER, closeCartDrawerSaga);
 yield takeLatest(OPEN_FAVORITES_DRAWER, openFavoritesDrawerSaga);
 yield takeLatest(CLOSE_FAVORITES_DRAWER, closeFavoritesDrawerSaga);
}
