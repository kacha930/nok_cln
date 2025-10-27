import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SimUnlock from './pages/SimUnlock'; // ✅ Kept this route

export default function App() {
  return (
    <Routes>
      {/* Redirect root path to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Authentication route */}
      <Route path="/login" element={<Login />} />

      {/* Main dashboard */}
      <Route path="/home" element={<Dashboard />} />

      {/* SIM Unlock page */}
      <Route path="/sim-unlock" element={<SimUnlock />} />

      {/* Catch-all: redirect unknown paths to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
