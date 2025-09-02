import api from "./index";
import endpoints from "./endpoints";

export default {
  getAll: (params) => api.get(endpoints.BLOGS.GET_BlOGS, { params }),
  getById: (id) => api.get(endpoints.BLOGS.BY_ID(id)),
  search: (query) => api.get(endpoints.BLOGS.SEARCH, { params: { q: query } }),
  getCategories: () => api.get(endpoints.BLOGS.CATEGORIES),
  rate: (userId, blogId) =>
    api.post(endpoints.BLOGS.RATE_BLOG, { userId, blogId }),
  like: (userId, blogId) =>
    api.post(endpoints.BLOGS.LIKE_BLOG, { userId, blogId }),
};
