import { takeLatest, put, call } from "redux-saga/effects";
import * as actionTypes from "./blogActionTypes";
import {
  fetchBlogsSuccess,
  fetchBlogsFailure,
  fetchSingleBlogSuccess,
  fetchSingleBlogFailure,
} from "./blogActions";
import api from "../../api/blogs";

function* fetchBlogsSaga() {
  try {
    const blogs = yield call(api.getAll);
    yield put(fetchBlogsSuccess(blogs));
  } catch (error) {
    yield put(fetchBlogsFailure(error.message));
  }
}

function* fetchSingleBlogSaga(action) {
  try {
    const alias = action.payload;
    const blog = yield call(api.getById, alias);
    yield put(fetchSingleBlogSuccess(blog));
  } catch (error) {
    yield put(fetchSingleBlogFailure(error.message));
  }
}

export function* blogSaga() {
  yield takeLatest(actionTypes.FETCH_BLOGS_REQUEST, fetchBlogsSaga);
  yield takeLatest(actionTypes.FETCH_SINGLE_BLOG_REQUEST, fetchSingleBlogSaga);
}
