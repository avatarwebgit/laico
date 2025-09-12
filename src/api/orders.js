import api from "./index";
import endpoints from "./endpoints";

export default {
  getOrders: () => api.get(endpoints.USER.ORDERS()),

  getOrderDetails: (orderId) => api.get(endpoints.USER.ORDER_DETAILS(orderId)),

  createOrder: (orderData) => api.post(endpoints.USER.ORDERS(), orderData),
};
