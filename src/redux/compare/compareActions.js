import * as actionTypes from "./compareActionTypes";

export const toggleCompare = (product) => ({
  type: actionTypes.TOGGLE_COMPARE_REQUEST,
  payload: product,
});

export const removeFromCompare = (productId) => ({
  type: actionTypes.REMOVE_FROM_COMPARE_REQUEST,
  payload: productId,
});

export const clearCompare = () => ({
  type: actionTypes.CLEAR_COMPARE_REQUEST,
});
