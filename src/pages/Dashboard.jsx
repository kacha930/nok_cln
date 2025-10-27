import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // 👈 Import Framer Motion
import Navbar from '../shared/Navbar';

function StatCard({ title, value, children }) {
  return (
    <div className="mobile-card">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-semibold mt-2">{value}</div>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [simStatus, setSimStatus] = useState('Unknown');

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') navigate('/login');

    const timer = setTimeout(() => setShowAlert(true), 1200);

    fetch('http://localhost:5000/api/sim/status', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setSimStatus(data.status))
      .catch(err => {
        console.error('Error fetching SIM status:', err);
        setSimStatus('Unavailable');
      });

    return () => clearTimeout(timer);
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('nokiaUser') || '{}');

  return (
    <motion.div
      className="flex flex-col h-[100vh] bg-gray-50 max-w-[430px] mx-auto p-4 relative overflow-y-auto"
      initial={{ opacity: 0, y: 30 }}     // 👈 start slightly below, invisible
      animate={{ opacity: 1, y: 0 }}      // 👈 fade & slide up
      transition={{ duration: 0.4, ease: 'easeOut' }} // 👈 smooth easing
    >
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Welcome back{user.username ? ', ' + user.username : ''}
          </h2>
          <div className="text-xs text-gray-500">
            Your WiFi is online | SIM: {simStatus}
          </div>
        </div>
        <button
          className="text-sm text-gray-500"
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('nokiaUser');
            navigate('/login');
          }}
        >
          Sign out
        </button>
      </header>

      {/* 🔵 Inline alert */}
      {showAlert && (
        <motion.div
          className="relative mb-4 p-3 pl-4 pr-10 border-l-4 border-nokia-blue bg-blue-50 text-blue-900 rounded-md shadow-sm"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="font-medium">Your PIN may be locked.</div>
              <div className="text-sm text-blue-800 mt-1">
                If you suspect your SIM PIN is locked, you can unlock it from the SIM unlock page.
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-end">
              <Link
                to="/sim-unlock"
                className="inline-block bg-nokia text-white px-3 py-1 rounded-md text-sm font-medium hover:brightness-95"
              >
                Unlock SIM PIN
              </Link>
            </div>
          </div>
          <button
            onClick={() => setShowAlert(false)}
            className="absolute right-3 top-2 text-blue-700 hover:text-blue-900 text-xl leading-none"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Navbar />
      </motion.div>
    </motion.div>
  );
}
