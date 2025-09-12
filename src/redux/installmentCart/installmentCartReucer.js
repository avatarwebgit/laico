import * as actionTypes from "./installmentCartActionTypes";

const initialState = {
  products: [],
  summary: null,
  totalPrice: 0,
  count: 0,
  loading: false,
  error: null,
};

const installmentCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INSTALLMENT_CART_REQUEST:
    case actionTypes.ADD_TO_INSTALLMENT_CART_REQUEST:
    case actionTypes.REMOVE_FROM_INSTALLMENT_CART_REQUEST:
    case actionTypes.UPDATE_INSTALLMENT_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_INSTALLMENT_CART_SUCCESS:
    case actionTypes.ADD_TO_INSTALLMENT_CART_SUCCESS:
    case actionTypes.UPDATE_INSTALLMENT_CART_ITEM_SUCCESS:
    case actionTypes.REMOVE_FROM_INSTALLMENT_CART_SUCCESS:
      return {
        ...state,
        products: action.payload.items || [],
        summary: action.payload.summary || null,
        totalPrice: action.payload.summary?.subtotal || 0,
        count: (action.payload.items || []).length,
        loading: false,
      };

    case actionTypes.FETCH_INSTALLMENT_CART_FAILURE:
    case actionTypes.ADD_TO_INSTALLMENT_CART_FAILURE:
    case actionTypes.REMOVE_FROM_INSTALLMENT_CART_FAILURE:
    case actionTypes.UPDATE_INSTALLMENT_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.CLEAR_INSTALLMENT_CART:
      return {
        ...state,
        products: [],
        totalPrice: 0,
        summary: null,
        count: 0,
      };

    default:
      return state;
  }
};

export default installmentCartReducer;
