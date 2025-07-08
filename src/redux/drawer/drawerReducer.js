import {
 OPEN_CART_DRAWER,
 CLOSE_CART_DRAWER,
 OPEN_FAVORITES_DRAWER,
 CLOSE_FAVORITES_DRAWER,
} from './actionTypes';

const initialState = {
 cartDrawerOpen: false,
 favoritesDrawerOpen: false,
};

const drawerReducer = (state = initialState, action) => {
 switch (action.type) {
  case OPEN_CART_DRAWER:
   return { ...state, cartDrawerOpen: true };
  case CLOSE_CART_DRAWER:
   return { ...state, cartDrawerOpen: false };
  case OPEN_FAVORITES_DRAWER:
   return { ...state, favoritesDrawerOpen: true };
  case CLOSE_FAVORITES_DRAWER:
   return { ...state, favoritesDrawerOpen: false };
  default:
   return state;
 }
};

export default drawerReducer;
