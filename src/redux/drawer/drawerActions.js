
import {
 OPEN_CART_DRAWER,
 CLOSE_CART_DRAWER,
 OPEN_FAVORITES_DRAWER,
 CLOSE_FAVORITES_DRAWER,
} from './actionTypes';

export const openCartDrawer = () => ({ type: OPEN_CART_DRAWER });
export const closeCartDrawer = () => ({ type: CLOSE_CART_DRAWER });

export const openFavoritesDrawer = () => ({ type: OPEN_FAVORITES_DRAWER });
export const closeFavoritesDrawer = () => ({ type: CLOSE_FAVORITES_DRAWER });
