import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SimUnlock() {
  const [puk, setPuk] = useState('');
  const [newPin, setNewPin] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleUnlock = (e) => {
    e.preventDefault();

    // demo validation: PUK length 8, PIN 4
    if (puk.trim().length !== 8) {
      setMessage({ type: 'error', text: 'PUK must be 8 digits.' });
      return;
    }
    if (newPin.trim().length !== 4) {
      setMessage({ type: 'error', text: 'PIN must be 4 digits.' });
      return;
    }

    // Simulate successful unlock
    setMessage({ type: 'success', text: 'SIM unlocked — PIN updated successfully.' });

    // Optionally redirect back to dashboard after a short delay
    setTimeout(() => navigate('/'), 2200);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md mx-auto mobile-card">
        <h1 className="text-xl font-semibold mb-2 text-nokia-blue">Unlock SIM PIN</h1>
        <p className="text-sm text-gray-500 mb-4">
          Enter your PUK (provided by your operator) and set a new 4-digit SIM PIN.
        </p>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleUnlock} className="space-y-3">
          <input
            value={puk}
            onChange={(e) => setPuk(e.target.value)}
            placeholder="PUK (8 digits)"
            className="w-full border rounded px-3 py-2"
            inputMode="numeric"
            required
          />
          <input
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="New PIN (4 digits)"
            className="w-full border rounded px-3 py-2"
            inputMode="numeric"
            required
          />

          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-nokia text-white py-2 rounded">
              Unlock
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
