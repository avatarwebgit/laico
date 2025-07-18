import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import cartReducer from './cart/cartReducer';
import favoritesReducer from './favorites/favoritesReducer';
import orderReducer from './orders/orderReducer';
import productReducer from './products/productReducer';
import userReducer from './user/userReducer';
import drawerReducer from './drawer/drawerReducer';

const rootReducer = combineReducers({
 cart: cartReducer,
 products: productReducer,
 favorites: favoritesReducer,
 user: userReducer,
 orders: orderReducer,
 auth: authReducer,
 drawer: drawerReducer,
});

export default rootReducer;
