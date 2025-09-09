const API_BASE = "/api/v1";

export default {
  AUTH: {
    LOGIN: () => `${API_BASE}/verify-password`,
    REGISTER: () => `${API_BASE}/auth/register`,
    LOGOUT: () => `${API_BASE}/auth/logout`,
    ME: () => `${API_BASE}/auth/me`,
    REFRESH: () => `${API_BASE}/auth/refresh`,
    SEND_OTP: () => `${API_BASE}/otp`,
    VERIFY_OTP: () => `${API_BASE}/verify-otp`,
  },

  PRODUCTS: {
    BASE: () => `${API_BASE}/products`,
    BY_ID: (id) => `${API_BASE}/admin/products/${id}`,
    SEARCH: () => `${API_BASE}/products/search`,
    CATEGORIES: () => `${API_BASE}/products/categories`,
  },

  CART: {
    BASE: () => `${API_BASE}/cart`,
    ITEM: (cartId) => `${API_BASE}/cart/${cartId}`,
    APPLY_COUPON: () => `${API_BASE}/cart/coupon`,
  },

  USER: {
    PROFILE: () => `${API_BASE}/profile`,
    ADDRESSES: () => `${API_BASE}/addresses`,
    ADDRESS: (addressId) => `${API_BASE}/addresses/${addressId}`,
    ORDERS: () => `${API_BASE}/orders`,
    ORDER_DETAILS: (orderId) => `${API_BASE}/orders/${orderId}`,
    FAVORITES: () => `${API_BASE}/favorites`,
    ADD_FAVORITE: () => `${API_BASE}/favorites`,
    REMOVE_FAVORITE: (productId) => `${API_BASE}/favorites/${productId}`,
    TICKETS: () => `${API_BASE}/tickets`,
    TICKET: (ticketId) => `${API_BASE}/tickets/${ticketId}`,
    TICKET_REPLIES: (ticketId) => `${API_BASE}/tickets/${ticketId}/replies`,
    WALLET: () => `${API_BASE}/wallet`,
    TRANSACTIONS: () => `${API_BASE}/wallet/transactions`,
  },

  BLOGS: {
    GET_BlOGS: () => `${API_BASE}/blogs`,
    RATE_BLOG: (userId) => `${API_BASE}/blogs`,
    LIKE_BLOG: (userId) => `${API_BASE}/blogs`,
    BY_ID: (id) => `${API_BASE}/blogs/${id}`,
    CATEGORIES: () => `${API_BASE}/categories`,
    SEARCH: () => `${API_BASE}/search/blog`,
  },

  HOME: {
    GET_PRODUCTS: () => `${API_BASE}/home`,
  },
};
