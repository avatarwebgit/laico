import { takeLatest, put, select, call } from 'redux-saga/effects';
import * as actionTypes from './favoritesActionTypes';
import * as actions from './favoritesActions';
import api from '../../api/favorites';

function* fetchFavoritesSaga(action) {
 try {
  const favorites = yield call(api.fetchFavorites, action.payload);
  yield put(actions.fetchFavoritesSuccess(favorites));
 } catch (error) {
  yield put(actions.fetchFavoritesFailure(error.message));
 }
}

function* addToFavoritesSaga(action) {
 try {
  const { userId, productId } = action.payload;
  yield call(api.addToFavorites, userId, productId);
  const product = yield select(state =>
   state.products.items.find(p => p.id === productId),
  );
  yield put(actions.addToFavoritesSuccess(product));
 } catch (error) {
  yield put(actions.addToFavoritesFailure(error.message));
 }
}

function* removeFromFavoritesSaga(action) {
 try {
  const { userId, productId } = action.payload;
  yield call(api.removeFromFavorites, userId, productId);
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
