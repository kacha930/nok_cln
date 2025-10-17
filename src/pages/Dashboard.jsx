import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') navigate('/login');

    // show alert after short delay (optional)
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('nokiaUser') || '{}');

  return (
    <div className="app-shell p-4">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Welcome back{user.username ? ', ' + user.username : ''}
          </h2>
          <div className="text-xs text-gray-500">Your WiFi is online</div>
        </div>
        <div>
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
        </div>
      </header>

      {/* 🔵 Inline Alert (non-fullscreen) */}
      {showAlert && (
        <div className="relative mb-4 p-3 pl-4 pr-10 border-l-4 border-nokia-blue bg-blue-50 text-blue-900 rounded-md shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="font-medium">Your PIN may be locked.</div>
              <div className="text-sm text-blue-800 mt-1">
                If you suspect your SIM PIN is locked, you can unlock it from the SIM unlock page.
              </div>
            </div>

            {/* CTA link inside the alert */}
            <div className="shrink-0 flex flex-col items-end">
              <Link
                to="/sim-unlock"
                className="inline-block bg-nokia text-white px-3 py-1 rounded-md text-sm font-medium hover:brightness-95"
                aria-label="Go to SIM unlock page"
              >
                Unlock SIM PIN
              </Link>
            </div>
          </div>

          {/* Close X */}
          <button
            onClick={() => setShowAlert(false)}
            className="absolute right-3 top-2 text-blue-700 hover:text-blue-900 text-xl leading-none"
            aria-label="Close alert"
          >
            ×
          </button>
        </div>
      )}

      <main className="space-y-3">
        <StatCard title="Internet" value="Connected">
          <div className="text-sm text-gray-400 mt-2">WAN IP: 192.168.1.1</div>
        </StatCard>

        <div className="grid grid-cols-2 gap-3">
          <StatCard title="Speed" value="120 Mbps" />
          <StatCard title="Devices" value="8">
            <Link to="/devices" className="text-sm text-blue-600 mt-2 inline-block">
              View devices
            </Link>
          </StatCard>
        </div>

        <div className="mobile-card">
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <div className="flex gap-2">
            <Link to="/settings" className="flex-1 bg-gray-100 rounded p-3 text-center">
              WiFi Settings
            </Link>
            <Link to="/speed" className="flex-1 bg-gray-100 rounded p-3 text-center">
              Speed Test
            </Link>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
}
