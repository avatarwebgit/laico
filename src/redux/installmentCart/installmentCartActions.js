import * as actionTypes from "./installmentCartActionTypes";

export const fetchInstallmentCartRequest = () => ({
  type: actionTypes.FETCH_INSTALLMENT_CART_REQUEST,
});

export const fetchInstallmentCartSuccess = (cartData) => ({
  type: actionTypes.FETCH_INSTALLMENT_CART_SUCCESS,
  payload: cartData,
});

export const fetchInstallmentCartFailure = (error) => ({
  type: actionTypes.FETCH_INSTALLMENT_CART_FAILURE,
  payload: error,
});

export const addToInstallmentCartRequest = (product) => ({
  type: actionTypes.ADD_TO_INSTALLMENT_CART_REQUEST,
  payload: product,
});

export const addToInstallmentCartSuccess = (cartData) => ({
  type: actionTypes.ADD_TO_INSTALLMENT_CART_SUCCESS,
  payload: cartData,
});

export const addToInstallmentCartFailure = (error) => ({
  type: actionTypes.ADD_TO_INSTALLMENT_CART_FAILURE,
  payload: error,
});

export const removeFromInstallmentCartRequest = (cartId) => ({
  type: actionTypes.REMOVE_FROM_INSTALLMENT_CART_REQUEST,
  payload: cartId,
});

export const removeFromInstallmentCartSuccess = (cartData) => ({
  type: actionTypes.REMOVE_FROM_INSTALLMENT_CART_SUCCESS,
  payload: cartData,
});

export const removeFromInstallmentCartFailure = (error) => ({
  type: actionTypes.REMOVE_FROM_INSTALLMENT_CART_FAILURE,
  payload: error,
});

export const updateInstallmentCartItemRequest = (updatedItem) => ({
  type: actionTypes.UPDATE_INSTALLMENT_CART_ITEM_REQUEST,
  payload: updatedItem,
});

export const updateInstallmentCartItemSuccess = (cartData) => ({
  type: actionTypes.UPDATE_INSTALLMENT_CART_ITEM_SUCCESS,
  payload: cartData,
});

export const updateInstallmentCartItemFailure = (error) => ({
  type: actionTypes.UPDATE_INSTALLMENT_CART_ITEM_FAILURE,
  payload: error,
});

export const clearInstallmentCart = () => ({
  type: actionTypes.CLEAR_INSTALLMENT_CART,
});
