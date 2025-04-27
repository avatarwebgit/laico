import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import {
 PersistQueryClientProvider,
 persistQueryClient,
} from '@tanstack/react-query-persist-client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'; // Correct import
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   staleTime: 1000 * 60 * 5,
   cacheTime: 1000 * 60 * 10,
  },
 },
});

const persister = createSyncStoragePersister({
 storage: window.localStorage,
});

persistQueryClient({
 queryClient,
 persister,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
 <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
     <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}>
      <QueryClientProvider client={queryClient}>
       <App />
      </QueryClientProvider>
     </PersistQueryClientProvider>
    </BrowserRouter>
   </PersistGate>
  </Provider>
 </GoogleOAuthProvider>,
);
