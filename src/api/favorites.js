import api from "./index";
import endpoints from "./endpoints";

export default {
  getFavorites: () => api.get(endpoints.USER.FAVORITES()),

  addFavorite: (productId) => {
    return api.post(endpoints.USER.ADD_FAVORITE(), { product_id: productId });
  },

  removeFavorite: (productId) =>
    api.delete(endpoints.USER.REMOVE_FAVORITE(productId)),
};
