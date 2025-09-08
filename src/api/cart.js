import api from "./index";
import endpoints from "./endpoints";

export default {
  getCart: () => api.get(endpoints.CART.BASE()),
  updateCart: (data) => api.post(endpoints.CART.UPDATE(), data),
  removeFromCart: (cartId) => api.delete(endpoints.CART.ITEM(cartId)),
};
