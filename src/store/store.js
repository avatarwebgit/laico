import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
 persistStore,
 persistReducer,
 PERSIST,
 REHYDRATE,
 FLUSH,
 PAUSE,
 PURGE,
 REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import tokenSlice from './auth/authSlice';
import drawerSlice from './drawer/drawerSlice';
import favoriteSlice from './favorites/favoriteSlice';
import cartSlice from './cart/cartSlice';

// Configuration
const persistConfig = {
 key: 'root',
 storage,
 whitelist: ['userStore', 'cartStore', 'favoriteStore'],
};

const rootReducer = {
 userStore: tokenSlice.reducer,
 cartStore: cartSlice.reducer,
 favoriteStore: favoriteSlice.reducer,
 drawerStore: drawerSlice.reducer,
};

const persistedReducer = persistReducer(
 persistConfig,
 combineReducers(rootReducer),
);

const store = configureStore({
 reducer: persistedReducer,
 middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
   serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
   },
  }),
});

const persistor = persistStore(store);

export { store, persistor };
