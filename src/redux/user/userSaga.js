import { takeLatest, put, call, select, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./userActionTypes";
import * as actions from "./userActions";
import api from "../../api/user";
import { notify } from "../../utils/helperFucntions";

function* fetchUserProfileSaga(action) {
  try {
    const profile = yield call(api.getProfile, action.payload);
    yield put(actions.fetchUserProfileSuccess(profile));
  } catch (error) {
    yield put(actions.fetchUserProfileFailure(error.message));
  }
}

function* updateUserProfileSaga(action) {
  try {
    const { userId, profileData } = action.payload;
    const updatedProfile = yield call(api.updateProfile, userId, profileData);
    yield put(actions.updateUserProfileSuccess(updatedProfile));
  } catch (error) {
    yield put(actions.updateUserProfileFailure(error.message));
  }
}

// Addresses Sagas
function* fetchAddressesSaga() {
  try {
    const token = yield select((state) => state.auth.token);
    if (!token) {
      yield put(actions.fetchAddressesFailure("User not authenticated..."));
      return;
    }
    const response = yield call(api.getAddresses, token);
    yield put(actions.fetchAddressesSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchAddressesFailure(error.message));
  }
}

function* addAddressSaga(action) {
  try {
    const token = yield select((state) => state.auth.token);
    if (!token) {
      yield put(actions.addAddressFailure("User not authenticated"));
      return;
    }
    const response = yield call(api.addAddress, action.payload);
    yield put(actions.addAddressSuccess(action.payload));
    notify("Address added successfully.");
  } catch (error) {
    yield put(actions.addAddressFailure(error.message));
    notify("Failed to add address.");
  }
}

function* updateAddressSaga(action) {
  try {
    const token = yield select((state) => state.auth.token);
    if (!token) {
      yield put(actions.updateAddressFailure("User not authenticated"));
      return;
    }
    const { addressId, addressData } = action.payload;
    const response = yield call(api.updateAddress, addressId, addressData);
    console.log(response)
    yield put(actions.updateAddressSuccess(response.data));
    notify("Address updated successfully.");
  } catch (error) {
    yield put(actions.updateAddressFailure(error.message));
    notify("Failed to update address.");
  }
}

function* deleteAddressSaga(action) {
  try {
    const token = yield select((state) => state.auth.token);
    if (!token) {
      yield put(actions.deleteAddressFailure("User not authenticated"));
      return;
    }
    const addressId = action.payload;
    yield call(api.deleteAddress, addressId);
    yield put(actions.deleteAddressSuccess(addressId));
    notify("Address removed successfully.");
  } catch (error) {
    yield put(actions.deleteAddressFailure(error.message));
    notify("Failed to remove address.");
  }
}

// Orders Saga
function* fetchOrdersSaga() {
  try {
    const orders = yield call(api.getOrders);
    yield put(actions.fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(actions.fetchOrdersFailure(error.message));
  }
}

// Favorites Sagas
function* fetchFavoritesSaga() {
  try {
    const favorites = yield call(api.getFavorites);
    yield put(actions.fetchFavoritesSuccess(favorites));
  } catch (error) {
    yield put(actions.fetchFavoritesFailure(error.message));
  }
}

function* addFavoriteSaga(action) {
  try {
    const productId = action.payload;
    const favorite = yield call(api.addFavorite, productId);
    yield put(actions.addFavoriteSuccess(favorite));
  } catch (error) {
    yield put(actions.addFavoriteFailure(error.message));
  }
}

function* removeFavoriteSaga(action) {
  try {
    const productId = action.payload;
    yield call(api.removeFavorite, productId);
    yield put(actions.removeFavoriteSuccess(productId));
  } catch (error) {
    yield put(actions.removeFavoriteFailure(error.message));
  }
}

// Tickets Sagas
function* fetchTicketsSaga() {
  try {
    const tickets = yield call(api.getTickets);
    yield put(actions.fetchTicketsSuccess(tickets));
  } catch (error) {
    yield put(actions.fetchTicketsFailure(error.message));
  }
}

function* createTicketSaga(action) {
  try {
    const ticket = yield call(api.createTicket, action.payload);
    yield put(actions.createTicketSuccess(ticket));
  } catch (error) {
    yield put(actions.createTicketFailure(error.message));
  }
}

function* replyToTicketSaga(action) {
  try {
    const { ticketId, replyData } = action.payload;
    const ticket = yield call(api.replyToTicket, ticketId, replyData);
    yield put(actions.replyToTicketSuccess(ticket));
  } catch (error) {
    yield put(actions.replyToTicketFailure(error.message));
  }
}

// Wallet & Transactions Sagas
function* fetchWalletSaga() {
  try {
    const wallet = yield call(api.getWallet);
    yield put(actions.fetchWalletSuccess(wallet));
  } catch (error) {
    yield put(actions.fetchWalletFailure(error.message));
  }
}

function* fetchTransactionsSaga() {
  try {
    const transactions = yield call(api.getTransactions);
    yield put(actions.fetchTransactionsSuccess(transactions));
  } catch (error) {
    yield put(actions.fetchTransactionsFailure(error.message));
  }
}

export function* userSaga() {
  yield takeLatest(
    actionTypes.FETCH_USER_PROFILE_REQUEST,
    fetchUserProfileSaga
  );
  yield takeLatest(
    actionTypes.UPDATE_USER_PROFILE_REQUEST,
    updateUserProfileSaga
  );

  // Address Watchers
  yield takeLatest(actionTypes.FETCH_ADDRESSES_REQUEST, fetchAddressesSaga);
  yield takeLatest(actionTypes.ADD_ADDRESS_REQUEST, addAddressSaga);
  yield takeLatest(actionTypes.UPDATE_ADDRESS_REQUEST, updateAddressSaga);
  yield takeLatest(actionTypes.DELETE_ADDRESS_REQUEST, deleteAddressSaga);

  // New Watchers
  yield takeLatest(actionTypes.FETCH_ORDERS_REQUEST, fetchOrdersSaga);
  yield takeLatest(actionTypes.FETCH_FAVORITES_REQUEST, fetchFavoritesSaga);
  yield takeLatest(actionTypes.ADD_FAVORITE_REQUEST, addFavoriteSaga);
  yield takeLatest(actionTypes.REMOVE_FAVORITE_REQUEST, removeFavoriteSaga);
  yield takeLatest(actionTypes.FETCH_TICKETS_REQUEST, fetchTicketsSaga);
  yield takeLatest(actionTypes.CREATE_TICKET_REQUEST, createTicketSaga);
  yield takeLatest(actionTypes.REPLY_TICKET_REQUEST, replyToTicketSaga);
  yield takeLatest(actionTypes.FETCH_WALLET_REQUEST, fetchWalletSaga);
  yield takeLatest(
    actionTypes.FETCH_TRANSACTIONS_REQUEST,
    fetchTransactionsSaga
  );
}
