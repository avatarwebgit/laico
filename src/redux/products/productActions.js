import * as actionTypes from './productActionTypes';

export const fetchProductsRequest = () => ({
 type: actionTypes.FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = products => ({
 type: actionTypes.FETCH_PRODUCTS_SUCCESS,
 payload: products,
});

export const fetchProductsFailure = error => ({
 type: actionTypes.FETCH_PRODUCTS_FAILURE,
 payload: error,
});

export const fetchProductDetailsRequest = productId => ({
 type: actionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
 payload: productId,
});

export const fetchProductDetailsSuccess = product => ({
 type: actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
 payload: product,
});

export const fetchProductDetailsFailure = error => ({
 type: actionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
 payload: error,
});
