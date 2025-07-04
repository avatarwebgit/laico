import * as actionTypes from './orderActionTypes';

export const createOrderRequest = orderData => ({
 type: actionTypes.CREATE_ORDER_REQUEST,
 payload: orderData,
});

export const createOrderSuccess = order => ({
 type: actionTypes.CREATE_ORDER_SUCCESS,
 payload: order,
});

export const createOrderFailure = error => ({
 type: actionTypes.CREATE_ORDER_FAILURE,
 payload: error,
});

export const fetchOrdersRequest = userId => ({
 type: actionTypes.FETCH_ORDERS_REQUEST,
 payload: userId,
});

export const fetchOrdersSuccess = orders => ({
 type: actionTypes.FETCH_ORDERS_SUCCESS,
 payload: orders,
});

export const fetchOrdersFailure = error => ({
 type: actionTypes.FETCH_ORDERS_FAILURE,
 payload: error,
});

export const cancelOrderRequest = orderId => ({
 type: actionTypes.CANCEL_ORDER_REQUEST,
 payload: orderId,
});

export const cancelOrderSuccess = orderId => ({
 type: actionTypes.CANCEL_ORDER_SUCCESS,
 payload: orderId,
});

export const cancelOrderFailure = error => ({
 type: actionTypes.CANCEL_ORDER_FAILURE,
 payload: error,
});
