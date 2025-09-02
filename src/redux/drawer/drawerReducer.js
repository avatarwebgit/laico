import * as actionTypes from './drawerActionTypes';

const initialState = {
 cartDrawerOpen: false,
 favoritesDrawerOpen: false,
 redirectAfterLogin: null,
};

const drawerReducer = (state = initialState, action) => {
 switch (action.type) {
  case actionTypes.OPEN_CART_DRAWER:
   return { ...state, cartDrawerOpen: true };
  case actionTypes.CLOSE_CART_DRAWER:
   return { ...state, cartDrawerOpen: false };
  case actionTypes.OPEN_FAVORITES_DRAWER:
   return { ...state, favoritesDrawerOpen: true };
  case actionTypes.CLOSE_FAVORITES_DRAWER:
   return { ...state, favoritesDrawerOpen: false };
  case actionTypes.SET_REDIRECT_AFTER_LOGIN:
   return { ...state, redirectAfterLogin: action.payload };
  case actionTypes.CLEAR_REDIRECT_AFTER_LOGIN:
   return { ...state, redirectAfterLogin: null };
  default:
   return state;
 }
};

export default drawerReducer;
