import { all } from "redux-saga/effects";
import { cartSaga } from "./cart/cartSaga";
import { installmentCartSaga } from "./installmentCart/installmentCartSaga";
import { productSaga } from "./products/productSaga";
import { favoritesSaga } from "./favorites/favoritesSaga";
import { userSaga } from "./user/userSaga";
import { orderSaga } from "./orders/orderSaga";
import { authSaga } from "./auth/authSaga";
import { drawerSaga } from "./drawer/drawerSaga";
import { blogSaga } from "./blogs/blogSaga";
import { modalSaga } from "./modal/modalSaga";
import { compareSaga } from "./compare/compareSaga";
import { generalSaga } from "./general/generalSaga";
import { initialStateSaga } from "./initialState/initialStateSaga";

export default function* rootSaga() {
  yield all([
    cartSaga(),
    installmentCartSaga(),
    productSaga(),
    favoritesSaga(),
    userSaga(),
    orderSaga(),
    authSaga(),
    drawerSaga(),
    blogSaga(),
    modalSaga(),
    compareSaga(),
    generalSaga(),
    initialStateSaga(),
  ]);
}
