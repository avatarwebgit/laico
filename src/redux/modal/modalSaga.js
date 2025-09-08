import { takeLatest, put, select } from 'redux-saga/effects';
import * as actionTypes from './modalActionTypes';
import { closeDeleteModal, setModalLoading } from './modalActions';

function* confirmDeleteSaga() {
  try {
    const { confirmAction } = yield select((state) => state.modal);

    if (confirmAction && confirmAction.type) {
      yield put(setModalLoading(true));
      yield put({ type: confirmAction.type, payload: confirmAction.payload });
      // The modal is closed immediately, and the user receives feedback
      // via toast notifications from the saga handling the actual deletion.
    }
  } catch (error) {
    console.error('Confirmation action failed', error);
  } finally {
    yield put(setModalLoading(false));
    yield put(closeDeleteModal());
  }
}

export function* modalSaga() {
  yield takeLatest(actionTypes.CONFIRM_DELETE_ACTION, confirmDeleteSaga);
}