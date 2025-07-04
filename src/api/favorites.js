import api from './index';
import endpoints from './endpoints';

export default {
 getFavorites: userId => api.get(endpoints.FAVORITES.USER_FAVORITES(userId)),

 addFavorite: (userId, productId) =>
  api.post(endpoints.FAVORITES.USER_FAVORITES(userId), { productId }),

 removeFavorite: (userId, productId) =>
  api.delete(endpoints.FAVORITES.TOGGLE_FAVORITE(userId, productId)),

 toggleFavorite: (userId, productId) =>
  api.patch(endpoints.FAVORITES.TOGGLE_FAVORITE(userId, productId)),
};
