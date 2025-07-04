import * as actionTypes from './cartActionTypes';

export const addToCartRequest = product => ({
 type: actionTypes.ADD_TO_CART_REQUEST,
 payload: product,
});

export const addToCartSuccess = product => ({
 type: actionTypes.ADD_TO_CART_SUCCESS,
 payload: product,
});

export const addToCartFailure = error => ({
 type: actionTypes.ADD_TO_CART_FAILURE,
 payload: error,
});

export const removeFromCartRequest = productId => ({
 type: actionTypes.REMOVE_FROM_CART_REQUEST,
 payload: productId,
});

export const removeFromCartSuccess = productId => ({
 type: actionTypes.REMOVE_FROM_CART_SUCCESS,
 payload: productId,
});

export const removeFromCartFailure = error => ({
 type: actionTypes.REMOVE_FROM_CART_FAILURE,
 payload: error,
});

export const updateCartItemRequest = updatedItem => ({
 type: actionTypes.UPDATE_CART_ITEM_REQUEST,
 payload: updatedItem,
});

export const updateCartItemSuccess = updatedItem => ({
 type: actionTypes.UPDATE_CART_ITEM_SUCCESS,
 payload: updatedItem,
});

export const updateCartItemFailure = error => ({
 type: actionTypes.UPDATE_CART_ITEM_FAILURE,
 payload: error,
});

export const clearCart = () => ({
 type: actionTypes.CLEAR_CART,
});
