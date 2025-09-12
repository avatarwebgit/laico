import * as actionTypes from "./userActionTypes";

export const fetchUserProfileRequest = (userId) => ({
  type: actionTypes.FETCH_USER_PROFILE_REQUEST,
  payload: userId,
});

export const fetchUserProfileSuccess = (profile) => ({
  type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchUserProfileFailure = (error) => ({
  type: actionTypes.FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

export const updateUserProfileRequest = (userId, profileData) => ({
  type: actionTypes.UPDATE_USER_PROFILE_REQUEST,
  payload: { userId, profileData },
});

export const updateUserProfileSuccess = (profile) => ({
  type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
  payload: profile,
});

export const updateUserProfileFailure = (error) => ({
  type: actionTypes.UPDATE_USER_PROFILE_FAILURE,
  payload: error,
});

// Addresses Actions
export const fetchAddressesRequest = () => ({
  type: actionTypes.FETCH_ADDRESSES_REQUEST,
});

export const fetchAddressesSuccess = (addresses) => ({
  type: actionTypes.FETCH_ADDRESSES_SUCCESS,
  payload: addresses,
});

export const fetchAddressesFailure = (error) => ({
  type: actionTypes.FETCH_ADDRESSES_FAILURE,
  payload: error,
});

export const addAddressRequest = (addressData) => ({
  type: actionTypes.ADD_ADDRESS_REQUEST,
  payload: addressData,
});

export const addAddressSuccess = (address) => ({
  type: actionTypes.ADD_ADDRESS_SUCCESS,
  payload: address,
});

export const addAddressFailure = (error) => ({
  type: actionTypes.ADD_ADDRESS_FAILURE,
  payload: error,
});

export const updateAddressRequest = (addressId, addressData) => ({
  type: actionTypes.UPDATE_ADDRESS_REQUEST,
  payload: { addressId, addressData },
});

export const updateAddressSuccess = (address) => ({
  type: actionTypes.UPDATE_ADDRESS_SUCCESS,
  payload: address,
});

export const updateAddressFailure = (error) => ({
  type: actionTypes.UPDATE_ADDRESS_FAILURE,
  payload: error,
});

export const deleteAddressRequest = (addressId) => ({
  type: actionTypes.DELETE_ADDRESS_REQUEST,
  payload: addressId,
});

export const deleteAddressSuccess = (addressId) => ({
  type: actionTypes.DELETE_ADDRESS_SUCCESS,
  payload: addressId,
});

export const deleteAddressFailure = (error) => ({
  type: actionTypes.DELETE_ADDRESS_FAILURE,
  payload: error,
});

// Orders Actions
export const fetchOrdersRequest = () => ({
  type: actionTypes.FETCH_ORDERS_REQUEST,
});
export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: orders,
});
export const fetchOrdersFailure = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILURE,
  payload: error,
});

// Tickets Actions
export const fetchTicketsRequest = () => ({
  type: actionTypes.FETCH_TICKETS_REQUEST,
});
export const fetchTicketsSuccess = (tickets) => ({
  type: actionTypes.FETCH_TICKETS_SUCCESS,
  payload: tickets,
});
export const fetchTicketsFailure = (error) => ({
  type: actionTypes.FETCH_TICKETS_FAILURE,
  payload: error,
});
export const createTicketRequest = (ticketData) => ({
  type: actionTypes.CREATE_TICKET_REQUEST,
  payload: ticketData,
});
export const createTicketSuccess = (ticket) => ({
  type: actionTypes.CREATE_TICKET_SUCCESS,
  payload: ticket,
});
export const createTicketFailure = (error) => ({
  type: actionTypes.CREATE_TICKET_FAILURE,
  payload: error,
});
export const replyToTicketRequest = (ticketId, replyData) => ({
  type: actionTypes.REPLY_TICKET_REQUEST,
  payload: { ticketId, replyData },
});
export const replyToTicketSuccess = (ticket) => ({
  type: actionTypes.REPLY_TICKET_SUCCESS,
  payload: ticket,
});
export const replyToTicketFailure = (error) => ({
  type: actionTypes.REPLY_TICKET_FAILURE,
  payload: error,
});

// Wallet & Transactions Actions
export const fetchWalletRequest = () => ({
  type: actionTypes.FETCH_WALLET_REQUEST,
});
export const fetchWalletSuccess = (wallet) => ({
  type: actionTypes.FETCH_WALLET_SUCCESS,
  payload: wallet,
});
export const fetchWalletFailure = (error) => ({
  type: actionTypes.FETCH_WALLET_FAILURE,
  payload: error,
});
export const fetchTransactionsRequest = () => ({
  type: actionTypes.FETCH_TRANSACTIONS_REQUEST,
});
export const fetchTransactionsSuccess = (transactions) => ({
  type: actionTypes.FETCH_TRANSACTIONS_SUCCESS,
  payload: transactions,
});
export const fetchTransactionsFailure = (error) => ({
  type: actionTypes.FETCH_TRANSACTIONS_FAILURE,
  payload: error,
});
