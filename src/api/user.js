import api from "./index";
import endpoints from "./endpoints";

export default {
  getProfile: () => api.get(endpoints.USER.PROFILE()),
  updateProfile: (profileData) =>
    api.put(endpoints.USER.PROFILE(), profileData),

  getAddresses: () => api.get(endpoints.USER.ADDRESSES()),
  addAddress: (addressData) =>
    api.post(endpoints.USER.ADDRESSES(), addressData),
  updateAddress: (addressId) =>
    api.put(endpoints.USER.ADDRESS(addressId)),
  deleteAddress: (addressId) => api.delete(endpoints.USER.ADDRESS(addressId)),

  getOrders: () => api.get(endpoints.USER.ORDERS()),
  getOrderDetails: (orderId) => api.get(endpoints.USER.ORDER_DETAILS(orderId)),

  getTickets: () => api.get(endpoints.USER.TICKETS()),
  createTicket: (ticketData) => api.post(endpoints.USER.TICKETS(), ticketData),
  getTicketDetails: (ticketId) => api.get(endpoints.USER.TICKET(ticketId)),
  replyToTicket: (ticketId, replyData) =>
    api.post(endpoints.USER.TICKET_REPLIES(ticketId), replyData),

  getWallet: () => api.get(endpoints.USER.WALLET()),
  getTransactions: () => api.get(endpoints.USER.TRANSACTIONS()),
};
