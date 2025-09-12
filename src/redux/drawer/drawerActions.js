import * as actionTypes from "./drawerActionTypes";

export const openCartDrawer = () => ({ type: actionTypes.OPEN_CART_DRAWER });
export const closeCartDrawer = () => ({ type: actionTypes.CLOSE_CART_DRAWER });

export const openInstallmentCartDrawer = () => ({
  type: actionTypes.OPEN_INSTALLMENT_CART_DRAWER,
});
export const closeInstallmentCartDrawer = () => ({
  type: actionTypes.CLOSE_INSTALLMENT_CART_DRAWER,
});

export const openFavoritesDrawer = () => ({
  type: actionTypes.OPEN_FAVORITES_DRAWER,
});
export const closeFavoritesDrawer = () => ({
  type: actionTypes.CLOSE_FAVORITES_DRAWER,
});

export const setRedirectAfterLogin = (path) => ({
  type: actionTypes.SET_REDIRECT_AFTER_LOGIN,
  payload: path,
});

export const clearRedirectAfterLogin = () => ({
  type: actionTypes.CLEAR_REDIRECT_AFTER_LOGIN,
});
