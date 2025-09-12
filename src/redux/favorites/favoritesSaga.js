import { takeLatest, put, call } from "redux-saga/effects";
import * as actionTypes from "./favoritesActionTypes";
import * as actions from "./favoritesActions";
import api from "../../api/favorites";
import { notify } from "../../utils/helperFucntions.jsx";

function* fetchFavoritesSaga() {
  try {
    const response = yield call(api.getFavorites);
    yield put(actions.fetchFavoritesSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchFavoritesFailure(error.message));
  }
}

function* addToFavoritesSaga(action) {
  try {
    const productToAdd = action.payload;
    yield call(api.addFavorite, productToAdd.id);
    yield put(actions.addToFavoritesSuccess(productToAdd));
    notify("محصول به علاقه‌مندی‌ها اضافه شد", "success");
  } catch (error) {
    const errorMessage = error.message || "خطا در افزودن به علاقه‌مندی‌ها";
    yield put(actions.addToFavoritesFailure(errorMessage));
    notify(errorMessage, "error");
  }
}

function* removeFromFavoritesSaga(action) {
  try {
    const productId = action.payload;
    yield call(api.removeFavorite, productId);
    yield put(actions.removeFromFavoritesSuccess(productId));
    notify("محصول از علاقه‌مندی‌ها حذف شد", "info");
  } catch (error) {
    const errorMessage = error.message || "خطا در حذف از علاقه‌مندی‌ها";
    yield put(actions.removeFromFavoritesFailure(errorMessage));
    notify(errorMessage, "error");
  }
}

export function* favoritesSaga() {
  yield takeLatest(actionTypes.FETCH_FAVORITES_REQUEST, fetchFavoritesSaga);
  yield takeLatest(actionTypes.ADD_TO_FAVORITES_REQUEST, addToFavoritesSaga);
  yield takeLatest(
    actionTypes.REMOVE_FROM_FAVORITES_REQUEST,
    removeFromFavoritesSaga
  );
}
