import api from "./index";
import endpoints from "./endpoints";

export default {
  getCart: () => api.get(endpoints.CART.BASE()),
  addToCart: (data) => api.post(endpoints.CART.BASE(), data),
  removeFromCart: (cartId) => api.delete(endpoints.CART.ITEM(cartId)),
  updateCartItem: (cartId, data) =>
    api.patch(endpoints.CART.ITEM(cartId), data),
  clearCart: () => api.delete(endpoints.CART.BASE()),
  applyCoupon: (couponCode) =>
    api.post(endpoints.CART.APPLY_COUPON(), { coupon_code: couponCode }),
};
