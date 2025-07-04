import api from './index';
import endpoints from './endpoints';

export default {
 getOrders: userId => api.get(endpoints.ORDERS.USER_ORDERS(userId)),

 getOrderDetails: (userId, orderId) =>
  api.get(endpoints.ORDERS.ORDER_DETAILS(userId, orderId)),

 createOrder: (userId, orderData) =>
  api.post(endpoints.ORDERS.USER_ORDERS(userId), orderData),

 checkout: checkoutData => api.post(endpoints.ORDERS.CHECKOUT, checkoutData),
};
