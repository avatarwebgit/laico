import api from "./index";
import endpoints from "./endpoints";

export default {
  getCart: () => api.get(endpoints.INSTALLMENT_CART.BASE()),
  addToCart: (data) => api.post(endpoints.INSTALLMENT_CART.BASE(), data),
  removeFromCart: (cartId) =>
    api.delete(endpoints.INSTALLMENT_CART.ITEM(cartId)),
  updateCartItem: (cartId, data) =>
    api.patch(endpoints.INSTALLMENT_CART.ITEM(cartId), data),
};
