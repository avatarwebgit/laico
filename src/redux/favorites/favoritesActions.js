import * as actionTypes from "./favoritesActionTypes";

export const fetchFavoritesRequest = () => ({
  type: actionTypes.FETCH_FAVORITES_REQUEST,
});

export const fetchFavoritesSuccess = (favorites) => ({
  type: actionTypes.FETCH_FAVORITES_SUCCESS,
  payload: favorites,
});

export const fetchFavoritesFailure = (error) => ({
  type: actionTypes.FETCH_FAVORITES_FAILURE,
  payload: error,
});

export const addFavoriteRequest = (product) => ({
  type: actionTypes.ADD_TO_FAVORITES_REQUEST,
  payload: product,
});

export const addToFavoritesSuccess = (product) => ({
  type: actionTypes.ADD_TO_FAVORITES_SUCCESS,
  payload: product,
});

export const addToFavoritesFailure = (error) => ({
  type: actionTypes.ADD_TO_FAVORITES_FAILURE,
  payload: error,
});

export const removeFromFavoritesRequest = (productId) => ({
  type: actionTypes.REMOVE_FROM_FAVORITES_REQUEST,
  payload: productId,
});

export const removeFromFavoritesSuccess = (productId) => ({
  type: actionTypes.REMOVE_FROM_FAVORITES_SUCCESS,
  payload: productId,
});

export const removeFromFavoritesFailure = (error) => ({
  type: actionTypes.REMOVE_FROM_FAVORITES_FAILURE,
  payload: error,
});

export const setFavoritesCount = (count) => ({
  type: actionTypes.SET_FAVORITES_COUNT,
  payload: count,
});
