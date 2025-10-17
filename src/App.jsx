import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import Settings from './pages/Settings';
import SpeedTest from './pages/SpeedTest';
import SimUnlock from './pages/SimUnlock'; // ✅ Add this import

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/speed" element={<SpeedTest />} />
      <Route path="/sim-unlock" element={<SimUnlock />} /> {/* ✅ New route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
