import './scss/app.scss';
import React from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
