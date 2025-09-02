import { takeLatest, put, select, call } from 'redux-saga/effects';
import * as actionTypes from './favoritesActionTypes';
import * as actions from './favoritesActions';
import api from '../../api/favorites';

function* fetchFavoritesSaga(action) {
 try {
  const favorites = yield call(api.getFavorites, action.payload);
  yield put(actions.fetchFavoritesSuccess(favorites));
 } catch (error) {
  yield put(actions.fetchFavoritesFailure(error.message));
 }
}

function* addToFavoritesSaga(action) {
 try {
  const { userId, productId } = action.payload;
  const response = yield call(api.addFavorite, userId, productId);
  yield put(actions.addToFavoritesSuccess(response)); // Assuming API returns the added product
 } catch (error) {
  yield put(actions.addToFavoritesFailure(error.message));
 }
}

function* removeFromFavoritesSaga(action) {
 try {
  const { userId, productId } = action.payload;
  yield call(api.removeFavorite, userId, productId);
  yield put(actions.removeFromFavoritesSuccess(productId));
 } catch (error) {
  yield put(actions.removeFromFavoritesFailure(error.message));
 }
}

export function* favoritesSaga() {
 yield takeLatest(actionTypes.FETCH_FAVORITES_REQUEST, fetchFavoritesSaga);
 yield takeLatest(actionTypes.ADD_TO_FAVORITES_REQUEST, addToFavoritesSaga);
 yield takeLatest(
  actionTypes.REMOVE_FROM_FAVORITES_REQUEST,
  removeFromFavoritesSaga,
 );
}
