import React, {useEffect, useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage'
import Order from './pages/orderpage/Order'
import Catalogpage from './pages/catalogpage/Catalogpage'
import Accountpage from './pages/accountpage/Accountpage'
import Productpage from './pages/productpage/Productpage'
import Basketpage from './pages/basket/Basketpage'
import Authentificationpage from './pages/authentificationpage/Authentificationpage'
import Registerpage from './pages/registerpage/Registerpage'

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/catalog' element={<Catalogpage />} />
          <Route path="/account" element={<Accountpage />} />
          <Route path="/order" element={<Order />} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/basket" element={<Basketpage />} />
          <Route path="/authentification" element={<Authentificationpage />} />
          <Route path="/register" element={<Registerpage />} />
        </Routes>
      </div>
  );
}

export default App;
