import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { authRoutes, publicRoutes } from './routes/index';
import { useIsVertical } from './hooks/useIsVertical';

import Loader from './components/common/Loader';

import Header from './components/layout/HorizontalLayout/Header';
import MobileHeader from './components/layout/VerticalLayout/Header';
import FixedNavigation from './components/layout/VerticalLayout/FixedNavigation';

import './App.css';
function App() {
 const isVertical = useIsVertical();
 const location = useLocation();
 const currentPath = location.pathname;

 const hideHeadersOnDesktop = ['/login', '/register', '/some-other-page'];

 const shouldShowHeader = !(
  !isVertical && hideHeadersOnDesktop.includes(currentPath)
 );

 return (
  <Suspense fallback={<Loader />}>
   {shouldShowHeader && (isVertical ? <MobileHeader /> : <Header />)}
   {isVertical && <FixedNavigation />}
   <Routes className='App'>
    {authRoutes.map((route, id) => {
     return <Route path={route.path} element={route.element} key={id} />;
    })}
    {publicRoutes.map((route, id) => {
     return <Route path={route.path} element={route.element} key={id} />;
    })}
   </Routes>
  </Suspense>
 );
}

export default App;
