import * as actionTypes from "./syncActionTypes";

export const syncPersistedState = (state) => ({
  type: actionTypes.SYNC_PERSISTED_STATE,
  payload: state,
});
