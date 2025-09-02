import { takeLatest, put, call } from 'redux-saga/effects';
import * as actionTypes from './blogActionTypes';
import * as actions from './blogActions';
import api from '../../api/blogs';

function* fetchBlogsSaga() {
 try {
  const blogs = yield call(api.getAll);
  yield put(actions.fetchBlogsSuccess(blogs));
 } catch (error) {
  yield put(actions.fetchBlogsFailure(error.message));
 }
}

function* fetchSingleBlogSaga(action) {
 try {
  const blog = yield call(api.getByAlias, action.payload);
  yield put(actions.fetchSingleBlogSuccess(blog));
 } catch (error) {
  yield put(actions.fetchSingleBlogFailure(error.message));
 }
}

export function* blogSaga() {
 yield takeLatest(actionTypes.FETCH_BLOGS_REQUEST, fetchBlogsSaga);
 yield takeLatest(actionTypes.FETCH_SINGLE_BLOG_REQUEST, fetchSingleBlogSaga);
}
