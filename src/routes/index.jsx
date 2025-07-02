import React from 'react';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Product from '../pages/Product';

import PreCheckout from '../pages/PreCheckout';

export const publicRoutes = [
 { path: '/', element: <Home /> },
 { path: '/login', element: <Login /> },
 { path: '/register', element: <Signup /> },
 { path: '/product/:id/:variation', element: <Product /> },
];

export const authRoutes = [{ path: '/checkout', element: <PreCheckout /> }];
