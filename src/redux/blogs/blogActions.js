import * as actionTypes from './blogActionTypes';

export const fetchBlogsRequest = () => ({
 type: actionTypes.FETCH_BLOGS_REQUEST,
});

export const fetchBlogsSuccess = blogs => ({
 type: actionTypes.FETCH_BLOGS_SUCCESS,
 payload: blogs,
});

export const fetchBlogsFailure = error => ({
 type: actionTypes.FETCH_BLOGS_FAILURE,
 payload: error,
});

export const fetchSingleBlogRequest = alias => ({
 type: actionTypes.FETCH_SINGLE_BLOG_REQUEST,
 payload: alias,
});

export const fetchSingleBlogSuccess = blog => ({
 type: actionTypes.FETCH_SINGLE_BLOG_SUCCESS,
 payload: blog,
});

export const fetchSingleBlogFailure = error => ({
 type: actionTypes.FETCH_SINGLE_BLOG_FAILURE,
 payload: error,
});
