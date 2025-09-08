import * as actionTypes from './modalActionTypes';

export const openDeleteModal = ({ title, message, confirmAction }) => ({
  type: actionTypes.OPEN_DELETE_MODAL,
  payload: { title, message, confirmAction },
});

export const closeDeleteModal = () => ({
  type: actionTypes.CLOSE_DELETE_MODAL,
});

export const confirmDeleteAction = () => ({
  type: actionTypes.CONFIRM_DELETE_ACTION,
});

export const setModalLoading = (isLoading) => ({
  type: actionTypes.SET_MODAL_LOADING,
  payload: isLoading,
});