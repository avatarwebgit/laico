import * as actionTypes from './userActionTypes';

export const fetchUserProfileRequest = userId => ({
 type: actionTypes.FETCH_USER_PROFILE_REQUEST,
 payload: userId,
});

export const fetchUserProfileSuccess = profile => ({
 type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
 payload: profile,
});

export const fetchUserProfileFailure = error => ({
 type: actionTypes.FETCH_USER_PROFILE_FAILURE,
 payload: error,
});

export const updateUserProfileRequest = (userId, profileData) => ({
 type: actionTypes.UPDATE_USER_PROFILE_REQUEST,
 payload: { userId, profileData },
});

export const updateUserProfileSuccess = profile => ({
 type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
 payload: profile,
});

export const updateUserProfileFailure = error => ({
 type: actionTypes.UPDATE_USER_PROFILE_FAILURE,
 payload: error,
});
