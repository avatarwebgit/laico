import { takeLatest, put, call, select } from "redux-saga/effects";
import * as actionTypes from "./userActionTypes";
import * as actions from "./userActions";
import api from "../../api/user";
import { notify } from "../../utils/helperFucntions.jsx";

function* fetchUserProfileSaga(action) {
  try {
    const profile = yield call(api.getProfile, action.payload);
    yield put(actions.fetchUserProfileSuccess(profile));
  } catch (error) {
    yield put(actions.fetchUserProfileFailure("خطا در دریافت پروفایل کاربر"));
  }
}

function* updateUserProfileSaga(action) {
  try {
    const { userId, profileData } = action.payload;
    const updatedProfile = yield call(api.updateProfile, userId, profileData);
    yield put(actions.updateUserProfileSuccess(updatedProfile));
  } catch (error) {
    yield put(actions.updateUserProfileFailure("خطا در بروزرسانی پروفایل"));
  }
}

// Addresses Sagas
function* fetchAddressesSaga() {
  try {
    const token = yield select((state) => state.auth.token);
    if (!token) {
      yield put(actions.fetchAddressesFailure("کارور احراز هویت نشده است"));
      return;
    }
    const response = yield call(api.getAddresses, token);
    yield put(actions.fetchAddressesSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchAddressesFailure("خطا در دریافت آدرس ها"));
  }
}

function* addAddressSaga(action) {
  try {
    const token = yield select((state) => state.auth.token);
    if (!token) {
      yield put(actions.addAddressFailure("کارور احراز هویت نشده است"));
      return;
    }
    const response = yield call(api.addAddress, action.payload);
    yield put(actions.addAddressSuccess(response.data));
    notify("آدرس با موفقیت اضافه شد", "success");
  } catch (error) {
    yield put(actions.addAddressFailure("خطا در اضافه کردن آدرس"));
    notify("خطا در اضافه کردن آدرس", "error");
  }
}

function* updateAddressSaga(action) {
  try {
    const token = yield select((state) => state.auth.token);
    if (!token) {
      yield put(actions.updateAddressFailure("کارور احراز هویت نشده است"));
      return;
    }
    const { addressId, addressData } = action.payload;
    const response = yield call(api.updateAddress, addressId, addressData);
    yield put(actions.updateAddressSuccess(response.data));
    notify("آدرس با موفقیت بروزرسانی شد", "success");
  } catch (error) {
    yield put(actions.updateAddressFailure("خطا در بروزرسانی آدرس"));
    notify("خطا در بروزرسانی آدرس", "error");
  }
}

function* deleteAddressSaga(action) {
  try {
    const token = yield select((state) => state.auth.token);
    if (!token) {
      yield put(actions.deleteAddressFailure("کارور احراز هویت نشده است"));
      return;
    }
    const addressId = action.payload;
    yield call(api.deleteAddress, addressId);
    yield put(actions.deleteAddressSuccess(addressId));
    notify("آدرس با موفقیت حذف شد", "success");
  } catch (error) {
    yield put(actions.deleteAddressFailure("خطا در حذف آدرس"));
    notify("خطا در حذف آدرس", "error");
  }
}

// Orders Saga
function* fetchOrdersSaga() {
  try {
    const response = yield call(api.getOrders);
    yield put(actions.fetchOrdersSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchOrdersFailure("خطا در دریافت سفارشات"));
  }
}

// Tickets Sagas
function* fetchTicketsSaga() {
  try {
    const response = yield call(api.getTickets);
    yield put(actions.fetchTicketsSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchTicketsFailure("خطا در دریافت تیکت ها"));
  }
}

function* createTicketSaga(action) {
  try {
    const response = yield call(api.createTicket, action.payload);
    yield put(actions.createTicketSuccess(response.data));
    notify("تیکت با موفقیت ایجاد شد", "success");
  } catch (error) {
    yield put(actions.createTicketFailure("خطا در ایجاد تیکت"));
    notify("خطا در ایجاد تیکت", "error");
  }
}

function* replyToTicketSaga(action) {
  try {
    const { ticketId, replyData } = action.payload;
    const response = yield call(api.replyToTicket, ticketId, replyData);
    yield put(actions.replyToTicketSuccess(response.data));
    notify("پاسخ با موفقیت ارسال شد", "success");
  } catch (error) {
    yield put(actions.replyToTicketFailure("خطا در پاسخ به تیکت"));
    notify("خطا در پاسخ به تیکت", "error");
  }
}

// Wallet & Transactions Sagas
function* fetchWalletSaga() {
  try {
    const response = yield call(api.getWallet);
    yield put(actions.fetchWalletSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchWalletFailure("خطا در دریافت کیف پول"));
  }
}

function* fetchTransactionsSaga() {
  try {
    const response = yield call(api.getTransactions);
    yield put(actions.fetchTransactionsSuccess(response.data || []));
  } catch (error) {
    yield put(actions.fetchTransactionsFailure("خطا در دریافت تراکنش ها"));
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
  yield takeLatest(actionTypes.FETCH_TICKETS_REQUEST, fetchTicketsSaga);
  yield takeLatest(actionTypes.CREATE_TICKET_REQUEST, createTicketSaga);
  yield takeLatest(actionTypes.REPLY_TICKET_REQUEST, replyToTicketSaga);
  yield takeLatest(actionTypes.FETCH_WALLET_REQUEST, fetchWalletSaga);
  yield takeLatest(
    actionTypes.FETCH_TRANSACTIONS_REQUEST,
    fetchTransactionsSaga
  );
}
