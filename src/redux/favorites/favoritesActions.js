import * as actionTypes from './favoritesActionTypes';

export const fetchFavoritesRequest = userId => ({
 type: actionTypes.FETCH_FAVORITES_REQUEST,
 payload: userId,
});

export const fetchFavoritesSuccess = favorites => ({
 type: actionTypes.FETCH_FAVORITES_SUCCESS,
 payload: favorites,
});

export const fetchFavoritesFailure = error => ({
 type: actionTypes.FETCH_FAVORITES_FAILURE,
 payload: error,
});

export const addToFavoritesRequest = (userId, productId) => ({
 type: actionTypes.ADD_TO_FAVORITES_REQUEST,
 payload: { userId, productId },
});

export const addToFavoritesSuccess = product => ({
 type: actionTypes.ADD_TO_FAVORITES_SUCCESS,
 payload: product,
});

export const addToFavoritesFailure = error => ({
 type: actionTypes.ADD_TO_FAVORITES_FAILURE,
 payload: error,
});

export const removeFromFavoritesRequest = (userId, productId) => ({
 type: actionTypes.REMOVE_FROM_FAVORITES_REQUEST,
 payload: { userId, productId },
});

export const removeFromFavoritesSuccess = productId => ({
 type: actionTypes.REMOVE_FROM_FAVORITES_SUCCESS,
 payload: productId,
});

export const removeFromFavoritesFailure = error => ({
 type: actionTypes.REMOVE_FROM_FAVORITES_FAILURE,
 payload: error,
});
