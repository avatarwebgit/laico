import * as actionTypes from './productActionTypes';

const initialState = {
 items: [],
 productDetails: null,
 loading: false,
 error: null,
};

const productReducer = (state = initialState, action) => {
 switch (action.type) {
  case actionTypes.FETCH_PRODUCTS_REQUEST:
  case actionTypes.FETCH_PRODUCT_DETAILS_REQUEST:
   return {
    ...state,
    loading: true,
    error: null,
   };

  case actionTypes.FETCH_PRODUCTS_SUCCESS:
   return {
    ...state,
    items: action.payload,
    loading: false,
   };

  case actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS:
   return {
    ...state,
    productDetails: action.payload,
    loading: false,
   };

  case actionTypes.FETCH_PRODUCTS_FAILURE:
  case actionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
   return {
    ...state,
    loading: false,
    error: action.payload,
   };

  default:
   return state;
 }
};

export default productReducer;
