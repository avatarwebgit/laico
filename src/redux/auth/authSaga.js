import { takeLatest, put, call } from "redux-saga/effects";
import * as actionTypes from "./authActionTypes";
import * as actions from "./authActions";
import api from "../../api/auth";
import { notify } from "../../utils/helperFucntions.jsx";
import { clearCompare } from "../compare/compareActions";
import { clearCart } from "../cart/cartActions";
import { clearInstallmentCart } from "../installmentCart/installmentCartActions";

function* loginSaga(action) {
  try {
    const response = yield call(api.login, action.payload);
    yield put(actions.loginSuccess(response.data));
    console.log(response);
    localStorage.setItem("authToken", JSON.stringify(response.data.token));
    localStorage.removeItem("cartToken");
    notify("ورود با موفقیت انجام شد", "success");
  } catch (error) {
    yield put(actions.loginFailure(error.message));
    notify("ایمیل یا رمز عبور اشتباه است", "error");
  }
}

function* registerSaga(action) {
  try {
    const response = yield call(api.register, action.payload);
    yield put(actions.registerSuccess(response.data));
    localStorage.setItem("authToken", JSON.stringify(response.datatoken));
    localStorage.removeItem("cartToken");
    notify("ثبت نام با موفقیت انجام شد", "success");
  } catch (error) {
    yield put(actions.registerFailure(error.message));
    notify("خطا در ثبت نام. لطفا دوباره تلاش کنید", "error");
  }
}

function* logoutSaga() {
  try {
    yield call(api.logout);
    yield put(actions.logoutSuccess());
    localStorage.removeItem("authToken");
    localStorage.removeItem("cartToken");
    yield put(clearCart());
    yield put(clearCompare());
    yield put(clearInstallmentCart());
    notify("خروج با موفقیت انجام شد", "success");
  } catch (error) {
    yield put(actions.logoutFailure(error.message));
    notify("خطا در خروج از حساب", "error");
  }
}

function* sendOtpSaga(action) {
  try {
    const response = yield call(api.sendOtp, action.payload.cellphone);
    const remainingTime = response.data.remainingTime;
    yield put(actions.sendOtpSuccess({ remainingTime }));
    notify("کد تایید با موفقیت ارسال شد", "success");
  } catch (error) {
    yield put(actions.sendOtpFailure(error.message));
    notify("خطا در ارسال کد تایید", "error");
  }
}

function* verifyOtpSaga(action) {
  try {
    const { cellphone, otp } = action.payload;
    const response = yield call(api.verifyOtp, cellphone, otp);
    yield put(actions.loginSuccess(response.data));

    localStorage.setItem("authToken", JSON.stringify(response.data.token));
    localStorage.removeItem("cartToken");
    notify("ورود با موفقیت انجام شد", "success");
  } catch (error) {
    yield put(actions.loginFailure(error.message || "Invalid OTP"));
    notify("کد تایید نامعتبر است", "error");
  }
}

export function* authSaga() {
  yield takeLatest(actionTypes.LOGIN_REQUEST, loginSaga);
  yield takeLatest(actionTypes.REGISTER_REQUEST, registerSaga);
  yield takeLatest(actionTypes.LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(actionTypes.SEND_OTP_REQUEST, sendOtpSaga);
  yield takeLatest(actionTypes.VERIFY_OTP_REQUEST, verifyOtpSaga);
}
