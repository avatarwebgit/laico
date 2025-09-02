import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// slices
import tokenSlice from "./auth/authSlice";
import drawerSlice from "./drawer/drawerSlice";
import favoriteSlice from "./favorites/favoriteSlice";
import cartSlice from "./cart/cartSlice";

// Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart", "favorites"],
};

const rootReducer = {
  user: tokenSlice.reducer,
  cart: cartSlice.reducer,
  favorites: favoriteSlice.reducer,
  drawer: drawerSlice.reducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

const storeToolkit = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(storeToolkit);

export { storeToolkit, persistor };
