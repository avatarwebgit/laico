import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { authRoutes, publicRoutes } from './routes/index';

import './App.css';
function App() {
 return (
  <Routes className='App'>
   {authRoutes.map((route, id) => {
    return <Route path={route.path} element={route.element} key={id} />;
   })}
   {publicRoutes.map((route, id) => {
    return <Route path={route.path} element={route.element} key={id} />;
   })}
  </Routes>
 );
}

export default App;
