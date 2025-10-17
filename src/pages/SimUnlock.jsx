// src/pages/SimUnlock.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';

export default function SimUnlock() {
  const navigate = useNavigate();
  const [simStatus, setSimStatus] = useState('Unknown');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // redirect if not logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') navigate('/login');

    // fetch current SIM status
    fetch('http://localhost:5000/api/sim/status', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setSimStatus(data.status))
      .catch(err => console.error('Error fetching SIM status:', err));
  }, [navigate]);

  const handleUnlock = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/sim/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setSimStatus(data.status);
        setMessage('SIM unlocked successfully!');
      } else {
        setMessage(data.error || 'Failed to unlock SIM');
      }
    } catch (err) {
      setMessage('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
      setPin('');
    }
  };

  return (
    <div className="app-shell p-4">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">SIM Unlock</h2>
      </header>

      <div className="mobile-card p-4 space-y-3">
        <div className="text-sm text-gray-500">Current SIM Status:</div>
        <div className="text-xl font-semibold">{simStatus}</div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-600">Enter SIM PIN:</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="SIM PIN"
          />
          <button
            onClick={handleUnlock}
            disabled={loading || !pin}
            className="bg-nokia text-white px-4 py-2 rounded hover:brightness-95 disabled:opacity-50"
          >
            {loading ? 'Unlocking...' : 'Unlock SIM'}
          </button>
        </div>

        {message && (
          <div className="text-sm mt-2 text-blue-800 font-medium">
            {message}
          </div>
        )}
      </div>

      <Navbar />
    </div>
  );
}
