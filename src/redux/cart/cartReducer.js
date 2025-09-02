import * as actionTypes from './cartActionTypes';

const initialState = {
 items: [],
 totalPrice: 0,
 totalPriceAfterDiscount: 0,
 finalCart: [],
 finalPayment: 0,
 euro: 0,
 selectedAddress: null,
 paymentMethod: '',
 loading: false,
 error: null,
};

const calculateTotalPrice = items => {
 return items.reduce((total, product) => {
  return total + product.selected_quantity * product.sale_price;
 }, 0);
};

const cartReducer = (state = initialState, action) => {
 switch (action.type) {
  case actionTypes.ADD_TO_CART_REQUEST:
  case actionTypes.REMOVE_FROM_CART_REQUEST:
  case actionTypes.UPDATE_CART_ITEM_REQUEST:
   return {
    ...state,
    loading: true,
    error: null,
   };

  case actionTypes.ADD_TO_CART_SUCCESS: {
   const newItems = [...state.items, action.payload];
   return {
    ...state,
    loading: false,
    items: newItems,
    totalPrice: calculateTotalPrice(newItems),
   };
  }

  case actionTypes.REMOVE_FROM_CART_SUCCESS: {
   const newItems = state.items.filter(item => item.id !== action.payload);
   return {
    ...state,
    items: newItems,
    totalPrice: calculateTotalPrice(newItems),
    loading: false,
   };
  }

  case actionTypes.UPDATE_CART_ITEM_SUCCESS: {
   const newItems = state.items.map(item =>
    item.id === action.payload.id ? action.payload : item,
   );
   return {
    ...state,
    items: newItems,
    totalPrice: calculateTotalPrice(newItems),
    loading: false,
   };
  }

  case actionTypes.ADD_TO_CART_FAILURE:
  case actionTypes.REMOVE_FROM_CART_FAILURE:
  case actionTypes.UPDATE_CART_ITEM_FAILURE:
   return {
    ...state,
    loading: false,
    error: action.payload,
   };

  case actionTypes.CLEAR_CART:
   return {
    ...state,
    items: [],
    totalPrice: 0,
   };

  case actionTypes.SET_CART:
   return {
    ...state,
    items: action.payload,
    totalPrice: calculateTotalPrice(action.payload),
   };

  case actionTypes.SET_FINAL_CART:
   const finalItems = state.items.filter(el => el.selected_quantity !== 0);
   return {
    ...state,
    finalCart: finalItems,
    finalPayment: state.totalPrice,
   };

  case actionTypes.SET_EURO_RATE:
   return {
    ...state,
    euro: action.payload,
   };

  case actionTypes.SET_SELECTED_ADDRESS:
   return {
    ...state,
    selectedAddress: action.payload,
   };
  case actionTypes.SET_PAYMENT_METHOD:
   return {
    ...state,
    paymentMethod: action.payload,
   };

  default:
   return state;
 }
};

export default cartReducer;
