import * as actionTypes from './orderActionTypes';

const initialState = {
 orders: [],
 loading: false,
 error: null,
};

const orderReducer = (state = initialState, action) => {
 switch (action.type) {
  case actionTypes.CREATE_ORDER_REQUEST:
  case actionTypes.FETCH_ORDERS_REQUEST:
  case actionTypes.CANCEL_ORDER_REQUEST:
   return {
    ...state,
    loading: true,
    error: null,
   };

  case actionTypes.CREATE_ORDER_SUCCESS:
   return {
    ...state,
    orders: [...state.orders, action.payload],
    loading: false,
   };

  case actionTypes.FETCH_ORDERS_SUCCESS:
   return {
    ...state,
    orders: action.payload,
    loading: false,
   };

  case actionTypes.CANCEL_ORDER_SUCCESS:
   return {
    ...state,
    orders: state.orders.map(order =>
     order.id === action.payload ? { ...order, status: 'cancelled' } : order,
    ),
    loading: false,
   };

  case actionTypes.CREATE_ORDER_FAILURE:
  case actionTypes.FETCH_ORDERS_FAILURE:
  case actionTypes.CANCEL_ORDER_FAILURE:
   return {
    ...state,
    loading: false,
    error: action.payload,
   };

  default:
   return state;
 }
};

export default orderReducer;
