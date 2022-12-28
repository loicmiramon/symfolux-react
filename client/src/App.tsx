import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage';
import Order from './pages/orderpage/Order';
import Productpage from './pages/productpage/Productpage';
import Profile from './pages/profilepage/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product' element={<Productpage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </div>
  );
}

export default App;
