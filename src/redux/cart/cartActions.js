import * as actionTypes from "./cartActionTypes";

export const fetchCartRequest = () => ({
  type: actionTypes.FETCH_CART_REQUEST,
});

export const fetchCartSuccess = (cartData) => ({
  type: actionTypes.FETCH_CART_SUCCESS,
  payload: cartData,
});

export const fetchCartFailure = (error) => ({
  type: actionTypes.FETCH_CART_FAILURE,
  payload: error,
});

export const addToCartRequest = (product) => ({
  type: actionTypes.ADD_TO_CART_REQUEST,
  payload: product,
});

export const addToCartSuccess = (product) => ({
  type: actionTypes.ADD_TO_CART_SUCCESS,
  payload: product,
});

export const addToCartFailure = (error) => ({
  type: actionTypes.ADD_TO_CART_FAILURE,
  payload: error,
});

export const removeFromCartRequest = (cartId) => ({
  type: actionTypes.REMOVE_FROM_CART_REQUEST,
  payload: cartId,
});

export const removeFromCartSuccess = (cartId) => ({
  type: actionTypes.REMOVE_FROM_CART_SUCCESS,
  payload: cartId,
});

export const removeFromCartFailure = (error) => ({
  type: actionTypes.REMOVE_FROM_CART_FAILURE,
  payload: error,
});

export const updateCartItemRequest = (updatedItem) => ({
  type: actionTypes.UPDATE_CART_ITEM_REQUEST,
  payload: updatedItem,
});

export const updateCartItemSuccess = (updatedItem) => ({
  type: actionTypes.UPDATE_CART_ITEM_SUCCESS,
  payload: updatedItem,
});

export const updateCartItemFailure = (error) => ({
  type: actionTypes.UPDATE_CART_ITEM_FAILURE,
  payload: error,
});

export const clearCart = () => ({
  type: actionTypes.CLEAR_CART,
});

export const setCart = (cartData) => ({
  type: actionTypes.SET_CART,
  payload: cartData,
});

export const setFinalCart = () => ({
  type: actionTypes.SET_FINAL_CART,
});

export const setEuroRate = (rate) => ({
  type: actionTypes.SET_EURO_RATE,
  payload: rate,
});

export const setSelectedAddress = (addressId) => ({
  type: actionTypes.SET_SELECTED_ADDRESS,
  payload: addressId,
});

export const setPaymentMethod = (methodId) => ({
  type: actionTypes.SET_PAYMENT_METHOD,
  payload: methodId,
});

export const addToCart = (product) => ({
  type: actionTypes.ADD_TO_CART,
  payload: product,
});
