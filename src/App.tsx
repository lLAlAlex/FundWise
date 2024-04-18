import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/register" element={<Register/>} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App