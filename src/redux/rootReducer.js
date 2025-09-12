import { combineReducers } from "redux";
import * as actionTypes from "./sync/syncActionTypes";

import authReducer from "./auth/authReducer";
import cartReducer from "./cart/cartReducer";
import installmentCartReducer from "./installmentCart/installmentCartReucer";
import favoritesReducer from "./favorites/favoritesReducer";
import orderReducer from "./orders/orderReducer";
import productReducer from "./products/productReducer";
import userReducer from "./user/userReducer";
import drawerReducer from "./drawer/drawerReducer";
import blogReducer from "./blogs/blogReducer";
import modalReducer from "./modal/modalReducer";
import compareReducer from "./compare/compareReducer";
import generalReducer from "./general/generalReducer";

const appReducer = combineReducers({
  cart: cartReducer,
  installmentCart: installmentCartReducer,
  products: productReducer,
  favorites: favoritesReducer,
  user: userReducer,
  orders: orderReducer,
  auth: authReducer,
  drawer: drawerReducer,
  blogs: blogReducer,
  modal: modalReducer,
  compare: compareReducer,
  general: generalReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.SYNC_PERSISTED_STATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
