import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { syncPersistedState } from "../redux/sync/syncActions";
import { persistConfig } from "../redux/store";

const PERSISTED_KEYS = persistConfig.whitelist || [];

const PersistSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "persist:root" && event.newValue) {
        try {
          const newPersistedState = JSON.parse(event.newValue);
          const stateToSync = {};

          PERSISTED_KEYS.forEach((key) => {
            if (newPersistedState[key]) {
              stateToSync[key] = JSON.parse(newPersistedState[key]);
            }
          });

          if (Object.keys(stateToSync).length > 0) {
            dispatch(syncPersistedState(stateToSync));
          }
        } catch (e) {
          console.error("Failed to parse state from storage event:", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  return null; 
};

export default PersistSync;
