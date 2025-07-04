import * as actionTypes from './cartActionTypes';

const initialState = {
 items: [],
 loading: false,
 error: null,
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

  case actionTypes.ADD_TO_CART_SUCCESS:
   const existingItem = state.items.find(item => item.id === action.payload.id);
   return {
    ...state,
    items: existingItem
     ? state.items.map(item =>
        item.id === action.payload.id
         ? { ...item, quantity: item.quantity + 1 }
         : item,
       )
     : [...state.items, { ...action.payload, quantity: 1 }],
    loading: false,
   };

  case actionTypes.REMOVE_FROM_CART_SUCCESS:
   return {
    ...state,
    items: state.items.filter(item => item.id !== action.payload),
    loading: false,
   };

  case actionTypes.UPDATE_CART_ITEM_SUCCESS:
   return {
    ...state,
    items: state.items.map(item =>
     item.id === action.payload.id ? action.payload : item,
    ),
    loading: false,
   };

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
   };

  default:
   return state;
 }
};

export default cartReducer;
