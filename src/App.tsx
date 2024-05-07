import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/auth/register/Register';
import LoginPage from './pages/auth/login/Login';
import ProjectPage from './pages/project/Project';
import HomePage from './pages/home/Home';
import ProjectDetail from './pages/project/ProjectDetail';
import Profile from './pages/auth/Profile';
import MainLayout from './layouts/main/MainLayout';
import RootLayout from './layouts/root/RootLayout';

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout/>}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<MainLayout />}>
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/" element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App