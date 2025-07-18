const API_BASE = '/api/v1';

export default {
 AUTH: {
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  LOGOUT: `${API_BASE}/auth/logout`,
  ME: `${API_BASE}/auth/me`,
  REFRESH: `${API_BASE}/auth/refresh`,
  },
  
 PRODUCTS: {
  BASE: `${API_BASE}/products`,
  BY_ID: id => `${API_BASE}/products/${id}`,
  SEARCH: `${API_BASE}/products/search`,
  CATEGORIES: `${API_BASE}/products/categories`,
  POPULAR: `${API_BASE}/products/popular`,
  RELATED: id => `${API_BASE}/products/${id}/related`,
  },
 
 CART: {
  USER_CART: userId => `${API_BASE}/users/${userId}/cart`,
  CART_ITEM: (userId, itemId) => `${API_BASE}/users/${userId}/cart/${itemId}`,
  },
 
 FAVORITES: {
  USER_FAVORITES: userId => `${API_BASE}/users/${userId}/favorites`,
  TOGGLE_FAVORITE: (userId, productId) =>
   `${API_BASE}/users/${userId}/favorites/${productId}`,
  },
 
 ORDERS: {
  USER_ORDERS: userId => `${API_BASE}/users/${userId}/orders`,
  ORDER_DETAILS: (userId, orderId) =>
   `${API_BASE}/users/${userId}/orders/${orderId}`,
  CHECKOUT: `${API_BASE}/orders/checkout`,
  },
 
 USER: {
  PROFILE: userId => `${API_BASE}/users/${userId}`,
  ADDRESSES: userId => `${API_BASE}/users/${userId}/addresses`,
  ADDRESS: (userId, addressId) =>
   `${API_BASE}/users/${userId}/addresses/${addressId}`,
 },
};
