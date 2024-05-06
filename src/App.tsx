import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/auth/register/Register';
import LoginPage from './pages/auth/login/Login';
import ProjectPage from './pages/project/Project';
import HomePage from './pages/home/Home';
import ProjectDetail from './pages/project/ProjectDetail';
import Profile from './pages/auth/Profile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App