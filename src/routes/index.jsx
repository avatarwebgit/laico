import React from 'react';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Products from '../pages/Product';

export const publicRoutes = [
 { path: '/', element: <Home /> },
 { path: '/login', element: <Login /> },
 { path: '/register', element: <Signup /> },
 { path: '/product/:id/:variation', element: <Products /> },
];

export const authRoutes = [];
