import api from './index';
import endpoints from './endpoints';

export default {
 getAll: params => api.get(endpoints.PRODUCTS.BASE, { params }),
 getById: id => api.get(endpoints.PRODUCTS.BY_ID(id)),
 search: query => api.get(endpoints.PRODUCTS.SEARCH, { params: { q: query } }),
 getCategories: () => api.get(endpoints.PRODUCTS.CATEGORIES),
 getPopular: () => api.get(endpoints.PRODUCTS.POPULAR),
 getRelated: id => api.get(endpoints.PRODUCTS.RELATED(id)),
};
